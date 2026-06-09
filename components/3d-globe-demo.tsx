"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { X, Star, MessageCircle, Globe, Award, MapPin, Loader2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGlobeStore } from "@/lib/store/useGlobeStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";

// ============================================================================
// Multi-lingual Astrologer Data
// ============================================================================

interface AstrologerInfo {
  name: string;
  specialty: Record<string, string>;
  description: Record<string, string>;
  experience: number;
  rating: number;
  reviews: number;
  languages: Record<string, string[]>;
  address: Record<string, string>;
  phone: string;
  email: string;
  fee: number;
  status: "online" | "busy";
  src: string;
}

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, AstrologerInfo>;

const cardColors: Record<string, string> = {
  biprangshu_bhattacharjee: "bg-[#FFF9E6]",
  acharya_bhakta_vedanta: "bg-[#E5D5FF]",
  acharya_sneha: "bg-[#FFD0C8]",
  acharya_abhi_shastri: "bg-[#FEF08A]",
  astrologer_indrajit_dutta: "bg-[#C6F6D5]",
  rishi_acharya: "bg-[#E0F2FE]"
};

const srcToKeyMap: Record<string, string> = {
  "/assets/astrologers/acharya_abhi_shastri.webp": "acharya_abhi_shastri",
  "/assets/astrologers/acharya_sneha.webp": "acharya_sneha",
  "/assets/astrologers/acharya_bhakta_vedanta.webp": "acharya_bhakta_vedanta",
  "/assets/astrologers/astrologer_indrajit_dutta.webp": "astrologer_indrajit_dutta",
  "/assets/astrologers/rishi_acharya.webp": "rishi_acharya",
  "/assets/astrologers/biprangshu_bhattacharjee.webp": "biprangshu_bhattacharjee"
};

// ============================================================================
// Globe Markers distributed globally across 6 continents to prevent overlaps
// ============================================================================

const sampleMarkers: GlobeMarker[] = [
  {
    lat: -33.9249,
    lng: 18.4241,
    src: "/assets/astrologers/acharya_abhi_shastri.webp",
    label: "Acharya Abhi Shastri (India)"
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "/assets/astrologers/acharya_sneha.webp",
    label: "Acharya Sneha (India)"
  },
  {
    lat: 40.7128,
    lng: -74.0060,
    src: "/assets/astrologers/acharya_bhakta_vedanta.webp",
    label: "Acharya Bhakta Vedanta (India)"
  },
  {
    lat: -23.5505,
    lng: -46.6333,
    src: "/assets/astrologers/astrologer_indrajit_dutta.webp",
    label: "Astrologer Indrajit Dutta (India)"
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "/assets/astrologers/rishi_acharya.webp",
    label: "Rishi Acharya (India)"
  },
  {
    lat: 28.6139,
    lng: 77.2090,
    src: "/assets/astrologers/biprangshu_bhattacharjee.webp",
    label: "Biprangshu Bhattacharjee (India)"
  }
];

// Local UI Translations
const uiStrings: Record<string, Record<string, string>> = {
  online: {
    en: "Online",
    hin: "ऑनलाइन",
    bn: "অনলাইন"
  },
  busy: {
    en: "Busy",
    hin: "व्यस्त",
    bn: "ব্যস্ত"
  },
  exp: {
    en: "yrs exp",
    hin: "वर्ष अनुभव",
    bn: "বছর অভিজ্ঞতা"
  },
  consult_now: {
    en: "Talk to Astrologer",
    hin: "ज्योतिषी से बात करें",
    bn: "জ্যোতিষীর সাথে কথা বলুন"
  }
};

interface Globe3DDemoProps {
  className?: string;
  locale?: string;
}

