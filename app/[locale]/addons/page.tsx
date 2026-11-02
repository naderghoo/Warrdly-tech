import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityGroups, GroupNav } from "@/components/CapabilityGroups";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow } from "@/components/ui";
import { getCap } from "@/content/capabilities";
import { getDict, isLocale } from "@/content/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCap(locale).addons;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${locale}/addons`, languages: { ar: "/ar/addons", en: "/en/addons", "x-default": "/ar/addons" } },
  };
}

export default async function AddonsPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const c = getCap(locale).addons;

  return (
    <>
      <section className="glow-dark text-white">
        <Container className="flex flex-col gap-6 pb-16 pt-16 sm:pt-20">
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <h1 className="max-w-[860px] text-4xl font-bold leading-tight sm:text-5xl">{c.title}</h1>
          <p className="max-w-[780px] text-lg text-mist-2 sm:text-xl">{c.intro}</p>
          <p className="inline-flex max-w-[780px] items-center gap-2 text-[15px] text-lilac">
            <Icon name="gear" size={18} stroke={1.8} className="flex-none" />
            {c.note}
          </p>
          <div className="pt-2">
            <GroupNav groups={c.groups} />
          </div>
        </Container>
      </section>

      <CapabilityGroups groups={c.groups} />

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: c.ctaTitle, text: c.ctaText } }} locale={locale} />
    </>
  );
}
