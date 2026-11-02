"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades cards and headings in as they scroll into view.
 * Content is fully visible without JavaScript and for users who prefer reduced motion.
 */
const SELECTOR = "main .glass, main .glass-dark, main .glass-tint, main .glass-ink, main h2, main [data-reveal]";

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest("header") && !el.dataset.revealed,
    );

    const vh = window.innerHeight;
    // Read all positions first, then write — avoids forcing a layout per element
    const tops = els.map((el) => el.getBoundingClientRect().top);
    const pending: HTMLElement[] = [];
    els.forEach((el, i) => {
      el.dataset.revealed = "1";
      // Already on screen at load: leave it alone so nothing flickers
      if (tops[i] < vh * 0.9) return;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
      el.classList.add("reveal");
      pending.push(el);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          io.unobserve(el);
          // Hand transitions back to the normal hover styles once revealed
          window.setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.style.transitionDelay = "";
          }, 1100);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
