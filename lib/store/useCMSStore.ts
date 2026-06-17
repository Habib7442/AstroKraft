import { create } from "zustand";
import type { Banner, Category, Product, Consultation, Astrologer } from "@/types/sanity";

interface CMSState {
  banners: Banner[];
  categories: Category[];
  products: Product[];
  consultations: Consultation[];
  astrologers: Astrologer[];
  setBanners: (banners: Banner[]) => void;
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
  setConsultations: (consultations: Consultation[]) => void;
  setAstrologers: (astrologers: Astrologer[]) => void;
  initializeData: (data: {
    banners?: Banner[];
    categories?: Category[];
    products?: Product[];
    consultations?: Consultation[];
    astrologers?: Astrologer[];
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
