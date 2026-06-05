"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { X, Star, MessageCircle, Globe, Award, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGlobeStore } from "@/lib/store/useGlobeStore";

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
  city: Record<string, string>;
  address: Record<string, string>;
  phone: string;
  email: string;
  fee: number;
  status: "online" | "busy";
  src: string;
}

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, AstrologerInfo>;

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
    label: "Acharya Abhi Shastri (Cape Town)"
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "/assets/astrologers/acharya_sneha.webp",
    label: "Acharya Sneha (London)"
  },
  {
    lat: 40.7128,
    lng: -74.0060,
    src: "/assets/astrologers/acharya_bhakta_vedanta.webp",
    label: "Acharya Bhakta Vedanta (New York)"
  },
  {
    lat: -23.5505,
    lng: -46.6333,
    src: "/assets/astrologers/astrologer_indrajit_dutta.webp",
    label: "Astrologer Indrajit Dutta (Sao Paulo)"
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "/assets/astrologers/rishi_acharya.webp",
    label: "Rishi Acharya (Sydney)"
  },
  {
    lat: 28.6139,
    lng: 77.2090,
    src: "/assets/astrologers/biprangshu_bhattacharjee.webp",
    label: "Biprangshu Bhattacharjee (New Delhi)"
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

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const astrologer = selectedKey ? ASTROLOGERS[selectedKey] : null;

  const t = (key: string) => {
    return uiStrings[key]?.[activeLocale] || uiStrings[key]?.["en"] || key;
  };

  const handleMarkerClick = (marker: GlobeMarker) => {
    const key = srcToKeyMap[marker.src];
    if (key) {
      setSelectedKey(key);
    }
  };

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I would like to book a consultation session with ${name}.`;
    return `https://wa.me/919830098300?text=${encodeURIComponent(text)}`;
  };

  const renderModal = () => {
    if (!mounted || !astrologer) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        onClick={() => setSelectedKey(null)}
      >
        {/* Modal Box */}
        <div
          className="w-full max-w-[330px] sm:max-w-[340px] max-h-[85vh] sm:max-h-[80vh] bg-card/95 backdrop-blur-2xl border border-gold/45 rounded-xl shadow-[0_0_50px_-12px_rgba(220,190,116,0.18)] p-3.5 flex flex-col gap-2.5 relative text-foreground cursor-default transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/50 before:to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedKey(null)}
            className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-ring/50 cursor-pointer z-50"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrollable Content Wrapper */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {/* Profile Info Header */}
            <div className="flex flex-col items-center text-center mt-1">
              {/* Avatar Frame with Pulse Status */}
              <div className="relative shrink-0 mb-1.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gold/50 bg-neutral-900 shadow-md p-0.5">
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
                      "relative inline-flex rounded-full h-3 w-3 border-2 border-card shadow-sm",
                      astrologer.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </span>
              </div>

              {/* Text Meta */}
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-foreground">
                {astrologer.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-gold font-semibold mt-0.5">
                {astrologer.specialty[activeLocale] || astrologer.specialty["en"]}
              </p>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed mt-1.5 max-w-xs font-sans border-t border-border/20 pt-1.5 px-1 text-center">
                {astrologer.description[activeLocale] || astrologer.description["en"]}
              </p>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase border",
                  astrologer.status === "online"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full animate-pulse",
                    astrologer.status === "online" ? "bg-emerald-400" : "bg-amber-400"
                  )}
                />
                {astrologer.status === "online" ? t("online") : t("busy")}
              </span>
            </div>

            {/* Badges & Stats Grid */}
            <div className="grid grid-cols-2 gap-1.5 border-y border-border/30 py-2 my-0.5">
              <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-neutral-900/50 border border-white/5">
                <Award className="w-3.5 h-3.5 text-gold shrink-0 mb-0.5" />
                <span className="text-[8px] text-muted-foreground font-sans uppercase tracking-wider scale-95">Experience</span>
                <span className="font-serif text-[10px] font-semibold mt-0.5 text-foreground">{astrologer.experience} {t("exp")}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-neutral-900/50 border border-white/5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mb-0.5" />
                <span className="text-[8px] text-muted-foreground font-sans uppercase tracking-wider scale-95">Rating</span>
                <span className="font-serif text-[10px] font-semibold mt-0.5 text-foreground">{astrologer.rating} / 5</span>
              </div>
            </div>

            {/* Contact Details & Fee Card */}
            <div className="flex flex-col gap-1.5 bg-neutral-900/55 border border-white/5 rounded-xl p-2.5 text-[11px] font-sans">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>💰 Consultation Fee</span>
                <span className="font-semibold text-gold font-serif text-xs">₹{astrologer.fee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>📞 Phone</span>
                <a href={`tel:${astrologer.phone}`} className="font-medium text-foreground hover:text-gold transition-colors">{astrologer.phone}</a>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>📧 Email</span>
                <a href={`mailto:${astrologer.email}`} className="font-medium text-foreground hover:text-gold transition-colors select-all truncate max-w-[170px] text-right">{astrologer.email}</a>
              </div>
              <div className="border-t border-border/20 pt-1.5 mt-0.5 text-[10px] text-muted-foreground flex flex-col gap-0.5">
                <span className="font-semibold text-foreground uppercase tracking-wide text-[8px]">Address</span>
                <span className="leading-relaxed">{astrologer.address[activeLocale] || astrologer.address["en"]}</span>
              </div>
            </div>
          </div>

          {/* Sticky Call to Action Button */}
          <div className="pt-2 border-t border-border/20 shrink-0 transition-transform duration-100 active:scale-[0.98]">
            <a
              href={getPrefilledWhatsappUrl(astrologer.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground font-semibold py-2 px-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer text-xs font-sans tracking-wide"
            >
              <MessageCircle className="w-3.5 h-3.5" />
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
          atmosphereColor: "#c084fc", // Premium cosmic violet glow
          atmosphereIntensity: 15,
          bumpScale: 5,
          autoRotateSpeed: 0.35 // Enable slow elegant auto rotation
        }}
        className="h-full w-full"
        onMarkerClick={handleMarkerClick}
      />

      {/* Portal Dialog Modal */}
      {renderModal()}
    </div>
  );
}
