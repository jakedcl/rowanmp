"use client";

import { useEffect } from "react";

const STORAGE_KEY = "rowan-sleeve-demo";

function seenAlready() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function SleeveDemo() {
  useEffect(() => {
    if (seenAlready()) return;

    const sleeve = document.querySelector<HTMLElement>(".record-wall [data-sleeve-demo]");
    if (!sleeve) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shelf = sleeve.closest(".reveal");

    let started = false;
    let cancelled = false;
    let delayTimer = 0;
    let endTimer = 0;
    let observer: MutationObserver | null = null;

    const clearDemoClass = () => {
      sleeve.classList.remove("is-demo", "is-demo-fade");
    };

    const finish = () => {
      window.clearTimeout(endTimer);
      clearDemoClass();
    };

    const cancelBeforeStart = () => {
      if (started || cancelled) return;
      cancelled = true;
      window.clearTimeout(delayTimer);
      observer?.disconnect();
      markSeen();
    };

    const onIntent = () => {
      if (!started) {
        cancelBeforeStart();
        return;
      }
      finish();
    };

    const start = () => {
      if (cancelled || started) return;
      if (sleeve.matches(":hover") || sleeve.matches(":focus-within")) {
        cancelBeforeStart();
        return;
      }
      started = true;
      markSeen();
      sleeve.classList.add(reduced ? "is-demo-fade" : "is-demo");
      sleeve.querySelector(".sleeve-disc")?.addEventListener("animationend", finish, {
        once: true,
      });
      endTimer = window.setTimeout(finish, reduced ? 1800 : 2600);
    };

    const arm = () => {
      if (cancelled) return;
      delayTimer = window.setTimeout(start, reduced ? 450 : 750);
    };

    sleeve.addEventListener("pointerenter", onIntent);
    sleeve.addEventListener("focusin", onIntent);

    if (!shelf || shelf.classList.contains("is-visible")) {
      arm();
    } else {
      observer = new MutationObserver(() => {
        if (!shelf.classList.contains("is-visible")) return;
        observer?.disconnect();
        arm();
      });
      observer.observe(shelf, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(endTimer);
      observer?.disconnect();
      clearDemoClass();
      sleeve.removeEventListener("pointerenter", onIntent);
      sleeve.removeEventListener("focusin", onIntent);
    };
  }, []);

  return null;
}
