import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Rowan Mentley-Peters",
  description:
    "Freshwater mussel researcher and Rescue Diver. Genetics below the surface of New York's rivers.",
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
