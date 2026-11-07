import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/ui";
import { isLocale } from "@/content/i18n";
import { getPrivacy } from "@/content/privacy";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = getPrivacy(locale);
  return pageMeta(locale, p.path, p.title, p.metaDescription);
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPrivacy(locale);

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: p.nav }]} />
      <section className="bg-transparent">
        <Container className="py-14 sm:py-16">
          <article className="mx-auto flex max-w-[760px] flex-col gap-6">
            <header className="flex flex-col gap-3 border-b border-line pb-6">
              <h1 className="text-4xl font-bold leading-tight">{p.title}</h1>
              <p className="text-sm text-muted-2">{p.updated}</p>
              <p className="text-lg text-muted">{p.intro}</p>
            </header>
            {p.sections.map((s) => (
              <section key={s.title} className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">{s.title}</h2>
                {s.body?.map((b) => (
                  <p key={b} className="text-[17px] leading-relaxed text-ink-2">
                    {b}
                  </p>
                ))}
                {s.items && (
                  <ul className="flex list-disc flex-col gap-2 ps-6 text-[17px] leading-relaxed text-ink-2 marker:text-plum">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
