"use client";

import React, { useState, useRef } from "react";
import { Phone, PhoneOff, Settings, User, Key, Compass, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestCallClient() {
  const [appId, setAppId] = useState("");
  const [serverSecret, setServerSecret] = useState("");
  const [roomId, setRoomId] = useState("test-room-1");
  const [userName, setUserName] = useState("Astro Tester");
  const [scenarioMode, setScenarioMode] = useState("VideoConference");
  const [isInCall, setIsInCall] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const zpRef = useRef<any>(null);

  const handleJoinCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!appId || !serverSecret || !roomId || !userName) {
      setErrorMsg("Please fill in all config parameters to proceed.");
      return;
    }

    const numericAppId = Number(appId);
    if (isNaN(numericAppId)) {
      setErrorMsg("App ID must be a valid number.");
      return;
    }

    setIsInCall(true);

    try {
      // Dynamic import to prevent SSR build issues with browser-only Zego SDK
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      // Generate a unique random user ID for testing
      const userId = "user_" + Math.floor(Math.random() * 10000);

      // Fetch Server Token securely from our new API route
      const response = await fetch("/api/zego/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          customAppId: numericAppId,
          customSecret: serverSecret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate token from server");
      }

      const { token } = await response.json();

      // Generate Kit Token using ZEGOCLOUD's production token builder
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        numericAppId,
        token,
        roomId,
        userId,
        userName
      );

      // Create ZEGOCLOUD instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      const chosenMode = (ZegoUIKitPrebuilt[scenarioMode as keyof typeof ZegoUIKitPrebuilt] ?? ZegoUIKitPrebuilt.VideoConference) as any;

      // Join the room
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: chosenMode,
        },
        turnOnCameraWhenJoining: false, // Voice Only
        showMyCameraToggleButton: false, // Hide camera toggle
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: false, // Hide screen sharing
        showTextChat: false, // Hide text chat
        showUserList: false, // Hide user list
        showPreJoinView: false,
        onLeaveRoom: () => {
          setIsInCall(false);
          zpRef.current = null;
        }
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to initialize voice call.");
      setIsInCall(false);
    }
  };

  const handleLeaveCall = () => {
    if (zpRef.current) {
      try {
        // ZegoUIKitPrebuilt doesn't always expose a direct destroy/leave on the instance variable,
        // but hanging up or reloading the page resets WebRTC connections cleanly.
        window.location.reload();
      } catch (e) {
        setIsInCall(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 select-none relative z-10 text-white">
      <div className="bg-[#120B24] border border-[#ECD9A0]/25 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Ambient starfield background overlay */}
        <div className="absolute inset-0 bg-stars-pattern opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ECD9A0]/20 bg-gold-soft/10 text-[#ECD9A0] text-[10px] font-bold uppercase tracking-wider">
            ✦ Audio Connection Quality Sandbox
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-[#ECD9A0] uppercase">
            Voice Call Sandbox Test
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto font-medium leading-relaxed">
            Test ZEGOCLOUD in-app WebRTC calls, audio routing, and voice controls immediately without authentication constraints.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-bold rounded-xl text-center relative z-10">
            {errorMsg}
          </div>
        )}

        {!isInCall ? (
          <form onSubmit={handleJoinCall} className="space-y-6 max-w-xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* App ID */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                  <Settings className="w-3.5 h-3.5 text-[#ECD9A0]" />
                  ZEGO App ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123456789"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/20 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ECD9A0] transition-colors font-semibold shadow-inner text-sm"
                />
              </div>

              {/* Server Secret */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                  <Key className="w-3.5 h-3.5 text-[#ECD9A0]" />
                  ZEGO Server Secret
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter Server Secret"
                  value={serverSecret}
                  onChange={(e) => setServerSecret(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/20 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ECD9A0] transition-colors font-semibold shadow-inner text-sm"
                />
              </div>

              {/* Room ID */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                  <Compass className="w-3.5 h-3.5 text-[#ECD9A0]" />
                  Room ID (Match to Connect)
                </label>
                <input
                  type="text"
                  required
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/20 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ECD9A0] transition-colors font-semibold shadow-inner text-sm"
                />
              </div>

              {/* Your Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                  <User className="w-3.5 h-3.5 text-[#ECD9A0]" />
                  Your Display Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/20 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ECD9A0] transition-colors font-semibold shadow-inner text-sm"
                />
              </div>

              {/* Scenario Mode */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                  <Settings className="w-3.5 h-3.5 text-[#ECD9A0]" />
                  Scenario Model (Console Config)
                </label>
                <select
                  value={scenarioMode}
                  onChange={(e) => setScenarioMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/20 bg-[#1A1136] text-white focus:outline-none focus:border-[#ECD9A0] transition-colors font-semibold shadow-inner text-sm cursor-pointer"
                >
                  <option value="VideoConference">VideoConference (HTML Sample)</option>
                  <option value="OneONoneCall">OneONoneCall</option>
                  <option value="GroupCall">GroupCall</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                className="w-full sm:w-auto px-10 h-12 bg-[#ECD9A0] hover:bg-[#ECD9A0]/95 text-black font-extrabold uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#ECD9A0]/50"
              >
                <Phone className="w-4 h-4 fill-black text-black" />
                Initialize Voice Call
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 relative z-10">
            {/* Embedded Call Container */}
            <div 
              ref={containerRef} 
              id="call-container" 
              className="w-full h-[380px] sm:h-[450px] bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center"
            >
              <div className="text-zinc-400 text-sm animate-pulse flex flex-col items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                Connecting to WebRTC room...
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                onClick={handleLeaveCall}
                className="px-8 h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-rose-500/30"
              >
                <PhoneOff className="w-4 h-4 text-white" />
                End Connection / Leave
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
