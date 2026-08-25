import type { Metadata } from "next";
import { isValidLocale, constructMetadata } from "@/lib/seo";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return constructMetadata({
    title: "Sign In",
    locale,
    noIndex: true,
  });
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
