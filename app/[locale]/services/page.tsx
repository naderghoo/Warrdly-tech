import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ld, serviceLd } from "@/lib/schema";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { getDigital } from "@/content/digital";
import { getDict, isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getDigital(locale);
  return pageMeta(locale, "/services", c.metaTitle, c.metaDescription);
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const c = getDigital(locale);
  const base = `/${locale}`;

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ label: locale === "ar" ? "الخدمات التقنية" : "Technology services" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(serviceLd(locale, "/services", c.metaTitle, c.metaDescription, locale === "ar" ? "تطوير المواقع والمتاجر والتطبيقات" : "Web, store and app development"))} />
      {/* Hero */}
      <section className="bg-ink text-white">
        <Container className="flex flex-col gap-10 pb-16 pt-16 sm:pt-20">
          <div className="flex max-w-[860px] flex-col gap-5">
            <Eyebrow light>{c.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{c.title}</h1>
            <p className="text-lg text-mist-2 sm:text-xl">{c.intro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton href={`${base}/contact`} arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
                {c.primary}
              </PrimaryButton>
              <a
                href="#work"
                className="inline-flex min-h-[52px] items-center rounded-xl border border-white/25 px-7 text-[17px] font-semibold text-white hover:bg-white/10"
              >
                {c.secondary}
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/12 lg:grid-cols-4">
            {c.pillars.map((p, i) => (
              <div
                key={p.label}
                className={`flex flex-col gap-1 bg-white/[0.03] p-5 sm:p-6 ${i % 2 === 1 ? "border-s border-white/12" : ""} ${i >= 2 ? "border-t border-white/12 lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
              >
                <dd dir="ltr" className="text-2xl font-bold text-gold sm:text-3xl">
                  {p.value}
                </dd>
                <dt className="text-[15px] text-mist-2">{p.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Services grid */}
      <section id="list" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-10 py-20">
          <div className="flex max-w-[720px] flex-col gap-2">
            <h2 className="text-3xl font-bold text-ink sm:text-[40px]">{c.servicesTitle}</h2>
            <p className="text-lg text-muted">{c.servicesIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <article key={s.key} id={s.key} className="flex scroll-mt-28 flex-col gap-4 rounded-xl glass p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-plum/20 bg-plum/5 text-plum">
                    <Icon name={s.icon} size={22} stroke={1.8} />
                  </span>
                  <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
                <ul className="flex flex-col gap-2 border-t border-line pt-4 text-[15px]">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <Icon name="check" size={16} stroke={2.6} className="mt-1.5 flex-none text-plum" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Our work */}
      <section id="work" className="scroll-mt-24 bg-ink text-white">
        <Container className="flex flex-col gap-10 py-20">
          <div className="flex max-w-[720px] flex-col gap-3">
            <span className="h-[3px] w-12 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="text-3xl font-bold sm:text-[40px]">{c.workTitle}</h2>
            <p className="text-lg text-mist-2">{c.workIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {c.work.map((w) => (
              <article key={w.name} className="flex flex-col gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-7">
                <span className="text-[13px] font-semibold text-gold">{w.type}</span>
                <h3 className="text-xl font-bold">{w.name}</h3>
                <p className="text-[15px] leading-relaxed text-mist-2">{w.text}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {w.tags.map((t) => (
                    <li key={t} className="rounded-md border border-white/15 px-2.5 py-1 text-[12px] font-medium text-mist-2">
                      {t}
                    </li>
                  ))}
                </ul>
                {w.url && (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-[15px] font-semibold text-lilac hover:text-white"
                  >
                    {w.url.replace("https://", "")}
                    <Icon name="arrow" size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-transparent">
        <Container className="flex flex-col gap-10 py-20">
          <h2 className="text-3xl font-bold text-ink sm:text-[40px]">{c.processTitle}</h2>
          <ol className="panel grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-3">
            {c.process.map((p, i) => (
              <li
                key={p.title}
                className={`flex flex-col gap-2 border-line p-6 sm:p-7 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i % 3 !== 0 ? "lg:border-s" : "lg:border-s-0"} ${i >= 3 ? "lg:border-t" : "lg:border-t-0"}`}
              >
                <span className="text-sm font-bold tabular-nums text-plum">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Stack */}
      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 pb-20">
          <div className="flex max-w-[720px] flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">{c.stackTitle}</h2>
            <p className="text-lg text-muted">{c.stackIntro}</p>
          </div>
          <div className="panel grid grid-cols-1 gap-6 rounded-xl p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-5">
            {c.stack.map((g) => (
              <div key={g.group} className="flex flex-col gap-3">
                <h3 className="text-[15px] font-bold text-plum">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-md border border-line bg-white px-2.5 py-1 text-[13px] font-medium text-ink">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement models */}
      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 pb-20">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{c.modelsTitle}</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {c.models.map((m, i) => (
              <div key={m.title} className={`flex flex-col gap-3 rounded-xl p-7 ${i === 1 ? "bg-ink text-white" : "glass"}`}>
                <h3 className="text-xl font-bold">{m.title}</h3>
                <p className={`text-[15px] leading-relaxed ${i === 1 ? "text-mist-2" : "text-muted"}`}>{m.text}</p>
                <p className={`mt-auto border-t pt-3 text-sm font-semibold ${i === 1 ? "border-white/15 text-gold" : "border-line text-plum"}`}>{m.best}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: c.ctaTitle, text: c.ctaText } }} locale={locale} />
    </>
  );
}
