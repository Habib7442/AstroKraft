"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { User, Mail, Shield, Wallet, LogOut } from "lucide-react";

interface ProfileClientProps {
  locale: string;
  dict: any;
}

export function ProfileClient({ locale, dict }: ProfileClientProps) {
  const router = useRouter();
  const { user, wallet, loading, logout, checkSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push(`/${locale}/sign-in`);
    }
  }, [mounted, loading, user, router, locale]);

  if (!mounted || loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-[#E2C27A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await logout();
    router.push(`/${locale}`);
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 md:p-12 my-8">
      <div className="max-w-md w-full bg-white border border-zinc-150 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col text-left">
        
        {/* User Badge / Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#FFF9E6] border border-[#E2C27A] rounded-full flex items-center justify-center shadow-sm">
            <User className="w-8 h-8 text-[#E2C27A]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-zinc-900 leading-tight">
              {user.name || "Astro User"}
            </h1>
            <p className="text-xs font-bold text-zinc-400 uppercase mt-0.5">
              {user.role || "User"} Profile
            </p>
          </div>
        </div>

        {/* Profile details list */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
            <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase text-zinc-400">Email Address</p>
              <p className="text-xs font-bold text-zinc-800 truncate mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
            <Shield className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase text-zinc-400">Role Privilege</p>
              <p className="text-xs font-bold text-zinc-800 capitalize mt-0.5">{user.role || "user"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
            <Wallet className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase text-zinc-400">Wallet Balance</p>
              <p className="text-xs font-bold text-zinc-800 mt-0.5">
                ₹{wallet ? Number(wallet.balance).toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out Account
        </button>
      </div>
    </main>
  );
}
