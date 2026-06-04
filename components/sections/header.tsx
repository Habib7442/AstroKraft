"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Phone, MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import { LOCALES, LOCALE_LABEL, SITE, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  locale: string;
  dict: any;
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    // pathname can be like "/en", "/en/astrologers", or just "/"
    if (segments.length > 1 && LOCALES.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      // In case path is "/" or doesn't have locale
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  const navItems = [
    { label: dict.nav.astrologers, href: `/${locale}/astrologers` },
    { label: dict.nav.gemstones, href: `/${locale}/gemstones` },
    { label: dict.nav.free_tools, href: `/${locale}/#free-tools` },
    { label: dict.nav.panchang, href: `/${locale}/panchang` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

  return (
    <>
      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2.5 group select-none">
            <img
              src="/logo.svg"
              alt="AstroKraft Logo"
              className="w-8 h-8 object-contain rounded-md border border-gold/30 group-hover:border-gold/60 group-hover:rotate-12 transition-all duration-300"
            />
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground group-hover:text-gold transition-colors">
              Astro<span className="text-gold">Kraft</span>
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Language selector, theme switcher, CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Dropdown Selector */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-card text-foreground text-xs font-medium hover:border-gold/50 transition-colors"
                aria-label="Select Language"
              >
                <span>{LOCALE_LABEL[locale as Locale] || "Language"}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-gold transition-colors" />
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-card border border-border rounded-lg shadow-lg py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-secondary hover:text-secondary-foreground transition-colors",
                      locale === loc ? "text-gold font-semibold bg-secondary/30" : "text-foreground"
                    )}
                  >
                    {LOCALE_LABEL[loc]}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Primary Action Button */}
            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-5 rounded-full text-xs"
              asChild
            >
              <a href={`/${locale}/astrologers`}>
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                {dict.common.whatsapp_cta}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Language Selector (mobile simplified) */}
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="bg-card text-foreground border border-border rounded-md text-xs py-1 px-1.5 font-medium outline-none focus:border-gold"
              aria-label="Select Language"
            >
              {LOCALES.map((loc) => (
                <option key={loc} value={loc}>
                  {LOCALE_LABEL[loc]}
                </option>
              ))}
            </select>

            {/* Theme Switcher (mobile) */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-full border border-border text-muted-foreground hover:text-gold transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md border border-border text-foreground hover:border-gold/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] z-40 bg-background/95 backdrop-blur-md flex flex-col border-b border-border">
          <nav className="flex flex-col p-6 gap-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground border-b border-border/50 pb-2 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-full mt-4 h-12 text-sm"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href={`/${locale}/astrologers`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                {dict.common.whatsapp_cta}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
