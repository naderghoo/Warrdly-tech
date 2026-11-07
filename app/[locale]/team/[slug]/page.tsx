import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBlock } from "@/components/ContactBlock";
import { Container, Eyebrow } from "@/components/ui";
import { authors, getAuthor } from "@/content/authors";
import { blogUi, posts } from "@/content/blog";
import { getDict, isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";
import { ld, ORG_ID } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => authors.map((a) => ({ locale, slug: a.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getAuthor(slug);
  if (!isLocale(locale) || !a) return {};
  const c = a[locale];
  return pageMeta(locale, `/team/${slug}`, `${c.name}${locale === "ar" ? "، " : ", "}${c.role}`, c.bio[0]);
}

export default async function AuthorPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const a = getAuthor(slug);
  if (!isLocale(locale) || !a) notFound();
  const d = getDict(locale);
  const c = a[locale];
  const ui = blogUi[locale];
  const initials = c.name
    .split(" ")
    .map((w) => (locale === "ar" ? w.replace(/^ال/, "")[0] : w[0]))
    .join(locale === "ar" ? "\u200c" : "");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person-${a.slug}`,
    name: c.name,
    alternateName: locale === "ar" ? a.en.name : a.ar.name,
    jobTitle: c.role,
    description: c.bio.join(" "),
    url: `${site.url}/${locale}/team/${a.slug}`,
    worksFor: { "@id": ORG_ID },
    knowsAbout: c.expertise,
    ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
  };

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: c.name }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(person)} />
      <section className="bg-tint/40">
        <Container className="flex flex-col gap-8 py-16 sm:flex-row sm:items-start">
          <span
            className="flex h-28 w-28 flex-none items-center justify-center rounded-full bg-plum text-3xl font-bold text-white"
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="flex max-w-[760px] flex-col gap-4">
            <Eyebrow>{locale === "ar" ? "كاتب المقالات" : "Author"}</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight">{c.name}</h1>
            <p className="text-lg font-semibold text-plum-dark">{c.role}</p>
            {c.bio.map((b) => (
              <p key={b} className="text-lg text-muted">
                {b}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2">
              {c.expertise.map((e) => (
                <li key={e} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-plum-dark">
                  {e}
                </li>
              ))}
            </ul>
            {a.sameAs.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {a.sameAs.map((u) => (
                  <a key={u} href={u} target="_blank" rel="noopener me" className="font-semibold text-plum hover:text-plum-dark">
                    {u.includes("linkedin") ? "LinkedIn" : u.replace(/^https?:\/\//, "")}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-6 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">{locale === "ar" ? "المقالات" : "Articles"}</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="flex flex-col gap-2 rounded-2xl glass p-6 hover:border-plum">
                <span className="text-sm font-semibold text-plum">{p[locale].category}</span>
                <span className="text-lg font-bold text-ink">{p[locale].title}</span>
                <span className="text-[15px] text-muted">{p[locale].description}</span>
                <span className="mt-auto pt-2 text-sm font-semibold text-plum">{ui.read}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactBlock dict={d} locale={locale} />
    </>
  );
}
