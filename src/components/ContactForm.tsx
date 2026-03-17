"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending...");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const payload = {
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        intent: String(formData.get("intent") ?? ""),
        message: String(formData.get("message") ?? ""),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { success?: boolean } | null;

      if (response.ok && data?.success) {
        setStatus("success");
        form.reset();
      } else {
        console.log("Error", data);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32 bg-brand-secondary flex justify-center">
      <div className="max-w-3xl w-full px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-sans font-thin text-brand-dark mb-4 tracking-[0.4em] uppercase ml-[0.4em]">
          Let&apos;s Talk
        </h2>
        <p className="text-brand-muted font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re considering buying, selling, or simply want to understand the market, I&apos;d be happy to talk through your situation and help you plan the next step.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="intent" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
                I am Looking to*
              </label>
              <select
                id="intent"
                name="intent"
                required
                defaultValue=""
                className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light appearance-none rounded-none cursor-pointer"
              >
                <option value="" disabled>
                  Select One
                </option>
                <option value="Buy">Buy a Property</option>
                <option value="Sell">Sell a Property</option>
                <option value="Both">Buy and Sell</option>
                <option value="Inquire">Just Browsing/Inquiry</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <label htmlFor="message" className="text-xs font-sans uppercase tracking-[0.1em] text-brand-dark mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="bg-transparent border-b border-brand-muted/50 py-3 focus:outline-none focus:border-brand-dark transition-colors text-brand-dark font-light resize-none"
            ></textarea>
          </div>

          <div className="pt-8 text-center flex flex-col items-center">
            <button
              type="submit"
              className="w-full rounded-xl px-10 py-4 bg-brand-dark text-brand-primary font-sans tracking-widest text-sm uppercase hover:bg-black transition-colors duration-300 sm:w-auto"
            >
              {status === "sending..." ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-green-700 text-sm font-light">Thank you for your inquiry. Lane will be in touch shortly.</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-600 text-sm font-light">There was an error sending your message. Please try again.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
