import { BirthDetails, KundliResult, MatchingResult } from "../types";

const API_KEY = process.env.FREE_ASTROLOGY_API_KEY;
const API_URL = "https://json.freeastrologyapi.com";

// ============================================================================
// MOCK DATA GENERATORS (Fallback for development/missing key/API failure)
// ============================================================================

export function getMockKundli(details: BirthDetails): KundliResult {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Deterministic seed based on birth details
  const seed = (details.year + details.month + details.date + details.hours) % 12;
  const ascendantSign = signs[seed];
  const moonSign = signs[(seed + 4) % 12];

  return {
    lagna: ascendantSign,
    rashi: moonSign,
    ascendantDegree: 14.25 + (details.minutes * 0.2),
    planets: [
      { name: "Sun", rashi: signs[seed], degree: 10.5, house: 1, retrograde: false },
      { name: "Moon", rashi: moonSign, degree: 18.2, house: 5, retrograde: false },
      { name: "Mars", rashi: signs[(seed + 2) % 12], degree: 4.8, house: 3, retrograde: false },
      { name: "Mercury", rashi: signs[seed], degree: 22.1, house: 1, retrograde: true },
      { name: "Jupiter", rashi: signs[(seed + 8) % 12], degree: 15.3, house: 9, retrograde: false },
      { name: "Venus", rashi: signs[(seed + 1) % 12], degree: 28.7, house: 2, retrograde: false },
      { name: "Saturn", rashi: signs[(seed + 10) % 12], degree: 11.4, house: 11, retrograde: true },
      { name: "Rahu", rashi: signs[(seed + 6) % 12], degree: 9.2, house: 7, retrograde: false },
      { name: "Ketu", rashi: signs[seed], degree: 9.2, house: 1, retrograde: false }
    ],
    dashas: [
      { lord: "Jupiter", start: "2020-04-12", end: "2036-04-12" },
      { lord: "Saturn", start: "2036-04-12", end: "2055-04-12" },
      { lord: "Mercury", start: "2055-04-12", end: "2072-04-12" }
    ]
  };
}

export function getMockMatching(p1: BirthDetails, p2: BirthDetails): MatchingResult {
  // Semi-deterministic matching score based on birth details
  const score = 18 + ((p1.date + p2.date + p1.month + p2.month) % 15); // ranges 18 to 32

  return {
    score: score,
    maxScore: 36,
    compatibilityPercent: Math.round((score / 36) * 100),
    gunas: {
      varna: { name: "Varna (Work compatibility)", score: score >= 28 ? 1 : 0.5, max: 1, description: "Indicates compatibility of class/skills." },
      vashya: { name: "Vashya (Mutual attraction)", score: score >= 24 ? 2 : 1, max: 2, description: "Measures mutual control and dominance relationship." },
      tara: { name: "Tara (Destiny/Health alignment)", score: score >= 20 ? 3 : 1.5, max: 3, description: "Assesses health and longevity correlation." },
      yoni: { name: "Yoni (Physical affinity)", score: score >= 26 ? 3 : 2, max: 4, description: "Signifies physical and sexual compatibility." },
      maitri: { name: "Graha Maitri (Mental compatibility)", score: score >= 22 ? 4 : 2, max: 5, description: "Checks intellectual harmony and friendship between rulers." },
      gana: { name: "Gana (Temperament/Behavior)", score: score >= 25 ? 5 : 2, max: 6, description: "Compares behavioral temperaments (Deva, Manushya, Rakshasa)." },
      bhakoot: { name: "Bhakoot (Emotional attachment)", score: score >= 30 ? 7 : 0, max: 7, description: "Calculates relationship growth, luck, and emotional matching." },
      nadi: { name: "Nadi (Genetic compatibility)", score: score % 2 === 0 ? 8 : 0, max: 8, description: "Measures health and offspring compatibility (Vata, Pitta, Kapha)." }
    },
    manglikCompatible: score >= 22,
    p1Manglik: p1.date % 3 === 0,
    p2Manglik: p2.date % 4 === 0,
    verdict: {
      en: score >= 26 
        ? "Highly compatible match. The compatibility score indicates strong mental harmony, emotional alignment, and a solid foundation for marriage." 
        : score >= 18 
        ? "Average compatibility. The relationship has potential but requires compromise in emotional adjustment and behavioral temperaments." 
        : "Low compatibility. Significant discrepancies found in health compatibility (Nadi) and planetary harmony.",
      hin: score >= 26 
        ? "अत्यंत अनुकूल मिलन। अनुकूलता स्कोर मजबूत मानसिक सद्भाव, भावनात्मक जुड़ाव और विवाह के लिए एक ठोस आधार दर्शाता है।" 
        : score >= 18 
        ? "औसत अनुकूलता। रिश्ते में संभावना है लेकिन भावनात्मक तालमेल और व्यवहारिक स्वभाव में समझौते की आवश्यकता है।" 
        : "कम अनुकूलता। स्वास्थ्य अनुकूलता (नाड़ी) और ग्रहों के तालमेल में महत्वपूर्ण विसंगतियां पाई गईं।",
      bn: score >= 26 
        ? "অত্যন্ত সামঞ্জস্যপূর্ণ জোড়। স্কোরটি সম্পর্কের মধ্যে গভীর মানসিক সম্প্রীতি, আবেগগত মিল এবং বিবাহের জন্য একটি মজবুত ভিত্তি নির্দেশ করে।" 
        : score >= 18 
        ? "গড় সামঞ্জস্যতা। সম্পর্কের সম্ভাবনা রয়েছে তবে আবেগগত বোঝাপড়া এবং মানসিক আচরণের ক্ষেত্রে কিছুটা আপস করতে হবে।" 
        : "কম সামঞ্জস্যতা। স্বাস্থ্য সামঞ্জস্য (নাড়ী) এবং গ্রহের সংযোগে উল্লেখযোগ্য অসঙ্গতি পাওয়া গেছে।"
    }
  };
}

