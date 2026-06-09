"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Wifi, WifiOff } from "lucide-react";

export function PwaRegister() {
  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("[PWA] Service Worker registered successfully:", registration.scope);
        } catch (error) {
          console.error("[PWA] Service Worker registration failed:", error);
        }
      };

      // Register when document is ready
      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
        return () => window.removeEventListener("load", registerSW);
      }
    }
  }, []);

  useEffect(() => {
    // 2. Real-time Connection Watcher
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      toast.dismiss("pwa-offline-toast");
      toast(
        <div className="flex flex-col gap-0.5 pr-4 text-left">
          <span className="text-xs sm:text-sm font-extrabold text-black leading-snug">
            Back online! Syncing celestial charts...
          </span>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-widest select-none">
            Network Restored
          </span>
        </div>,
        {
          id: "pwa-online-toast",
          icon: <Wifi className="w-4 h-4 text-green-500 shrink-0 mt-0.5 animate-bounce" />,
          duration: 4000,
          className: "border-2 border-black bg-white text-black rounded-xl shadow-[3px_3px_0px_#000] p-4 flex items-start gap-3",
        }
      );
    };

    const handleOffline = () => {
      toast.dismiss("pwa-online-toast");
      toast(
        <div className="flex flex-col gap-0.5 pr-4 text-left">
          <span className="text-xs sm:text-sm font-extrabold text-black leading-snug">
            Connection lost! AstroKraft™ is running in offline mode.
          </span>
          <span className="text-[9px] font-black text-red-500 uppercase tracking-widest select-none">
            Network Offline
          </span>
        </div>,
        {
          id: "pwa-offline-toast",
          icon: <WifiOff className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />,
          duration: 10000, // Persistent toast so they know they are offline
          className: "border-2 border-black bg-white text-black rounded-xl shadow-[3px_3px_0px_#000] p-4 flex items-start gap-3",
        }
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check on mount
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
}
