import { create } from "zustand";
import { insforge } from "@/lib/insforge";

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
      // console.log("[useAuthStore] Checking session via local API...");
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      
      if (data?.user) {
        // console.log("[useAuthStore] User found in session:", data.user);
        set({ user: data.user, wallet: data.wallet });
        
        // Sync access token if needed for any client-side RLS queries
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("insforge_access_token="))
          ?.split("=")[1];
        if (accessToken) {
          insforge.setAccessToken(accessToken);
        }
      } else {
        // console.log("[useAuthStore] No active session user.");
        set({ user: null, wallet: null });
      }
    } catch (error) {
      // console.error("[useAuthStore] Error checking session in store:", error);
      set({ user: null, wallet: null });
    } finally {
      set({ loading: false });
    }
  },
  
  logout: async () => {
    try {
      await insforge.auth.signOut();
      await fetch("/api/auth/sign-out", { method: "POST" });
      set({ user: null, wallet: null });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
}));
