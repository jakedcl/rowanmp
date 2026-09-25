"use client";

import {
  useEffect,
  useRef,
  useState,
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
