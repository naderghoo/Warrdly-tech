"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated hero banner (rendered with Remotion, see /video).
 * The still poster paints first; the looping video is attached only after the page has loaded,
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
    const start = () => setPlay(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 600);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
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
