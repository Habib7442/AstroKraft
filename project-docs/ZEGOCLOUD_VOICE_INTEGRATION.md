# AstroKraft — ZEGOCLOUD Voice Call Integration (for the coding agent)

**Goal:** Add 1-to-1 **voice consultation calls** (astrologer ↔ customer) to the AstroKraft **website**, with **per-minute wallet billing**, astrologer **online/busy status**, and an **incoming-call ring** for the astrologer.

**Platform:** Web (Next.js App Router + React + TypeScript). ZEGOCLOUD Web SDK.
**Privacy:** Calls are in-app WebRTC over the internet — **no phone numbers exist**, so nothing is ever exchanged (no masking needed).

> ⚠️ The user linked the **iOS** overview. This spec is for the **Web** build. SDK package names/APIs evolve — **always verify against the current ZEGOCLOUD Web docs** (https://www.zegocloud.com/docs → Voice Call → Web). Treat the code below as accurate skeletons to confirm, not copy-paste-final.

---

## 0. Two SDK options (pick one)

| Option | Package | Use when |
|---|---|---|
| **A. Call Kit (prebuilt UI)** ⭐ recommended | `@zegocloud/zego-uikit-prebuilt` (+ ZIM plugin for call invitation) | Fastest — drop-in call UI + ringing. Style lightly. |
| B. Express SDK (custom UI) | `zego-express-engine-webrtc` | Only if you need a fully custom call screen. More work. |

Use **Option A (Call Kit + Call Invitation)** — it gives the call UI *and* the "ring the astrologer" flow out of the box. Your custom work is the **token server + presence + billing**, not the call plumbing.

---

## 1. Prerequisites

1. Create a project in the **ZEGOCLOUD Console** → get **AppID** (number) and **ServerSecret** (string).
2. Enable the **Voice Call** product (and **In-app Chat / ZIM** for call invitation signaling).
3. Free tier = **10,000 minutes/month**; audio ≈ **$0.99 / 1,000 min** after.
4. Install:
```bash
npm i @zegocloud/zego-uikit-prebuilt zego-zim-web
# Option B only: npm i zego-express-engine-webrtc
```

### Environment variables
```
NEXT_PUBLIC_ZEGO_APP_ID=        # public (client) — the numeric AppID
ZEGO_SERVER_SECRET=             # SERVER ONLY — never expose to the browser
```

---

## 2. Architecture (flow)

```
Customer clicks "Call"  ──►  /api/zego/precheck   (wallet ≥ 1 min? astrologer online?)
        │  ok
        ▼
   /api/zego/token  (server signs a token using ServerSecret)
        │
        ▼
Call Kit sends Call Invitation ──► astrologer's browser rings (ZIM signaling)
        │  astrologer accepts
        ▼
Both join voice room (unique roomID)  ──►  onUserJoin fires = CALL CONNECTED
        │
        ├─► start server-side per-minute billing ticker (authoritative)
        ├─► low balance warning → auto hang up at ₹0
        ▼
Either leaves / hang up ──► onLeaveRoom ──► /api/zego/call-end
        │
        ▼
Server: final duration → deduct wallet → credit astrologer (minus commission) → store record → (optional) fetch recording
```

**Golden rule:** the **server** owns the wallet and the clock. The client timer is only for UX; the server decides minutes charged (use server timestamps from join/leave events, not the browser).

---

## 3. Step 1 — Token server (secure)

Never put `ServerSecret` in the browser. Generate the token in a Next.js API route using ZEGOCLOUD's official **token04** generator (copy their server sample — do NOT hand-roll the crypto).

```ts
// app/api/zego/token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateToken04 } from "@/lib/zego/token04"; // ZEGOCLOUD official sample

export async function POST(req: NextRequest) {
  const { userId } = await requireAuth(req);          // your auth — must be logged in
  const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
  const secret = process.env.ZEGO_SERVER_SECRET!;
  const effdays = 3600;                                // token validity (seconds)
  const token = generateToken04(appID, userId, secret, effdays, "");
  return NextResponse.json({ token, appID, userId });
}
```
> Get `generateToken04` from the ZEGOCLOUD "Generate a token (server)" doc/sample. For local dev only you may use `ZegoUIKitPrebuilt.generateKitTokenForTest(...)` on the client — **switch to the server token before launch.**

---

## 4. Step 2 — Astrologer presence (online / busy / offline)

This is what makes "many calls to many astrologers" work and prevents double-routing.

- Astrologer toggles **Online** when ready to take calls → write status to your DB (e.g., `astrologer.status = "online"`), refresh via heartbeat/websocket.
- On call connect → set `"busy"`; on call end → back to `"online"`.
- Customer can only call an astrologer whose status is `"online"`. If `"busy"` → show **queue / notify-me / pick another**.
- Store `astrologer.zegoUserId` so the customer's Call Invitation targets the right person.

---

## 5. Step 3 — Pre-call check (anti-burn gate)

```ts
// app/api/zego/precheck/route.ts  → returns { ok, reason }
// 1. customer authenticated?
// 2. wallet balance >= astrologer.ratePerMin (≥ 1 min)?
// 3. astrologer.status === "online"?
// 4. create a unique roomId = `call_${customerId}_${astrologerId}_${Date.now()}`
// 5. persist a "call session" row: status=pending, rate, roomId, both userIds
```
Block the call if any check fails. **Never start a call the customer can't pay for at least 1 minute of.**

---

## 6. Step 4 — Ring the astrologer (Call Invitation) + join voice room

```ts
"use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";

async function startCall(roomId: string, astrologerZegoId: string) {
  const { token, appID, userId } = await fetch("/api/zego/token", { method: "POST" }).then(r => r.json());
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
    appID, token, roomId, userId, currentUser.name
  );
  const zp = ZegoUIKitPrebuilt.create(kitToken);
  zp.addPlugins({ ZIM });                         // enables call invitation (ringing)

  // Voice-only 1-on-1 call:
  zp.joinRoom({
    container: document.getElementById("call-container")!,
    scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
    turnOnCameraWhenJoining: false,               // VOICE ONLY
    turnOnMicrophoneWhenJoining: true,
    showMyCameraToggleButton: false,
    showScreenSharingButton: false,
    showTextChat: false,
    showUserList: false,
    onUserJoin: () => onCallConnected(roomId),     // BOTH present → start billing
    onUserLeave: () => zp.hangUp?.(),              // other side left → end
    onLeaveRoom: () => onCallEnded(roomId),        // → /api/zego/call-end
  });
}
```
> For the astrologer's **incoming-call popup**, follow the ZEGOCLOUD "Call Invitation" web guide (uses the ZIM plugin + `sendCallInvitation`). Confirm exact API names in the current docs.

---

## 7. Step 5 — Per-minute wallet billing (the important part)

**Server-authoritative.** Do NOT trust the browser for charges.

1. **On `onUserJoin` (call connected):**
   - Client calls `/api/zego/call-start` → server records `startedAt = now()`, sets astrologer `busy`, marks session `active`.
2. **Live metering (server):**
   - Run a server-side ticker (or compute on heartbeat): every minute, deduct `astrologer.ratePerMin` from the customer wallet.
   - At **low balance** (e.g., < 2 min left) → push a warning to the client ("₹X left, ~Y min").
   - At **₹0** → server tells client to **auto hang up** (`zp.hangUp()` / `leaveRoom`) and ends the session.
3. **On `onLeaveRoom` (call ended):**
   - Client calls `/api/zego/call-end`.
   - **Server computes final billable minutes** from its own `startedAt`/`endedAt` (round up to the minute), does the **final reconciliation** deduct.

```ts
// app/api/zego/call-end/route.ts (sketch)
// const session = getSession(roomId)
// const minutes = Math.ceil((Date.now() - session.startedAt) / 60000)
// const charge  = minutes * session.ratePerMin
// wallet.debit(session.customerId, charge)                    // never below 0
// astrologerEarning = charge * (1 - PLATFORM_COMMISSION)      // e.g. 0.30
// ledger.credit(session.astrologerId, astrologerEarning)      // payout later (T+7)
// astrologer.status = "online"; session.status = "ended"
// (optional) attach recording URL
```

**Anti-burn invariants:**
- Charge only between **connect** and **disconnect** (not ring time).
- Wallet can never go negative; call ends when it hits 0.
- Astrologer is paid from **collected** wallet money only, **after** commission, on a **delayed payout**.

---

## 8. Step 6 — Recording (optional)

Use ZEGOCLOUD **Cloud Recording** (server-side REST API) if you want call recordings for quality/disputes. Trigger start on call-connect, stop on call-end; store the file URL on the session. Show a "this call may be recorded" consent line (DPDP).

---

## 9. Step 7 — Concurrency & rooms

- **Each call = its own unique `roomId`.** Many rooms run in parallel — ZEGOCLOUD handles the scale (no per-astrologer numbers, no channel provisioning like PSTN).
- Your only concurrency control is **astrologer status** (one active call per astrologer) + the **queue** for busy ones.
- Free tier covers 10,000 min/month across all calls; monitor usage in the console.

---

## 10. Security checklist

- [ ] `ZEGO_SERVER_SECRET` is **server-only** (never shipped to client, never in `NEXT_PUBLIC_*`).
- [ ] Token issued **only to authenticated users**, scoped to their `userId`, short TTL.
- [ ] Wallet checks + deductions happen **server-side**; client cannot set the charge.
- [ ] Validate that the caller is allowed to call that astrologer (online, has balance).
- [ ] Rate-limit token + precheck endpoints.
- [ ] Recording consent shown; recordings access-controlled.

---

## 11. Build order (so it's not overwhelming)

1. ZEGOCLOUD account + AppID/Secret + env vars.
2. **Token server** route (`/api/zego/token`).
3. Hard-code two test users → get a **basic 1-on-1 voice call** working in the browser (no billing yet).
4. Add **Call Invitation** (astrologer rings/accepts).
5. Add **presence** (online/busy) + precheck gate.
6. Add **wallet + per-minute billing** (start/meter/auto-end/reconcile) — server-authoritative.
7. Add **queue / notify-me** for busy astrologers.
8. (Optional) **Cloud Recording**.
9. Switch test token → **production server token**; load-test concurrency; go live.

---

## 12. Key references (verify current versions)

- ZEGOCLOUD Web — Voice Call quick start, Call Invitation (web), Generate a token (server), Cloud Recording.
- Docs root: https://www.zegocloud.com/docs  → choose **Voice Call → Web**.

---

*Summary: use the ZEGOCLOUD Web Call Kit + Call Invitation for the call UI and ringing; build a secure token server; gate calls with astrologer presence + a wallet pre-check; and meter per-minute billing on the SERVER between connect and disconnect, auto-ending at ₹0. No phone numbers, 10k free min/month, scales to many parallel calls.*