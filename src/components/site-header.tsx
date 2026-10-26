"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/materials", label: "Materials" },
  { href: "/processes", label: "Processes" },
  { href: "/advisor", label: "Find a Solution" },
  { href: "/cost-explorer", label: "Cost Explorer" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

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

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex md:gap-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[9px] px-[13px] py-2.5 text-sm text-[#52647b] transition-colors",
                isActive(pathname, item.href)
                  ? "bg-[#eaf2ff] font-semibold text-[#155ab5]"
                  : "hover:bg-[#eaf2ff] hover:text-[#155ab5]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[10px] text-[#17263b] transition hover:bg-[#eaf2ff] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden" role="presentation">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[#122640]/40"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col bg-white shadow-[-8px_0_30px_#132a4914]"
          >
            <div className="flex items-center justify-between border-b border-[#e4eaf1] px-4 py-3">
              <div className="text-sm font-bold tracking-wide text-[#17263b]">
                Menu
              </div>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-[10px] text-[#17263b] transition hover:bg-[#eaf2ff]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile primary" className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[10px] px-3 py-3 text-base transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-[#eaf2ff] font-semibold text-[#155ab5]"
                      : "font-medium text-[#52647b] hover:bg-[#eaf2ff] hover:text-[#155ab5]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
