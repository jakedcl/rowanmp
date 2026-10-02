"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "li" | "section" | "article";
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  as = "div",
}: Props) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  const reduced = useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const visible = reduced || seen;

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const style = {
    ["--reveal-delay" as string]: `${delayMs}ms`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
