import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Lane Banner",
  description: "Privacy policy for lane.gomitch.com.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-block text-[10px] font-sans uppercase tracking-[0.35em] text-neutral-400 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <header className="mb-14">
          <h1 className="text-3xl md:text-5xl font-sans font-thin tracking-[0.4em] uppercase ml-[0.4em]">
            Privacy Policy
          </h1>
          <h2 className="mt-6 text-[11px] font-sans uppercase tracking-[0.3em] text-neutral-400">
            Privacy Policy and Terms of Use
          </h2>
          <p className="mt-4 text-sm text-neutral-400 font-light">Last Updated: {lastUpdated}</p>
          <div className="mt-10 w-12 h-px bg-white/20" />
        </header>

        <section className="space-y-10 text-neutral-200/90 leading-relaxed font-light">
          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              Introduction
            </h3>
            <p className="text-neutral-300">
              This website (the &quot;Site&quot;) provides information and services related to real estate. This Privacy Policy
              explains what information we collect, how we use it, and the choices you may have.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              1. Information We Collect
            </h3>
            <p className="text-neutral-300">
              We may collect information you submit through our forms, such as your name, email address, phone number, and
              message details. We may also collect limited technical information such as browser type and basic usage data to
              help the Site function and improve performance.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              2. How We Use Information
            </h3>
            <p className="text-neutral-300">
              We use information to respond to inquiries, provide requested services, improve the Site, and communicate with you
              about real estate-related questions you submit. We do not sell your personal information.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              3. Sharing of Information
            </h3>
            <p className="text-neutral-300">
              We may share information with service providers who support site operations (for example, hosting or analytics) as
              needed to operate the Site. We may also disclose information if required by law, to protect rights and safety, or to
              prevent fraud.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              4. Cookies and Similar Technologies
            </h3>
            <p className="text-neutral-300">
              The Site may use cookies or similar technologies for basic functionality and measurement. You can control cookies
              through your browser settings. Disabling cookies may impact some Site features.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              5. Data Security
            </h3>
            <p className="text-neutral-300">
              We take reasonable measures to protect personal information. No method of transmission or storage is completely
              secure, so we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              6. Your Choices
            </h3>
            <p className="text-neutral-300">
              You may request to update or delete information you submitted by contacting us. You can also opt out of marketing
              communications at any time where applicable.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-sans uppercase tracking-[0.25em] text-white/90 mb-3">
              7. Contact
            </h3>
            <p className="text-neutral-300">
              Questions about this policy can be sent to{" "}
              <a
                className="border-b border-white/30 hover:border-white transition-colors"
                href="mailto:lane@gomitch.com"
              >
                lane@gomitch.com
              </a>
              .
            </p>
          </div>
        </section>

        <div className="mt-16 w-full h-px bg-white/10" />
        <p className="mt-8 text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-500">
          This policy may be updated from time to time.
        </p>
      </div>
    </main>
  );
}

