import Link from "next/link";
import type { ReactNode } from "react";

export type SiteChromeProps = {
  name: string;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  children: ReactNode;
  active?: "home" | "posts" | "contact" | "record";
};

export function SiteShell({
  name,
  tagline,
  email,
  cvUrl,
  children,
  active = "home",
}: SiteChromeProps) {
  const navClass = (key: "home" | "posts" | "contact") =>
    [
      "nav-link no-underline transition-colors",
      active === key
        ? "text-foreground font-bold"
        : "text-link hover:text-foreground",
    ].join(" ");

  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        <header className="animate-enter site-chrome border-b border-rule pb-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="min-w-0">
              <p className="text-[1.5rem] font-bold leading-tight tracking-tight sm:text-[1.75rem]">
                <Link
                  href="/"
                  className="text-foreground no-underline hover:text-foreground"
                >
                  {name}
                </Link>
              </p>
              {tagline ? (
                <p className="mt-1.5 text-[0.9rem] leading-snug text-muted">
                  {tagline}
                </p>
              ) : null}
            </div>
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem]"
              aria-label="Site"
            >
              <Link href="/" className={navClass("home")}>
                Home
              </Link>
              <Link href="/posts" className={navClass("posts")}>
                Posts
              </Link>
              <Link href="/contact" className={navClass("contact")}>
                Contact
              </Link>
              {cvUrl ? (
                <a
                  href={cvUrl}
                  className="nav-link text-link no-underline hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  CV
                </a>
              ) : null}
              {email && active !== "contact" ? (
                <a
                  href={`mailto:${email}`}
                  className="nav-link text-link no-underline hover:text-foreground sm:hidden"
                >
                  Email
                </a>
              ) : null}
            </nav>
          </div>
        </header>

        <div className="animate-enter-late mt-10 min-w-0">{children}</div>

        <footer className="animate-enter-later mt-16 border-t border-rule pt-6 text-[0.8rem] text-muted">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
        </footer>
      </div>
    </div>
  );
}
