import type { Locale } from "@/content/i18n";
import { site } from "@/content/site";

export const ORG_ID = `${site.url}/#organization`;

export type Crumb = { label: string; path?: string };

/** Home label per locale; every breadcrumb trail starts here. */
export const HOME_LABEL: Record<Locale, string> = { ar: "الرئيسية", en: "Home" };

export function breadcrumbLd(locale: Locale, trail: Crumb[]) {
  const items = [{ label: HOME_LABEL[locale], path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.path !== undefined ? { item: `${site.url}/${locale}${c.path}` } : {}),
    })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceLd(locale: Locale, path: string, name: string, description: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/${locale}${path}#service`,
    name,
    description,
    serviceType,
    url: `${site.url}/${locale}${path}`,
    inLanguage: locale,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
  };
}

/** Serialise JSON-LD safely for a <script> tag. */
export const ld = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
