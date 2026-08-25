import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata, SITE } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

interface PageParams {
  locale: string;
}

const content = {
  en: {
    eyebrow: "Get in Touch",
    title: "Contact AstroKraft",
    subtitle: "Questions about a consultation, an order, or anything else? Reach us directly — we typically respond within 15 minutes on WhatsApp.",
    whatsappTitle: "WhatsApp",
    whatsappDesc: "Fastest way to reach us",
    phoneTitle: "Call Us",
    emailTitle: "Email",
    addressTitle: "Based In",
    addressBody: "Silchar, Cachar, Barak Valley, Assam, India",
    whatsappCta: "Chat on WhatsApp",
  },
  hin: {
    eyebrow: "संपर्क करें",
    title: "AstroKraft से संपर्क करें",
    subtitle: "परामर्श, ऑर्डर या किसी अन्य विषय पर प्रश्न हैं? सीधे हमसे संपर्क करें — हम आमतौर पर WhatsApp पर 15 मिनट के भीतर जवाब देते हैं।",
    whatsappTitle: "व्हाट्सएप",
    whatsappDesc: "हम तक पहुंचने का सबसे तेज़ तरीका",
    phoneTitle: "कॉल करें",
    emailTitle: "ईमेल",
    addressTitle: "स्थान",
    addressBody: "सिलचर, कछार, बराक घाटी, असम, भारत",
    whatsappCta: "व्हाट्सएप पर चैट करें",
  },
  bn: {
    eyebrow: "যোগাযোগ করুন",
    title: "AstroKraft-এর সাথে যোগাযোগ করুন",
    subtitle: "পরামর্শ, অর্ডার বা অন্য কিছু নিয়ে প্রশ্ন আছে? সরাসরি আমাদের সাথে যোগাযোগ করুন — আমরা সাধারণত WhatsApp-এ ১৫ মিনিটের মধ্যে সাড়া দিই।",
    whatsappTitle: "হোয়াটসঅ্যাপ",
    whatsappDesc: "আমাদের কাছে পৌঁছানোর দ্রুততম উপায়",
    phoneTitle: "কল করুন",
    emailTitle: "ইমেইল",
    addressTitle: "অবস্থান",
    addressBody: "শিলচর, কাছাড়, বরাক উপত্যকা, আসাম, ভারত",
    whatsappCta: "হোয়াটসঅ্যাপে চ্যাট করুন",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = content[locale as keyof typeof content] || content.en;

  return constructMetadata({
    title: t.title,
    description: t.subtitle,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF0] text-black overflow-x-hidden">
      <Header locale={locale} dict={dict} />

      <main className="flex-1 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b28b3a] mb-3">{t.eyebrow}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black mb-4">{t.title}</h1>
          <p className="text-base text-neutral-600 font-medium leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://wa.me/${SITE.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-all hover:-translate-y-0.5"
          >
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">{t.whatsappTitle}</p>
              <p className="text-xs text-white/80">{t.whatsappDesc} — {SITE.contact.phoneDisplay}</p>
            </div>
          </a>

          <a
            href={`tel:${SITE.contact.phone}`}
            className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-all hover:-translate-y-0.5"
          >
            <div className="w-11 h-11 rounded-full bg-[#FFF9E6] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#E2C27A]" />
            </div>
            <div>
              <p className="font-bold text-sm text-black">{t.phoneTitle}</p>
              <p className="text-xs text-neutral-500">{SITE.contact.phoneDisplay}</p>
            </div>
          </a>

          <a
            href={`mailto:${SITE.contact.email}`}
            className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-all hover:-translate-y-0.5"
          >
            <div className="w-11 h-11 rounded-full bg-[#FFF9E6] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#E2C27A]" />
            </div>
            <div>
              <p className="font-bold text-sm text-black">{t.emailTitle}</p>
              <p className="text-xs text-neutral-500">{SITE.contact.email}</p>
            </div>
          </a>

          <div className="sm:col-span-2 bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#FFF9E6] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#E2C27A]" />
            </div>
            <div>
              <p className="font-bold text-sm text-black">{t.addressTitle}</p>
              <p className="text-xs text-neutral-500">{t.addressBody}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} dict={dict} />
    </div>
  );
}
