"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Scales/fades content up as it enters the viewport (pairs with Lenis).
 */
export function ScrollSwoop({ children, className = "", id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.style.setProperty("--swoop", "1");
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.95;
      const end = vh * 0.28;
      const raw = (start - rect.top) / (start - end);
      const p = Math.min(1, Math.max(0, raw));
      // ease-out curve so it “lands” big
      const eased = 1 - Math.pow(1 - p, 2.4);
      node.style.setProperty("--swoop", eased.toFixed(4));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`swoop-panel ${className}`.trim()}
      style={{ ["--swoop" as string]: 0 }}
    >
      {children}
    </section>
  );
}
