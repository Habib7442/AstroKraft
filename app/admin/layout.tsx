import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="w-8 h-8 border-4 border-[#E2C27A] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {children}
      </Suspense>
      <Toaster position="top-right" closeButton />
    </ThemeProvider>
  );
}
