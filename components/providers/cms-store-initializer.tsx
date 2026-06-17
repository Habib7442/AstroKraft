"use client";

import { useRef } from "react";
import { useCMSStore } from "@/lib/store/useCMSStore";

interface CMSStoreInitializerProps {
  banners?: any[];
  categories?: any[];
  products?: any[];
  consultations?: any[];
  astrologers?: any[];
}

export function CMSStoreInitializer({
  banners,
  categories,
  products,
  consultations,
  astrologers,
}: CMSStoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useCMSStore.getState().initializeData({
      banners,
      categories,
      products,
      consultations,
      astrologers,
    });
    initialized.current = true;
  }

  return null;
}
