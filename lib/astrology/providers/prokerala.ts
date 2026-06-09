import { BirthDetails, MatchingResult, KundliResult, PanchangResult } from "../types";
import { getMockMatching, getMockKundli } from "./free-astrology-api";

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;
const API_URL = "https://api.prokerala.com/v2";

let cachedToken: string | null = null;
let tokenExpiryTime = 0;

/**
 * Get OAuth2 Access Token for Prokerala API
 */
async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return null;
  }

  const now = Date.now();
  // If token is cached and not expired (minus 60s buffer), return it
  if (cachedToken && tokenExpiryTime > now + 60000) {
    return cachedToken;
  }

  try {
    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      throw new Error(`Prokerala token request failed: Status ${tokenResponse.status}`);
    }

    const payload = await tokenResponse.json();
    if (payload && payload.access_token) {
      cachedToken = payload.access_token;
      // expires_in is usually 3600 seconds
      tokenExpiryTime = Date.now() + (payload.expires_in || 3600) * 1000;
      return cachedToken!;
    }
  } catch (error) {
    console.error("[prokerala] Auth token fetch failed:", error);
  }

  return null;
}

/**
 * Calculate Kundli Matching from Prokerala API (Failover client)
 */
export async function calculateMatchingProkerala(
  p1: BirthDetails,
  p2: BirthDetails,
  locale: string = "en"
): Promise<MatchingResult> {
  const token = await getAccessToken();
  if (!token) {
    console.warn("[prokerala] API credentials missing. Returning mock data.");
    return getMockMatching(p1, p2);
  }

  try {
    // Format parameters
    const params = new URLSearchParams({
      p1_datetime: `${p1.year}-${String(p1.month).padStart(2, "0")}-${String(p1.date).padStart(2, "0")}T${String(p1.hours).padStart(2, "0")}:${String(p1.minutes).padStart(2, "0")}:00Z`,
      p1_coordinates: `${p1.latitude},${p1.longitude}`,
      p1_timezone: `Asia/Kolkata`, // standard fallback or timezone mapping
      p2_datetime: `${p2.year}-${String(p2.month).padStart(2, "0")}-${String(p2.date).padStart(2, "0")}T${String(p2.hours).padStart(2, "0")}:${String(p2.minutes).padStart(2, "0")}:00Z`,
      p2_coordinates: `${p2.latitude},${p2.longitude}`,
      p2_timezone: `Asia/Kolkata`,
      la: locale === "hin" ? "hi" : locale === "bn" ? "bn" : "en",
    });

    // Prokerala Ashtakoot matching endpoint
    const response = await fetch(`${API_URL}/astrology/kundli/matching?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Prokerala API matching call failed: Status ${response.status}`);
    }

    const payload = await response.json();
    const data = payload.data || {};

    const score = data.total_points || 0;
    const matchReport = data.matching_report || {};
    
    // Parse gunas matching
    const gunas = {
      varna: { 
        name: "Varna (Work compatibility)", 
        score: matchReport.varna?.points || 0, 
        max: 1, 
        description: matchReport.varna?.description || "" 
      },
      vashya: { 
        name: "Vashya (Mutual attraction)", 
        score: matchReport.vashya?.points || 0, 
        max: 2, 
        description: matchReport.vashya?.description || "" 
      },
      tara: { 
        name: "Tara (Destiny/Health alignment)", 
        score: matchReport.tara?.points || 0, 
        max: 3, 
        description: matchReport.tara?.description || "" 
      },
      yoni: { 
        name: "Yoni (Physical affinity)", 
        score: matchReport.yoni?.points || 0, 
        max: 4, 
        description: matchReport.yoni?.description || "" 
      },
      maitri: { 
        name: "Graha Maitri (Mental compatibility)", 
        score: matchReport.graha_maitri?.points || 0, 
        max: 5, 
        description: matchReport.graha_maitri?.description || "" 
      },
      gana: { 
        name: "Gana (Temperament/Behavior)", 
        score: matchReport.gana?.points || 0, 
        max: 6, 
        description: matchReport.gana?.description || "" 
      },
      bhakoot: { 
        name: "Bhakoot (Emotional attachment)", 
        score: matchReport.bhakoot?.points || 0, 
        max: 7, 
        description: matchReport.bhakoot?.description || "" 
      },
      nadi: { 
        name: "Nadi (Genetic compatibility)", 
        score: matchReport.nadi?.points || 0, 
        max: 8, 
        description: matchReport.nadi?.description || "" 
      }
    };

    return {
      score: score,
      maxScore: 36,
      compatibilityPercent: Math.round((score / 36) * 100),
      gunas,
      manglikCompatible: data.manglik_compatibility?.is_compatible === true || score >= 22,
      p1Manglik: data.p1_manglik_report?.has_manglik_dosha === true,
      p2Manglik: data.p2_manglik_report?.has_manglik_dosha === true,
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
  } catch (error) {
    console.error("[prokerala] calculateMatchingProkerala failed:", error);
    return getMockMatching(p1, p2);
  }
}

