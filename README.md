This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Google Sheets Lead Capture

This app posts the contact form to `POST /api/contact` and appends each submission to a Google Sheet.

### 1) Create The Sheet

- Create a Google Sheet with a tab named `Leads`.
- Put this exact header row in row 1 (A1..G1):
  - `submitted_at | first_name | last_name | email | phone | intent | message`

### 2) Create A Service Account

- Create a Google Cloud project.
- Enable the Google Sheets API.
- Create a service account and generate a JSON key.
- Share the Google Sheet with the service account email (Editor access).

### 3) Configure Environment Variables

Create a `.env.local` (not committed) with:

```bash
GOOGLE_SHEET_ID=...
GOOGLE_CLIENT_EMAIL=...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Notes:
- The Sheet ID is the long ID in the spreadsheet URL between `/d/` and `/edit`.
- If your private key is stored with literal `\n` characters (common in Vercel env vars), the server route normalizes it automatically.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
