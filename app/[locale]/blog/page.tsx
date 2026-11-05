import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Container } from "@/components/ui";
import { blogUi, posts } from "@/content/blog";
import { isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const ui = blogUi[locale];
  return pageMeta(
    locale,
    "/blog",
    locale === "ar" ? "مدونة Odoo والتحول الرقمي" : "Odoo & digital transformation blog",
    ui.intro,
  );
}

export default async function BlogIndex({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ui = blogUi[locale];
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="bg-tint/40">
        <Container className="flex flex-col gap-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">{ui.title}</h1>
          <p className="max-w-[720px] text-lg text-muted">{ui.intro}</p>
        </Container>
      </section>
      <section className="bg-transparent">
        <Container className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => {
            const c = p[locale];
            return (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="group flex flex-col gap-3 rounded-2xl glass p-7 text-ink transition-shadow hover:shadow-[0_12px_32px_rgba(36,21,42,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="rounded-full bg-tint px-3 py-1 font-semibold text-plum-dark">{c.category}</span>
                  <span className="text-muted-2">
                    {c.readMinutes} {ui.minutes}
                  </span>
                </div>
                <h2 className="text-xl font-bold leading-snug">{c.title}</h2>
                <p className="text-[15px] text-muted">{c.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-plum">
                  {ui.read}
                  <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
                </span>
              </Link>
            );
          })}
        </Container>
      </section>
    </>
  );
}