export default function Globe3DDemo({ className, locale = "en" }: Globe3DDemoProps) {
  const { selectedKey, setSelectedKey } = useGlobeStore();
  const [mounted, setMounted] = useState(false);
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const astrologer = selectedKey ? ASTROLOGERS[selectedKey] : null;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Escape key and Focus Trap Accessibility handler
  useEffect(() => {
    if (!astrologer) return;

    const timer = setTimeout(() => {
      const modalElement = document.getElementById("astrologer-details-modal");
      if (!modalElement) return;

      const closeBtn = modalElement.querySelector("[aria-label='Close details']") as HTMLElement;
      if (closeBtn) {
        closeBtn.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedKey(null);
          return;
        }

        if (e.key === "Tab") {
          const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, 50);

    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      clearTimeout(timer);
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    };
  }, [astrologer, setSelectedKey]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
      duration: 3000,
    });
  };

  if (!mounted) {
    return (
      <div className={cn("relative w-full h-full flex flex-col justify-center items-center min-h-[500px]", className)}>
        {/* Pulsing Globe Skeleton */}
        <div className="relative flex items-center justify-center">
          <Skeleton className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-primary/5 border border-gold/15 animate-pulse flex items-center justify-center">
            {/* Inner rotating orbit skeleton */}
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-gold/10 animate-[spin_40s_linear_infinite]" />
          </Skeleton>
          <div className="absolute flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-mono animate-pulse">
              Initializing Universe...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const t = (key: string) => {
    return uiStrings[key]?.[activeLocale] || uiStrings[key]?.["en"] || key;
  };

  const handleMarkerClick = (marker: GlobeMarker) => {
    const key = srcToKeyMap[marker.src];
    if (key) {
      setSelectedKey(key);
    }
  };


  const renderModal = () => {
    if (!mounted || !astrologer) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={() => setSelectedKey(null)}
      >
        <div
          id="astrologer-details-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={cn(
            "w-full max-w-[330px] sm:max-w-[340px] max-h-[85vh] sm:max-h-[80vh] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] p-4 flex flex-col gap-3 relative text-black cursor-default transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden",
            selectedKey ? cardColors[selectedKey] || "bg-white" : "bg-white"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedKey(null)}
            className="absolute top-3.5 right-3.5 p-1 rounded-full text-black hover:bg-neutral-100 hover:text-black border-2 border-black bg-white w-7 h-7 flex items-center justify-center shadow-[1.5px_1.5px_0px_#000] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all cursor-pointer z-50 animate-pulse-slow"
            aria-label="Close details"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5px]" />
          </button>

          {/* Scrollable Content Wrapper */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {/* Profile Info Header */}
            <div className="flex flex-col items-center text-center mt-1">
              {/* Avatar Frame with Pulse Status */}
              <div className="relative shrink-0 mb-1.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-[3px] border-black bg-white shadow-[2.5px_2.5px_0px_#000] p-0.5 animate-bounce-slow">
                  <img
                    src={astrologer.src}
                    alt={astrologer.name}
                    className="w-full h-full object-cover rounded-full select-none"
                    draggable={false}
                  />
                </div>
                {/* Pulse Indicator */}
                <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      astrologer.status === "online" ? "bg-emerald-400" : "bg-amber-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-3 w-3 border-2 border-black",
                      astrologer.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </span>
              </div>

              {/* Text Meta */}
              <h3 id="modal-title" className="font-serif text-base sm:text-lg font-black tracking-wide text-black">
                {astrologer.name}
              </h3>
              <p className="text-[10px] sm:text-xs font-black text-black bg-white border-2 border-black px-2.5 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_#000] mt-1.5 leading-none">
                {astrologer.specialty[activeLocale] || astrologer.specialty["en"]}
              </p>
              <p className="text-[10px] sm:text-[11px] text-neutral-600 font-semibold leading-relaxed mt-2.5 max-w-xs font-sans border-t-2 border-black pt-2 px-1 text-center">
                {astrologer.description[activeLocale] || astrologer.description["en"]}
              </p>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase border-2 border-black bg-white text-black shadow-[1.5px_1.5px_0px_#000]",
                  astrologer.status === "online" ? "text-emerald-600" : "text-amber-600"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full animate-pulse border border-black",
                    astrologer.status === "online" ? "bg-emerald-400" : "bg-amber-400"
                  )}
                />
                {astrologer.status === "online" ? t("online") : t("busy")}
              </span>
            </div>

            {/* Badges & Stats Grid */}
            <div className="grid grid-cols-2 gap-2 border-y-2 border-black py-2.5 my-1">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                <Award className="w-3.5 h-3.5 text-black stroke-[2.5px] shrink-0 mb-0.5" />
                <span className="text-[8px] text-neutral-500 font-black uppercase tracking-wider scale-95">Experience</span>
                <span className="font-serif text-[10px] font-black mt-0.5 text-black">{astrologer.experience} {t("exp")}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                <Star className="w-3.5 h-3.5 text-[#FFC000] fill-[#FFC000] stroke-black stroke-[1.5px] shrink-0 mb-0.5" />
                <span className="text-[8px] text-neutral-500 font-black uppercase tracking-wider scale-95">Rating</span>
                <span className="font-serif text-[10px] font-black mt-0.5 text-black">{astrologer.rating} / 5</span>
              </div>
            </div>

            {/* Contact Details & Fee Card */}
            <div className="flex flex-col gap-2 bg-white border-2 border-black rounded-xl p-3 text-[11px] font-black text-black shadow-[3px_3px_0px_#000]">
              <div className="flex items-center justify-between text-black">
                <span>💰 Consultation Fee</span>
                <span className="font-black text-black font-serif text-xs">₹{astrologer.fee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-black">
                <span>📞 Phone</span>
                <div className="flex items-center gap-1">
                  <a href={`tel:${astrologer.phone}`} className="font-bold text-black hover:text-[#FFC000] hover:underline transition-colors">{astrologer.phone}</a>
                  <button 
                    onClick={() => handleCopyText(astrologer.phone, "Phone number")}
                    className="p-1 text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    <Copy className="w-3 h-3 text-black stroke-[2px]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-black">
                <span>📧 Email</span>
                <div className="flex items-center gap-1 max-w-[170px]">
                  <a href={`mailto:${astrologer.email}`} className="font-bold text-black hover:text-[#FFC000] hover:underline transition-colors select-all truncate text-right">{astrologer.email}</a>
                  <button 
                    onClick={() => handleCopyText(astrologer.email, "Email address")}
                    className="p-1 text-black hover:bg-black/5 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    <Copy className="w-3 h-3 text-black stroke-[2px]" />
                  </button>
                </div>
              </div>
              <div className="border-t-2 border-black pt-2 mt-1 text-[10px] text-black flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-black uppercase tracking-wider text-[8px]">Address</span>
                  <button 
                    onClick={() => handleCopyText(astrologer.address[activeLocale] || astrologer.address["en"], "Address")}
                    className="p-0.5 text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy address"
                  >
                    <Copy className="w-3 h-3 text-black stroke-[2px]" />
                  </button>
                </div>
                <span className="leading-relaxed font-semibold text-neutral-600">{astrologer.address[activeLocale] || astrologer.address["en"]}</span>
              </div>
            </div>
          </div>

          {/* Sticky Call to Action Button */}
          <div className="pt-3 border-t-2 border-black shrink-0 flex gap-2">
            <a
              href={`/${locale}/astrologers/${selectedKey}`}
              className="flex-1 flex items-center justify-center bg-white border-2 border-black hover:bg-neutral-50 text-black hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all font-black py-2.5 px-2.5 rounded-full text-xs font-sans tracking-wide text-center shadow-[2px_2px_0px_#000]"
            >
              View Profile
            </a>
            <a
              href={`/${locale}/consultation?astrologer=${selectedKey}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFC000] hover:bg-[#FFC000]/95 text-black border-2 border-black hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all font-black py-2.5 px-2.5 rounded-full cursor-pointer text-xs font-sans tracking-wide text-center shadow-[2px_2px_0px_#000]"
            >
              {t("consult_now")}
            </a>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={cn("relative w-full h-full flex flex-col justify-center items-center", className)}>
      <Globe3D
        markers={sampleMarkers}
        config={{
          showAtmosphere: false,
          atmosphereColor: "#fbbf24", // Premium gold halo glow to match theme
          atmosphereIntensity: 1.4,
          atmosphereBlur: 3.5,
          ambientIntensity: 1.2, // Brighter ambient light to lift shadows
          pointLightIntensity: 2.2, // Stronger point lighting for vibrant surface details
          bumpScale: 5,
          autoRotateSpeed: 0.35, // Enable slow elegant auto rotation
          initialRotation: { x: 0.35, y: -0.6 } // Center view on Africa/Middle East so London, New Delhi, and Cape Town markers display cleanly at startup
        }}
        className="h-full w-full"
        onMarkerClick={handleMarkerClick}
      />

      {/* Portal Dialog Modal */}
      {renderModal()}
    </div>
  );
}
