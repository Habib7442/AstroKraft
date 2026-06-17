"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/seo";

interface FooterProps {
  locale: string;
  dict: any;
}

export function Footer({ locale, dict }: FooterProps) {
  const servicesLinks = [
    { label: dict.services.astrologer.title, href: `/${locale}/astrologers` },
    { label: dict.services.gemstone.title, href: `/${locale}/gemstones` },
    { label: dict.nav.free_tools, href: `/${locale}/tools` },
    { label: dict.footer?.vastu_consultant || "Vastu Consultant", href: `/${locale}/vastu` },
  ];

  const toolsLinks = [
    { label: dict.footer?.free_kundli || "Free Kundli / Birth Chart", href: `/${locale}/tools/kundli` },
    { label: dict.footer?.kundli_matching || "Kundli Matching (Guna Milan)", href: `/${locale}/tools/matching` },
    { label: dict.footer?.daily_horoscope || "Daily Horoscope (Rashifol)", href: `/${locale}/tools/horoscope` },
    { label: dict.footer?.todays_panchang || "Today's Panchang", href: `/${locale}/tools/panchang` },
  ];

  const companyLinks = [
    { label: dict.footer?.about_us || "About Us", href: `/${locale}/about` },
    { label: dict.footer?.contact_us || "Contact Us", href: `/${locale}/contact` },
    { label: dict.footer?.privacy_policy || "Privacy Policy", href: `/${locale}/privacy` },
    { label: dict.footer?.terms_of_service || "Terms of Service", href: `/${locale}/terms` },
  ];

  return (
    <footer
      className="relative w-full border-t border-[#E2C27A]/20 pt-16 pb-8 font-sans overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1026, #2A1A5E, #4C1D95)'
      }}
    >
      {/* Decorative background glows */}
      <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full bg-amber-250/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full bg-purple-250/5 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href={`/${locale}`} className="flex items-center gap-2.5 self-start group select-none">
              <img
                src="/logo.svg"
                alt="AstroKraft Logo"
                className="w-8 h-8 object-contain rounded-md border border-white/20 shadow-sm group-hover:rotate-12 transition-all duration-300"
              />
              <span className="font-serif text-2xl font-black tracking-tight text-white flex items-baseline">
                Astro<span className="text-[#E2C27A]">Kraft</span>
                <span className="inline-flex items-center justify-center border border-white/40 rounded-full w-3.5 h-3.5 text-[7px] font-semibold font-sans ml-1 self-start mt-1.5 shrink-0 text-zinc-300">
                  TM
                </span>
              </span>
            </a>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed max-w-sm">
              {dict.footer?.desc || "AstroKraft is India's trusted platform for Vedic Astrology, certified gemstones, and divine rituals. Empowering your life journey with ancient wisdom and modern precision."}
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E2C27A] stroke-[1.8px] shrink-0" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E2C27A] stroke-[1.8px] shrink-0" />
                <a href={`tel:${SITE.contact.phone}`} className="hover:text-[#E2C27A] transition-colors font-bold text-zinc-200">
                  {SITE.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E2C27A] stroke-[1.8px] shrink-0" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-[#E2C27A] transition-colors font-bold text-zinc-200">
                  {SITE.contact.email}
                </a>
              </div>
            </div>

            {/* Social Icons with brand-aligned hover transitions */}
            <div className="flex items-center gap-3.5 mt-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="Facebook"
              >
                <img src="/social-icons/facebook.png" alt="Facebook" className="w-[18px] h-[18px] object-contain" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="Instagram"
              >
                <img src="/social-icons/instagram.png" alt="Instagram" className="w-[18px] h-[18px] object-contain" />
              </a>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="WhatsApp"
              >
                <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-[18px] h-[18px] object-contain" />
              </a>
            </div>
          </div>

          {/* Services Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-white uppercase">
              {dict.footer?.services_heading || "Services"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-300 hover:text-[#E2C27A] transition-colors hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-white uppercase">
              {dict.footer?.tools_heading || "Free Tools"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {toolsLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-300 hover:text-[#E2C27A] transition-colors hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Company Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-white uppercase">
              {dict.footer?.company_heading || "Company"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-300 hover:text-[#E2C27A] transition-colors hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-zinc-300 font-medium">
          <div>
            © {new Date().getFullYear()} {SITE.name}. {dict.footer?.copyright || "All rights reserved."}
          </div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span>{dict.footer?.devotion || "Made with devotion in India ✦"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
