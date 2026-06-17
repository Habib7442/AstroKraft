"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Grid, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";

interface MobileNavbarProps {
  locale: string;
}

export function MobileNavbar({ locale }: MobileNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: `/${locale}`,
      active: pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/",
    },
    {
      label: "Categories",
      icon: Grid,
      href: `/${locale}/gemstones`, // Gemstones as primary products listing
      active: pathname.includes("/gemstones") || pathname.includes("/tools"),
    },
    {
      label: "Cart",
      icon: ShoppingBag,
      href: `/${locale}/cart`,
      active: pathname.includes("/cart"),
    },
    {
      label: "Profile",
      icon: User,
      href: user ? `/${locale}/profile` : `/${locale}/sign-in`,
      active: pathname.includes("/profile") || pathname.includes("/sign-in") || pathname.includes("/sign-up") || pathname.includes("/astrologer/login"),
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-6 py-2 pb-safe">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center gap-1 py-1 px-3 text-center cursor-pointer transition-all active:scale-95"
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors duration-250",
                  item.active
                    ? "text-[#E2C27A] dark:text-[#E2C27A] stroke-[2.5px]"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 stroke-[2px]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-black tracking-wide uppercase transition-colors duration-250",
                  item.active
                    ? "text-black dark:text-white"
                    : "text-zinc-400 dark:text-zinc-500"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
