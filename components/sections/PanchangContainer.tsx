"use client";

import React, { useState } from "react";
import { CityAutocomplete } from "../shared/CityAutocomplete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { toast } from "sonner";
import { BirthDetails, PanchangResult } from "@/lib/astrology/types";
import { cn } from "@/lib/utils";
import { Sun, Moon, Sparkles, AlertTriangle, Clock, Calendar, MapPin } from "lucide-react";

const translations = {
  en: {
    title: "Daily Panchang & Muhurat",
    subtitle: "Track daily auspicious timings, Tithi, Nakshatra, Yoga, Karana, and Subh Muhurat localized for your location.",
    formTitle: "Panchang Location & Date",
    dateLabel: "Select Date",
    timeLabel: "Select Time",
    cityLabel: "Select Location",
    submitBtn: "Get Panchang",
    generating: "Reading celestial transits...",
    resultsTitle: "Vedic Panchang for",
    backBtn: "Check Another Day",
    tabDetails: "Core Panchang",
    tabAuspicious: "Auspicious Muhurats",
    tabInauspicious: "Inauspicious Periods",
    sunrise: "Sunrise",
    sunset: "Sunset",
    moonrise: "Moonrise",
    moonset: "Moonset",
    weekday: "Vedic Weekday",
    tithi: "Tithi (Lunar Day)",
    nakshatra: "Nakshatra (Constellation)",
    yoga: "Yoga (Alignment)",
    karana: "Karana (Half-Tithi)",
    timeStart: "Starts",
    timeEnd: "Ends",
    lord: "Lord",
    paksha: "Paksha",
    periodName: "Muhurat Name",
    periodTime: "Time Period",
    noData: "No specific periods found."
  },
  hin: {
    title: "दैनिक पंचांग और मुहूर्त",
    subtitle: "अपने स्थान के अनुसार दैनिक शुभ मुहूर्त, तिथि, नक्षत्र, योग, करण और शुभ मुहूर्त की जानकारी प्राप्त करें।",
    formTitle: "पंचांग स्थान और तिथि",
    dateLabel: "तिथि चुनें",
    timeLabel: "समय चुनें",
    cityLabel: "स्थान चुनें",
    submitBtn: "पंचांग प्राप्त करें",
    generating: "गोचर और नक्षत्रों की गणना की जा रही है...",
    resultsTitle: "वैदिक पंचांग - ",
    backBtn: "अन्य तिथि की जाँच करें",
    tabDetails: "मुख्य पंचांग",
    tabAuspicious: "शुभ मुहूर्त",
    tabInauspicious: "अशुभ समय",
    sunrise: "सूर्योदय",
    sunset: "सूर्यास्त",
    moonrise: "चन्द्रोदय",
    moonset: "चन्द्रास्त",
    weekday: "वैदिक वार",
    tithi: "तिथि",
    nakshatra: "नक्षत्र",
    yoga: "योग",
    karana: "करण",
    timeStart: "प्रारंभ",
    timeEnd: "समाप्ति",
    lord: "स्वामी",
    paksha: "पक्ष",
    periodName: "मुहूर्त नाम",
    periodTime: "समय अवधि",
    noData: "कोई विशेष मुहूर्त नहीं मिला।"
  },
  bn: {
    title: "দৈনিক পঞ্জিকা ও মুহুর্ত",
    subtitle: "আপনার অবস্থানের জন্য দৈনিক শুভ সময়, তিথি, নক্ষত্র, যোগ, করণ এবং শুভ মুহুর্ত ট্র্যাক করুন।",
    formTitle: "পঞ্জিকার স্থান ও তারিখ",
    dateLabel: "তারিখ নির্বাচন করুন",
    timeLabel: "সময় নির্বাচন করুন",
    cityLabel: "স্থান নির্বাচন করুন",
    submitBtn: "পঞ্জিকা দেখুন",
    generating: "মহাজাগতিক ট্রানজিট গণনা করা হচ্ছে...",
    resultsTitle: "বৈদিক পঞ্জিকা - ",
    backBtn: "অন্য দিন পরীক্ষা করুন",
    tabDetails: "প্রধান পঞ্জিকা",
    tabAuspicious: "শুভ মুহুর্ত",
    tabInauspicious: "অশুভ সময়",
    sunrise: "সূর্যোদয়",
    sunset: "সূর্যাস্ত",
    moonrise: "চন্দ্রোদয়",
    moonset: "চন্দ্রাস্ত",
    weekday: "বৈদিক বার",
    tithi: "তিথি",
    nakshatra: "নক্ষত্র",
    yoga: "যোগ",
    karana: "করণ",
    timeStart: "শুরু",
    timeEnd: "শেষ",
    lord: "স্বামী",
    paksha: "পক্ষ",
    periodName: "মুহুর্তের নাম",
    periodTime: "সময়সীমা",
    noData: "কোন নির্দিষ্ট সময় পাওয়া যায়নি।"
  }
} as const;

