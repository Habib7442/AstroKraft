"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronDown, LogOut, User as UserIcon, ShoppingCart, Globe, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useCMSStore } from "@/lib/store/useCMSStore";
import { urlFor } from "@/sanity/lib/image";
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
  const banners = useCMSStore((state) => state.banners);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, checkSession, logout } = useAuthStore();
  const [cartCount, setCartCount] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // Auto-slide effect
  useEffect(() => {
    if (!banners || banners.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // slide every 4 seconds
    return () => clearInterval(interval);
  }, [banners?.length, isHovered]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  useEffect(() => {
    setMounted(true);
    checkSession();
    // Load cart count from localStorage if available
    try {
      const savedCart = localStorage.getItem("astrokraft-cart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartCount(items.length || 0);
      }
    } catch (e) {
      console.error(e);
    }
  }, [checkSession]);

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}`);
  };

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (LOCALES.includes(segments[0] as any)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = "/" + segments.join("/");
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${newPath}${search}${hash}`);
  };

  const navItems = [
    { label: dict.nav.gemstones || "Gemstones", href: `/${locale}/gemstones` },
    { label: "Rudraksha", href: `/${locale}/gemstones?category=rudraksha` },
    { label: dict.nav.free_tools || "Free Tools", href: `/${locale}/tools` },
    { label: dict.nav.astrologers || "Astrologers", href: `/${locale}/astrologers` },
    { label: dict.nav.blog || "Blog", href: `/${locale}/blog` },
  ];

  return (
    <>
      <header className="w-full bg-[#120d26] text-white sticky top-0 z-50 select-none shadow-md border-b border-white/5">
        {/* Top Main Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left Side: Brand Logo */}
          <a href={`/${locale}`} className="flex items-center gap-1.5 shrink-0">
            <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-white flex items-baseline">
              Astro<span className="text-[#E2C27A]">Kraft</span>
              <span className="inline-flex items-center justify-center border border-white/30 rounded-full w-3 h-3 text-[6px] font-black font-sans ml-0.5 mt-1 self-start shrink-0 text-white/70">
                TM
              </span>
            </span>
            <img
              src="/assets/zodiac_wheel.png?v=20260610"
              alt="Chakra"
              className="w-5.5 h-5.5 object-contain rounded-full animate-spin-slow shrink-0 ml-1"
              draggable={false}
            />
          </a>

          {/* Right Side Options */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            {/* Language Switcher */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1 text-xs font-black text-white/90 hover:text-white transition-colors cursor-pointer select-none">
                <Globe className="w-3.5 h-3.5" />
                <span>{LOCALE_LABEL[locale as Locale] || "Language"}</span>
                <ChevronDown className="w-3 h-3 text-white/60" />
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-32 border border-white/10 rounded-xl py-1 bg-[#1A1530] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 shadow-lg">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer font-bold",
                      locale === loc ? "text-[#E2C27A] bg-[#E2C27A]/10" : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {LOCALE_LABEL[loc]}
                  </button>
                ))}
              </div>
            </div>

            {/* Account / Sign In */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1 text-xs font-black hover:text-[#E2C27A] transition-colors cursor-pointer select-none"
                  >
                    <UserIcon className="w-4 h-4 shrink-0" />
                    <span className="max-w-[80px] truncate">{user.name || "Account"}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-45" onClick={() => setProfileDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-52 border border-white/10 rounded-2xl p-4 bg-[#1A1530] text-white shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="pb-2 border-b border-white/10 mb-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Account Profile</p>
                          <p className="text-sm font-black truncate mt-1">{user.name || "Astro User"}</p>
                          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left py-2 px-2.5 text-xs font-bold rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <a 
                  href={`/${locale}/sign-in`} 
                  className="text-xs font-black uppercase tracking-wider hover:text-[#E2C27A] transition-colors cursor-pointer select-none"
                >
                  Sign In
                </a>
              )}
            </div>

            {/* Cart Icon with Gold Badge */}
            <a href={`/${locale}/cart`} className="flex items-center gap-1.5 relative cursor-pointer select-none group">
              <div className="relative">
                <ShoppingCart className="w-6.5 h-6.5 text-white group-hover:text-[#E2C27A] transition-colors" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#E2C27A] text-black text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold self-end hidden sm:block">Cart</span>
            </a>

            {/* Mobile Hamburguer Menu Button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-1 text-white hover:text-[#E2C27A] transition-colors cursor-pointer">
                    <Menu className="w-6.5 h-6.5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#120d26] border-l border-white/10 flex flex-col p-6 w-[280px] sm:w-[320px] text-white">
                  <SheetHeader className="text-left px-0 pb-4 border-b border-white/10">
                    <SheetTitle className="font-serif text-2xl font-black tracking-tight text-white flex items-baseline select-none">
                      Astro<span className="text-[#E2C27A]">Kraft</span>
                      <span className="inline-flex items-center justify-center border border-white/30 rounded-full w-3.5 h-3.5 text-[7px] font-black font-sans ml-1 self-start mt-1.5 shrink-0 text-white/70">
                        TM
                      </span>
                    </SheetTitle>
                    <SheetDescription className="text-xs text-white/60 font-bold uppercase tracking-wider">
                      Vedic Guidance & Certified Remedies
                    </SheetDescription>
                  </SheetHeader>

                  <nav className="flex flex-col gap-4 mt-6">
                    {navItems.map((item, idx) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-base font-bold text-white/90 pb-2 hover:text-[#E2C27A] transition-colors",
                          idx !== navItems.length - 1 && "border-b border-white/5"
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile settings inside Sheet */}
                  <div className="flex flex-col gap-6 mt-8 pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Select Language
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
                                ? "bg-[#E2C27A] text-black border-[#E2C27A]"
                                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                            )}
                          >
                            {LOCALE_LABEL[loc]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Scrolling Navigation Bar */}
        <div className="w-full bg-[#1e1639] border-t border-white/5 py-1.5 overflow-x-auto scrollbar-none px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-5 w-max md:w-full md:px-2">


            {/* Mapped Categories */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold text-white/95 hover:text-[#E2C27A] transition-colors shrink-0 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Banner Carousel - Displayed on Homepage under Header, Non-Sticky */}
      {isHomePage && banners && banners.length > 0 && (
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full bg-[#120d26] border-b border-[#E2C27A]/20 relative group/carousel overflow-hidden h-[130px] sm:h-[200px] md:h-[270px] lg:h-[340px] select-none"
        >
          {/* Slides wrapper */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner: any, index: number) => {
              const bannerImg = banner.image ? urlFor(banner.image).width(1200).auto('format').url() : "";
              const slideContent = (
                <div className="w-full h-full relative">
                  {bannerImg ? (
                    <img 
                      src={bannerImg} 
                      alt={banner.title || "Promotional Banner"} 
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#120d26] to-[#2A1A5E] text-white">
                      <span className="text-sm font-bold tracking-wider uppercase">{banner.title}</span>
                    </div>
                  )}

                </div>
              );

              if (banner.link) {
                const isExternal = banner.link.startsWith("http");
                return (
                  <a
                    key={banner._id || index}
                    href={banner.link}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="w-full h-full shrink-0 block cursor-pointer"
                  >
                    {slideContent}
                  </a>
                );
              }

              return (
                <div key={banner._id || index} className="w-full h-full shrink-0">
                  {slideContent}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows (Only show if multiple banners) */}
          {banners.length > 1 && (
            <>
              <button 
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#E2C27A] hover:text-black text-white border border-white/10 hover:border-transparent transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 z-10 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#E2C27A] hover:text-black text-white border border-white/10 hover:border-transparent transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 z-10 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {banners.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    currentSlide === idx ? "bg-[#E2C27A] w-4.5" : "bg-white/40 hover:bg-white/70"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
