"use client";

import React, { useState } from "react";
import { CityAutocomplete } from "../shared/CityAutocomplete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { toast } from "sonner";
import { BirthDetails, MatchingResult } from "@/lib/astrology/types";
import { cn } from "@/lib/utils";

const translations = {
  en: {
    title: "Kundli Matching & Guna Milan",
    subtitle: "Find your compatibility score (Ashtakoot Guna Milan) and Manglik Dosha matching for marriage.",
    p1Header: "Partner 1 Details",
    p2Header: "Partner 2 Details",
    nameLabel: "Name",
    namePlaceholder: "Enter name",
    dateLabel: "Date of Birth",
    timeLabel: "Time of Birth",
    cityLabel: "Place of Birth",
    submitBtn: "Check Compatibility",
    calculating: "Analyzing matching charts...",
    resultsTitle: "Compatibility Matching Report",
    backBtn: "Check Another Match",
    scoreCardTitle: "Ashtakoot Score",
    gunaBreakdown: "Ashtakoot Guna Milan Breakdown",
    manglikTitle: "Manglik Dosha Verdict",
    manglikCompatible: "Manglik Compatible: The charts have matching planetary heat levels.",
    manglikIncompatible: "Manglik Clash: Chart alignment shows unbalanced planetary intensity.",
    p1ManglikText: "Partner 1 is Manglik",
    p1NonManglikText: "Partner 1 is Non-Manglik",
    p2ManglikText: "Partner 2 is Manglik",
    p2NonManglikText: "Partner 2 is Non-Manglik",
    shareTitle: "Share Result",
    copyBtn: "Copy Report Link",
    copiedMsg: "Link copied to clipboard!",
    shareText: "Matchmaking Compatibility Score: {score}/36",
    shareSuccess: "Report shared successfully!",
    cardSubHeader: "Celestial Guna Milan Report"
  },
  hin: {
    title: "कुंडली मिलान और गुण मिलान",
    subtitle: "विवाह के लिए अपना अनुकूलता स्कोर (अष्टकूट गुण मिलान) और मांगलिक दोष मिलान प्राप्त करें।",
    p1Header: "साथी 1 का विवरण",
    p2Header: "साथी 2 का विवरण",
    nameLabel: "नाम",
    namePlaceholder: "नाम दर्ज करें",
    dateLabel: "जन्म तिथि",
    timeLabel: "जन्म समय",
    cityLabel: "जन्म स्थान",
    submitBtn: "अनुकूलता जांचें",
    calculating: "कुंडली मिलान किया जा रहा है...",
    resultsTitle: "अनुकूलता मिलान रिपोर्ट",
    backBtn: "दूसरा मिलान जांचें",
    scoreCardTitle: "अष्टकूट स्कोर",
    gunaBreakdown: "अष्टकूट गुण मिलान विवरण",
    manglikTitle: "मांगलिक दोष निर्णय",
    manglikCompatible: "मांगलिक अनुकूलता: दोनों कुंडलियों में मांगलिक प्रभाव संतुलित है।",
    manglikIncompatible: "मांगलिक विसंगति: कुंडली का प्रभाव असंतुलित है।",
    p1ManglikText: "साथी 1 मांगलिक हैं",
    p1NonManglikText: "साथी 1 मांगलिक नहीं हैं",
    p2ManglikText: "साथी 2 मांगलिक हैं",
    p2NonManglikText: "साथी 2 मांगलिक नहीं हैं",
    shareTitle: "परिणाम साझा करें",
    copyBtn: "रिपोर्ट लिंक कॉपी करें",
    copiedMsg: "लिंक क्लिपबोर्ड पर कॉपी हो गया!",
    shareText: "गुण मिलान अनुकूलता स्कोर: {score}/36",
    shareSuccess: "रिपोर्ट साझा की गई!",
    cardSubHeader: "वैदिक गुण मिलान रिपोर्ट"
  },
  bn: {
    title: "কোষ্ঠী মেলাও ও গুণ মিলন",
    subtitle: "বিভাগের জন্য আপনার সামঞ্জস্যতা স্কোর (অষ্টকূটের ৩৬ গুণ মিলন) এবং মাঙ্গলিক দোষের মিল পরীক্ষা করুন।",
    p1Header: "সঙ্গী ১-এর বিবরণ",
    p2Header: "সঙ্গী ২-এর বিবরণ",
    nameLabel: "নাম",
    namePlaceholder: "নাম লিখুন",
    dateLabel: "জন্ম তারিখ",
    timeLabel: "জন্মের সময়",
    cityLabel: "জন্মস্থান",
    submitBtn: "সামঞ্জস্যতা পরীক্ষা করুন",
    calculating: "কোষ্ঠী মেলাানো হচ্ছে...",
    resultsTitle: "সামঞ্জস্যতা মিলন রিপোর্ট",
    backBtn: "অন্য মিলন পরীক্ষা করুন",
    scoreCardTitle: "অষ্টকূটের স্কোর",
    gunaBreakdown: "অষ্টকূটের ৩৬ গুণের মিলন বিবরণ",
    manglikTitle: "মাঙ্গলিক দোষের রায়",
    manglikCompatible: "মাঙ্গলিক সামঞ্জস্য: ছকে গ্রহের প্রভাব সামঞ্জস্যপূর্ণ রয়েছে।",
    manglikIncompatible: "মাঙ্গলিক অসঙ্গতি: ছকে মাঙ্গলিক প্রভাবের অমিল রয়েছে।",
    p1ManglikText: "সঙ্গী ১ মাঙ্গলিক",
    p1NonManglikText: "সঙ্গী ১ মাঙ্গলিক নন",
    p2ManglikText: "সঙ্গী ২ মাঙ্গলিক",
    p2NonManglikText: "সঙ্গী ২ মাঙ্গলিক নন",
    shareTitle: "ফলাফল শেয়ার করুন",
    copyBtn: "রিপোর্ট লিঙ্ক কপি করুন",
    copiedMsg: "লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে!",
    shareText: "গুণ মিলন সামঞ্জস্যতা স্কোর: {score}/৩৬",
    shareSuccess: "রিপোর্ট শেয়ার করা হয়েছে!",
    cardSubHeader: "বৈদিক গুণ মিলন রিপোর্ট"
  }
} as const;

