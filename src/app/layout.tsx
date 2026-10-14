import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MakeMethod — Materials & Manufacturing Explorer",
  description:
    "Discover materials, understand manufacturing processes, and evaluate illustrative production costs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body
        className="flex min-h-full flex-col bg-[#f6f8fb] font-sans text-[#17263b]"
        suppressHydrationWarning
      >
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-4 md:px-6 md:py-7">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
