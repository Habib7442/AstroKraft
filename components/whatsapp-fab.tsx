"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function WhatsAppFab() {
  const pathname = usePathname() || "";
  
  // Extract locale from path
  const segments = pathname.split("/");
  const locale = segments[1] || "en";
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const getPrefilledMessage = () => {
    if (activeLocale === "hin") {
      return "नमस्ते एस्ट्रोक्राफ्ट! मैं एक विशेषज्ञ ज्योतिषी से परामर्श करना चाहता हूं।";
    }
    if (activeLocale === "bn") {
      return "হ্যালো অ্যাস্ট্রোক্রাফট! আমি একজন অভিজ্ঞ জ্যোতিষীর সাথে পরামর্শ করতে চাই।";
    }
    return "Hello AstroKraft! I would like to consult an expert astrologer.";
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=916913230255&text=${encodeURIComponent(
    getPrefilledMessage()
  )}&type=phone_number&app_absent=0`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border border-white/20"
      aria-label="Chat on WhatsApp"
    >
      {/* Dynamic green glow rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none group-hover:animate-none" />
      
      <img
        src="/social-icons/whatsapp.png"
        alt="WhatsApp"
        className="w-7 h-7 object-contain select-none transition-transform duration-300 group-hover:rotate-12"
      />
    </a>
  );
}
