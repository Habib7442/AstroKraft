"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const redirectTo = `${window.location.origin}/auth/callback?next=/${locale}`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        throw error;
      }

      // Supabase redirects the browser automatically; fall back manually if not.
      if (data?.url) {
        window.location.assign(data.url);
      }
    } catch (error: any) {
      console.error("Google Auth error:", error);
      toast.error(error.message || "Failed to initiate Google sign-in.");
      setGoogleLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success(`Welcome back, ${data.user.name || "User"}!`);
      
      // Force page reload to refresh navbar status, then route to redirect target or home
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect");
      if (redirectTo === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = `/${locale}`;
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-gradient-to-b from-[#FFE896]/30 to-[#FFFDF0] px-4 py-12 relative overflow-hidden">
      {/* Decorative Golden Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#E2C27A]/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#FFE896]/20 blur-[120px]" />

      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border border-zinc-200 shadow-xl relative z-10 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E2C27A] via-[#FFE896] to-[#E2C27A]" />
        
        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-[#FFF9E6] rounded-2xl border border-[#E2C27A]/30 text-[#E2C27A] animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <CardTitle className="font-serif text-3xl font-black text-zinc-900 tracking-tight">
            Astro<span className="text-primary">Kraft</span> Sign In
          </CardTitle>
          <CardDescription className="text-zinc-500 font-bold text-xs uppercase tracking-wider mt-1.5">
            Discover Vedic Wisdom & Guidance
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            disabled={googleLoading || loading}
            onClick={handleGoogleLogin}
            className="w-full border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-bold rounded-full py-6 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all active:scale-[0.98]"
          >
            {googleLoading ? (
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full" />
            ) : (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-zinc-200" />
            <span className="px-3 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent">Or</span>
            <div className="flex-grow border-t border-zinc-200" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading}
                  className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#E2C27A] hover:bg-[#E2C27A]/90 text-black font-black py-6 rounded-full flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              {loading ? (
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
              ) : (
                <>
                  Sign In with Email
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center pb-8 pt-2">
          <p className="text-sm text-zinc-600 font-medium">
            Don't have an account?{" "}
            <a href={`/${locale}/sign-up`} className="text-primary hover:underline font-bold transition-all">
              Sign Up Free
            </a>
          </p>
          <a
            href={`/${locale}/astrologer/login`}
            className="text-xs text-[#E2C27A] hover:underline font-bold uppercase tracking-wider mt-4"
          >
            Astrologer & Admin Access
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
