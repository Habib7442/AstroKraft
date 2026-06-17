import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProfileClient } from "./profile-client";

interface PageParams {
  locale: string;
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
