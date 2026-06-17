"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User, Mail, Lock, Phone, ArrowRight, Sparkles, Key } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // OTP States
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Name, email, and password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, role: "user" })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (data.requireEmailVerification) {
        toast.info("A verification code was sent to your email!");
        setShowOtp(true);
      } else {
        toast.success("Account registered successfully! Welcome to AstroKraft.");
        window.location.href = `/${locale}`;
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the 6-digit OTP code.");
      return;
    }

    try {
      setVerifying(true);
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, name, phone, role: "user" })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      toast.success("Email verified successfully! Welcome to AstroKraft.");
      
      // Redirect to homepage
      window.location.href = `/${locale}`;
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-gradient-to-b from-[#FFE896]/30 to-[#FFFDF0] px-4 py-12 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#E2C27A]/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#FFE896]/20 blur-[120px]" />

      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border border-zinc-200 shadow-xl relative z-10 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E2C27A] via-[#FFE896] to-[#E2C27A]" />
        
        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-[#FFF9E6] rounded-2xl border border-[#E2C27A]/30 text-[#E2C27A]">
              {showOtp ? (
                <Key className="w-6 h-6 animate-bounce" />
              ) : (
                <Sparkles className="w-6 h-6 animate-pulse" />
              )}
            </div>
          </div>
          <CardTitle className="font-serif text-3xl font-black text-zinc-900 tracking-tight">
            {showOtp ? "Verify Account" : "Join AstroKraft"}
          </CardTitle>
          <CardDescription className="text-zinc-500 font-bold text-xs uppercase tracking-wider mt-1.5">
            {showOtp ? `Confirm code sent to ${email}` : "Create Your Account to Start Voice Consultations"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {showOtp ? (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="otp" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Verification Code (OTP)
                </Label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={verifying}
                    className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11 text-center font-bold tracking-widest text-lg"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={verifying}
                className="w-full bg-[#E2C27A] hover:bg-[#E2C27A]/90 text-black font-black py-6 rounded-full flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer mt-2"
              >
                {verifying ? (
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                  <>
                    Verify & Activate
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* Standard Registration Form */
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                  />
                </div>
              </div>

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
                    disabled={loading}
                    className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Phone Number (Optional)
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 99999 99999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="pl-11 rounded-full border-zinc-200 bg-white/80 focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A] h-11"
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
                    Register Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          {showOtp ? (
            <button
              onClick={() => setShowOtp(false)}
              className="text-sm text-zinc-650 hover:text-primary font-bold transition-all underline"
            >
              Back to Registration
            </button>
          ) : (
            <p className="text-sm text-zinc-600 font-medium">
              Already have an account?{" "}
              <a href={`/${locale}/sign-in`} className="text-primary hover:underline font-bold transition-all">
                Sign In
              </a>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
