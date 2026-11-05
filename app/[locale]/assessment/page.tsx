import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Assessment } from "@/components/Assessment";
import { Container, Eyebrow } from "@/components/ui";
import { getAssessment } from "@/content/assessment";
import { getDict, isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getAssessment(locale);
  return pageMeta(locale, "/assessment", c.metaTitle, c.metaDescription);
}

export default async function AssessmentPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getAssessment(locale);
  const d = getDict(locale);

  return (
    <>
      <section className="glow-dark text-white">
        <Container className="flex max-w-[860px] flex-col gap-5 pb-14 pt-14 sm:pt-16">
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{c.title}</h1>
          <p className="text-lg text-mist-2 sm:text-xl">{c.intro}</p>
        </Container>
      </section>
      <section className="bg-transparent">
        <Container className="max-w-[860px] py-12 sm:py-16">
          <Assessment c={c} dict={d} locale={locale} />
        </Container>
      </section>
    </>
  );
}
