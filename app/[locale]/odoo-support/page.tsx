import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow, PrimaryButton, SectionHead } from "@/components/ui";
import { getExisting } from "@/content/existing";
import { getDict, isLocale } from "@/content/i18n";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = getExisting(locale);
  return pageMeta(locale, x.path, x.metaTitle, x.metaDescription);
}

export default async function OdooSupportPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const x = getExisting(locale);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: x.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="glow-dark text-white">
        <Container className="flex flex-col gap-6 pb-20 pt-16 sm:pt-20">
          <Eyebrow light>{x.hero.eyebrow}</Eyebrow>
          <h1 className="max-w-[860px] text-4xl font-bold leading-tight sm:text-5xl">{x.hero.title}</h1>
          <p className="max-w-[780px] text-lg text-mist-2 sm:text-xl">{x.hero.text}</p>
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton href="#contact" arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
              {x.hero.cta}
            </PrimaryButton>
            <a href="#services" className="font-semibold text-white underline-offset-4 hover:underline">
              {x.hero.secondary}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{x.pains.title}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {x.pains.items.map((p) => (
              <div key={p.title} className="flex gap-4 rounded-2xl glass p-6">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tint text-plum">
                  <Icon name={p.icon} size={20} stroke={1.9} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-[15px] text-muted">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-10 py-20">
          <SectionHead eyebrow={x.services.eyebrow} title={x.services.title} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {x.services.items.map((s, i) => (
              <div
                key={s.title}
                className={`flex flex-col gap-3 rounded-2xl p-6 ${i === 0 ? "glass-tint border-t-4 !border-t-gold" : "glass"}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-plum">
                  <Icon name={s.icon} size={22} stroke={1.8} />
                </span>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{x.process.title}</h2>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {x.process.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 rounded-2xl glass border-t-4 !border-t-plum p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tint font-bold text-plum">{i + 1}</span>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold sm:text-3xl">{x.partner.title}</h2>
            <p className="text-lg text-muted">{x.partner.text}</p>
            <p className="rounded-xl border border-line bg-white/60 p-4 text-[15px] text-muted">{x.partner.note}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl glass-tint p-8">
            <h3 className="text-xl font-bold">{x.partner.checklistTitle}</h3>
            <ul className="flex flex-col gap-3">
              {x.partner.checklist.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl glass p-4 text-[15px]">
                  <Icon name="check" size={20} stroke={2.4} className="mt-0.5 flex-none text-plum" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-transparent">
        <Container className="flex flex-col gap-6 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{x.faqTitle}</h2>
          <div className="flex flex-col gap-3">
            {x.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl glass p-6 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl leading-none text-plum transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pt-3 text-base text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: x.ctaTitle, text: x.ctaText } }} locale={locale} />
    </>
  );
}
