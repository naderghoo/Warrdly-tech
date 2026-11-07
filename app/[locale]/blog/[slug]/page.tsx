import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Container, PrimaryButton } from "@/components/ui";
import { blogUi, getPost, posts, type Block } from "@/content/blog";
import { isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { defaultAuthor } from "@/content/authors";
import { ORG_ID } from "@/lib/schema";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  const c = post[locale];
  return pageMeta(locale, `/blog/${slug}`, c.seoTitle ?? c.title, c.description, { absoluteTitle: true, publishedTime: post.date });
}

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="pt-6 text-2xl font-bold leading-snug sm:text-[28px]">{block.text}</h2>;
    case "p":
      return <p className="text-[17px] leading-[1.9] text-[#3E3242]">{block.text}</p>;
    case "ul":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 text-[17px] leading-[1.8] text-[#3E3242]">
              <span className="mt-3 h-2 w-2 flex-none rounded-full bg-plum" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((it, i) => (
            <li key={it} className="flex gap-3.5 text-[17px] leading-[1.8] text-[#3E3242]">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-tint text-sm font-bold text-plum">
                {i + 1}
              </span>
              {it}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="flex flex-col gap-2">
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[520px] border-collapse text-start text-[15px]">
              <thead>
                <tr className="bg-tint text-plum-dark">
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-start font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-line">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 text-start font-semibold text-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-3 text-[#3E3242]" dir="auto">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="text-sm text-mist-2">{block.caption}</figcaption>}
        </figure>
      );
    case "note":
      return (
        <aside className="flex gap-3 rounded-2xl glass-tint p-5 text-[16px] font-medium leading-[1.8] text-plum-dark">
          <Icon name="shield" size={22} className="mt-0.5 flex-none" />
          {block.text}
        </aside>
      );
  }
}

export default async function BlogPost({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) notFound();
  const c = post[locale];
  const ui = blogUi[locale];
  const others = posts.filter((p) => p.slug !== slug);
  const date = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  const author = defaultAuthor;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: c.title,
    description: c.description,
    datePublished: post.date,
    inLanguage: locale,
    mainEntityOfPage: `${site.url}/${locale}/blog/${slug}`,
    image: `${site.url}/og/${locale}/blog/${slug}.jpg`,
    author: {
      "@type": "Person",
      "@id": `${site.url}/#person-${author.slug}`,
      name: author[locale].name,
      jobTitle: author[locale].role,
      url: `${site.url}/${locale}/team/${author.slug}`,
    },
    publisher: { "@id": ORG_ID },
  };

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: locale === "ar" ? "المدونة" : "Blog", path: "/blog" }, { label: c.title }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="bg-tint/40">
          <Container className="flex max-w-[860px] flex-col gap-5 py-14">
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-plum hover:text-plum-dark">
              <Icon name="arrow" size={16} className="ltr:-scale-x-100" />
              {ui.back}
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-2">
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-plum-dark">{c.category}</span>
              <time dateTime={post.date}>{date}</time>
              <span>·</span>
              <span>
                {c.readMinutes} {ui.minutes}
              </span>
              <span>·</span>
              <Link href={`/${locale}/team/${author.slug}`} rel="author" className="font-semibold text-ink hover:text-plum">
                {author[locale].name}
              </Link>
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-[44px]">{c.title}</h1>
            <p className="text-lg text-muted">{c.description}</p>
          </Container>
        </header>

        <div className="bg-transparent">
          <Container className="flex max-w-[860px] flex-col gap-5 py-14">
            {c.body.map((b, i) => (
              <Render key={i} block={b} />
            ))}
            <Link
              href={`/${locale}${post.related.href}`}
              className="mt-4 flex items-center justify-between gap-4 rounded-2xl glass-tint border-s-4 !border-s-plum p-6 hover:shadow-sm"
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-muted-2">{locale === "ar" ? "الخدمة المرتبطة بهذا المقال" : "Related service"}</span>
                <span className="text-lg font-bold text-ink">{post.related.label[locale]}</span>
              </span>
              <Icon name="arrow" size={22} className="flex-none text-plum rtl:-scale-x-100" />
            </Link>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/60 p-6">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-plum font-bold text-white" aria-hidden="true">
                {author[locale].name.split(" ").map((w) => (locale === "ar" ? w.replace(/^ال/, "")[0] : w[0])).join(locale === "ar" ? "\u200c" : "")}
              </span>
              <span className="flex flex-col gap-1">
                <Link href={`/${locale}/team/${author.slug}`} rel="author" className="font-bold text-ink hover:text-plum">
                  {author[locale].name}
                </Link>
                <span className="text-sm text-muted">{author[locale].bio[0]}</span>
              </span>
            </div>
          </Container>
        </div>
      </article>

      <section className="glow-dark text-white">
        <Container className="flex max-w-[860px] flex-col items-start gap-4 py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">{ui.ctaTitle}</h2>
          <p className="text-lg text-mist-2">{ui.ctaText}</p>
          <PrimaryButton href={`/${locale}/contact`} arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
            {locale === "ar" ? "احجز استشارة مجانية" : "Book a free consultation"}
          </PrimaryButton>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="bg-transparent">
          <Container className="flex flex-col gap-6 py-16">
            <h2 className="text-2xl font-bold">{ui.more}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/blog/${p.slug}`}
                  className="flex flex-col gap-2 rounded-2xl glass p-6 text-ink hover:shadow-[0_12px_32px_rgba(36,21,42,0.08)]"
                >
                  <span className="text-[13px] font-semibold text-plum-dark">{p[locale].category}</span>
                  <h3 className="text-lg font-bold leading-snug">{p[locale].title}</h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
