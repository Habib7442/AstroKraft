# AstroKraft — Project Overview

## Overview

AstroKraft is a premium, bilingual-first pan-India astrology and gemstone platform. Rebuilt from a legacy PHP regional site into a modern Next.js application, AstroKraft utilizes a two-engine model: a virality/acquisition engine offering beautiful, free, and shareable interactive tools (such as Guna Milan and daily horoscopes) to drive organic SEO and WhatsApp/social traffic, and a monetization engine consisting of expert consultations, certified gemstones, Vastu consultations, and purohit booking services.

## Goals

1. **Establish Pan-India Reach**: Expand beyond Northeast India with a fully responsive multilingual system (launching with English, Hindi, and Bengali, followed by Tamil, Telugu, and Marathi).
2. **Build a Viral Funnel**: Achieve high conversion from free calculators (especially the mobile-native Kundli Matching result card) to paid consultations and gemstone purchases.
3. **Ensure Premium Brand Perception**: Distinguish the platform visually and functionally from cluttered competitors (e.g. AstroSage, AstroTalk) by executing the "Celestial Royale" design system.
4. **Deliver High Performance**: Ensure Core Web Vitals are rated "Good" on mobile, the dominant platform for users.

## Core User Flow

1. **Calculators & Free Entry**: The user lands on `/tools/matching` or receives a shared matching link via WhatsApp.
2. **Birth Detail Input**: The user inputs details for both partners (birth date, time, location resolved via autocomplete).
3. **Interactive Score Reveal**: The system calculates the Guna score and displays an animated, mobile-native result card (e.g., 28/36 with dosha status).
4. **Social Sharing**: With one tap, the user shares the result card or a summary link to WhatsApp or social platforms.
5. **Monetization Hand-off**: The user sees soft CTAs to download a detailed premium report (₹99) or consult a featured astrologer.

## Features

### Interactive Tools (Acquisition Engine)
*   **Kundli / Birth Chart**: Generates Lagna, Rashi, Navamsa, planetary houses, dasha, and basic predictions.
*   **Kundli Matching (Guna Milan)**: Ashtakoot 36-guna calculation, Manglik/Nadi/Bhakoot dosha checkers, and mobile-native shareable results card.
*   **Daily Rashifol**: Dynamic horoscope per zodiac sign, multi-language, shareable card, and WhatsApp opt-in.
*   **Panchang & Subh Muhurat**: Daily panchang (tithi, nakshatra, yoga) and calendar for auspicious dates (griharombho, bibaho, vehicle booking).
*   **Tarot & Numerology**: Quick 1-card/3-card draws and name/date of birth calculators.

### Marketplace (Monetization Engine)
*   **Talk to Astrologer**: Directory and verified profiles with filterable languages/specialties. User books a session leading to a WhatsApp/chat hand-off.
*   **Gemstone Store**: Certified gemstones catalog, recommendations based on birth chart, cart, and Razorpay checkout.
*   **Purohit & Vastu**: Booking portal for ritual services (vastu shanti pooja, griha pravesh) and Vastu home plan blueprints.

## Scope

### In Scope
*   Next.js (App Router) multilingual structure (`next-intl`) for English, Hindi, and Bengali.
*   Integrating astrology APIs (FreeAstrologyAPI & Prokerala) behind an abstracted cache layer.
*   Interactive matching, kundli, daily rashifol, and panchang tools with custom SVG rendering.
*   Astrologer profiles and reviews.
*   Gemstone catalog, recommendation tool, shopping cart, and Razorpay integration.
*   Authentication (OTP / Google Login) and user dashboard for saved charts/bookings.

### Out of Scope
*   Native iOS and Android mobile apps (launching as a responsive PWA first).
*   In-house live video call/streaming infrastructure (using chat/call hand-off or WhatsApp business endpoints instead).
*   Custom astrologer CRM backend (utilizing a lightweight dashboard/admin portal).

## Success Criteria

1. **LCP & Performance**: LCP under 2.5s on mobile networks.
2. **Deterministic Caching**: 0 redundant API calls for identical birth details by using hash-keyed Redis/Next.js data caching.
3. **Engagement**: Successful generation and download/share of the Guna Milan result card.
4. **Checkout**: Razorpay payment processing completes without error.
