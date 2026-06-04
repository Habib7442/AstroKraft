"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
