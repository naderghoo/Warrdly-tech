"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dict } from "@/content/ar";
import type { Locale } from "@/content/i18n";
import { Icon } from "./Icon";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(/^\/(ar|en)/, `/${other}`);
  const base = `/${locale}`;

  const links = [
    { href: `${base}#sectors`, label: dict.nav.solutions },
    { href: `${base}#services`, label: dict.nav.services },
    { href: `${base}/zatca`, label: dict.nav.zatca },
    { href: `${base}#packages`, label: dict.nav.packages },
    { href: `${base}#case`, label: dict.nav.caseStudy },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <div className="bg-ink px-5 py-2.5 text-center text-sm text-mist-2">{dict.announcement}</div>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
          <Link href={base} className="flex items-center gap-2.5 text-ink" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="" width={46} height={46} priority />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold sm:text-xl">{dict.brand.name}</span>
              <span className="text-[11px] tracking-wide text-muted-2">{dict.brand.sub}</span>
            </span>
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-ink hover:text-plum">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={switchHref} className="hidden text-sm font-medium text-muted-2 hover:text-plum sm:inline">
              {dict.nav.lang}
            </Link>
            <Link
              href={`${base}/contact`}
              className="hidden min-h-[44px] items-center rounded-[10px] bg-plum px-5 text-[15px] font-semibold text-white hover:bg-plum-dark md:inline-flex"
            >
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-paper lg:hidden"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label={dict.nav.menu} className="border-t border-line bg-white lg:hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3.5 text-base font-medium text-ink last:border-0"
                >
                  {l.label}
                </Link>
              ))}
              <Link href={switchHref} onClick={() => setOpen(false)} className="py-3.5 text-base font-medium text-muted-2">
                {dict.nav.lang}
              </Link>
              <Link
                href={`${base}/contact`}
                onClick={() => setOpen(false)}
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
