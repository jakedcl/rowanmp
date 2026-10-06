import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Rowan Mentley-Peters — Biology, SUNY Oneonta",
  description:
    "M.S. student in Biology at SUNY Oneonta. Freshwater mussel genetics, field surveys, and SCUBA research.",
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
