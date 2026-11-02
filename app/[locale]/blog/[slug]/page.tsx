import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Container, PrimaryButton, TextLink } from "@/components/ui";
import { blogUi, getPost, posts, type Block } from "@/content/blog";
import { isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  const c = post[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages: { ar: `/ar/blog/${slug}`, en: `/en/blog/${slug}` } },
    openGraph: { type: "article", title: c.title, description: c.description, publishedTime: post.date, images: ["/og.png"] },
  };
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
    case "note":
      return (
        <aside className="flex gap-3 rounded-2xl bg-tint p-5 text-[16px] font-medium leading-[1.8] text-plum-dark">
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
  const date = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: c.title,
    description: c.description,
    datePublished: post.date,
    inLanguage: locale,
    mainEntityOfPage: `${site.url}/${locale}/blog/${slug}`,
    image: `${site.url}/og.png`,
    author: { "@type": "Organization", name: locale === "ar" ? "وردلي تيكنولوجيز" : "Warrdly Technologies" },
    publisher: { "@type": "Organization", name: "Warrdly Technologies", logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="bg-tint">
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
                {locale === "ar" ? c.readMinutes.toLocaleString("ar-SA") : c.readMinutes} {ui.minutes}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-[44px]">{c.title}</h1>
            <p className="text-lg text-muted">{c.description}</p>
          </Container>
        </header>

        <div className="bg-white">
          <Container className="flex max-w-[860px] flex-col gap-5 py-14">
            {c.body.map((b, i) => (
              <Render key={i} block={b} />
            ))}
            <div className="pt-4">
              <TextLink href={`/${locale}${post.related.href}`}>
                {ui.related}: {post.related.label[locale]}
              </TextLink>
            </div>
          </Container>
        </div>
      </article>

      <section className="bg-ink text-white">
        <Container className="flex max-w-[860px] flex-col items-start gap-4 py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">{ui.ctaTitle}</h2>
          <p className="text-lg text-mist-2">{ui.ctaText}</p>
          <PrimaryButton href={`/${locale}/contact`} arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
            {locale === "ar" ? "احجز استشارة مجانية" : "Book a free consultation"}
          </PrimaryButton>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="bg-paper">
          <Container className="flex flex-col gap-6 py-16">
            <h2 className="text-2xl font-bold">{ui.more}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/blog/${p.slug}`}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-6 text-ink hover:shadow-[0_12px_32px_rgba(36,21,42,0.08)]"
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
