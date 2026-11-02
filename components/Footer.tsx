import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/ar";
import { getCap } from "@/content/capabilities";
import type { Locale } from "@/content/i18n";
import { site } from "@/content/site";

export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();
  const legal = locale === "ar" ? site.company.legalNameAr : site.company.legalNameEn;
  const badge = site.partnerLevel ? `${dict.footer.partnerBadge} · ${site.partnerLevel}` : dict.footer.partnerBadge;

  return (
    <footer className="bg-night text-mist">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pb-8 pt-14 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={40} height={40} />
              <span className="text-xl font-bold text-white">{dict.brand.name}</span>
            </span>
            <p className="text-[15px]">{dict.footer.about}</p>
            <span className="self-start rounded-[10px] border border-ink-3 px-3.5 py-2 text-[13px] text-mist-2">{badge}</span>
          </div>
          <nav aria-label={dict.footer.solutions} className="flex flex-col gap-2.5 text-[15px]">
            <span className="font-semibold text-white">{dict.footer.solutions}</span>
            {dict.sectors.map((s) => (
              <Link key={s.slug} href={`${base}/solutions/${s.slug}`} className="hover:text-white">
                {s.title}
              </Link>
            ))}
          </nav>
          <nav aria-label={dict.footer.company} className="flex flex-col gap-2.5 text-[15px]">
            <span className="font-semibold text-white">{dict.footer.company}</span>
            <Link href={`${base}/integrations`} className="hover:text-white">{getCap(locale).nav.integrations}</Link>
            <Link href={`${base}/addons`} className="hover:text-white">{getCap(locale).nav.addons}</Link>
            <Link href={`${base}#services`} className="hover:text-white">{dict.nav.services}</Link>
            <Link href={`${base}/zatca`} className="hover:text-white">{dict.nav.zatca}</Link>
            <Link href={`${base}/blog`} className="hover:text-white">{locale === "ar" ? "المدونة" : "Blog"}</Link>
            <Link href={`${base}/assessment`} className="hover:text-white">{locale === "ar" ? "اختبار الجاهزية" : "Readiness test"}</Link>
            <Link href={`${base}#packages`} className="hover:text-white">{dict.nav.packages}</Link>
            <Link href={`${base}/contact`} className="hover:text-white">{dict.nav.contact}</Link>
          </nav>
          <nav aria-label={dict.footer.links} className="flex flex-col gap-2.5 text-[15px]">
            <span className="font-semibold text-white">{dict.footer.links}</span>
            <a href={site.marketplaceUrl} className="hover:text-white">{dict.footer.marketplace}</a>
            {site.email && <a href={`mailto:${site.email}`} className="hover:text-white" dir="ltr">{site.email}</a>}
            <span>{locale === "ar" ? site.company.cityAr : site.company.cityEn}</span>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink-2 pt-6 text-sm">
          <span>© {year} {legal}. {dict.footer.rights}</span>
          <span>
            {dict.footer.unified}: {site.company.unifiedNumber} · {dict.footer.vat}: {site.company.vatNumber}
          </span>
        </div>
      </div>
    </footer>
  );
}