export function PanchangContainer({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.en;

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTimeString = () => {
    const today = new Date();
    const hh = String(today.getHours()).padStart(2, "0");
    const mm = String(today.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const [formData, setFormData] = useState({
    date: getTodayDateString(),
    time: getCurrentTimeString(),
    cityName: "",
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: 5.5,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PanchangResult | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "auspicious" | "inauspicious">("details");

  const handleCitySelect = (city: { name: string; lat: number; lon: number; timezone: number }) => {
    setFormData((prev) => ({
      ...prev,
      cityName: city.name,
      latitude: city.lat,
      longitude: city.lon,
      timezone: city.timezone,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      toast.error("Please enter a date");
      return;
    }
    if (!formData.time) {
      toast.error("Please enter a time");
      return;
    }
    if (!formData.cityName) {
      toast.error("Please search and select a location");
      return;
    }

    setLoading(true);
    try {
      const [year, month, date] = formData.date.split("-").map(Number);
      const [hours, minutes] = formData.time.split(":").map(Number);

      const requestBody = {
        year,
        month,
        date,
        hours,
        minutes,
        latitude: formData.latitude,
        longitude: formData.longitude,
        timezone: formData.timezone,
        cityName: formData.cityName,
      };

      const response = await fetch(`/api/astrology/panchang?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        toast.success("Panchang computed successfully!");
      } else {
        toast.error(data.error || "Failed to fetch Panchang. Please try again.");
      }
    } catch (error) {
      console.error("[PanchangContainer] Submit error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Time Formatter helper
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString(locale === "en" ? "en-IN" : locale === "hin" ? "hi-IN" : "bn-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 select-none">
      {/* Hero Header Block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-[#FFC000] text-black border-2 border-black rounded-full shadow-[3px_3px_0px_#000] font-black uppercase text-[10px] sm:text-xs tracking-wider mb-2">
          ✦ {t.title} ✦
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight uppercase">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-bold max-w-md mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {!result ? (
        /* Form Card */
        <Card className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden">
          <CardHeader className="bg-[#FFF9E6] border-b-2 border-black p-6">
            <CardTitle className="text-lg font-black text-black uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {t.formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Input */}
                <div className="space-y-2">
                  <Label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#FFC000]" />
                    {t.dateLabel}
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-white border-2 border-black font-bold h-12"
                  />
                </div>

                {/* Time Input */}
                <div className="space-y-2">
                  <Label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FFC000]" />
                    {t.timeLabel}
                  </Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-white border-2 border-black font-bold h-12"
                  />
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FFC000]" />
                  {t.cityLabel}
                </Label>
                <CityAutocomplete
                  onSelect={handleCitySelect}
                  placeholder={locale === "hin" ? "शहर का नाम खोजें..." : locale === "bn" ? "শহরের নাম খুঁজুন..." : "Search city (e.g. Silchar, Karimganj, Kolkata)..."}
                  className="w-full"
                />
              </div>

              {/* Submit Trigger */}
              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full h-12 text-sm font-black uppercase tracking-wider border-2 border-black rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2",
                  loading
                    ? "bg-neutral-100 text-neutral-400"
                    : "bg-[#FFC000] text-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000]"
                )}
              >
                {loading ? t.generating : t.submitBtn}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* Results Section */
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          
          {/* Header block with date/time of check */}
          <div className="bg-[#E5D5FF] border-[3px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black uppercase tracking-wide">
                {t.resultsTitle} {formData.cityName}
              </h2>
              <p className="text-xs text-neutral-600 font-bold mt-1">
                {formData.date} at {formData.time} (UTC {formData.timezone >= 0 ? `+${formData.timezone}` : formData.timezone})
              </p>
            </div>
            <Button
              onClick={() => setResult(null)}
              className="bg-white hover:bg-neutral-100 text-black border-2 border-black font-black uppercase text-xs px-5 py-2.5 rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer w-fit"
            >
              ← {t.backBtn}
            </Button>
          </div>

          {/* Quick Sun & Moon times bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2C2] border-2 border-black flex items-center justify-center">
                <Sun className="w-5 h-5 text-amber-600 fill-amber-500" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-black uppercase">{t.sunrise}</p>
                <p className="text-sm font-black text-black">{formatTime(result.sunrise)}</p>
              </div>
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFE6CC] border-2 border-black flex items-center justify-center">
                <Sun className="w-5 h-5 text-orange-600 fill-orange-500" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-black uppercase">{t.sunset}</p>
                <p className="text-sm font-black text-black">{formatTime(result.sunset)}</p>
              </div>
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E5D5FF] border-2 border-black flex items-center justify-center">
                <Moon className="w-5 h-5 text-indigo-600 fill-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-black uppercase">{t.moonrise}</p>
                <p className="text-sm font-black text-black">{formatTime(result.moonrise)}</p>
              </div>
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D2F4FF] border-2 border-black flex items-center justify-center">
                <Moon className="w-5 h-5 text-cyan-600 fill-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-black uppercase">{t.moonset}</p>
                <p className="text-sm font-black text-black">{formatTime(result.moonset)}</p>
              </div>
            </div>
          </div>

          {/* Neo-brutalist navigation tabs */}
          <div className="flex border-b-[3px] border-black bg-white rounded-xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_#000] select-none p-1">
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "flex-1 text-center py-3 text-xs sm:text-sm font-black uppercase tracking-wider border-2 rounded-lg cursor-pointer transition-all",
                activeTab === "details"
                  ? "bg-[#FFC000] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-neutral-500 border-transparent hover:text-black"
              )}
            >
              {t.tabDetails}
            </button>
            <button
              onClick={() => setActiveTab("auspicious")}
              className={cn(
                "flex-1 text-center py-3 text-xs sm:text-sm font-black uppercase tracking-wider border-2 rounded-lg cursor-pointer transition-all",
                activeTab === "auspicious"
                  ? "bg-[#D1FAE5] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-neutral-500 border-transparent hover:text-black"
              )}
            >
              {t.tabAuspicious}
            </button>
            <button
              onClick={() => setActiveTab("inauspicious")}
              className={cn(
                "flex-1 text-center py-3 text-xs sm:text-sm font-black uppercase tracking-wider border-2 rounded-lg cursor-pointer transition-all",
                activeTab === "inauspicious"
                  ? "bg-[#FFE4E6] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-neutral-500 border-transparent hover:text-black"
              )}
            >
              {t.tabInauspicious}
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === "details" && (
            <Card className="bg-white border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#000] overflow-hidden">
              <CardContent className="p-0 flex flex-col divide-y-2 divide-black">
                {/* Vedic Weekday */}
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 sm:p-5 font-black text-black bg-[#FFFDF0] border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/4 text-xs sm:text-sm uppercase tracking-wider flex items-center">
                    {t.weekday}
                  </div>
                  <div className="p-4 sm:p-5 text-sm sm:text-base font-black text-black flex-1 flex items-center">
                    {result.vaara}
                  </div>
                </div>

                {/* Tithi */}
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 sm:p-5 font-black text-black bg-[#FFFDF0] border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/4 text-xs sm:text-sm uppercase tracking-wider flex items-center">
                    {t.tithi}
                  </div>
                  <div className="p-4 sm:p-5 space-y-4 flex-1">
                    {result.tithi.map((tithi, idx) => (
                      <div key={idx} className="flex flex-col gap-2 border-l-4 border-amber-400 pl-3 py-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm sm:text-base font-black text-black">{tithi.name}</span>
                          {tithi.paksha && (
                            <span className="px-2 py-0.5 bg-[#FFF2C2] text-black border border-black rounded text-[10px] font-black uppercase">
                              {tithi.paksha}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 font-bold flex flex-col sm:flex-row sm:gap-4 gap-1">
                          <span>{t.timeStart}: {formatTime(tithi.start)}</span>
                          <span>{t.timeEnd}: {formatTime(tithi.end)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nakshatra */}
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 sm:p-5 font-black text-black bg-[#FFFDF0] border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/4 text-xs sm:text-sm uppercase tracking-wider flex items-center">
                    {t.nakshatra}
                  </div>
                  <div className="p-4 sm:p-5 space-y-4 flex-1">
                    {result.nakshatra.map((nak, idx) => (
                      <div key={idx} className="flex flex-col gap-2 border-l-4 border-indigo-400 pl-3 py-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm sm:text-base font-black text-black">{nak.name}</span>
                          {nak.lord && (
                            <span className="px-2 py-0.5 bg-[#E5D5FF] text-black border border-black rounded text-[10px] font-black uppercase">
                              {t.lord}: {nak.lord.name} ({nak.lord.vedic_name})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 font-bold flex flex-col sm:flex-row sm:gap-4 gap-1">
                          <span>{t.timeStart}: {formatTime(nak.start)}</span>
                          <span>{t.timeEnd}: {formatTime(nak.end)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yoga */}
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 sm:p-5 font-black text-black bg-[#FFFDF0] border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/4 text-xs sm:text-sm uppercase tracking-wider flex items-center">
                    {t.yoga}
                  </div>
                  <div className="p-4 sm:p-5 space-y-4 flex-1">
                    {result.yoga.map((yoga, idx) => (
                      <div key={idx} className="flex flex-col gap-1 border-l-4 border-purple-400 pl-3 py-1">
                        <span className="text-sm sm:text-base font-black text-black">{yoga.name}</span>
                        <div className="text-xs text-neutral-500 font-bold flex flex-col sm:flex-row sm:gap-4 gap-1">
                          <span>{t.timeStart}: {formatTime(yoga.start)}</span>
                          <span>{t.timeEnd}: {formatTime(yoga.end)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Karana */}
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 sm:p-5 font-black text-black bg-[#FFFDF0] border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/4 text-xs sm:text-sm uppercase tracking-wider flex items-center">
                    {t.karana}
                  </div>
                  <div className="p-4 sm:p-5 space-y-4 flex-1">
                    {result.karana.map((karana, idx) => (
                      <div key={idx} className="flex flex-col gap-1 border-l-4 border-teal-400 pl-3 py-1">
                        <span className="text-sm sm:text-base font-black text-black">{karana.name}</span>
                        <div className="text-xs text-neutral-500 font-bold flex flex-col sm:flex-row sm:gap-4 gap-1">
                          <span>{t.timeStart}: {formatTime(karana.start)}</span>
                          <span>{t.timeEnd}: {formatTime(karana.end)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "auspicious" && (
            <div className="space-y-6">
              {result.auspicious_period && result.auspicious_period.length > 0 ? (
                result.auspicious_period.map((period, idx) => (
                  <Card key={idx} className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] overflow-hidden">
                    <CardHeader className="bg-[#D1FAE5] border-b-2 border-black p-4 flex flex-row items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <CardTitle className="text-sm sm:text-base font-black text-black uppercase tracking-wide">
                        {period.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                      {period.period.map((time, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between text-sm border-b border-neutral-100 last:border-b-0 pb-2 last:pb-0">
                          <span className="font-bold text-neutral-600">{t.periodTime}</span>
                          <span className="font-black text-black bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1 text-xs">
                            {formatTime(time.start)} — {formatTime(time.end)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="bg-[#FFFDF0] border-2 border-black border-dashed rounded-xl p-8 text-center text-neutral-500 font-bold text-sm">
                  {t.noData}
                </div>
              )}
            </div>
          )}

          {activeTab === "inauspicious" && (
            <div className="space-y-6">
              {result.inauspicious_period && result.inauspicious_period.length > 0 ? (
                result.inauspicious_period.map((period, idx) => (
                  <Card key={idx} className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] overflow-hidden">
                    <CardHeader className="bg-[#FFE4E6] border-b-2 border-black p-4 flex flex-row items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <CardTitle className="text-sm sm:text-base font-black text-black uppercase tracking-wide">
                        {period.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                      {period.period.map((time, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between text-sm border-b border-neutral-100 last:border-b-0 pb-2 last:pb-0">
                          <span className="font-bold text-neutral-600">{t.periodTime}</span>
                          <span className="font-black text-rose-600 bg-rose-50 border border-rose-300 rounded px-2.5 py-1 text-xs">
                            {formatTime(time.start)} — {formatTime(time.end)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="bg-[#FFFDF0] border-2 border-black border-dashed rounded-xl p-8 text-center text-neutral-500 font-bold text-sm">
                  {t.noData}
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
