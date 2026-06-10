"use client";

import React, { useState } from "react";
import { CityAutocomplete } from "../shared/CityAutocomplete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { toast } from "sonner";
import { BirthDetails, KundliResult } from "@/lib/astrology/types";
import { cn } from "@/lib/utils";

// Sign mapping for North Indian chart
const signToNum: Record<string, number> = {
  aries: 1, taurus: 2, gemini: 3, cancer: 4, leo: 5, virgo: 6,
  libra: 7, scorpio: 8, sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12
};

const planetAbbreviation = (name: string): string => {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, "");
  if (normalized.includes("sun")) return "Su";
  if (normalized.includes("moon")) return "Mo";
  if (normalized.includes("mars")) return "Ma";
  if (normalized.includes("mercury")) return "Me";
  if (normalized.includes("jupiter")) return "Ju";
  if (normalized.includes("venus")) return "Ve";
  if (normalized.includes("saturn")) return "Sa";
  if (normalized.includes("rahu")) return "Ra";
  if (normalized.includes("ketu")) return "Ke";
  if (normalized.includes("ascendant") || normalized.includes("lagna")) return "Asc";
  return name.slice(0, 2);
};

const translations = {
  en: {
    title: "Free Kundli & Birth Chart",
    subtitle: "Generate your Vedic birth chart, planet placements, and Vimshottari Dasha details instantly.",
    formTitle: "Enter Birth Details",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    dateLabel: "Date of Birth",
    timeLabel: "Time of Birth",
    cityLabel: "Place of Birth",
    timezoneLabel: "Timezone (UTC)",
    submitBtn: "Generate Kundli",
    generating: "Analyzing celestial alignments...",
    resultsTitle: "Your Vedic Birth Chart",
    backBtn: "Create New Kundli",
    chartTitle: "Lagna Kundli (Ascendant Chart)",
    detailsTab: "Planet Placements",
    dashaTab: "Vimshottari Dasha",
    lagnaCard: "Lagna (Ascendant)",
    rashiCard: "Rashi (Moon Sign)",
    degreeCard: "Ascendant Degree",
    planetHeaderName: "Planet",
    planetHeaderRashi: "Rashi Sign",
    planetHeaderDegree: "Degree",
    planetHeaderHouse: "House",
    planetHeaderStatus: "Status",
    retrograde: "Retrograde",
    direct: "Direct",
    dashaStart: "Start Date",
    dashaEnd: "End Date"
  },
  hin: {
    title: "निःशुल्क कुंडली और जन्म चक्र",
    subtitle: "अपना वैदिक जन्म चक्र, ग्रहों की स्थिति और विंशोत्तरी दशा विवरण तुरंत प्राप्त करें।",
    formTitle: "जन्म विवरण दर्ज करें",
    nameLabel: "आपका नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    dateLabel: "जन्म तिथि",
    timeLabel: "जन्म समय",
    cityLabel: "जन्म स्थान",
    timezoneLabel: "समय क्षेत्र (UTC)",
    submitBtn: "कुंडली बनाएं",
    generating: "ग्रहों की स्थिति की गणना की जा रही है...",
    resultsTitle: "आपकी वैदिक जन्म कुंडली",
    backBtn: "नई कुंडली बनाएं",
    chartTitle: "लग्न कुंडली",
    detailsTab: "ग्रह स्थिति",
    dashaTab: "विंशोत्तरी दशा",
    lagnaCard: "लग्न",
    rashiCard: "राशि (चंद्र राशि)",
    degreeCard: "लग्न डिग्री",
    planetHeaderName: "ग्रह",
    planetHeaderRashi: "राशि",
    planetHeaderDegree: "डिग्री",
    planetHeaderHouse: "भाव",
    planetHeaderStatus: "स्थिति",
    retrograde: "वक्री",
    direct: "मार्गी",
    dashaStart: "आरंभ तिथि",
    dashaEnd: "समाप्ति तिथि"
  },
  bn: {
    title: "বিনামূল্যে কোষ্ঠী ও জন্ম ছক",
    subtitle: "আপনার বৈদিক জন্ম ছক, গ্রহের অবস্থান এবং বিংশোত্তরী দশার বিবরণ তাত্ক্ষণিকভাবে তৈরি করুন।",
    formTitle: "জন্মের বিবরণ লিখুন",
    nameLabel: "আপনার নাম",
    namePlaceholder: "আপনার সম্পূর্ণ নাম লিখুন",
    dateLabel: "জন্ম তারিখ",
    timeLabel: "জন্মের সময়",
    cityLabel: "জন্মস্থান",
    timezoneLabel: "টাইমজোন (UTC)",
    submitBtn: "কোষ্ঠী তৈরি করুন",
    generating: "মহাজাগতিক বিন্যাস বিশ্লেষণ করা হচ্ছে...",
    resultsTitle: "আপনার বৈদিক জন্ম কোষ্ঠী",
    backBtn: "নতুন কোষ্ঠী তৈরি করুন",
    chartTitle: "লগ্ন কোষ্ঠী",
    detailsTab: "গ্রহের অবস্থান",
    dashaTab: "বিংশোত্তরী দশা",
    lagnaCard: "লগ্ন",
    rashiCard: "রাশি (চন্দ্র রাশি)",
    degreeCard: "লগ্ন ডিগ্রী",
    planetHeaderName: "গ্রহ",
    planetHeaderRashi: "রাশি",
    planetHeaderDegree: "ডিগ্রী",
    planetHeaderHouse: "ভাব",
    planetHeaderStatus: "অবস্থা",
    retrograde: "বক্রী",
    direct: "মার্গী",
    dashaStart: "শুরুর তারিখ",
    dashaEnd: "শেষের তারিখ"
  }
} as const;

