import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { getExisting } from "@/content/existing";
import { Icon } from "@/components/Icon";
import { WhyOdoo } from "@/components/WhyOdoo";
import { Container, Eyebrow, PrimaryButton, SecondaryButton, SectionHead, TextLink } from "@/components/ui";
import { getCap } from "@/content/capabilities";
import { getDigital } from "@/content/digital";
import { getHome } from "@/content/home";
import { getDict, isLocale } from "@/content/i18n";
import { getOdoo } from "@/content/odoo";
import { site } from "@/content/site";
import { HeroVideo } from "@/components/HeroVideo";

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const h = getHome(locale);
  const cap = getCap(locale);
  const tech = getDigital(locale);
  const base = `/${locale}`;
  const badge = site.partnerLevel ? `${d.hero.badge} · ${site.partnerLevel}` : d.hero.badge;

  return (
    <>
      {/* 1 ── Hero */}
      <section className="bg-transparent">
        <Container className="flex flex-wrap items-center gap-14 pb-20 pt-16 sm:pt-20">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start rounded-md border border-plum/20 bg-white px-3 py-1.5 text-sm font-semibold text-plum-dark">
              <Icon name="shield" size={16} />
              {badge}
            </span>
            <h1 className="text-[40px] font-bold leading-[1.22] text-ink sm:text-[54px]">
              {d.hero.title1}
              <br />
              <span className="text-sheen">{d.hero.title2}</span>
            </h1>
            <p className="max-w-[560px] text-lg leading-relaxed text-muted sm:text-xl">{d.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={`${base}/contact`} arrow>
                {d.hero.primary}
              </PrimaryButton>
              <SecondaryButton href={`${base}/assessment`}>{d.hero.secondary}</SecondaryButton>
            </div>
          </div>

          {/* Animated hero banner (Remotion) */}
          <div className="min-w-0 flex-[1_1_420px]">
            <HeroVideo locale={locale} />
          </div>
        </Container>
      </section>

      {/* 2 ── Trust strip */}
      <section aria-label={h.trust[0]} className="border-y border-line bg-white">
        <Container className="grid grid-cols-2 gap-y-4 py-5 lg:grid-cols-4">
          {h.trust.map((t, i) => (
            <div key={t} className={`flex items-center justify-center gap-2.5 px-3 text-[15px] font-semibold text-ink ${i > 0 ? "lg:border-s lg:border-line" : ""} ${i % 2 === 1 ? "border-s border-line lg:border-s" : ""}`}>
              <Icon name={["shield", "check", "box", "globe"][i]} size={18} stroke={2} className="flex-none text-plum" />
              <span className="text-center">{t}</span>
            </div>
          ))}
        </Container>
      </section>

      {/* Optional own figures (hidden until filled in content/site.ts) */}
      {site.stats.length > 0 && (
        <section className="border-b border-line bg-white">
          <Container className="grid grid-cols-2 gap-6 py-10 text-center md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.en}>
                <div dir="ltr" className="text-4xl font-bold text-ink">{s.value}</div>
                <div className="text-[15px] text-muted-2">{locale === "ar" ? s.ar : s.en}</div>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* 3 ── Sectors */}
      <section id="sectors" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead eyebrow={d.sectorsSection.eyebrow} title={d.sectorsSection.title} subtitle={d.sectorsSection.subtitle} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.sectors.map((s) => (
              <Link key={s.slug} href={`${base}/solutions/${s.slug}`} className="group flex flex-col gap-3.5 rounded-xl glass p-7 text-ink">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-plum/20 bg-plum/5 text-plum">
                  <Icon name={s.icon} size={24} stroke={1.8} />
                </span>
                <span className="text-xl font-bold">{s.title}</span>
                <span className="text-[15px] leading-relaxed text-muted">{s.short}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[15px] font-semibold text-plum">
                  {d.sectorsSection.more}
                  <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 ── What we do: Odoo services + technology services */}
      <section id="services" className="scroll-mt-24 border-y border-line bg-white">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead eyebrow={h.what.eyebrow} title={h.what.title} subtitle={h.what.subtitle} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Odoo column */}
            <div className="flex flex-col rounded-xl border border-line">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-6 py-4">
                <h3 className="text-lg font-bold text-ink">{h.what.odooTitle}</h3>
                <span dir="ltr" className="rounded bg-plum px-2 py-0.5 text-[12px] font-bold text-white">Odoo</span>
              </div>
              <ul className="flex flex-col">
                {d.services.items.map((s, i) => (
                  <li key={s.title} className={`flex gap-4 px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}>
                    <Icon name={s.icon} size={22} stroke={1.8} className="mt-0.5 flex-none text-plum" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] font-bold text-ink">{s.title}</span>
                      <span className="text-[15px] leading-relaxed text-muted">{s.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-4">
                {h.what.odooLinks.map((l) => (
                  <TextLink key={l.href} href={`${base}${l.href}`}>
                    {l.label}
                  </TextLink>
                ))}
              </div>
            </div>
            {/* Technology column */}
            <div className="flex flex-col rounded-xl border border-line">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-6 py-4">
                <h3 className="text-lg font-bold text-ink">{h.what.techTitle}</h3>
                <span dir="ltr" className="rounded bg-ink px-2 py-0.5 text-[12px] font-bold text-white">Web · Mobile</span>
              </div>
              <ul className="flex flex-col">
                {tech.services.slice(0, 6).map((s, i) => (
                  <li key={s.key} className={`flex gap-4 px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}>
                    <Icon name={s.icon} size={22} stroke={1.8} className="mt-0.5 flex-none text-plum" />
                    <div className="flex flex-col gap-1">
                      <Link href={`${base}/services#${s.key}`} className="text-[16px] font-bold text-ink hover:text-plum">
                        {s.title}
                      </Link>
                      <span className="text-[15px] leading-relaxed text-muted">{s.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-line px-6 py-4">
                <TextLink href={`${base}${h.what.techLink.href}`}>{h.what.techLink.label}</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4b ── Existing Odoo users */}
      {(() => {
        const x = getExisting(locale);
        return (
          <section className="bg-transparent">
            <Container className="py-10">
              <div className="flex flex-col items-start gap-6 rounded-3xl glass-tint border-s-4 !border-s-gold p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex max-w-[720px] flex-col gap-3">
                  <Eyebrow>{x.homeBand.eyebrow}</Eyebrow>
                  <h2 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">{x.homeBand.title}</h2>
                  <p className="text-base text-muted sm:text-lg">{x.homeBand.text}</p>
                </div>
                <PrimaryButton href={`${base}${x.path}`} arrow>
                  {x.homeBand.cta}
                </PrimaryButton>
              </div>
            </Container>
          </section>
        );
      })()}

      {/* 5 ── Why Odoo (compact: figures + advantages) */}
      <WhyOdoo c={getOdoo(locale)} compact moreHref={`${base}/why-odoo`} moreLabel={h.whyLink} />

      {/* 6 ── Integrations + Fatoora (single dark band) */}
      <section id="integrations" className="scroll-mt-24 glow-dark text-white">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <div className="flex max-w-[760px] flex-col gap-3">
            <span className="accent-line" aria-hidden="true" />
            <Eyebrow light>{h.band.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug sm:text-[40px]">{h.band.title}</h2>
            <p className="text-lg text-mist-2">{h.band.text}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="flex flex-col gap-5 rounded-xl border border-white/12 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-lg font-bold">{h.band.channelsTitle}</h3>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {cap.home.channels.map((ch) => (
                  <li key={ch} className="flex min-h-[56px] items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-3 text-center text-[15px] font-semibold">
                    {ch}
                  </li>
                ))}
              </ul>
              <Link href={`${base}/integrations`} className="mt-auto inline-flex items-center gap-1.5 self-start font-semibold text-gold hover:text-white">
                {h.band.integrationsCta}
                <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
              </Link>
            </div>
            <div className="flex flex-col gap-5 rounded-xl border border-white/12 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-lg font-bold">{h.band.zatcaTitle}</h3>
              <ul className="flex flex-col">
                {d.zatcaBand.items.map((it, i) => (
                  <li key={it.title} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-white/10" : ""}`}>
                    <Icon name={it.icon} size={20} className="mt-0.5 flex-none text-gold" />
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold">{it.title}</span>
                      <span className="text-[14px] text-mist-2">{it.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <Link href={`${base}/assessment`} className="inline-flex min-h-[48px] items-center rounded-lg bg-gold px-5 font-bold text-ink hover:bg-[#F5B95A]">
                  {d.zatcaBand.cta}
                </Link>
                <Link href={`${base}/zatca`} className="inline-flex items-center gap-1.5 font-semibold text-mist-2 hover:text-white">
                  {h.band.zatcaCta}
                  <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7 ── Trust & confidentiality + how we work */}
      <section id="trust" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
            <SectionHead eyebrow={d.caseStudy.eyebrow} title={d.caseStudy.title} />
            <div className="flex flex-col gap-3">
              <p className="text-lg text-muted">{d.caseStudy.text}</p>
              <div>
                <TextLink href={`${base}/contact`}>{d.caseStudy.cta}</TextLink>
              </div>
            </div>
          </div>
          <ul className="panel grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-3">
            {d.caseStudy.items.map((it, i) => (
              <li
                key={it.title}
                className={`flex gap-4 border-line p-6 sm:p-7 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i % 3 !== 0 ? "lg:border-s" : "lg:border-s-0"} ${i >= 3 ? "lg:border-t" : "lg:border-t-0"}`}
              >
                <span className="bg-sheen flex h-10 w-10 flex-none items-center justify-center rounded-lg text-white">
                  <Icon name={it.icon} size={20} stroke={1.8} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[16px] font-bold text-ink">{it.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-ink">{h.trustProcess.processTitle}</h3>
            <ol className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-2 lg:grid-cols-4">
              {d.process.steps.map((s, i) => (
                <li
                  key={s.title}
                  className={`relative flex flex-col gap-2 p-6 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s sm:border-line" : ""} ${i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
                >
                  <span className="text-sm font-bold tabular-nums text-plum">{pad(i)}</span>
                  <span className="text-[17px] font-bold text-ink">{s.title}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 8 ── Packages */}
      <section id="packages" className="scroll-mt-24 border-y border-line bg-white">
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
                  className={`flex flex-col gap-4.5 rounded-xl p-8 ${featured ? "sheen-edge bg-ink text-white" : "border border-line bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[22px] font-bold">{t.name}</h3>
                    {featured && <span className="rounded bg-gold px-2.5 py-1 text-[12px] font-bold text-ink">{d.packages.popular}</span>}
                  </div>
                  <p className={`text-[15px] ${featured ? "text-mist-2" : "text-muted"}`}>{t.desc}</p>
                  <p className="border-b border-current/10 pb-4 text-[24px] font-bold">{price}</p>
                  <ul className="flex flex-col gap-2.5 text-[15px]">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Icon name="check" size={17} stroke={2.4} className={featured ? "text-gold" : "text-plum"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${base}/contact`}
                    className={`mt-auto inline-flex min-h-[48px] items-center justify-center rounded-lg font-semibold ${
                      featured ? "bg-plum text-white" : "border border-line-2 text-ink hover:border-plum hover:text-plum"
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

      {/* 9 ── Contact */}
      <ContactBlock dict={d} locale={locale} />
    </>
  );
}
