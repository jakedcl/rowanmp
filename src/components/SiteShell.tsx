import type { ReactNode } from "react";
import { SiteHeader, type NavKey } from "@/components/SiteHeader";

export type SiteChromeProps = {
  name: string;
  tagline?: string | null;
  children: ReactNode;
  active?: NavKey;
};

export function SiteShell({
  name,
  tagline,
  children,
  active = "home",
}: SiteChromeProps) {
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <SiteHeader name={name} tagline={tagline} active={active} />
        <div className="animate-enter-late mt-10 min-w-0 sm:mt-14">{children}</div>
        <footer className="mt-20 border-t border-rule pt-6 text-[0.8rem] text-muted">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
        </footer>
      </div>
    </div>
  );
}
