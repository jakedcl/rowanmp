"use client";

import Link from "next/link";
import { useState } from "react";

export type NavKey = "home" | "posts" | "contact" | "cv" | "record";

const LINKS: { href: string; label: string; key: Exclude<NavKey, "record"> }[] =
  [
    { href: "/", label: "Home", key: "home" },
    { href: "/posts", label: "Posts", key: "posts" },
    { href: "/contact", label: "Contact", key: "contact" },
    { href: "/cv", label: "CV", key: "cv" },
  ];

type Props = {
  name: string;
  tagline?: string | null;
  active?: NavKey;
};

export function SiteHeader({ name, tagline, active = "home" }: Props) {
  const [open, setOpen] = useState(false);

  const linkClass = (key: Exclude<NavKey, "record">, mobile = false) =>
    [
      "text-foreground no-underline",
      mobile ? "" : "text-[0.95rem]",
      active === key
        ? "underline underline-offset-[6px] decoration-foreground"
        : "hover:underline hover:underline-offset-[6px]",
    ].join(" ");

  return (
    <header className="animate-enter">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="site-name">
            <Link href="/" className="text-foreground no-underline">
              {name}
            </Link>
          </p>
          {tagline ? <p className="site-tagline">{tagline}</p> : null}
        </div>

        <button
          type="button"
          className="nav-toggle md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={`nav-toggle-bars ${open ? "is-open" : ""}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className="hidden items-center gap-7 pt-2 md:flex" aria-label="Site">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.key)}
              aria-current={active === link.key ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav
        id="site-nav"
        aria-label="Site"
        className={`mobile-nav md:hidden ${open ? "mt-4 flex flex-col border-t border-rule" : "hidden"}`}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(link.key, true)}
            aria-current={active === link.key ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
