import { BirthDetails, KundliResult, MatchingResult } from "./types";
import { generateCacheKey, getCache, setCache } from "./cache";
import { calculateKundli as callFreeAstroKundli, calculateMatching as callFreeAstroMatching } from "./providers/free-astrology-api";
import { calculateKundliProkerala, calculateMatchingProkerala } from "./providers/prokerala";

/**
 * Orchestrates Kundli Birth Chart calculations with caching and Prokerala failover.
 */
export async function getKundli(
  details: BirthDetails,
  locale: string = "en"
): Promise<KundliResult> {
  const cacheKey = generateCacheKey("kundli", details);

  // 1. Check cache first
  const cached = await getCache<KundliResult>(cacheKey);
  if (cached) {
    console.log(`[astrology] Cache HIT for key: ${cacheKey}`);
    return cached;
  }

  console.log(`[astrology] Cache MISS for key: ${cacheKey}. Executing calculation...`);

  let result: KundliResult;

  try {
    // 2. Try primary provider (FreeAstrologyAPI)
    result = await callFreeAstroKundli(details);
  } catch (error: any) {
    if (error.message === "FREE_ASTROLOGY_API_LIMIT_EXCEEDED") {
      console.warn("[astrology] FreeAstrologyAPI limit exceeded. Triggering failover to Prokerala...");
      // 3. Fallback to secondary provider (Prokerala)
      result = await calculateKundliProkerala(details, locale);
    } else {
      // Re-throw or handle general errors
      throw error;
    }
  }

  // 4. Save result to cache
  await setCache(cacheKey, result);
  return result;
}

/**
 * Orchestrates Kundli Matching (Guna Milan) calculations with caching and Prokerala failover.
 */
export async function getMatching(
  p1: BirthDetails,
  p2: BirthDetails,
  locale: string = "en"
): Promise<MatchingResult> {
  // Normalize both partners details to generate cache key
  const cacheKey = generateCacheKey("matching", { p1, p2 });

  // 1. Check cache first
  const cached = await getCache<MatchingResult>(cacheKey);
  if (cached) {
    console.log(`[astrology] Cache HIT for key: ${cacheKey}`);
    return cached;
  }

  console.log(`[astrology] Cache MISS for key: ${cacheKey}. Executing matching calculation...`);

  let result: MatchingResult;

  try {
    // 2. Try primary provider (FreeAstrologyAPI)
    result = await callFreeAstroMatching(p1, p2);
  } catch (error: any) {
    if (error.message === "FREE_ASTROLOGY_API_LIMIT_EXCEEDED") {
      console.warn("[astrology] FreeAstrologyAPI limit exceeded. Triggering failover to Prokerala...");
      // 3. Fallback to secondary provider (Prokerala)
      result = await calculateMatchingProkerala(p1, p2, locale);
    } else {
      throw error;
    }
  }

  // 4. Save result to cache
  await setCache(cacheKey, result);
  return result;
}
