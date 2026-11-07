import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Container } from "@/components/ui";
import { getDict, isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return pageMeta(locale, "/contact", d.contactPage.metaTitle, d.contactPage.metaDesc);
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: d.nav.contact }]} />
      <section className="bg-tint/40">
        <Container className="flex flex-col gap-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">{d.contactPage.title}</h1>
          <p className="max-w-[700px] text-lg text-muted">{d.contact.title}</p>
        </Container>
      </section>
      <ContactBlock dict={{ ...d, contact: { ...d.contact, text: d.contactPage.intro } }} locale={locale} heading={false} />
    </>
  );
}
