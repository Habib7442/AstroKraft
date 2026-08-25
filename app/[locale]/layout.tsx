import type { Metadata } from "next";
import { Suspense } from "react";
import { isValidLocale, constructMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Toaster } from "@/components/ui/sonner";
import { ExcitementToaster } from "@/components/excitement-toaster";
import { PwaRegister } from "@/components/PwaRegister";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { MobileNavbar } from "@/components/sections/mobile-navbar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : "en";
  return constructMetadata({ locale: activeLocale });
}

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "hin" },
    { locale: "bn" }
  ];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<any>;
}

export default async function LocalizedLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <LenisProvider>
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-8 h-8 border-4 border-[#E2C27A] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          {children}
          <MobileNavbar locale={locale} />
          <WhatsAppFab />
        </Suspense>
        <Toaster position="top-right" closeButton />
        <ExcitementToaster />
        <PwaRegister />
      </LenisProvider>
    </ThemeProvider>
  );
}
