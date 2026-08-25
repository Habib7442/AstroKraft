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
  en: {
    title: "Terms of Service",
    updated: "Last updated: August 2026",
    description: `The terms and conditions governing use of ${SITE.name}'s free tools, astrologer consultations, and gemstone store.`,
  },
  hin: {
    title: "सेवा की शर्तें",
    updated: "अंतिम अद्यतन: अगस्त 2026",
    description: `${SITE.name} के निःशुल्क उपकरणों, ज्योतिषी परामर्श और रत्न स्टोर के उपयोग को नियंत्रित करने वाली नियम एवं शर्तें।`,
  },
  bn: {
    title: "পরিষেবার শর্তাবলী",
    updated: "সর্বশেষ আপডেট: আগস্ট ২০২৬",
    description: `${SITE.name}-এর বিনামূল্যে সরঞ্জাম, জ্যোতিষী পরামর্শ এবং রত্ন স্টোর ব্যবহারের নিয়ন্ত্রক শর্তাবলী।`,
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = heading[locale as keyof typeof heading] || heading.en;

  return constructMetadata({
    title: t.title,
    description: t.description,
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({ params }: { params: Promise<PageParams> }) {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black mb-2">{t.title}</h1>
          <p className="text-xs text-neutral-500 font-medium mb-10">{t.updated}</p>

          <div className="space-y-8 text-sm text-neutral-700 font-medium leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using {SITE.name} ({SITE.url.replace("/en", "")}), you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">2. Our Services</h2>
              <p>{SITE.name} provides free Vedic astrology tools (Kundli, Kundli Matching, Panchang, and related calculators), paid consultations with independent astrologers, purohit booking, Vastu consultation, and a certified gemstone store. Astrological readings, remedies, and predictions are offered for guidance and entertainment purposes and do not substitute professional medical, legal, or financial advice.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">3. Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must provide accurate information when registering or booking a service.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">4. Astrologers &amp; Consultations</h2>
              <p>Astrologers listed on {SITE.name} are independent practitioners. Consultation fees are shown transparently before booking. We facilitate the connection between you and the astrologer; the content and advice of any consultation is the astrologer&apos;s own.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">5. Orders, Payments &amp; Refunds</h2>
              <p>All gemstone and product prices are listed in Indian Rupees (INR) and processed through our payment partner. Orders are confirmed only after successful payment. Cancellation and refund requests are handled on a case-by-case basis — contact us at <a href={`mailto:${SITE.contact.email}`} className="text-primary hover:underline">{SITE.contact.email}</a> as soon as possible with your order details.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">6. Limitation of Liability</h2>
              <p>{SITE.name} is not liable for outcomes, decisions, or actions taken based on astrological readings, remedies, or gemstone recommendations. Services are provided &quot;as is&quot; without warranties of any kind.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">7. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts of Assam, India.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-black mb-2">8. Contact Us</h2>
              <p>Questions about these terms can be sent to <a href={`mailto:${SITE.contact.email}`} className="text-primary hover:underline">{SITE.contact.email}</a> or <a href={`tel:${SITE.contact.phone}`} className="text-primary hover:underline">{SITE.contact.phoneDisplay}</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale} dict={dict} />
    </div>
  );
}
