import type { Metadata } from "next";
import { isValidLocale, constructMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Toaster } from "@/components/ui/sonner";
import { ExcitementToaster } from "@/components/excitement-toaster";
import { PwaRegister } from "@/components/PwaRegister";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ZegoProvider } from "@/components/providers/zego-provider";
import { MobileNavbar } from "@/components/sections/mobile-navbar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : "en";
  return constructMetadata({ locale: activeLocale });
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
        <ZegoProvider>
          {children}
          <Toaster position="top-right" closeButton />
          <ExcitementToaster />
          <PwaRegister />
          <WhatsAppFab />
          <MobileNavbar locale={locale} />
        </ZegoProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
