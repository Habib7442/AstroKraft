"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AstrologerLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAstrologerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, requiredRole: "astrologer" })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success(`Welcome Master Consultant, ${data.user.name || "Astrologer"}!`);
      
      // Redirect to the astrologers listing page (or partner portal dashboard if implemented)
      window.location.href = `/${locale}/astrologers`;
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials or unauthorized role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-gradient-to-b from-neutral-900 to-[#101726] px-4 py-12 relative overflow-hidden">
      {/* Dark theme celestial stars layout */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-[#E2C27A]/10 blur-[150px]" />

      <Card className="w-full max-w-md bg-neutral-900/60 backdrop-blur-xl border border-zinc-800 shadow-2xl relative z-10 rounded-3xl overflow-hidden text-white">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[#E2C27A] to-primary" />
        
        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-zinc-850 rounded-2xl border border-zinc-750 text-[#E2C27A]">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <CardTitle className="font-serif text-3xl font-black text-white tracking-tight">
            Consultant Portal
          </CardTitle>
          <CardDescription className="text-zinc-400 font-bold text-xs uppercase tracking-wider mt-1.5">
            Astrologer & Administrator Login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAstrologerLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Partner Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@astrokraft.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-11 rounded-full border-zinc-800 bg-neutral-950/80 text-white focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Secure Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-11 rounded-full border-zinc-800 bg-neutral-950/80 text-white focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E2C27A] hover:bg-[#E2C27A]/90 text-black font-black py-6 rounded-full flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer mt-2"
            >
              {loading ? (
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
              ) : (
                <>
                  Verify credentials
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          <a href={`/${locale}/sign-in`} className="text-sm text-zinc-400 hover:text-white font-bold transition-all">
            Return to Customer Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
