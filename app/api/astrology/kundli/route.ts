import { NextRequest, NextResponse } from "next/server";
import { getKundli } from "@/lib/astrology";
import { BirthDetails } from "@/lib/astrology/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request parameters
    const { year, month, date, hours, minutes, latitude, longitude, timezone } = body;
    
    if (
      typeof year !== "number" ||
      typeof month !== "number" ||
      typeof date !== "number" ||
      typeof hours !== "number" ||
      typeof minutes !== "number" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      typeof timezone !== "number"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing birth parameters. All details must be numbers." },
        { status: 400 }
      );
    }

    const birthDetails: BirthDetails = {
      year,
      month,
      date,
      hours,
      minutes,
      seconds: body.seconds || 0,
      latitude,
      longitude,
      timezone,
      cityName: body.cityName || ""
    };

    // Extract active locale from queries
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "en";

    const data = await getKundli(birthDetails, locale);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("[api/astrology/kundli] calculation failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to compute Kundli calculation. Please check inputs." },
      { status: 500 }
    );
  }
}
