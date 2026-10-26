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

const siteTitle = "MakeMethod — Materials & Manufacturing Explorer";
const siteDescription =
  "Discover materials, understand manufacturing processes, and evaluate illustrative production costs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://themakemethod.com"),
  title: {
    default: siteTitle,
    template: "%s · MakeMethod",
  },
  description: siteDescription,
  applicationName: "MakeMethod",
  keywords: [
    "materials",
    "manufacturing",
    "plastics",
    "metals",
    "elastomers",
    "fabrics",
    "processes",
    "DFM",
    "cost planning",
  ],
  authors: [{ name: "MakeMethod" }],
  creator: "MakeMethod",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://themakemethod.com",
    siteName: "MakeMethod",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [{ url: "/brand-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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
