import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqLd, ld, serviceLd } from "@/lib/schema";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { ar } from "@/content/ar";
import { getDict, isLocale, locales } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => ar.sectors.map((s) => ({ locale, slug: s.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const sector = getDict(locale).sectors.find((s) => s.slug === slug);
  if (!sector) return {};
  return pageMeta(locale, `/solutions/${slug}`, sector.metaTitle, sector.metaDesc);
}

export default async function SectorPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const sector = d.sectors.find((s) => s.slug === slug);
  if (!sector) notFound();
  const base = `/${locale}`;
  const p = d.sectorPage;

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: sector.title }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(serviceLd(locale, `/solutions/${slug}`, sector.metaTitle, sector.metaDesc, locale === "ar" ? "تطبيق نظام Odoo" : "Odoo implementation"))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqLd(sector.faq))} />
      <section className="bg-transparent">
        <Container className="flex flex-col gap-6 pb-16 pt-14 sm:pt-20">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tint text-plum">
            <Icon name={sector.icon} size={32} stroke={1.8} />
          </span>
          <Eyebrow>{d.sectorsSection.eyebrow}</Eyebrow>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{sector.title}</h1>
          <p className="max-w-[760px] text-lg text-muted sm:text-xl">{sector.intro}</p>
          <div>
            <PrimaryButton href={`${base}/contact`} arrow>
              {d.nav.cta}
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold sm:text-3xl">{p.challengesTitle}</h2>
            <ul className="flex flex-col gap-3">
              {sector.challenges.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl glass p-4 text-base">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-gold" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold sm:text-3xl">{p.solutionTitle}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sector.solution.map((s) => (
                <div key={s.title} className="flex flex-col gap-2 rounded-2xl glass p-6">
                  <Icon name="check" size={22} stroke={2.4} className="text-plum" />
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-[15px] text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-5 py-16">
          <h2 className="text-2xl font-bold">{p.appsTitle}</h2>
          <ul className="flex flex-wrap gap-3">
            {sector.apps.map((a) => (
              <li key={a} className="rounded-full bg-tint px-5 py-2.5 font-medium text-plum-dark">
                {a}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[15px]">
            <span className="font-semibold text-muted-2">{p.others}:</span>
            {d.sectors
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link key={s.slug} href={`${base}/solutions/${s.slug}`} className="font-semibold text-plum hover:text-plum-dark">
                  {s.title}
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-6 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {locale === "ar" ? `أسئلة شائعة عن Odoo لقطاع ${sector.title}` : `Odoo for ${sector.title}: FAQ`}
          </h2>
          <div className="flex flex-col gap-3">
            {sector.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl glass p-6 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl leading-none text-plum transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pt-3 text-base text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: p.ctaTitle, text: p.ctaText } }} locale={locale} />
    </>
  );
}
