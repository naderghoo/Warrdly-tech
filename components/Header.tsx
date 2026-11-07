"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content/ar";
import { getCap } from "@/content/capabilities";
import { getExisting } from "@/content/existing";
import { getCalc } from "@/content/calculator";
import type { Locale } from "@/content/i18n";
import { Icon } from "./Icon";
import { site } from "@/content/site";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolOpen(true);
  };
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSolOpen(false), 160);
  };
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
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}#packages`, label: dict.nav.packages },
    { href: `${base}/blog`, label: locale === "ar" ? "المدونة" : "Blog" },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
  const navLink = "whitespace-nowrap text-[15px] font-medium text-ink hover:text-plum";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-plum-dark px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {dict.nav.skip}
      </a>

      <div className="bg-ink text-sm text-mist-2">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5 sm:px-6">
          <p className="min-w-0 truncate">
            <span>{dict.announcement}</span>
            <span className="mx-2 hidden opacity-50 sm:inline" aria-hidden="true">
              ·
            </span>
            <Link href={`${base}/contact`} className="hidden font-semibold text-gold underline-offset-4 hover:underline sm:inline">
              {dict.announcementCta}
            </Link>
          </p>
          <a
            href={site.portalUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap font-semibold text-white hover:text-gold"
          >
            <Icon name="user" size={16} stroke={2} />
            {dict.portal}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3 sm:px-6">
          <Link href={base} className="flex flex-none items-center gap-2.5 text-ink">
            <Image src="/logo.png" alt="" width={44} height={44} priority />
            <span className="flex flex-col whitespace-nowrap leading-tight">
              <span className="text-lg font-bold">{dict.brand.name}</span>
              <span className="text-[11px] tracking-wide text-muted-2">{dict.brand.sub}</span>
            </span>
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-7 xl:flex">
            <div ref={solRef} onMouseEnter={openMenu} onMouseLeave={closeMenuSoon}>
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
                <div className="absolute inset-x-5 top-full z-50 pt-2 sm:inset-x-6">
                  <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(36,23,43,0.35)]">
                    <div className="grid grid-cols-[1.7fr_1fr]">
                      {/* Sectors */}
                      <div className="flex flex-col gap-3 p-6">
                        <span className="px-3 text-[12px] font-bold uppercase tracking-wide text-muted-2">
                          {locale === "ar" ? "حلول حسب القطاع" : "Solutions by sector"}
                        </span>
                        <div className="grid grid-cols-2 gap-1">
                          {dict.sectors.map((s) => (
                            <Link
                              key={s.slug}
                              href={`${base}/solutions/${s.slug}`}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper"
                            >
                              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tint text-plum transition-colors group-hover:bg-plum group-hover:text-white">
                                <Icon name={s.icon} size={20} stroke={1.8} />
                              </span>
                              <span className="flex flex-col gap-1">
                                <span className="text-[15px] font-bold text-ink">{s.title}</span>
                                <span className="text-[13px] leading-relaxed text-muted-2">{s.short}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Existing customers + tools */}
                      <div className="flex flex-col gap-4 border-s border-line bg-paper/70 p-6">
                        <Link
                          href={`${base}/odoo-support`}
                          className="group flex flex-col gap-2 rounded-xl bg-plum p-4 text-white transition-colors hover:bg-plum-dark"
                        >
                          <span className="flex items-center gap-2 text-[15px] font-bold">
                            <Icon name="buoy" size={18} stroke={1.9} />
                            {getExisting(locale).nav}
                          </span>
                          <span className="text-[13px] leading-relaxed text-white/80">{getExisting(locale).homeBand.text}</span>
                        </Link>
                        <div className="flex flex-col">
                          <span className="px-2 pb-1 text-[12px] font-bold uppercase tracking-wide text-muted-2">
                            {locale === "ar" ? "أدوات وموارد" : "Tools & resources"}
                          </span>
                          {[
                            { href: `${base}/odoo-cost-calculator`, icon: "calc", label: getCalc(locale).nav },
                            { href: `${base}/assessment`, icon: "check", label: locale === "ar" ? "اختبار جاهزية شركتك" : "Readiness test" },
                            { href: `${base}/addons`, icon: "gear", label: cap.nav.addons },
                            { href: `${base}/why-odoo`, icon: "globe", label: locale === "ar" ? "لماذا Odoo" : "Why Odoo" },
                          ].map((t) => (
                            <Link
                              key={t.href}
                              href={t.href}
                              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[14px] font-semibold text-ink transition-colors hover:bg-white hover:text-plum"
                            >
                              <Icon name={t.icon} size={17} stroke={1.9} className="text-plum" />
                              {t.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-line bg-white px-6 py-3.5">
                      <Link href={`${base}#sectors`} className="text-[14px] font-semibold text-muted-2 hover:text-plum">
                        {dict.nav.allSolutions}
                      </Link>
                      <Link
                        href={`${base}/contact`}
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-plum hover:text-plum-dark"
                      >
                        {locale === "ar" ? "غير متأكد من الحل المناسب؟ احجز استشارة مجانية" : "Not sure which fits? Book a free consultation"}
                        <Icon name="arrow" size={16} stroke={2.2} className="rtl:-scale-x-100" />
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
          <nav aria-label={dict.nav.menu} className="max-h-[calc(100vh-120px)] overflow-y-auto border-t border-line bg-white shadow-lg xl:hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
              <span className="pt-2 text-[12px] font-bold uppercase tracking-wide text-muted-2">
                {locale === "ar" ? "حلول حسب القطاع" : "Solutions by sector"}
              </span>
              {dict.sectors.map((s) => (
                <Link key={s.slug} href={`${base}/solutions/${s.slug}`} className="flex items-center gap-3 py-2.5 text-base text-ink">
                  <Icon name={s.icon} size={20} stroke={1.8} className="text-plum" />
                  {s.title}
                </Link>
              ))}
              <Link
                href={`${base}/odoo-support`}
                className="my-2 flex items-center gap-3 rounded-xl bg-plum px-4 py-3 text-base font-semibold text-white"
              >
                <Icon name="buoy" size={20} stroke={1.8} />
                {getExisting(locale).nav}
              </Link>
              <span className="pt-3 text-[12px] font-bold uppercase tracking-wide text-muted-2">
                {locale === "ar" ? "أدوات وموارد" : "Tools & resources"}
              </span>
              {[
                { href: `${base}/odoo-cost-calculator`, icon: "calc", label: getCalc(locale).nav },
                { href: `${base}/assessment`, icon: "check", label: locale === "ar" ? "اختبار جاهزية شركتك" : "Readiness test" },
                { href: `${base}/addons`, icon: "gear", label: cap.nav.addons },
                { href: `${base}/why-odoo`, icon: "globe", label: locale === "ar" ? "لماذا Odoo" : "Why Odoo" },
              ].map((t) => (
                <Link key={t.href} href={t.href} className="flex items-center gap-3 py-2.5 text-base text-ink">
                  <Icon name={t.icon} size={20} stroke={1.8} className="text-plum" />
                  {t.label}
                </Link>
              ))}
              <div className="my-2 border-t border-line" />
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="border-b border-line py-3.5 text-base font-medium text-ink last:border-0">
                  {l.label}
                </Link>
              ))}
              <a href={site.portalUrl} target="_blank" rel="noopener" className="flex items-center gap-2 border-b border-line py-3.5 text-base font-semibold text-plum">
                <Icon name="user" size={20} stroke={1.8} />
                {dict.portal}
              </a>
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
