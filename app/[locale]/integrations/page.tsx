import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityGroups, GroupNav } from "@/components/CapabilityGroups";
import { ContactBlock } from "@/components/ContactBlock";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { getCap } from "@/content/capabilities";
import { getDict, isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCap(locale).integrations;
  return pageMeta(locale, "/integrations", c.metaTitle, c.metaDescription);
}

export default async function IntegrationsPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const c = getCap(locale).integrations;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <section className="glow-dark text-white">
        <Container className="flex flex-col gap-6 pb-16 pt-16 sm:pt-20">
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <h1 className="max-w-[860px] text-4xl font-bold leading-tight sm:text-5xl">{c.title}</h1>
          <p className="max-w-[780px] text-lg text-mist-2 sm:text-xl">{c.intro}</p>
          <dl className="grid max-w-[640px] grid-cols-3 gap-4 pt-2">
            {c.stats.map((s) => (
              <div key={s.label} className="rounded-2xl glass-dark p-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold text-gold">{s.value}</dd>
                <dd className="text-sm text-mist">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="pt-2">
            <GroupNav groups={c.groups} />
          </div>
        </Container>
      </section>

      <CapabilityGroups groups={c.groups} />

      <section className="glow-dark text-white">
        <Container className="flex flex-col gap-10 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{c.howTitle}</h2>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.how.map((h, i) => (
              <li key={h.title} className="flex flex-col gap-2 rounded-2xl glass-dark p-6">
                <span className="text-sm font-bold text-gold">{num(i)}</span>
                <h3 className="text-lg font-bold">{h.title}</h3>
                <p className="text-[15px] text-mist">{h.text}</p>
              </li>
            ))}
          </ol>
          <div>
            <PrimaryButton href={`/${locale}/contact`} arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
              {d.nav.cta}
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: c.ctaTitle, text: c.ctaText } }} locale={locale} />
    </>
  );
}
