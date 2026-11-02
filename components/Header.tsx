"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content/ar";
import { getCap } from "@/content/capabilities";
import type { Locale } from "@/content/i18n";
import { Icon } from "./Icon";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(/^\/(ar|en)/, `/${other}`);
  const base = `/${locale}`;

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (solRef.current && !solRef.current.contains(e.target as Node)) setSolOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setOpen(false);
    setSolOpen(false);
  }, [pathname]);

  const cap = getCap(locale);
  const links = [
    { href: `${base}/integrations`, label: cap.nav.integrations },
    { href: `${base}#services`, label: dict.nav.services },
    { href: `${base}#packages`, label: dict.nav.packages },
    { href: `${base}/blog`, label: locale === "ar" ? "المدونة" : "Blog" },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
  const navLink = "whitespace-nowrap text-[15px] font-medium text-ink hover:text-plum";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-plum px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {dict.nav.skip}
      </a>

      <div className="bg-ink px-5 py-2.5 text-center text-sm text-mist-2">
        <span>{dict.announcement}</span>
        <span className="mx-2 hidden opacity-50 sm:inline" aria-hidden="true">
          ·
        </span>
        <Link href={`${base}/contact`} className="hidden font-semibold text-gold underline-offset-4 hover:underline sm:inline">
          {dict.announcementCta}
        </Link>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3 sm:px-6">
          <Link href={base} className="flex flex-none items-center gap-2.5 text-ink">
            <Image src="/logo.png" alt="" width={44} height={44} priority />
            <span className="flex flex-col whitespace-nowrap leading-tight">
              <span className="text-lg font-bold">{dict.brand.name}</span>
              <span className="text-[11px] tracking-wide text-muted-2">{dict.brand.sub}</span>
            </span>
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-7 xl:flex">
            <div
              ref={solRef}
              className="relative"
              onMouseEnter={() => setSolOpen(true)}
              onMouseLeave={() => setSolOpen(false)}
            >
              <button
                type="button"
                aria-expanded={solOpen}
                aria-haspopup="true"
                onClick={() => setSolOpen((v) => !v)}
                className={`${navLink} inline-flex items-center gap-1 py-2`}
              >
                {dict.nav.solutions}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${solOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {solOpen && (
                <div className="absolute start-0 top-full w-[340px] pt-2">
                  <div className="flex flex-col rounded-2xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(36,21,42,0.12)]">
                    {dict.sectors.map((s) => (
                      <Link
                        key={s.slug}
                        href={`${base}/solutions/${s.slug}`}
                        className="flex items-start gap-3 rounded-xl p-3 hover:bg-paper"
                      >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-tint text-plum">
                          <Icon name={s.icon} size={20} stroke={1.8} />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[15px] font-semibold text-ink">{s.title}</span>
                          <span className="text-[13px] leading-snug text-muted-2">{s.short}</span>
                        </span>
                      </Link>
                    ))}
                    <div className="mt-1 flex flex-wrap justify-between gap-2 border-t border-line px-3 pt-3 pb-1">
                      <Link href={`${base}/addons`} className="text-sm font-semibold text-plum hover:text-plum-dark">
                        {cap.nav.addons}
                      </Link>
                      <Link href={`${base}#sectors`} className="text-sm font-semibold text-muted-2 hover:text-plum">
                        {dict.nav.allSolutions}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={navLink}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-none items-center gap-4">
            <Link
              href={switchHref}
              hrefLang={other}
              lang={other}
              className="hidden whitespace-nowrap text-sm font-medium text-muted-2 hover:text-plum sm:inline"
            >
              {dict.nav.lang}
            </Link>
            <Link
              href={`${base}/contact`}
              className="hidden min-h-[44px] items-center whitespace-nowrap rounded-[10px] bg-plum px-5 text-[15px] font-semibold text-white hover:bg-plum-dark md:inline-flex"
            >
              {dict.nav.ctaShort}
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-paper xl:hidden"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label={dict.nav.menu} className="max-h-[calc(100vh-120px)] overflow-y-auto border-t border-line bg-white xl:hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
              <span className="pt-2 text-[13px] font-semibold text-muted-2">{dict.nav.solutions}</span>
              {dict.sectors.map((s) => (
                <Link key={s.slug} href={`${base}/solutions/${s.slug}`} className="flex items-center gap-3 py-2.5 text-base text-ink">
                  <Icon name={s.icon} size={20} stroke={1.8} className="text-plum" />
                  {s.title}
                </Link>
              ))}
              <Link href={`${base}/addons`} className="flex items-center gap-3 py-2.5 text-base font-semibold text-plum">
                <Icon name="gear" size={20} stroke={1.8} />
                {cap.nav.addons}
              </Link>
              <div className="my-2 border-t border-line" />
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="border-b border-line py-3.5 text-base font-medium text-ink last:border-0">
                  {l.label}
                </Link>
              ))}
              <Link href={switchHref} hrefLang={other} lang={other} className="py-3.5 text-base font-medium text-muted-2">
                {dict.nav.lang}
              </Link>
              <Link
                href={`${base}/contact`}
                className="my-2 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-plum font-semibold text-white"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
