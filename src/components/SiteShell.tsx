import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type SiteChrome = {
  name: string;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  portrait?: (SanityImageSource & { alt?: string }) | null;
};

type Props = SiteChrome & {
  children: ReactNode;
  active?: "home" | "posts";
};

export function SiteShell({
  name,
  tagline,
  email,
  cvUrl,
  portrait,
  children,
  active = "home",
}: Props) {
  const portraitSrc = portrait
    ? urlFor(portrait).width(720).height(900).fit("crop").url()
    : null;

  const navClass = (key: "home" | "posts") =>
    [
      "no-underline transition-colors",
      active === key
        ? "text-foreground font-bold"
        : "text-link hover:text-foreground",
    ].join(" ");

  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-16">
          <aside className="animate-enter lg:sticky lg:top-10 lg:self-start">
            <div className="flex gap-5 lg:block">
              <div className="portrait-frame relative aspect-[4/5] w-28 shrink-0 overflow-hidden border border-rule bg-[#e4e0d6] sm:w-32 lg:w-full lg:max-w-[17rem]">
                {portraitSrc ? (
                  <Image
                    src={portraitSrc}
                    alt={portrait?.alt || name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 8rem, 17rem"
                    priority
                  />
                ) : (
                  <div className="flex h-full flex-col justify-end p-3 text-[0.7rem] leading-snug text-muted">
                    Portrait
                    <br />
                    forthcoming
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 lg:mt-6">
                <p className="text-[1.35rem] font-bold leading-tight tracking-tight sm:text-[1.5rem]">
                  <Link
                    href="/"
                    className="text-foreground no-underline hover:text-foreground"
                  >
                    {name}
                  </Link>
                </p>
                {tagline ? (
                  <p className="mt-2 text-[0.9rem] leading-snug text-muted">
                    {tagline}
                  </p>
                ) : null}

                <nav
                  className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.9rem] lg:flex-col lg:gap-y-2"
                  aria-label="Site"
                >
                  <Link href="/" className={navClass("home")}>
                    Home
                  </Link>
                  <Link href="/posts" className={navClass("posts")}>
                    Posts
                  </Link>
                  {cvUrl ? (
                    <a
                      href={cvUrl}
                      className="text-link no-underline hover:text-foreground"
                      target="_blank"
                      rel="noreferrer"
                    >
                      CV
                    </a>
                  ) : null}
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="text-link no-underline hover:text-foreground"
                    >
                      Contact
                    </a>
                  ) : null}
                </nav>

                {email ? (
                  <p className="mt-6 hidden text-[0.8rem] leading-relaxed text-muted lg:block">
                    <a
                      href={`mailto:${email}`}
                      className="break-all text-muted no-underline hover:text-foreground"
                    >
                      {email}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </aside>

          <div className="mt-10 min-w-0 lg:mt-0">
            <div className="animate-enter-late">{children}</div>
            <footer className="animate-enter-later mt-14 border-t border-rule pt-6 text-[0.8rem] text-muted">
              <p>
                © {new Date().getFullYear()} {name}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
