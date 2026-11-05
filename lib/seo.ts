import type { Metadata } from "next";
import type { Locale } from "@/content/i18n";

const BRAND: Record<Locale, string> = { ar: "وردلي تيكنولوجيز", en: "Warrdly Technologies" };

/**
 * Full per-page metadata: title, description, canonical, hreflang,
 * and page-specific Open Graph / Twitter cards (so shared links show the page, not the homepage).
 * `path` is the part after the locale, e.g. "/zatca" ("" for the home page).
 */
export function pageMeta(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  opts: { absoluteTitle?: boolean; publishedTime?: string } = {},
): Metadata {
  const url = `/${locale}${path}`;
  const shareTitle = opts.absoluteTitle ? title : `${title} | ${BRAND[locale]}`;
  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ar: `/ar${path}`, en: `/en${path}`, "x-default": `/ar${path}` },
    },
    openGraph: {
      type: opts.publishedTime ? "article" : "website",
      url,
      title: shareTitle,
      description,
      siteName: BRAND[locale],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: shareTitle }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: ["/og.png"] },
  };
}