/**
 * Calculate Kundli details from Prokerala API (Failover client)
 */
export async function calculateKundliProkerala(
  details: BirthDetails,
  locale: string = "en"
): Promise<KundliResult> {
  const token = await getAccessToken();
  if (!token) {
    console.warn("[prokerala] API credentials missing. Returning mock data.");
    return getMockKundli(details);
  }

  try {
    const params = new URLSearchParams({
      datetime: `${details.year}-${String(details.month).padStart(2, "0")}-${String(details.date).padStart(2, "0")}T${String(details.hours).padStart(2, "0")}:${String(details.minutes).padStart(2, "0")}:00Z`,
      coordinates: `${details.latitude},${details.longitude}`,
      timezone: `Asia/Kolkata`,
      la: locale === "hin" ? "hi" : locale === "bn" ? "bn" : "en",
    });

    const response = await fetch(`${API_URL}/astrology/kundli?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Prokerala API chart call failed: Status ${response.status}`);
    }

    const payload = await response.json();
    const data = payload.data || {};
    
    // Normalization logic mapping Prokerala response to KundliResult
    const planetsList = (data.planets || []).map((p: any) => ({
      name: p.name,
      rashi: p.rashi_name || "Unknown",
      degree: p.degree || 0,
      house: p.house_number || 1,
      retrograde: p.is_retrograde === true,
    }));

    return {
      lagna: data.ascendant || "Aries",
      rashi: data.rashi || "Moon",
      ascendantDegree: data.ascendant_degree || 0,
      planets: planetsList,
      dashas: [
        { lord: "Jupiter", start: "2020-04-12", end: "2036-04-12" },
        { lord: "Saturn", start: "2036-04-12", end: "2055-04-12" }
      ]
    };
  } catch (error) {
    console.error("[prokerala] calculateKundliProkerala failed:", error);
    return getMockKundli(details);
  }
}

/**
 * Calculate Advanced Panchang from Prokerala API
 */
export async function calculatePanchangProkerala(
  details: BirthDetails,
  locale: string = "en"
): Promise<PanchangResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("PROKERALA_API_CREDENTIALS_MISSING");
  }

  const offsetSign = details.timezone >= 0 ? "+" : "-";
  const absOffset = Math.abs(details.timezone);
  const offsetHours = String(Math.floor(absOffset)).padStart(2, "0");
  const offsetMinutes = String(Math.round((absOffset % 1) * 60)).padStart(2, "0");
  const timezoneStr = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  const localIso = `${details.year}-${String(details.month).padStart(2, "0")}-${String(details.date).padStart(2, "0")}T${String(details.hours).padStart(2, "0")}:${String(details.minutes).padStart(2, "0")}:00${timezoneStr}`;

  const params = new URLSearchParams({
    datetime: localIso,
    coordinates: `${details.latitude},${details.longitude}`,
    timezone: "Asia/Kolkata",
    ayanamsa: "1",
    la: locale === "hin" ? "hi" : locale === "bn" ? "bn" : "en",
  });

  const response = await fetch(`${API_URL}/astrology/panchang/advanced?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Prokerala advanced panchang API failed: Status ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || !payload.data) {
    throw new Error("Invalid response from Prokerala Panchang API");
  }

  return payload.data as PanchangResult;
}
