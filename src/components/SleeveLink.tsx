"use client";

import Link from "next/link";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/** Hold the existing slide long enough to read, still under a second. */
const PEEK_MS = 450;

const peek = {
  timer: 0,
  href: "",
};

function shouldPeekOnActivate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function clearPeek() {
  window.clearTimeout(peek.timer);
  peek.timer = 0;
  peek.href = "";
}

type Props = {
  href: string;
  demo?: boolean;
  children: ReactNode;
};

export function SleeveLink({ href, demo = false, children }: Props) {
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (peek.href !== href) return;
      document.querySelectorAll(".sleeve.is-peek").forEach((node) => {
        node.classList.remove("is-peek");
      });
      clearPeek();
    };
  }, [href]);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Keyboard activation (detail 0) stays instant. This is for tap/click.
    if (event.detail === 0) return;
    if (!shouldPeekOnActivate()) return;

    event.preventDefault();

    const sleeve = event.currentTarget;
    if (peek.href === href && peek.timer) return;

    document.querySelectorAll(".sleeve.is-peek").forEach((node) => {
      if (node !== sleeve) node.classList.remove("is-peek");
    });
    // Demo keyframes override the slide transform. Drop them so the tap peek can run.
    sleeve.classList.remove("is-demo", "is-demo-fade");
    sleeve.classList.add("is-peek");

    clearPeek();
    peek.href = href;
    peek.timer = window.setTimeout(() => {
      const destination = href;
      clearPeek();
      router.push(destination);
    }, PEEK_MS);
  }

  return (
    <Link
      href={href}
      className="sleeve"
      onClick={onClick}
      {...(demo ? { "data-sleeve-demo": "" } : {})}
    >
      {children}
    </Link>
  );
}
