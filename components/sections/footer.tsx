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
    <footer className="relative w-full bg-background border-t border-gold/30 pt-16 pb-8 font-sans overflow-hidden">
      {/* Premium background glows to match the observatory theme */}
      <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full bg-gold/5 blur-[90px] pointer-events-none -z-10" />

      {/* Subtle background star decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_10px,#ECD9A0_15%,transparent_15%)] bg-[size:32px_32px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href={`/${locale}`} className="flex items-center gap-2.5 self-start group select-none">
              <img
                src="/logo.svg"
                alt="AstroKraft Logo"
                className="w-8 h-8 object-contain rounded-md border border-gold/30 group-hover:border-gold/60 group-hover:rotate-12 transition-all duration-300"
              />
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground group-hover:text-gold transition-colors">
                Astro<span className="text-gold">Kraft</span>
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {dict.footer?.desc || "AstroKraft is India's trusted platform for Vedic Astrology, certified gemstones, and divine rituals. Empowering your life journey with ancient wisdom and modern precision."}
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{SITE.contact.address.region}, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href={`tel:${SITE.contact.phone}`} className="hover:text-foreground transition-colors">
                  {SITE.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-foreground transition-colors">
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
                className="w-9 h-9 rounded-full border border-border/60 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Facebook"
              >
                <img src="/social-icons/facebook.png" alt="Facebook" className="w-[18px] h-[18px] object-contain" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Instagram"
              >
                <img src="/social-icons/instagram.png" alt="Instagram" className="w-[18px] h-[18px] object-contain" />
              </a>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-[18px] h-[18px] object-contain" />
              </a>
            </div>
          </div>

          {/* Services Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              {dict.footer?.services_heading || "Services"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              {dict.footer?.tools_heading || "Free Tools"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {toolsLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Company Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              {dict.footer?.company_heading || "Company"}
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {SITE.name}. {dict.footer?.copyright || "All rights reserved."}
          </div>
          <div className="flex items-center gap-2">
            <span>{dict.footer?.devotion || "Made with devotion in India ✦"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
