import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProfileClient } from "./profile-client";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return constructMetadata({
    title: "My Profile",
    path: "/profile",
    locale,
    noIndex: true,
  });
}

export default async function ProfilePage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden pb-16 lg:pb-0">
      <Header locale={locale} dict={dict} />
      <ProfileClient locale={locale} dict={dict} />
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
