"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { SITE, type Locale } from "@/lib/seo";

interface FooterProps {
  locale: string;
  dict: any;
}

export function Footer({ locale, dict }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const servicesLinks = [
    { label: dict.services.astrologer.title, href: `/${locale}/astrologers` },
    { label: dict.services.gemstone.title, href: `/${locale}/gemstones` },
    { label: dict.nav.free_tools, href: `/${locale}/#free-tools` },
    { label: "Vastu Consultant", href: `/${locale}/vastu` },
  ];

  const toolsLinks = [
    { label: "Free Kundli / Birth Chart", href: `/${locale}/tools/kundli` },
    { label: "Kundli Matching (Guna Milan)", href: `/${locale}/tools/matching` },
    { label: "Daily Horoscope (Rashifol)", href: `/${locale}/tools/horoscope` },
    { label: "Today's Panchang", href: `/${locale}/tools/panchang` },
  ];

  const companyLinks = [
    { label: "About Us", href: `/${locale}/about` },
    { label: "Contact Us", href: `/${locale}/contact` },
    { label: "Privacy Policy", href: `/${locale}/privacy` },
    { label: "Terms of Service", href: `/${locale}/terms` },
  ];

  return (
    <footer className="relative w-full bg-background border-t border-gold/30 pt-16 pb-8 font-sans overflow-hidden">
      {/* Subtle background star decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_10px,#ECD9A0_15%,transparent_15%)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

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
              AstroKraft is India&apos;s trusted platform for Vedic Astrology, certified gemstones, and divine rituals. Empowering your life journey with ancient wisdom and modern precision.
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

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-4">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-secondary/40 transition-colors w-8 h-8 flex items-center justify-center" aria-label="Facebook">
                <img src="/social-icons/facebook.png" alt="Facebook" className="w-4 h-4 object-contain dark:invert" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-secondary/40 transition-colors w-8 h-8 flex items-center justify-center" aria-label="Instagram">
                <img src="/social-icons/instagram.png" alt="Instagram" className="w-4 h-4 object-contain dark:invert" />
              </a>
              <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-secondary/40 transition-colors w-8 h-8 flex items-center justify-center" aria-label="X (Twitter)">
                <img src="/social-icons/X.png" alt="X" className="w-3.5 h-3.5 object-contain dark:invert" />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-secondary/40 transition-colors w-8 h-8 flex items-center justify-center" aria-label="LinkedIn">
                <img src="/social-icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain dark:invert" />
              </a>
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-secondary/40 transition-colors w-8 h-8 flex items-center justify-center" aria-label="WhatsApp">
                <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain dark:invert" />
              </a>
            </div>

          </div>

          {/* Services Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              Services
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

          {/* Free Tools Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              Free Tools
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

          {/* Legal/Company Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
              Company
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

          {/* Newsletter (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Stay Inspired</span>
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Subscribe to get daily astrological predictions, auspicious dates, and exclusive gemstone offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="w-full bg-card border border-border text-foreground rounded-lg px-3 py-2 text-xs outline-none focus:border-gold/60 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-gold hover:text-gold/80 transition-colors"
                  aria-label="Submit Email"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-green-500 font-medium">
                  ✓ Successfully subscribed!
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Made with devotion in India ✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
