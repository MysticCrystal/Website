import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  intent: string;
  message?: string;
};

function mustGetEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return normalizeEnvValue(value);
}

function normalizeEnvValue(raw: string): string {
  const normalized = raw.trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    return normalized.slice(1, -1);
  }

  return normalized;
}

function normalizePrivateKey(raw: string): string {
  // Vercel often stores multiline secrets with literal "\n".
  return normalizeEnvValue(raw).replace(/\\n/g, "\n");
}

function getOptionalEnv(name: string): string {
  return normalizeEnvValue(process.env[name] ?? "");
}

function isValidEmail(email: string): boolean {
  // Simple sanity check. Real validation happens via email confirmation/follow-up.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function asA1SheetRange(sheetTitle: string, a1: string): string {
  // Always quote the sheet title to handle spaces/punctuation safely.
  const escaped = sheetTitle.replace(/'/g, "''");
  return `'${escaped}'!${a1}`;
}

async function sendSlackNotification(webhookUrl: string, payload: ContactPayload, submittedAt: string) {
  const lines = [
    "*New website lead*",
    `*Submitted:* ${submittedAt}`,
    `*Name:* ${payload.firstName} ${payload.lastName}`,
    `*Email:* ${payload.email}`,
    `*Phone:* ${payload.phone?.trim() || "Not provided"}`,
    `*Looking to:* ${payload.intent}`,
  ];

  const message = payload.message?.trim();
  if (message) {
    lines.push(`*Message:* ${message}`);
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Lane Banner Leads",
      icon_emoji: ":house_with_garden:",
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(body || `Slack webhook failed with status ${response.status}`);
  }
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const firstName = (payload.firstName ?? "").trim();
  const lastName = (payload.lastName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const intent = (payload.intent ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!firstName) return NextResponse.json({ success: false, error: "firstName is required" }, { status: 400 });
  if (!lastName) return NextResponse.json({ success: false, error: "lastName is required" }, { status: 400 });
  if (!email) return NextResponse.json({ success: false, error: "email is required" }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ success: false, error: "email is invalid" }, { status: 400 });
  if (!intent) return NextResponse.json({ success: false, error: "intent is required" }, { status: 400 });

  // Sheet + auth configuration.
  const sheetId = mustGetEnv("GOOGLE_SHEET_ID");
  const clientEmail = mustGetEnv("GOOGLE_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(mustGetEnv("GOOGLE_PRIVATE_KEY"));

  const submittedAt = new Date().toISOString();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Assumes the sheet tab is named "Leads" (or override via GOOGLE_SHEET_TAB)
  // and row 1 is the header row:
  // submitted_at | first_name | last_name | email | phone | intent | message
  const tabName = (process.env.GOOGLE_SHEET_TAB || "Leads").trim();
  const range = asA1SheetRange(tabName, "A:G");
  const values = [[submittedAt, firstName, lastName, email, phone, intent, message]];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to append row";

    // If the tab name is wrong, fall back to the first sheet title and retry once.
    if (message.includes("Unable to parse range")) {
      try {
        const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
        const firstTitle = meta.data.sheets?.[0]?.properties?.title;
        if (firstTitle) {
          await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: asA1SheetRange(firstTitle, "A:G"),
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: { values },
          });
          return NextResponse.json({ success: true });
        }
      } catch {
        // Fall through to error response.
      }
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }

  const slackWebhookUrl = getOptionalEnv("SLACK_WEBHOOK_URL");
  if (slackWebhookUrl) {
    try {
      await sendSlackNotification(slackWebhookUrl, { firstName, lastName, email, phone, intent, message }, submittedAt);
    } catch (err) {
      console.error("Slack notification failed", err);
    }
  }

  return NextResponse.json({ success: true });
}
