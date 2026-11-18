import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const siteDescription =
  "M.S. student in Biology at SUNY Oneonta. Freshwater mussel genetics, field surveys, and SCUBA research.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rowanmp.com"),
  title: {
    default: "Rowan Mentley-Peters — Biology, SUNY Oneonta",
    template: "%s — Rowan Mentley-Peters",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rowanmp.com",
    siteName: "Rowan Mentley-Peters",
    title: "Rowan Mentley-Peters — Biology, SUNY Oneonta",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rowan Mentley-Peters — Biology, SUNY Oneonta",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