export function MatchingContainer({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [p1, setP1] = useState({
    name: "",
    date: "",
    time: "",
    cityName: "",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
  });

  const [p2, setP2] = useState({
    name: "",
    date: "",
    time: "",
    cityName: "",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 5.5,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchingResult | null>(null);

  const handleP1CitySelect = (city: { name: string; lat: number; lon: number; timezone: number }) => {
    setP1((prev) => ({
      ...prev,
      cityName: city.name,
      latitude: city.lat,
      longitude: city.lon,
      timezone: city.timezone,
    }));
  };

  const handleP2CitySelect = (city: { name: string; lat: number; lon: number; timezone: number }) => {
    setP2((prev) => ({
      ...prev,
      cityName: city.name,
      latitude: city.lat,
      longitude: city.lon,
      timezone: city.timezone,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!p1.name || !p1.date || !p1.time || !p1.cityName) {
      toast.error("Please fill in all details for Partner 1");
      return;
    }
    if (!p2.name || !p2.date || !p2.time || !p2.cityName) {
      toast.error("Please fill in all details for Partner 2");
      return;
    }

    setLoading(true);
    try {
      const [p1Year, p1Month, p1Date] = p1.date.split("-").map(Number);
      const [p1Hours, p1Minutes] = p1.time.split(":").map(Number);

      const [p2Year, p2Month, p2Date] = p2.date.split("-").map(Number);
      const [p2Hours, p2Minutes] = p2.time.split(":").map(Number);

      const requestBody = {
        p1: {
          year: p1Year,
          month: p1Month,
          date: p1Date,
          hours: p1Hours,
          minutes: p1Minutes,
          latitude: p1.latitude,
          longitude: p1.longitude,
          timezone: p1.timezone,
          cityName: p1.cityName,
        },
        p2: {
          year: p2Year,
          month: p2Month,
          date: p2Date,
          hours: p2Hours,
          minutes: p2Minutes,
          latitude: p2.latitude,
          longitude: p2.longitude,
          timezone: p2.timezone,
          cityName: p2.cityName,
        },
      };

      const response = await fetch(`/api/astrology/matching?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        toast.success("Matching compatibility calculated!");
      } else {
        toast.error(data.error || "Failed to calculate matching. Please try again.");
      }
    } catch (error) {
      console.error("[MatchingContainer] Submit error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const shareUrl = window.location.href;
    const text = `${t.title}: ${p1.name} + ${p2.name} - ${result.score}/36 Guna Score!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "AstroKraft Compatibility Report",
          text: text,
          url: shareUrl,
        });
        toast.success(t.shareSuccess);
      } catch (err) {
        console.log("Web Share API failed, falling back to copy to clipboard", err);
        copyLinkToClipboard(shareUrl);
      }
    } else {
      copyLinkToClipboard(shareUrl);
    }
  };

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success(t.copiedMsg);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif text-accent font-semibold tracking-tight">{t.title}</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {!result ? (
        /* INPUT FORM SCREEN */
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Partner 1 Details */}
            <Card className="border-border/30 bg-neutral-950/40 backdrop-blur-md shadow-2xl !overflow-visible">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-accent">{t.p1Header}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>{t.nameLabel}</Label>
                  <Input
                    value={p1.name}
                    onChange={(e) => setP1({ ...p1, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>{t.dateLabel}</Label>
                  <Input
                    type="date"
                    value={p1.date}
                    onChange={(e) => setP1({ ...p1, date: e.target.value })}
                  />
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <Label>{t.timeLabel}</Label>
                  <Input
                    type="time"
                    value={p1.time}
                    onChange={(e) => setP1({ ...p1, time: e.target.value })}
                  />
                </div>

                {/* City Autocomplete */}
                <div className="space-y-2">
                  <Label>{t.cityLabel}</Label>
                  <CityAutocomplete
                    defaultValue={p1.cityName}
                    onSelect={handleP1CitySelect}
                    onChangeName={(name) => setP1((prev) => ({ ...prev, cityName: name }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Partner 2 Details */}
            <Card className="border-border/30 bg-neutral-950/40 backdrop-blur-md shadow-2xl !overflow-visible">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-accent">{t.p2Header}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>{t.nameLabel}</Label>
                  <Input
                    value={p2.name}
                    onChange={(e) => setP2({ ...p2, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>{t.dateLabel}</Label>
                  <Input
                    type="date"
                    value={p2.date}
                    onChange={(e) => setP2({ ...p2, date: e.target.value })}
                  />
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <Label>{t.timeLabel}</Label>
                  <Input
                    type="time"
                    value={p2.time}
                    onChange={(e) => setP2({ ...p2, time: e.target.value })}
                  />
                </div>

                {/* City Autocomplete */}
                <div className="space-y-2">
                  <Label>{t.cityLabel}</Label>
                  <CityAutocomplete
                    defaultValue={p2.cityName}
                    onSelect={handleP2CitySelect}
                    onChangeName={(name) => setP2((prev) => ({ ...prev, cityName: name }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-base"
              disabled={loading}
            >
              {loading ? t.calculating : t.submitBtn}
            </Button>
          </div>
        </form>
      ) : (
        /* RESULTS SCREEN */
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-accent">{t.resultsTitle}</h2>
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setP1({
                  name: "",
                  date: "",
                  time: "",
                  cityName: "",
                  latitude: 28.6139,
                  longitude: 77.2090,
                  timezone: 5.5,
                });
                setP2({
                  name: "",
                  date: "",
                  time: "",
                  cityName: "",
                  latitude: 19.0760,
                  longitude: 72.8777,
                  timezone: 5.5,
                });
              }}
            >
              {t.backBtn}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Result Card (Left 5 Columns) */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-6">
              {/* Premium shareable result card */}
              <div className="relative w-full max-w-[380px] p-6 rounded-[min(var(--radius-4xl),24px)] bg-neutral-950 border border-gold/40 shadow-2xl flex flex-col justify-between overflow-hidden before:absolute before:inset-0 before:bg-radial-gradient before:from-violet-500/5 before:to-transparent before:pointer-events-none">
                {/* Header branding */}
                <div className="flex justify-between items-center border-b border-border/20 pb-4">
                  <span className="text-xs font-serif text-accent font-semibold tracking-wider flex items-center gap-1.5">
                    ✦ AstroKraft
                  </span>
                  <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">
                    {t.cardSubHeader}
                  </span>
                </div>

                {/* Partner Labels */}
                <div className="my-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Partner 1</div>
                      <div className="text-base font-semibold text-foreground">{p1.name}</div>
                    </div>
                    <div className="text-gold font-bold">❤</div>
                    <div className="space-y-0.5 text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Partner 2</div>
                      <div className="text-base font-semibold text-foreground">{p2.name}</div>
                    </div>
                  </div>
                </div>

                {/* SVG Animated Score Wheel */}
                <div className="flex flex-col items-center justify-center my-4 space-y-2">
                  <div className="relative size-36 flex items-center justify-center">
                    {/* Circle SVG */}
                    <svg className="size-full transform -rotate-90">
                      {/* Grey Track */}
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-neutral-900 fill-none"
                        strokeWidth="10"
                      />
                      {/* Golden Track */}
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-accent fill-none transition-all duration-1000 ease-out"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - result.score / 36)}
                      />
                    </svg>
                    {/* Text Overlay */}
                    <div className="absolute text-center">
                      <div className="text-3xl font-mono font-bold text-foreground">{result.score}</div>
                      <div className="text-[10px] uppercase text-muted-foreground tracking-wider">out of 36</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-accent font-serif">
                      {result.compatibilityPercent}% Compatibility
                    </span>
                  </div>
                </div>

                {/* Brief verdict statement */}
                <div className="mt-4 p-3 rounded-xl border border-border/10 bg-neutral-900/40 text-xs text-center text-muted-foreground italic leading-relaxed">
                  "{locale === "hin" ? result.verdict.hin : locale === "bn" ? result.verdict.bn : result.verdict.en}"
                </div>

                {/* Footer and share CTA */}
                <div className="mt-6 border-t border-border/20 pt-4 flex justify-center">
                  <Button onClick={handleShare} size="sm" className="w-full gap-2">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 10.742l4.636-2.318m0 7.152l-4.636-2.318M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.shareTitle}
                  </Button>
                </div>
              </div>
            </div>

            {/* Guna breakdown Details (Right 7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Manglik Dosha Summary */}
              <Card className="border-border/30 bg-neutral-950/20">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wider text-accent">{t.manglikTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-4 text-xs font-mono">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full border",
                        result.p1Manglik
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      )}
                    >
                      {result.p1Manglik ? t.p1ManglikText : t.p1NonManglikText}
                    </span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full border",
                        result.p2Manglik
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      )}
                    >
                      {result.p2Manglik ? t.p2ManglikText : t.p2NonManglikText}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {result.manglikCompatible ? t.manglikCompatible : t.manglikIncompatible}
                  </p>
                </CardContent>
              </Card>

              {/* Ashtakoot Grid Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-serif text-accent font-medium">{t.gunaBreakdown}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(result.gunas).map(([key, item]: [string, any], idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border/20 bg-neutral-900/30 flex flex-col gap-2 hover:border-gold/30 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-accent">{item.name}</span>
                        <span className="text-sm font-mono font-bold text-foreground">
                          {item.score} / {item.max}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
