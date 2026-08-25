import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

interface AuthState {
  user: any | null;
  wallet: any | null;
  loading: boolean;
  setUser: (user: any | null) => void;
  setWallet: (wallet: any | null) => void;
  setLoading: (loading: boolean) => void;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  wallet: null,
  loading: true,
  setUser: (user) => set({ user }),
  setWallet: (wallet) => set({ wallet }),
  setLoading: (loading) => set({ loading }),

  checkSession: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data?.user) {
        set({ user: data.user, wallet: data.wallet });
      } else {
        set({ user: null, wallet: null });
      }
    } catch (error) {
      set({ user: null, wallet: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      set({ user: null, wallet: null });
    }
  }
}));
