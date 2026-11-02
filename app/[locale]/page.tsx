import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow, PrimaryButton, SecondaryButton, SectionHead, TextLink } from "@/components/ui";
import { getDict, isLocale } from "@/content/i18n";
import { site } from "@/content/site";

const toArabicDigits = (s: string) => s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const base = `/${locale}`;
  const badge = site.partnerLevel ? `${d.hero.badge} · ${site.partnerLevel}` : d.hero.badge;
  const num = (i: number) => {
    const s = String(i + 1).padStart(2, "0");
    return locale === "ar" ? toArabicDigits(s) : s;
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <Container className="flex flex-wrap items-center gap-14 pb-24 pt-16 sm:pt-20">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-tint px-3.5 py-1.5 text-sm font-semibold text-plum-dark">
              <Icon name="shield" size={16} />
              {badge}
            </span>
            <h1 className="text-[40px] font-bold leading-[1.25] text-ink sm:text-[56px]">
              {d.hero.title1}
              <br />
              <span className="text-plum">{d.hero.title2}</span>
            </h1>
            <p className="max-w-[560px] text-lg text-muted sm:text-xl">{d.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={`${base}/contact`} arrow>
                {d.hero.primary}
              </PrimaryButton>
              <SecondaryButton href={`${base}#packages`}>{d.hero.secondary}</SecondaryButton>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {d.hero.points.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={16} stroke={2.4} className="text-plum" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard illustration */}
          <div className="min-w-0 flex-[1_1_420px]" aria-hidden="true">
            <div className="rounded-[20px] bg-ink p-5 shadow-[0_24px_60px_rgba(36,21,42,0.18)]">
              <div className="flex items-center justify-between pb-4">
                <span className="text-[15px] font-semibold text-mist-2">{d.dashboard.title}</span>
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-3" />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {d.dashboard.kpis.map((k, i) => (
                  <div key={k} className="flex flex-col gap-1.5 rounded-xl bg-ink-2 p-3.5">
                    <span className="text-[13px] text-mist">{k}</span>
                    <span
                      className="h-2.5 rounded-md"
                      style={{ width: ["70%", "55%", "82%"][i], background: ["#F2A93B", "#E7B3D6", "#C98BB8"][i] }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-ink-2 p-4.5">
                <div className="flex h-[150px] items-end gap-2.5">
                  {[40, 58, 50, 72, 66, 88, 95].map((h, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-t-md ${i > 4 ? "bg-lilac" : "bg-ink-3"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5 text-[13px]">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#4A2A44] px-3 py-1.5 text-[#F3D3E8]">
                  <Icon name="check" size={14} stroke={2.4} />
                  {d.dashboard.chip1}
                </span>
                <span className="rounded-lg bg-[#3D3220] px-3 py-1.5 text-[#F7D08F]">{d.dashboard.chip2}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats (hidden until filled in content/site.ts) */}
      {site.stats.length > 0 && (
        <section className="border-y border-line bg-paper">
          <Container className="grid grid-cols-2 gap-6 py-10 text-center md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.en}>
                <div className="text-4xl font-bold text-ink">{s.value}</div>
                <div className="text-[15px] text-muted-2">{locale === "ar" ? s.ar : s.en}</div>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Sectors */}
      <section id="sectors" className="scroll-mt-24 bg-paper">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead eyebrow={d.sectorsSection.eyebrow} title={d.sectorsSection.title} subtitle={d.sectorsSection.subtitle} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.sectors.map((s) => (
              <Link
                key={s.slug}
                href={`${base}/solutions/${s.slug}`}
                className="group flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-7 text-ink transition-shadow hover:shadow-[0_12px_32px_rgba(36,21,42,0.08)]"
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-tint text-plum">
                  <Icon name={s.icon} size={26} stroke={1.8} />
                </span>
                <span className="text-xl font-bold">{s.title}</span>
                <span className="text-base text-muted">{s.short}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-plum">
                  {d.sectorsSection.more}
                  <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-white">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow>{d.services.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-[40px]">{d.services.title}</h2>
            </div>
            <TextLink href={`${base}/contact`}>{d.services.link}</TextLink>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {d.services.items.map((s) => (
              <div key={s.title} className="flex gap-4.5 bg-white p-8">
                <Icon name={s.icon} size={28} stroke={1.8} className="flex-none text-ink" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[19px] font-bold">{s.title}</h3>
                  <p className="text-base text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ZATCA band */}
      <section id="zatca" className="scroll-mt-24 bg-ink text-white">
        <Container className="flex flex-wrap items-center gap-12 py-20 sm:py-22">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-4.5">
            <Eyebrow light>{d.zatcaBand.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug sm:text-[40px]">{d.zatcaBand.title}</h2>
            <p className="text-lg text-mist-2">{d.zatcaBand.text}</p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href={`${base}/contact`}
                className="inline-flex min-h-[52px] items-center rounded-xl bg-gold px-6 font-bold text-ink hover:bg-[#F5B95A]"
              >
                {d.zatcaBand.cta}
              </Link>
              <Link href={`${base}/zatca`} className="inline-flex items-center gap-1.5 font-semibold text-lilac hover:text-white">
                {d.zatcaBand.more}
                <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
          <div className="grid min-w-0 flex-[1_1_420px] grid-cols-1 gap-3.5 sm:grid-cols-2">
            {d.zatcaBand.items.map((it) => (
              <div key={it.title} className="flex flex-col gap-2 rounded-[14px] bg-ink-2 p-5.5">
                <Icon name={it.icon} size={24} className="text-lilac" />
                <span className="text-[17px] font-semibold">{it.title}</span>
                <span className="text-[15px] text-mist">{it.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-paper">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead eyebrow={d.process.eyebrow} title={d.process.title} />
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.process.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-2.5 rounded-2xl border-t-4 border-plum bg-white p-7">
                <span className="text-[15px] font-bold text-plum">{num(i)}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-base text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Case study */}
      <section id="case" className="scroll-mt-24 bg-white">
        <Container className="py-20 sm:py-24">
          <div className="flex flex-col gap-5 rounded-3xl bg-tint p-8 sm:p-14">
            <span className="text-[15px] font-semibold text-plum-dark">{d.caseStudy.eyebrow}</span>
            <h2 className="max-w-[820px] text-2xl font-bold leading-snug sm:text-4xl">{d.caseStudy.title}</h2>
            <p className="max-w-[820px] text-lg text-[#3E3242]">{d.caseStudy.text}</p>
            <div>
              <TextLink href={`${base}/contact`}>{d.caseStudy.cta}</TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="bg-white">
        <Container className="flex flex-col items-center gap-7 pb-24 text-center">
          <h2 className="text-2xl font-bold sm:text-[28px]">{d.integrations.title}</h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {d.integrations.items.map((it) => (
              <li key={it} className="rounded-full border border-[#DFD4DC] px-5.5 py-2.5 text-base font-medium">
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 bg-paper">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead center eyebrow={d.packages.eyebrow} title={d.packages.title} subtitle={d.packages.subtitle} />
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            {d.packages.tiers.map((t) => {
              const featured = t.key === "growth";
              const price =
                t.key === "enterprise"
                  ? d.packages.custom
                  : site.prices[t.key as "starter" | "growth"]
                    ? `${site.prices[t.key as "starter" | "growth"]} ${d.packages.currency}`
                    : d.packages.quote;
              return (
                <div
                  key={t.key}
                  className={`flex flex-col gap-4.5 rounded-[18px] p-8 ${
                    featured ? "bg-ink text-white shadow-[0_20px_50px_rgba(36,21,42,0.22)]" : "border border-line bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[22px] font-bold">{t.name}</h3>
                    {featured && (
                      <span className="rounded-full bg-gold px-3 py-1 text-[13px] font-bold text-ink">{d.packages.popular}</span>
                    )}
                  </div>
                  <p className={`text-[15px] ${featured ? "text-mist-2" : "text-muted"}`}>{t.desc}</p>
                  <p className="text-[26px] font-bold">{price}</p>
                  <ul className="flex flex-col gap-2.5 text-base">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Icon name="check" size={18} stroke={2.4} className={featured ? "text-lilac" : "text-plum"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${base}/contact`}
                    className={`mt-auto inline-flex min-h-[48px] items-center justify-center rounded-xl font-semibold ${
                      featured ? "bg-gold font-bold text-ink hover:bg-[#F5B95A]" : "border-[1.5px] border-line-2 text-ink hover:border-plum"
                    }`}
                  >
                    {t.key === "enterprise" ? d.packages.talk : d.packages.quote}
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactBlock dict={d} locale={locale} />
    </>
  );
}
