"use client";

import React from "react";
import { Users, Award, ShieldCheck, Lock, Truck, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhyChooseProps {
  locale: string;
}

export function WhyChoose({ locale }: WhyChooseProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const content = {
    en: {
      title: "WHY CHOOSE ASTROKRAFT?",
      items: [
        {
          icon: Users,
          value: "10000+",
          label: "Consultations"
        },
        {
          icon: Award,
          value: "15+",
          label: "Expert Astrologers"
        },
        {
          icon: ShieldCheck,
          value: "100%",
          label: "Authentic & Certified"
        },
        {
          icon: Lock,
          value: "Secure",
          label: "Payment"
        },
        {
          icon: Truck,
          value: "Fast & Free",
          label: "Delivery"
        },
        {
          icon: Headphones,
          value: "24/7",
          label: "Customer Support"
        }
      ]
    },
    hin: {
      title: "एस्ट्रोक्राफ्ट क्यों चुनें?",
      items: [
        {
          icon: Users,
          value: "10000+",
          label: "संतुष्ट परामर्श"
        },
        {
          icon: Award,
          value: "15+",
          label: "विशेषज्ञ ज्योतिषी"
        },
        {
          icon: ShieldCheck,
          value: "100%",
          label: "प्रामाणिक और प्रमाणित"
        },
        {
          icon: Lock,
          value: "सुरक्षित",
          label: "भुगतान"
        },
        {
          icon: Truck,
          value: "तेज़ और मुफ़्त",
          label: "डिलीवरी"
        },
        {
          icon: Headphones,
          value: "24/7",
          label: "ग्राहक सहायता"
        }
      ]
    },
    bn: {
      title: "কেন অ্যাস্ট্রোক্রাফট বেছে নেবেন?",
      items: [
        {
          icon: Users,
          value: "10000+",
          label: "পরামর্শ"
        },
        {
          icon: Award,
          value: "15+",
          label: "বিশেষজ্ঞ জ্যোতিষী"
        },
        {
          icon: ShieldCheck,
          value: "100%",
          label: "খাঁটি এবং প্রত্যয়িত"
        },
        {
          icon: Lock,
          value: "সুরক্ষিত",
          label: "পেমেন্ট"
        },
        {
          icon: Truck,
          value: "দ্রুত ও ফ্রি",
          label: "ডেলিভারি"
        },
        {
          icon: Headphones,
          value: "24/7",
          label: "গ্রাহক সহায়তা"
        }
      ]
    }
  };

  const currentData = content[activeLocale as keyof typeof content] || content.en;

  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-16 bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-[#120B24] border border-[#ECD9A0]/20 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle star overlay inside card */}
          <div className="absolute inset-0 bg-stars-pattern opacity-10 pointer-events-none" />
          
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <h2 className="text-[#ECD9A0] font-sans text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] mb-3">
              {currentData.title}
            </h2>
            
            {/* Elegant Vedic divider line */}
            <div className="flex items-center justify-center w-full max-w-[200px] opacity-60">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ECD9A0] to-transparent" />
              <div className="w-2 h-2 rotate-45 border border-[#ECD9A0] bg-[#120B24] mx-2 flex-shrink-0" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ECD9A0] to-transparent" />
            </div>
          </div>

          {/* Grid list of why choose items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 lg:gap-2">
            {currentData.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "flex flex-col items-center text-center p-4 relative group",
                    // Add vertical divider on desktop screen sizes between elements
                    idx !== 0 && "lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/4 lg:before:h-1/2 lg:before:w-[1px] lg:before:bg-gradient-to-b lg:before:from-transparent lg:before:via-[#ECD9A0]/20 lg:before:to-transparent"
                  )}
                >
                  {/* Icon with hover glow */}
                  <div className="relative mb-4 flex items-center justify-center w-12 h-12 rounded-full border border-[#ECD9A0]/10 bg-white/5 transition-all duration-300 group-hover:border-[#ECD9A0]/50 group-hover:scale-105">
                    <IconComponent className="w-6 h-6 text-[#ECD9A0] stroke-[1.5]" />
                  </div>

                  {/* Value */}
                  <div className="font-sans text-lg sm:text-xl font-extrabold text-[#ECD9A0] leading-none mb-1">
                    {item.value}
                  </div>

                  {/* Label */}
                  <div className="font-sans text-xs text-zinc-300 font-medium leading-tight">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
