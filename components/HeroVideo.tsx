"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated hero banner (rendered with Remotion, see /video).
 * The still poster paints first; the looping video is attached on the visitor's first interaction,
 * and never for visitors who prefer reduced motion or have Data Saver on.
 */
export function HeroVideo({ locale }: { locale: "ar" | "en" }) {
  const [play, setPlay] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    // Start on the first interaction: the still poster stays the page's largest paint (fast LCP),
    // and the motion begins as soon as the visitor moves, scrolls or touches.
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart", "wheel"] as const;
    const start = () => {
      setPlay(true);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  return (
    <div className="sheen-edge relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/hero/hero-${locale}.webp`}
        alt=""
        width={960}
        height={720}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {play && (
        <video
          ref={ref}
          src={`/hero/hero-${locale}.mp4`}
          poster={`/hero/hero-${locale}.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
