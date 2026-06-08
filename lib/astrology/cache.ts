import { createHash } from "crypto";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Local in-memory fallback cache for development/missing credentials
const memoryCache = new Map<string, string>();

/**
 * Generate a deterministic hash key for cached calculations
 */
export function generateCacheKey(
  tool: "kundli" | "matching" | "horoscope" | "panchang",
  inputs: Record<string, unknown>
): string {
  // Normalize inputs (sort keys, trim string spaces, round coordinate precision to 3 decimals)
  const normalizedInputs: Record<string, unknown> = {};
  
  const sortedKeys = Object.keys(inputs).sort();
  for (const key of sortedKeys) {
    const val = inputs[key];
    if (typeof val === "string") {
      normalizedInputs[key] = val.trim().toLowerCase();
    } else if (typeof val === "number") {
      // Round coordinate precision to 3 decimal places (approx. 110 meters)
      if (key === "latitude" || key === "longitude" || key === "lat" || key === "lng" || key === "p1_latitude" || key === "p1_longitude" || key === "p2_latitude" || key === "p2_longitude") {
        normalizedInputs[key] = Math.round(val * 1000) / 1000;
      } else {
        normalizedInputs[key] = val;
      }
    } else {
      normalizedInputs[key] = val;
    }
  }

  const normalizedStr = JSON.stringify(normalizedInputs);
  const hash = createHash("sha256").update(normalizedStr).digest("hex").slice(0, 16);
  return `astrology:${tool}:${hash}`;
}

/**
 * Get cached item from Upstash Redis or local memory cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      const response = await fetch(`${UPSTASH_URL}/get/${key}`, {
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
        },
        cache: "no-store",
      });
      
      if (response.ok) {
        const payload = await response.json();
        // Upstash /get endpoint returns { result: string | null }
        if (payload && typeof payload.result === "string") {
          return JSON.parse(payload.result) as T;
        }
      }
    }
  } catch (error) {
    console.error(`[astrology/cache] Redis GET error for key ${key}:`, error);
  }

  // Fallback to local memory cache
  const localVal = memoryCache.get(key);
  if (localVal) {
    return JSON.parse(localVal) as T;
  }
  return null;
}

/**
 * Save item to Upstash Redis or local memory cache
 */
export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds?: number
): Promise<boolean> {
  const serialized = JSON.stringify(value);

  // Set memory cache first as fallback
  memoryCache.set(key, serialized);

  try {
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      // Use command REST endpoint to support EX parameters
      const command = ["SET", key, serialized];
      if (ttlSeconds && ttlSeconds > 0) {
        command.push("EX", ttlSeconds.toString());
      }

      const response = await fetch(`${UPSTASH_URL}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
      });

      if (response.ok) {
        return true;
      }
    }
  } catch (error) {
    console.error(`[astrology/cache] Redis SET error for key ${key}:`, error);
  }

  return false;
}
