import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CostCalculator } from "@/components/CostCalculator";
import { Container, Eyebrow, TextLink } from "@/components/ui";
import { getCalc } from "@/content/calculator";
import { getDict, isLocale } from "@/content/i18n";
import { site } from "@/content/site";
import { faqLd, ld, ORG_ID } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCalc(locale);
  return pageMeta(locale, c.path, c.metaTitle, c.metaDescription);
}

export default async function CostCalculatorPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const c = getCalc(locale);

  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.metaTitle,
    description: c.metaDescription,
    url: `${site.url}/${locale}${c.path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    provider: { "@id": ORG_ID },
  };

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: c.nav }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(app)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqLd(c.faq))} />

      <section className="bg-tint/40">
        <Container className="flex flex-col gap-5 pb-12 pt-14 sm:pt-16">
          <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          <h1 className="max-w-[860px] text-4xl font-bold leading-tight sm:text-5xl">{c.hero.title}</h1>
          <p className="max-w-[760px] text-lg text-muted sm:text-xl">{c.hero.text}</p>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="py-12 sm:py-16">
          <CostCalculator c={c} dict={d} locale={locale} />
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">{c.howTitle}</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {c.how.map((h, i) => (
              <div key={h.title} className="flex flex-col gap-3 rounded-2xl glass border-t-4 !border-t-plum p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tint font-bold text-plum">{i + 1}</span>
                <h3 className="text-lg font-bold">{h.title}</h3>
                <p className="text-[15px] text-muted">{h.text}</p>
              </div>
            ))}
          </div>
          <div>
            <TextLink href={`/${locale}${c.articleLink.href}`}>{c.articleLink.label}</TextLink>
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-6 pb-20 pt-8">
          <h2 className="text-2xl font-bold sm:text-3xl">{c.faqTitle}</h2>
          <div className="flex flex-col gap-3">
            {c.faq.map((f) => (
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
    </>
  );
}
