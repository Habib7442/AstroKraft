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
    { label: dict.nav.panchang, href: `/${locale}/panchang` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

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
              className="w-8 h-8 object-contain rounded-md border-2 border-black group-hover:rotate-12 transition-all duration-300"
            />
            <span className="font-serif text-2xl font-black tracking-tight text-black flex items-baseline select-none">
              Astro<span className="text-black">Kraft</span>
              <span className="inline-flex items-center justify-center border-[1.2px] border-black rounded-full w-3.5 h-3.5 text-[7px] font-black font-sans ml-1 self-start mt-1.5 shrink-0">
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
                className="text-[14px] font-extrabold text-black hover:text-black/85 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-200"
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
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-black bg-white text-black text-xs font-bold hover:bg-neutral-50 transition-colors shadow-[2px_2px_0px_#000]"
                aria-label="Select Language"
              >
                <span>{LOCALE_LABEL[locale as Locale] || "Language"}</span>
                <ChevronDown className="w-3 h-3 text-black" />
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_#000] py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer font-bold",
                      locale === loc ? "text-black font-black bg-primary/20" : "text-black"
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
              className="bg-black hover:bg-neutral-900 text-white border-2 border-black font-bold px-5 rounded-full text-xs cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all"
              asChild
            >
              <a href={`/${locale}/astrologers`}>
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-white" />
                {dict.common.whatsapp_cta}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - Simplified to Hamburger ONLY */}
          <div className="flex lg:hidden items-center gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-1.5 rounded-md border-2 border-black text-black bg-white shadow-[2px_2px_0px_#000] hover:bg-neutral-50 transition-colors cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#FFF9E6] border-l-2 border-black flex flex-col p-6 w-[280px] sm:w-[320px]">
                <SheetHeader className="text-left px-0 pb-4 border-b-2 border-black">
                  <SheetTitle className="font-serif text-2xl font-black tracking-tight text-black flex items-baseline select-none">
                    Astro<span className="text-black">Kraft</span>
                    <span className="inline-flex items-center justify-center border-[1.2px] border-black rounded-full w-3.5 h-3.5 text-[7px] font-black font-sans ml-1 self-start mt-1.5 shrink-0">
                      TM
                    </span>
                  </SheetTitle>
                  <SheetDescription className="text-xs text-black font-bold uppercase tracking-wider">
                    Vedic Guidance & Certified Remedies
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Links inside Drawer */}
                <nav className="flex flex-col gap-4 mt-6">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-black text-black pb-2 border-b-2 border-black/10 hover:border-black transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Settings & Language inside Drawer */}
                <div className="flex flex-col gap-6 mt-8 pt-6 border-t-2 border-black/10">
                  {/* Language Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-black">
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
                            "px-2 py-1.5 rounded-full border-2 border-black text-center text-xs font-bold transition-all cursor-pointer shadow-[1px_1px_0px_#000] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none",
                            locale === loc
                              ? "bg-white text-black font-black"
                              : "bg-[#FFD166] text-black hover:bg-white/50"
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
                    className="w-full bg-black hover:bg-neutral-900 text-white border-2 border-black font-bold rounded-full h-11 text-sm flex items-center justify-center cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a href={`/${locale}/astrologers`}>
                      <MessageCircle className="w-4 h-4 mr-2 text-white" />
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
