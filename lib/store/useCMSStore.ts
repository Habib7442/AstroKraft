import { create } from "zustand";

interface CMSState {
  banners: any[];
  categories: any[];
  products: any[];
  consultations: any[];
  astrologers: any[];
  setBanners: (banners: any[]) => void;
  setCategories: (categories: any[]) => void;
  setProducts: (products: any[]) => void;
  setConsultations: (consultations: any[]) => void;
  setAstrologers: (astrologers: any[]) => void;
  initializeData: (data: {
    banners?: any[];
    categories?: any[];
    products?: any[];
    consultations?: any[];
    astrologers?: any[];
  }) => void;
}

export const useCMSStore = create<CMSState>((set) => ({
  banners: [],
  categories: [],
  products: [],
  consultations: [],
  astrologers: [],
  setBanners: (banners) => set({ banners }),
  setCategories: (categories) => set({ categories }),
  setProducts: (products) => set({ products }),
  setConsultations: (consultations) => set({ consultations }),
  setAstrologers: (astrologers) => set({ astrologers }),
  initializeData: (data) => set((state) => ({
    banners: data.banners ?? state.banners,
    categories: data.categories ?? state.categories,
    products: data.products ?? state.products,
    consultations: data.consultations ?? state.consultations,
    astrologers: data.astrologers ?? state.astrologers,
  })),
}));
