import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
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
        <SmoothScroll>
          {children}
          <SanityLive />
        </SmoothScroll>
      </body>
    </html>
  );
}
