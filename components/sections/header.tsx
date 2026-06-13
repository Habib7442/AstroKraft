"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, MessageCircle, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  locale: string;
  dict: any;
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (LOCALES.includes(segments[0] as any)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = "/" + segments.join("/");

    // Safely capture query parameters and hash on the client side
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    router.push(`${newPath}${search}${hash}`);
  };

  const navItems = [
    { label: dict.nav.astrologers, href: `/${locale}/astrologers` },
    { label: dict.nav.gemstones, href: `/${locale}/gemstones` },
    { label: dict.nav.free_tools, href: `/${locale}/tools` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

  const isHomePage = pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;
  const isGemstonesPage = pathname.endsWith("/gemstones") || pathname.endsWith("/gemstones/");
  const useDarkHeader = isHomePage || isGemstonesPage;

  return (
    <>
      {/* Main Sticky Header */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2.5 group select-none">
            <img
              src="/logo.svg"
              alt="AstroKraft Logo"
              className={cn(
                "w-8 h-8 object-contain rounded-md border group-hover:rotate-12 transition-all duration-300",
                useDarkHeader ? "border-[#E2C27A]/30" : "border-zinc-200"
              )}
            />
            <span className={cn(
              "font-serif text-2xl font-black tracking-tight flex items-baseline select-none transition-colors",
              useDarkHeader ? "text-white" : "text-black"
            )}>
              Astro<span className={useDarkHeader ? "text-[#E2C27A]" : "text-primary"}>Kraft</span>
              <span className={cn(
                "inline-flex items-center justify-center border rounded-full w-3.5 h-3.5 text-[7px] font-black font-sans ml-1 self-start mt-1.5 shrink-0 transition-colors",
                useDarkHeader ? "border-[#E2C27A]/40 text-[#E2C27A]" : "border-zinc-300 text-zinc-500"
              )}>
                TM
              </span>
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-[14px] font-extrabold transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-200",
                  useDarkHeader
                    ? "text-white/95 hover:text-[#E2C27A] after:bg-[#E2C27A]"
                    : "text-black/80 hover:text-primary after:bg-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Language selector, theme switcher, CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Dropdown Selector */}
            <div className="relative group">
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 select-none cursor-pointer shadow-sm",
                  useDarkHeader
                    ? "border-[#E2C27A]/40 bg-white/10 text-white hover:bg-white/20"
                    : "border-zinc-200 bg-white text-black hover:bg-neutral-50"
                )}
                aria-label="Select Language"
              >
                <span>{LOCALE_LABEL[locale as Locale] || "Language"}</span>
                <ChevronDown className={cn("w-3 h-3 transition-colors", useDarkHeader ? "text-[#E2C27A]" : "text-zinc-500")} />
              </button>
              <div className={cn(
                "absolute right-0 top-full mt-1.5 w-32 border rounded-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 shadow-lg",
                useDarkHeader
                  ? "bg-[#1A1530] border-[#E2C27A]/30"
                  : "bg-white border-zinc-100"
              )}>
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer font-bold",
                      useDarkHeader
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-black/80 hover:bg-neutral-50 hover:text-primary",
                      locale === loc
                        ? useDarkHeader
                          ? "text-[#E2C27A] font-black bg-[#E2C27A]/20"
                          : "text-primary font-black bg-primary/10"
                        : useDarkHeader
                          ? "text-white/80"
                          : "text-black/70"
                    )}
                  >
                    {LOCALE_LABEL[loc]}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <Button
              variant="default"
              size="lg"
              className={cn(
                "font-bold px-5 rounded-full text-xs cursor-pointer transition-all duration-200 shadow-sm border-0",
                useDarkHeader
                  ? "bg-[#E2C27A] hover:bg-[#E2C27A]/90 text-black"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
              asChild
            >
              <a href={`/${locale}/astrologers`}>
                <MessageCircle className={cn("w-3.5 h-3.5 mr-1.5", useDarkHeader ? "text-black" : "text-primary-foreground")} />
                {dict.common.whatsapp_cta}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - Simplified to Hamburger ONLY */}
          <div className="flex lg:hidden items-center gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "p-1.5 rounded-md border transition-all duration-200 cursor-pointer shadow-sm",
                    useDarkHeader
                      ? "border-white/20 text-white bg-white/10 hover:bg-white/20"
                      : "border-zinc-200 text-black bg-white hover:bg-neutral-50"
                  )}
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-zinc-200 flex flex-col p-6 w-[280px] sm:w-[320px]">
                <SheetHeader className="text-left px-0 pb-4 border-b border-zinc-100">
                  <SheetTitle className="font-serif text-2xl font-black tracking-tight text-black flex items-baseline select-none">
                    Astro<span className="text-primary">Kraft</span>
                    <span className="inline-flex items-center justify-center border border-zinc-300 rounded-full w-3.5 h-3.5 text-[7px] font-black font-sans ml-1 self-start mt-1.5 shrink-0 text-zinc-500">
                      TM
                    </span>
                  </SheetTitle>
                  <SheetDescription className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                    Vedic Guidance & Certified Remedies
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Links inside Drawer */}
                <nav className="flex flex-col gap-4 mt-6">
                  {navItems.map((item, idx) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-base font-bold text-zinc-800 pb-2 hover:text-primary hover:border-primary/30 transition-colors",
                        idx !== navItems.length - 1 && "border-b border-zinc-100"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Settings & Language inside Drawer */}
                <div className="flex flex-col gap-6 mt-8 pt-6 border-t border-zinc-100">
                  {/* Language Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      {locale === "hin" ? "भाषा चुनें" : locale === "bn" ? "ভাষা নির্বাচন করুন" : "Select Language"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {LOCALES.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            handleLocaleChange(loc);
                            setMobileMenuOpen(false);
                          }}
                          className={cn(
                            "px-2 py-1.5 rounded-full border text-center text-xs font-bold transition-all cursor-pointer shadow-sm",
                            locale === loc
                              ? "bg-primary text-primary-foreground border-primary font-bold"
                              : "bg-white text-black border-zinc-200 hover:bg-neutral-50"
                          )}
                        >
                          {LOCALE_LABEL[loc]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action CTA */}
                <div className="mt-auto pt-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 font-bold rounded-full h-11 text-sm flex items-center justify-center cursor-pointer shadow-sm active:translate-y-[1px] transition-all"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a href={`/${locale}/astrologers`}>
                      <MessageCircle className="w-4 h-4 mr-2 text-primary-foreground" />
                      {dict.common.whatsapp_cta}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
