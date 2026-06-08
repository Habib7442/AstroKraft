import { NextRequest, NextResponse } from "next/server";
import { getMatching } from "@/lib/astrology";
import { BirthDetails } from "@/lib/astrology/types";

function isValidBirthDetails(details: any): boolean {
  if (!details || typeof details !== "object") return false;
  const { year, month, date, hours, minutes, latitude, longitude, timezone } = details;
  return (
    typeof year === "number" &&
    typeof month === "number" &&
    typeof date === "number" &&
    typeof hours === "number" &&
    typeof minutes === "number" &&
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    typeof timezone === "number"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { p1, p2 } = body;

    if (!isValidBirthDetails(p1) || !isValidBirthDetails(p2)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing birth details for partner 1 or partner 2. Ensure all values are numeric." },
        { status: 400 }
      );
    }

    const p1Details: BirthDetails = {
      year: p1.year,
      month: p1.month,
      date: p1.date,
      hours: p1.hours,
      minutes: p1.minutes,
      seconds: p1.seconds || 0,
      latitude: p1.latitude,
      longitude: p1.longitude,
      timezone: p1.timezone,
      cityName: p1.cityName || ""
    };

    const p2Details: BirthDetails = {
      year: p2.year,
      month: p2.month,
      date: p2.date,
      hours: p2.hours,
      minutes: p2.minutes,
      seconds: p2.seconds || 0,
      latitude: p2.latitude,
      longitude: p2.longitude,
      timezone: p2.timezone,
      cityName: p2.cityName || ""
    };

    // Extract active locale from queries
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "en";

    const data = await getMatching(p1Details, p2Details, locale);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("[api/astrology/matching] matchmaking calculation failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to compute matching compatibility. Please check inputs." },
      { status: 500 }
    );
  }
}