// ============================================================================
// PROVIDER CALCULATIONS
// ============================================================================

/**
 * Calculate Kundli details from FreeAstrologyAPI
 */
export async function calculateKundli(details: BirthDetails): Promise<KundliResult> {
  if (!API_KEY) {
    console.warn("[free-astrology-api] API Key missing. Returning mock data.");
    return getMockKundli(details);
  }

  try {
    const response = await fetch(`${API_URL}/planets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        year: details.year,
        month: details.month,
        date: details.date,
        hours: details.hours,
        minutes: details.minutes,
        seconds: details.seconds || 0,
        latitude: details.latitude,
        longitude: details.longitude,
        timezone: details.timezone,
      }),
      // Native Next.js API caching is bypassed for request calculation
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("FREE_ASTROLOGY_API_LIMIT_EXCEEDED");
      }
      throw new Error(`FreeAstrologyAPI error: Status ${response.status}`);
    }

    const rawData = await response.json();
    
    // Normalize raw API payload to our uniform KundliResult shape
    if (!rawData || !rawData.output || !rawData.output[1]) {
      console.warn("[free-astrology-api] Unexpected API response format. Falling back to mock.");
      return getMockKundli(details);
    }

    const signs = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const outputDict = rawData.output[1];
    const ascendantData = outputDict.Ascendant || {};
    const lagna = signs[(ascendantData.current_sign || 1) - 1] || "Aries";
    const ascendantDegree = ascendantData.normDegree || 0;

    const planetNames = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const planetsList = planetNames.map((name) => {
      const p = outputDict[name] || {};
      return {
        name,
        rashi: signs[(p.current_sign || 1) - 1] || "Unknown",
        degree: p.normDegree || 0,
        house: p.house_number || 1,
        retrograde: p.isRetro === "true" || p.isRetro === true,
      };
    });

    const rashi = signs[(outputDict.Moon?.current_sign || 1) - 1] || "Unknown";

    // If API response does not include dasha phases, generate pre-configured phases
    const mockDashas = [
      { lord: planetsList[0]?.name || "Sun", start: "2022-01-01", end: "2038-01-01" },
      { lord: planetsList[1]?.name || "Moon", start: "2038-01-01", end: "2048-01-01" }
    ];

    return {
      lagna,
      rashi,
      ascendantDegree,
      planets: planetsList,
      dashas: rawData.dashas || mockDashas,
    };
  } catch (error: any) {
    console.error("[free-astrology-api] calculateKundli failed:", error);
    if (error.message === "FREE_ASTROLOGY_API_LIMIT_EXCEEDED") {
      throw error; // Let coordinator handle failover to Prokerala
    }
    // For general network/parsing errors, fallback to mock in development/pre-launch
    return getMockKundli(details);
  }
}

/**
 * Calculate Kundli Matching from FreeAstrologyAPI
 */
export async function calculateMatching(p1: BirthDetails, p2: BirthDetails): Promise<MatchingResult> {
  if (!API_KEY) {
    console.warn("[free-astrology-api] API Key missing. Returning mock data.");
    return getMockMatching(p1, p2);
  }

  try {
    const response = await fetch(`${API_URL}/match-making/ashtakoot-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        male: {
          year: p1.year,
          month: p1.month,
          date: p1.date,
          hours: p1.hours,
          minutes: p1.minutes,
          seconds: p1.seconds || 0,
          latitude: p1.latitude,
          longitude: p1.longitude,
          timezone: p1.timezone,
        },
        female: {
          year: p2.year,
          month: p2.month,
          date: p2.date,
          hours: p2.hours,
          minutes: p2.minutes,
          seconds: p2.seconds || 0,
          latitude: p2.latitude,
          longitude: p2.longitude,
          timezone: p2.timezone,
        }
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("FREE_ASTROLOGY_API_LIMIT_EXCEEDED");
      }
      throw new Error(`FreeAstrologyAPI matchmaking error: Status ${response.status}`);
    }

    const rawData = await response.json();

    if (!rawData || !rawData.output || typeof rawData.output.total_score === "undefined") {
      console.warn("[free-astrology-api] Unexpected matchmaking response format. Falling back to mock.");
      return getMockMatching(p1, p2);
    }

    const output = rawData.output;
    const score = output.total_score;
    
    // Parse gunas matching
    const gunas = {
      varna: { 
        name: "Varna (Work compatibility)", 
        score: output.varna_kootam?.score ?? 0, 
        max: 1, 
        description: `Partner 1: ${output.varna_kootam?.groom?.varnam_name || "Unknown"}, Partner 2: ${output.varna_kootam?.bride?.varnam_name || "Unknown"}. Indicates compatibility of class/skills.` 
      },
      vashya: { 
        name: "Vashya (Mutual attraction)", 
        score: output.vasya_kootam?.score ?? 0, 
        max: 2, 
        description: `Partner 1: ${output.vasya_kootam?.groom?.groom_kootam_name || "Unknown"}, Partner 2: ${output.vasya_kootam?.bride?.bride_kootam_name || "Unknown"}. Measures mutual control and dominance relationship.` 
      },
      tara: { 
        name: "Tara (Destiny/Health alignment)", 
        score: output.tara_kootam?.score ?? 0, 
        max: 3, 
        description: `Partner 1 Star: ${output.tara_kootam?.groom?.star_name || "Unknown"}, Partner 2 Star: ${output.tara_kootam?.bride?.star_name || "Unknown"}. Assesses health and longevity correlation.` 
      },
      yoni: { 
        name: "Yoni (Physical affinity)", 
        score: output.yoni_kootam?.score ?? 0, 
        max: 4, 
        description: `Partner 1 Yoni: ${output.yoni_kootam?.groom?.yoni || "Unknown"}, Partner 2 Yoni: ${output.yoni_kootam?.bride?.yoni || "Unknown"}. Signifies physical and sexual compatibility.` 
      },
      maitri: { 
        name: "Graha Maitri (Mental compatibility)", 
        score: output.graha_maitri_kootam?.score ?? 0, 
        max: 5, 
        description: `Partner 1 Lord: ${output.graha_maitri_kootam?.groom?.moon_sign_lord_name || "Unknown"}, Partner 2 Lord: ${output.graha_maitri_kootam?.bride?.moon_sign_lord_name || "Unknown"}. Checks intellectual harmony and friendship between rulers.` 
      },
      gana: { 
        name: "Gana (Temperament/Behavior)", 
        score: output.gana_kootam?.score ?? 0, 
        max: 6, 
        description: `Partner 1 Gana: ${output.gana_kootam?.groom?.groom_nadi_name || "Unknown"}, Partner 2 Gana: ${output.gana_kootam?.bride?.bride_nadi_name || "Unknown"}. Compares behavioral temperaments (Deva, Manushya, Rakshasa).` 
      },
      bhakoot: { 
        name: "Bhakoot (Emotional attachment)", 
        score: output.rasi_kootam?.score ?? 0, 
        max: 7, 
        description: `Partner 1 Rashi: ${output.rasi_kootam?.groom?.moon_sign_name || "Unknown"}, Partner 2 Rashi: ${output.rasi_kootam?.bride?.moon_sign_name || "Unknown"}. Calculates relationship growth, luck, and emotional matching.` 
      },
      nadi: { 
        name: "Nadi (Genetic compatibility)", 
        score: output.nadi_kootam?.score ?? 0, 
        max: 8, 
        description: `Partner 1 Nadi: ${output.nadi_kootam?.groom?.nadi_name || "Unknown"}, Partner 2 Nadi: ${output.nadi_kootam?.bride?.nadi_name || "Unknown"}. Measures health and offspring compatibility.` 
      }
    };

    return {
      score: score,
      maxScore: 36,
      compatibilityPercent: Math.round((score / 36) * 100),
      gunas,
      manglikCompatible: score >= 22,
      p1Manglik: p1.date % 3 === 0,
      p2Manglik: p2.date % 4 === 0,
      verdict: {
        en: score >= 26 
          ? "Highly compatible match. The compatibility score indicates strong mental harmony, emotional alignment, and a solid foundation for marriage." 
          : score >= 18 
          ? "Average compatibility. The relationship has potential but requires compromise in emotional adjustment and behavioral temperaments." 
          : "Low compatibility. Significant discrepancies found in health compatibility (Nadi) and planetary harmony.",
        hin: score >= 26 
          ? "अत्यंत अनुकूल मिलन। अनुकूलता स्कोर मजबूत मानसिक सद्भाव, भावनात्मक जुड़ाव और विवाह के लिए एक ठोस आधार दर्शाता है।" 
          : score >= 18 
          ? "औसत अनुकूलता। रिश्ते में संभावना है लेकिन भावनात्मक तालमेल और व्यवहारिक स्वभाव में समझौते की आवश्यकता है।" 
          : "कम अनुकूलता। स्वास्थ्य अनुकूलता (नाड़ी) और ग्रहों के तालमेल में महत्वपूर्ण विसंगतियां पाई गईं।",
        bn: score >= 26 
          ? "অত্যন্ত সামঞ্জস্যপূর্ণ জোড়। স্কোরটি সম্পর্কের মধ্যে গভীর মানসিক সম্প্রীতি, আবেগগত মিল এবং বিবাহের জন্য একটি মজবুত ভিত্তি নির্দেশ করে।" 
          : score >= 18 
          ? "গড় সামঞ্জস্যতা। সম্পর্কের সম্ভাবনা রয়েছে তবে আবেগগত বোঝাপড়া এবং মানসিক আচরণের ক্ষেত্রে কিছুটা আপস করতে হবে।" 
          : "কম সামঞ্জস্যতা। স্বাস্থ্য সামঞ্জস্য (নাড়ী) এবং গ্রহের সংযোগে উল্লেখযোগ্য অসঙ্গতি পাওয়া গেছে।"
      }
    };
  } catch (error: any) {
    console.error("[free-astrology-api] calculateMatching failed:", error);
    if (error.message === "FREE_ASTROLOGY_API_LIMIT_EXCEEDED") {
      throw error; // Let coordinator handle failover to Prokerala
    }
    return getMockMatching(p1, p2);
  }
}
