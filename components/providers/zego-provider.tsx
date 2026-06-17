"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ZegoContextType {
  initZegoSignaling: (userId: string, userName: string) => Promise<void>;
  startCall: (targetAstrologerId: string, astrologerName: string) => Promise<void>;
  isZegoActive: boolean;
  activeCallId: string | null;
}

const ZegoContext = createContext<ZegoContextType | null>(null);

export function useZego() {
  const context = useContext(ZegoContext);
  if (!context) {
    throw new Error("useZego must be used within a ZegoProvider");
  }
  return context;
}

export function ZegoProvider({ children }: { children: React.ReactNode }) {
  const [isZegoActive, setIsZegoActive] = useState(false);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const zpRef = useRef<any>(null);
  const userRef = useRef<{ id: string; name: string } | null>(null);
  const initializingRef = useRef(false);

  const initZegoSignaling = async (userId: string, userName: string) => {
    if (typeof window === "undefined" || isZegoActive || initializingRef.current) return;
    initializingRef.current = true;

    userRef.current = { id: userId, name: userName };
    // console.log(`[ZEGO SIGNALLING] Initializing client for ${userName} (${userId})...`);

    try {
      // 1. Fetch secure token from Next.js server
      const tokenRes = await fetch("/api/zego/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!tokenRes.ok) throw new Error("Failed to retrieve token from server");
      const { token, appID } = await tokenRes.json();

      // 2. Dynamically import SDK & plugin to avoid SSR errors
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
      const { ZIM } = await import("zego-zim-web");

      // 3. Generate kit token for signaling configuration
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        "signaling_room", // placeholder, signaling room is managed by ZIM
        userId,
        userName
      );

      // 4. Create UI Kit instance & register signaling plugin
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.addPlugins({ ZIM });
      zpRef.current = zp;

      // 5. Configure call invitation popup & callbacks
      zp.setCallInvitationConfig({
        enableCustomCallInvitationDialog: false, // Use Zego's high-quality built-in incoming ring UI
        ringtoneConfig: {
          incomingCallUrl: "https://assets.mixkit.co/active_storage/sfx/1359/1359-84.wav", // Standard bell ring
          outgoingCallUrl: "https://assets.mixkit.co/active_storage/sfx/1359/1359-84.wav"
        },
        onIncomingCallReceived: (callID, caller) => {
          // console.log(`[ZEGO] Incoming call request from ${caller.userName} (CallID: ${callID})`);
          setActiveCallId(callID);
          toast.info(`Incoming voice call from ${caller.userName}...`);
        },
        onSetRoomConfigBeforeJoining: (callType) => {
          // Force strict voice calling configuration when call starts
          return {
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            turnOnCameraWhenJoining: false,
            showMyCameraToggleButton: false,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: false,
            showTextChat: false,
            showUserList: false,
            showPreJoinView: false,
            onJoinRoom: () => {
              // console.log("[ZEGO] Joined WebRTC voice call room.");
              // Trigger billing ticker start
              fetch("/api/zego/call-start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  roomId: zp.getRoomID(),
                  customerId: callerIsCustomer(userId) ? userId : "customer_user",
                  astrologerId: callerIsCustomer(userId) ? "astrologer_user" : userId,
                  ratePerMin: 15
                })
              }).catch(() => {});
            },
            onLeaveRoom: () => {
              // console.log("[ZEGO] Left WebRTC room.");
              setActiveCallId(null);
              // Trigger final ledger billing reconciliation
              fetch("/api/zego/call-end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId: zp.getRoomID() })
              }).catch(() => {});
            }
          };
        },
        onCallInvitationEnded: (reason) => {
          // console.log(`[ZEGO] Call ended. Reason: ${reason}`);
          setActiveCallId(null);
        }
      });

      setIsZegoActive(true);
      // console.log(`[ZEGO SIGNALLING] Registered background ZIM listener successfully.`);
    } catch (error) {
      initializingRef.current = false;
      // console.error("[ZEGO SIGNALLING] Initialization failed:", error);
    }
  };

  const callerIsCustomer = (uid: string) => {
    return !uid.startsWith("astrologer_");
  };

  const startCall = async (targetAstrologerId: string, astrologerName: string) => {
    if (!zpRef.current) {
      toast.error("Call client not ready. Please wait a moment.");
      return;
    }

    const customerId = userRef.current?.id || "mock_customer_1";

    try {
      // 1. Run wallet precheck before calling
      const precheckRes = await fetch("/api/zego/precheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          astrologerId: targetAstrologerId,
          customerId,
        }),
      });

      const precheck = await precheckRes.json();
      if (!precheck.ok) {
        toast.error(precheck.message || "Consultation call blocked.");
        return;
      }

      toast.loading(`Calling ${astrologerName}...`);

      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      console.log("[ZEGO sendCallInvitation Params]:", {
        callees: [{
          userID: `astrologer_${targetAstrologerId}`,
          userName: astrologerName
        }],
        callType: ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
        timeout: 60,
        roomID: precheck.roomId,
      });

      // 2. Dispatch the ZIM ringing invitation to the astrologer
      await zpRef.current.sendCallInvitation({
        callees: [{
          userID: `astrologer_${targetAstrologerId}`,
          userName: astrologerName
        }],
        callType: ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
        timeout: 60,
        roomID: precheck.roomId, // Set the secure unique room ID generated by the precheck endpoint
      });

      toast.dismiss();
    } catch (err: any) {
      toast.dismiss();
      // toast.error("Failed to place voice call.");
    }
  };

  // Automatically initialize Zego listener for mock session on load (simulation)
  useEffect(() => {
    // Determine user role for mock setup:
    // In production, load actual authenticated user ID and role
    const isAstrologerSession = typeof window !== "undefined" && window.location.search.includes("role=astrologer");
    
    // Dynamically derive the astrologer ID from the pathname if available
    let astrologerId = "acharya_abhi_shastri";
    if (typeof window !== "undefined") {
      const pathMatch = window.location.pathname.match(/\/astrologers\/([a-zA-Z0-9_-]+)/);
      if (pathMatch && pathMatch[1]) {
        astrologerId = pathMatch[1];
      }
    }

    const mockId = isAstrologerSession ? `astrologer_${astrologerId}` : "customer_1";
    const mockName = isAstrologerSession 
      ? (astrologerId === "test_astrologer" ? "Test Astrologer" : "Acharya Abhi Shastri") 
      : "Astro Customer";

    initZegoSignaling(mockId, mockName);

    return () => {
      if (zpRef.current) {
        try {
          zpRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <ZegoContext.Provider value={{ initZegoSignaling, startCall, isZegoActive, activeCallId }}>
      {children}
    </ZegoContext.Provider>
  );
}
