import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata, SITE } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

interface PageParams {
  locale: string;
}

const heading = {
  en: { title: "Privacy Policy", updated: "Last updated: August 2026" },
  hin: { title: "गोपनीयता नीति", updated: "अंतिम अद्यतन: अगस्त 2026" },
  bn: { title: "গোপনীয়তা নীতি", updated: "সর্বশেষ আপডেট: আগস্ট ২০২৬" },
} as const;

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = heading[locale as keyof typeof heading] || heading.en;

  return constructMetadata({
    title: t.title,
    description: `${SITE.name}'s privacy policy — what information we collect, how it is used, and how it is protected.`,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const t = heading[locale as keyof typeof heading] || heading.en;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF0] text-black overflow-x-hidden">
      <Header locale={locale} dict={dict} />

      <main className="flex-1 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-zinc">
          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black mb-2">{t.title}</h1>
          <p className="text-xs text-neutral-500 font-medium mb-10">{t.updated}</p>

          <div className="space-y-8 text-sm text-neutral-700 font-medium leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">1. Introduction</h2>
              <p>{SITE.name} ("we", "us", "our") operates {SITE.url.replace("/en", "")}. This policy explains what personal information we collect when you use our free astrology tools, book a consultation, or purchase a gemstone, and how we use, store, and protect it.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Account details you provide: name, email address, phone number, password.</li>
                <li>Birth details you submit to our free tools (date, time, place of birth) — used solely to generate your Kundli, Kundli Matching, or Panchang result, and to save it to your account if you choose to.</li>
                <li>Order and consultation details: astrologer selected, service category, delivery address, and payment status (payment card/UPI details are handled directly by our payment processor and are never stored on our servers).</li>
                <li>Technical information: IP address, browser type, and pages visited, collected automatically to keep the site secure and improve performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">3. How We Use Your Information</h2>
              <p>We use your information to provide the service you requested (a chart, a consultation, an order), to communicate with you about bookings and orders via email, SMS, or WhatsApp, to improve our tools, and to meet legal and accounting obligations. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">4. Third-Party Services</h2>
              <p>We use trusted third-party providers to run the platform, including a database and authentication provider, a content management system for our catalog, a payment gateway, and WhatsApp for booking handoff. Each of these providers only receives the information necessary to perform their function and is bound by their own privacy and security obligations.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">5. Data Retention & Security</h2>
              <p>We retain your account and order information for as long as your account is active or as needed to provide services and meet legal obligations. We apply reasonable technical safeguards to protect your data, but no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">6. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at <a href={`mailto:${SITE.contact.email}`} className="text-primary hover:underline">{SITE.contact.email}</a>.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">7. Contact Us</h2>
              <p>For any privacy-related questions, reach us at <a href={`mailto:${SITE.contact.email}`} className="text-primary hover:underline">{SITE.contact.email}</a> or <a href={`tel:${SITE.contact.phone}`} className="text-primary hover:underline">{SITE.contact.phoneDisplay}</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale} dict={dict} />
    </div>
  );
}
