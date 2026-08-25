# AstroKraft — Website Fix List

Site: astrokraft.online · Stack: Next.js (React) · Prepared 25 Aug 2026

Priority order. Fix #1 before doing any SEO work — it blocks everything else.

---

## 1. Canonical bug — CRITICAL (blocks all SEO)

**Problem:** Every product page carries a canonical tag pointing to the homepage
(`https://www.astrokraft.online/en/`). This tells Google that every product page
*is* the homepage, so Google refuses to index the individual gemstone / rudraksha /
product pages. No product page can rank until this is fixed.

**Fix:** Each page must self-canonicalize — its canonical URL must be its own URL.

- App Router: set canonical per route via the `metadata` / `generateMetadata` export
  using `alternates.canonical` with that page's own path.
- Pages Router: render a `<link rel="canonical" href={currentPageUrl} />` in the head
  built from the actual page path, not a hardcoded homepage string.
- Product/category/tool pages must each output their own canonical.
- After deploy, verify: open a product page, view source, confirm the canonical
  matches that page's URL — not the homepage.
- Then submit the sitemap in Google Search Console and request indexing on a few
  product pages.

**Check the whole site for the same hardcoded canonical** — if it was set globally,
gemstones, rudraksha, bracelets, vastu-products, blog and tools pages all have it too.

---

## 2. Broken pages (404s) — HIGH

These are linked in the footer but return "page not found":

- `/en/contact` (Contact Us)
- `/en/about` (About Us)
- `/en/vastu` (Vastu Consultant — footer links here; the working path may be
  `/en/vastu-products`)

**Fix:**
- Build the Contact and About pages, OR remove the dead footer links until they exist.
- Point the footer "Vastu Consultant" link to the correct existing path.
- Contact and About are trust pages people open right before reaching out — a dead
  end here loses buyers and hurts SEO.

---

## 3. Footer / social link fixes — MEDIUM

- **Instagram handle mismatch:** footer links to `astro.kraft` but the brand's actual
  handle appears as `astro_kraft`. Point it to the correct, active handle.
- **Phone consistency:** use ONE number across the whole site, and make it match the
  Google Business Profile, Udyam certificate, and WhatsApp. (Currently different
  numbers appear in different places.) Standardize on: +91 69132 30255 (confirm this
  is the right one first).
- Confirm the footer email is correct and monitored.

---

## 4. Local SEO on-page — MEDIUM

**Problem:** The site never names its city — footer just says "India". Google shows
local businesses to nearby people only when it knows where they are. Right now the
site competes with every gemstone site in the country instead of winning Silchar.

**Fix:**
- Add location text to the homepage and footer: "Silchar, Cachar, Barak Valley, Assam".
- Add the physical address (Rangirkhari) in the footer.
- Add `LocalBusiness` structured data (JSON-LD) with name (AstroKraft), address,
  phone, geo, hours, and URL. This is what powers the local/map result.
- Mention the city naturally in the homepage hero copy and About page.

---

## 5. Product SEO — MEDIUM (do AFTER fix #1)

- **Titles & meta per product:** each product page needs a unique `<title>` and
  meta description including the English + common Hindi/regional stone name, e.g.:
  "Blue Sapphire (Neelam) — Certified Natural Gemstone | AstroKraft".
  Regional names people actually search: manik (ruby), neelam (blue sapphire),
  pukhraj (yellow sapphire), panna (emerald), moonga (red coral), gomed (hessonite).
- **Product structured data (JSON-LD):** add `Product` schema with name, image,
  description, price, and availability so products can show rich results.
- **Alt text** on every product image (stone name + "certified natural gemstone").
- Ensure each product has a real, indexable URL (depends on fix #1).

---

## 6. Homepage crawlability — CHECK

**Problem:** When the homepage HTML was fetched, it started straight at the gemstone
grid — no hero heading or main call-to-action ("Talk to an astrologer" / "Shop
certified gemstones") was present in the server HTML. If the hero is rendered only
on the client, search engines and some previews won't see it.

**Fix:**
- Make sure the hero heading, tagline, and primary CTA are server-rendered (SSR/SSG),
  not client-only.
- The homepage `<h1>` should contain the core phrase, e.g. "Certified Gemstones &
  Vedic Remedies — AstroKraft".

---

## 7. Trust & consistency polish — LOW

- "Origin: Certified" currently appears on non-gemstone items (wind chimes, crystal
  pyramids, paintings). Reserve certificate/"certified" language for items that
  actually have a lab certificate, so the real gemstone certifications stay credible.
- "Daily Horoscope" is listed in the footer but marked "coming soon" — either ship it
  or remove the link.
- Confirm Privacy Policy and Terms pages load (they're linked in the footer).

---

## Do-first summary

1. Canonical fix (#1) — unblocks all SEO. Do today.
2. 404 pages (#2) — build or remove the dead links.
3. City + LocalBusiness schema (#4) — turns on local visibility.

Everything else stacks on top of these three.