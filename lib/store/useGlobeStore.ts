import { create } from "zustand";

interface GlobeState {
  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  selectedKey: null,
  setSelectedKey: (key) => set({ selectedKey: key }),
}));
