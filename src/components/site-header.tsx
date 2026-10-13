"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/materials", label: "Materials" },
  { href: "/processes", label: "Processes" },
  { href: "/advisor", label: "Find a Solution" },
  { href: "/cost-explorer", label: "Cost Explorer" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4eaf1] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-[18px]">
        <Link href="/" className="shrink-0">
          <div className="text-[21px] font-extrabold tracking-[-1px] text-[#17263b]">
            MAKE<span className="text-[#2772d6]">METHOD</span>
          </div>
          <div className="text-[10px] font-semibold tracking-[1px] text-[#8190a2]">
            MATERIALS & MANUFACTURING
          </div>
        </Link>
        <nav className="flex flex-wrap gap-1 md:gap-2">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[9px] px-2.5 py-2 text-xs text-[#52647b] transition-colors md:px-[13px] md:py-2.5 md:text-sm",
                  active
                    ? "bg-[#eaf2ff] font-semibold text-[#155ab5]"
                    : "hover:bg-[#eaf2ff] hover:text-[#155ab5]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
