"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      if (!document.body.classList.contains("disable-hover")) {
        document.body.classList.add("disable-hover");
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove("disable-hover");
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