export function KundliContainer({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    cityName: "",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KundliResult | null>(null);
  const [activeTab, setActiveTab] = useState<"positions" | "dasha">("positions");

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
    if (!formData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.date) {
      toast.error("Please enter your date of birth");
      return;
    }
    if (!formData.time) {
      toast.error("Please enter your time of birth");
      return;
    }
    if (!formData.cityName) {
      toast.error("Please search and select your birth city");
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

      const response = await fetch(`/api/astrology/kundli?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        toast.success("Kundli generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate Kundli. Please try again.");
      }
    } catch (error) {
      console.error("[KundliContainer] Submit error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // SVG Chart Calculation Helpers
  const renderSVGChart = (data: KundliResult) => {
    // Find numeric sign number of Lagna
    const lagnaSign = data.lagna.toLowerCase();
    const startSignNum = signToNum[lagnaSign] || 1;

    // Group planets by house number
    const planetsByHouse: Record<number, string[]> = {};
    for (let h = 1; h <= 12; h++) {
      planetsByHouse[h] = [];
    }
    for (const p of data.planets) {
      if (p.house >= 1 && p.house <= 12) {
        const short = planetAbbreviation(p.name);
        const nameLabel = p.retrograde ? `${short}(R)` : short;
        planetsByHouse[p.house].push(nameLabel);
      }
    }

    // Text positions mapping
    const positions = [
      null, // 0-indexed
      { rashi: { x: 200, y: 80 }, planets: { x: 200, y: 125 } }, // House 1
      { rashi: { x: 130, y: 40 }, planets: { x: 120, y: 75 } },  // House 2
      { rashi: { x: 70, y: 100 }, planets: { x: 40, y: 135 } },  // House 3
      { rashi: { x: 135, y: 200 }, planets: { x: 90, y: 200 } }, // House 4
      { rashi: { x: 70, y: 300 }, planets: { x: 40, y: 270 } },  // House 5
      { rashi: { x: 130, y: 360 }, planets: { x: 120, y: 325 } }, // House 6
      { rashi: { x: 200, y: 330 }, planets: { x: 200, y: 285 } }, // House 7
      { rashi: { x: 270, y: 360 }, planets: { x: 280, y: 325 } }, // House 8
      { rashi: { x: 330, y: 300 }, planets: { x: 360, y: 270 } }, // House 9
      { rashi: { x: 270, y: 200 }, planets: { x: 310, y: 200 } }, // House 10
      { rashi: { x: 330, y: 100 }, planets: { x: 360, y: 135 } }, // House 11
      { rashi: { x: 270, y: 40 }, planets: { x: 280, y: 75 } },  // House 12
    ];

    const renderPlanetsText = (houseNum: number, x: number, y: number) => {
      const housePlanets = planetsByHouse[houseNum];
      if (housePlanets.length === 0) return null;

      if (housePlanets.length > 3) {
        const l1 = housePlanets.slice(0, 3).join(" ");
        const l2 = housePlanets.slice(3).join(" ");
        return (
          <text x={x} y={y} className="fill-black font-mono text-[10px] font-black text-center" textAnchor="middle">
            <tspan x={x} dy="-6">{l1}</tspan>
            <tspan x={x} dy="14">{l2}</tspan>
          </text>
        );
      }

      return (
        <text x={x} y={y} className="fill-black font-mono text-[11px] font-black" textAnchor="middle">
          {housePlanets.join(" ")}
        </text>
      );
    };

    return (
      <svg viewBox="0 0 400 400" className="w-full max-w-[400px] aspect-square rounded-2xl bg-white border border-zinc-150 shadow-sm select-none">
        {/* Draw Chart Lines */}
        {/* Outer Box */}
        <rect x="0" y="0" width="400" height="400" className="fill-none stroke-zinc-200 stroke-[2px]" />
        {/* Outer Diagonals */}
        <line x1="0" y1="0" x2="400" y2="400" className="stroke-zinc-150 stroke-[1px]" />
        <line x1="400" y1="0" x2="0" y2="400" className="stroke-zinc-150 stroke-[1px]" />
        {/* Inner Diamond */}
        <polygon points="200,0 400,200 200,400 0,200" className="fill-none stroke-zinc-200 stroke-[1.5px]" />

        {/* Dynamic Sign Numbers & Planets */}
        {Array.from({ length: 12 }, (_, index) => {
          const houseNum = index + 1;
          const signNum = ((startSignNum - 1 + (houseNum - 1)) % 12) + 1;
          const pos = positions[houseNum]!;

          return (
            <g key={houseNum}>
              {/* Rashi Sign Number */}
              <text
                x={pos.rashi.x}
                y={pos.rashi.y}
                className="fill-[#b28b3a] font-sans text-xs font-bold"
                textAnchor="middle"
              >
                {signNum}
              </text>
              {/* Planets */}
              {renderPlanetsText(houseNum, pos.planets.x, pos.planets.y)}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif text-black font-bold tracking-tight">{t.title}</h1>
        <p className="text-sm sm:text-base text-neutral-500 font-medium max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {!result ? (
        /* INPUT FORM SCREEN */
        <Card className="border border-zinc-150 bg-white shadow-sm rounded-2xl !overflow-visible">
          <CardHeader className="border-b border-zinc-150 pb-4">
            <CardTitle className="text-lg font-bold text-black uppercase tracking-wider flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2C27A] inline-block animate-pulse" />
              {t.formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{t.nameLabel}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{t.dateLabel}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{t.timeLabel}</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                {/* City Lookup Autocomplete */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{t.cityLabel}</Label>
                  <CityAutocomplete
                    defaultValue={formData.cityName}
                    onSelect={handleCitySelect}
                    onChangeName={(name) => setFormData((prev) => ({ ...prev, cityName: name }))}
                  />
                </div>

                {/* Timezone Select */}
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{t.timezoneLabel}</Label>
                  <Select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: parseFloat(e.target.value) })}
                  >
                    <option value={5.5}>GMT +05:30 (India/Kolkata)</option>
                    <option value={0}>GMT +00:00 (London/UTC)</option>
                    <option value={1}>GMT +01:00 (Central Europe)</option>
                    <option value={8}>GMT +08:00 (Singapore/Beijing)</option>
                    <option value={-5}>GMT -05:00 (Eastern Time USA)</option>
                    <option value={-8}>GMT -08:00 (Pacific Time USA)</option>
                    <option value={6}>GMT +06:00 (Bangladesh/Dhaka)</option>
                    <option value={5.75}>GMT +05:45 (Nepal/Kathmandu)</option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3.5 bg-[#E2C27A] hover:bg-[#E2C27A]/95 text-black font-bold rounded-full border border-transparent shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer text-sm uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? t.generating : t.submitBtn}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* RESULTS SCREEN */
        <div className="space-y-8 select-none">
          <div className="flex justify-between items-center border-b border-zinc-150 pb-4">
            <h2 className="text-xl sm:text-2xl font-serif text-black font-bold uppercase tracking-tight">{t.resultsTitle}</h2>
            <button
              onClick={() => {
                setResult(null);
                setFormData({
                  name: "",
                  date: "",
                  time: "",
                  cityName: "",
                  latitude: 28.6139,
                  longitude: 77.2090,
                  timezone: 5.5,
                });
              }}
              className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-black font-bold border border-zinc-200 rounded-full shadow-sm hover:shadow transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              {t.backBtn}
            </button>
          </div>

          {/* Details Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#FFE4A0]/20 border border-amber-200 rounded-2xl shadow-sm text-center py-6">
              <CardHeader className="p-0">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-550">
                  {t.lagnaCard}
                </span>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <span className="text-2xl font-sans text-black font-bold uppercase">{result.lagna}</span>
              </CardContent>
            </Card>

            <Card className="bg-[#E5D5FF]/20 border border-purple-200 rounded-2xl shadow-sm text-center py-6">
              <CardHeader className="p-0">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-550">
                  {t.rashiCard}
                </span>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <span className="text-2xl font-sans text-black font-bold uppercase">{result.rashi}</span>
              </CardContent>
            </Card>

            <Card className="bg-[#FFD0C8]/20 border border-rose-200 rounded-2xl shadow-sm text-center py-6">
              <CardHeader className="p-0">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-550">
                  {t.degreeCard}
                </span>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <span className="text-2xl font-mono text-black font-bold">
                  {result.ascendantDegree.toFixed(2)}°
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Main Visual Panels (Chart vs Details) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SVG Lagna Chart */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-4">
              <h3 className="text-base font-bold text-black uppercase font-serif tracking-tight">{t.chartTitle}</h3>
              {renderSVGChart(result)}
            </div>

            {/* Tabbed Info Panel */}
            <div className="lg:col-span-7 space-y-5">
              {/* Tab Toggles */}
              <div className="flex gap-3 bg-neutral-100/80 p-1 rounded-xl w-fit border border-neutral-200/50">
                <button
                  className={cn(
                    "px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all cursor-pointer shadow-sm",
                    activeTab === "positions"
                      ? "bg-white text-black border-zinc-200"
                      : "bg-transparent text-neutral-500 border-transparent hover:text-black"
                  )}
                  onClick={() => setActiveTab("positions")}
                >
                  {t.detailsTab}
                </button>
                <button
                  className={cn(
                    "px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all cursor-pointer shadow-sm",
                    activeTab === "dasha"
                      ? "bg-white text-black border-zinc-200"
                      : "bg-transparent text-neutral-500 border-transparent hover:text-black"
                  )}
                  onClick={() => setActiveTab("dasha")}
                >
                  {t.dashaTab}
                </button>
              </div>

              {activeTab === "positions" ? (
                /* Tab 1: Planet Positions */
                <div className="overflow-x-auto rounded-2xl border border-zinc-150 bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-zinc-100 text-sm">
                    <thead className="bg-[#FFF9E6]/50 text-neutral-700 text-xs font-bold uppercase tracking-wider border-b border-zinc-100">
                      <tr>
                        <th className="px-4 py-3.5 text-left border-r border-zinc-100">{t.planetHeaderName}</th>
                        <th className="px-4 py-3.5 text-left border-r border-zinc-100">{t.planetHeaderRashi}</th>
                        <th className="px-4 py-3.5 text-left border-r border-zinc-100">{t.planetHeaderDegree}</th>
                        <th className="px-4 py-3.5 text-left border-r border-zinc-100">{t.planetHeaderHouse}</th>
                        <th className="px-4 py-3.5 text-left">{t.planetHeaderStatus}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-neutral-800">
                      {result.planets.map((p, idx) => (
                        <tr key={idx} className="hover:bg-[#FFF9E6]/25 transition-colors font-sans">
                          <td className="px-4 py-3 font-bold text-black border-r border-zinc-100">{p.name}</td>
                          <td className="px-4 py-3 text-neutral-700 font-bold border-r-zinc-100 border-r">{p.rashi}</td>
                          <td className="px-4 py-3 font-mono border-r border-zinc-100">{p.degree.toFixed(2)}°</td>
                          <td className="px-4 py-3 font-mono border-r border-zinc-100">{p.house}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border inline-block",
                                p.retrograde
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              )}
                            >
                              {p.retrograde ? t.retrograde : t.direct}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Tab 2: Vimshottari Dasha periods */
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                  {result.dashas.map((dasha, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl border border-zinc-150 bg-white shadow-sm hover:bg-[#FFF9E6]/10 transition-all font-sans"
                    >
                      <div className="space-y-1">
                        <span className="text-sm font-bold uppercase tracking-wider text-black font-serif">
                          {dasha.lord} Maha Dasha
                        </span>
                      </div>
                      <div className="text-right text-xs space-y-1 font-mono text-neutral-700 font-medium">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider mr-1 text-neutral-400">{t.dashaStart}:</span>
                          {dasha.start}
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider mr-1 text-neutral-400">{t.dashaEnd}:</span>
                          {dasha.end}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
