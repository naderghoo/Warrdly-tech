import Link from "next/link";
import type { Locale } from "@/content/i18n";
import { breadcrumbLd, HOME_LABEL, ld, type Crumb } from "@/lib/schema";

/** Visible breadcrumb strip + BreadcrumbList JSON-LD. The last crumb is the current page (no path). */
export function Breadcrumbs({ locale, trail }: { locale: Locale; trail: Crumb[] }) {
  const items: Crumb[] = [{ label: HOME_LABEL[locale], path: "" }, ...trail];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbLd(locale, trail))} />
      <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="border-b border-line bg-white/60">
        <ol className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-2 gap-y-1 px-5 py-2.5 text-[13px] text-muted-2 sm:px-6">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex min-w-0 items-center gap-2">
                {last || c.path === undefined ? (
                  <span aria-current={last ? "page" : undefined} className={`truncate ${last ? "max-w-[60vw] font-medium text-ink sm:max-w-none" : ""}`}>
                    {c.label}
                  </span>
                ) : (
                  <Link href={`/${locale}${c.path}`} className="hover:text-plum">
                    {c.label}
                  </Link>
                )}
                {!last && (
                  <span aria-hidden="true" className="opacity-50">
                    {locale === "ar" ? "‹" : "›"}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
