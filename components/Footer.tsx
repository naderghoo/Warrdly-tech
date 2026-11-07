import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/ar";
import { getCalc } from "@/content/calculator";
import { getCap } from "@/content/capabilities";
import { getExisting } from "@/content/existing";
import type { Locale } from "@/content/i18n";
import { getPrivacy } from "@/content/privacy";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { WhatsAppLogo } from "./WhatsAppFloat";

/** 966536663891 → +966 53 666 3891 */
const formatPhone = (n: string) => n.replace(/^966(\d{2})(\d{3})(\d{4})$/, "+966 $1 $2 $3");

export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const base = `/${locale}`;
  const ar = locale === "ar";
  const year = new Date().getFullYear();
  const legal = ar ? site.company.legalNameAr : site.company.legalNameEn;
  const badge = site.partnerLevel ? `${dict.footer.partnerBadge} · ${site.partnerLevel}` : dict.footer.partnerBadge;
  const cap = getCap(locale);

  const columns: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
    {
      title: dict.footer.solutions,
      links: [
        ...dict.sectors.map((s) => ({ href: `${base}/solutions/${s.slug}`, label: s.title })),
        { href: `${base}/odoo-support`, label: getExisting(locale).nav },
      ],
    },
    {
      title: ar ? "الخدمات" : "Services",
      links: [
        { href: `${base}/integrations`, label: cap.nav.integrations },
        { href: `${base}/addons`, label: cap.nav.addons },
        { href: `${base}/zatca`, label: dict.nav.zatca },
        { href: `${base}/services`, label: ar ? "الخدمات التقنية" : "Technology services" },
        { href: `${base}#packages`, label: dict.nav.packages },
      ],
    },
    {
      title: ar ? "موارد" : "Resources",
      links: [
        { href: `${base}/why-odoo`, label: ar ? "لماذا Odoo" : "Why Odoo" },
        { href: `${base}/blog`, label: ar ? "المدونة" : "Blog" },
        { href: `${base}/odoo-cost-calculator`, label: getCalc(locale).nav },
        { href: `${base}/assessment`, label: ar ? "اختبار الجاهزية" : "Readiness test" },
        { href: `${base}/contact`, label: dict.nav.contact },
        { href: site.portalUrl, label: dict.portal, external: true },
      ],
    },
  ];

  const linkCls = "text-[15px] text-mist transition-colors hover:text-white";

  return (
    <footer className="bg-night text-mist">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pb-24 pt-14 sm:px-6 md:pb-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-x-10">
          {/* Brand + contact */}
          <div className="col-span-2 flex flex-col gap-5 md:col-span-3 lg:col-span-1">
            <Link href={base} className="flex items-center gap-2.5 self-start">
              <Image src="/logo.png" alt="" width={40} height={40} />
              <span className="text-xl font-bold text-white">{dict.brand.name}</span>
            </Link>
            <p className="max-w-[340px] text-[15px] leading-relaxed">{dict.footer.about}</p>
            <span className="self-start rounded-[10px] border border-ink-3 px-3.5 py-2 text-[13px] text-mist-2">{badge}</span>
            <ul className="flex flex-col gap-3 text-[15px]">
              {site.whatsapp && (
                <li>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 hover:text-white">
                    <WhatsAppLogo size={18} className="flex-none text-[#25D366]" />
                    <span dir="ltr">{formatPhone(site.whatsapp)}</span>
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                    <Icon name="mail" size={18} stroke={1.8} className="flex-none text-gold" />
                    <span dir="ltr">{site.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Icon name="pin" size={18} stroke={1.8} className="mt-0.5 flex-none text-gold" />
                <span className="max-w-[300px] leading-relaxed">{ar ? site.company.cityAr : site.company.cityEn}</span>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <span className="mb-1 text-[15px] font-bold text-white">{col.title}</span>
              {col.links.map((l) =>
                l.external ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className={`${linkCls} inline-flex items-center gap-1.5`}>
                    <Icon name="user" size={15} stroke={2} />
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-2 pt-6 text-[13px] text-mist-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {year} {legal}. {dict.footer.rights}
            </span>
            <Link href={`${base}/privacy`} className="underline-offset-4 hover:text-white hover:underline">
              {getPrivacy(locale).nav}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              {dict.footer.unified}: <span dir="ltr">{site.company.unifiedNumber}</span>
            </span>
            <span>
              {dict.footer.vat}: <span dir="ltr">{site.company.vatNumber}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
