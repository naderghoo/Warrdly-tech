import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { getDict, isLocale } from "@/content/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.zatcaPage.title,
    description: d.zatcaBand.text,
    alternates: { canonical: `/${locale}/zatca`, languages: { ar: "/ar/zatca", en: "/en/zatca" } },
  };
}

export default async function ZatcaPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const z = d.zatcaPage;

  return (
    <>
      <section className="bg-ink text-white">
        <Container className="flex flex-col gap-6 pb-20 pt-16 sm:pt-20">
          <Eyebrow light>{d.zatcaBand.eyebrow}</Eyebrow>
          <h1 className="max-w-[860px] text-4xl font-bold leading-tight sm:text-5xl">{z.title}</h1>
          <p className="max-w-[780px] text-lg text-mist-2 sm:text-xl">{z.intro}</p>
          <div>
            <PrimaryButton href={`/${locale}/contact`} arrow className="!bg-gold !text-ink hover:!bg-[#F5B95A]">
              {d.zatcaBand.cta}
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="flex flex-col gap-8 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{z.phasesTitle}</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {z.phases.map((ph, i) => (
              <div key={ph.title} className="flex flex-col gap-3 rounded-2xl border-t-4 border-plum bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tint text-lg font-bold text-plum">
                  {locale === "ar" ? ["١", "٢"][i] : i + 1}
                </span>
                <h3 className="text-xl font-bold">{ph.title}</h3>
                <p className="text-base text-muted">{ph.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold sm:text-3xl">{z.whatWeDoTitle}</h2>
            <ul className="flex flex-col gap-3.5">
              {z.whatWeDo.map((w) => (
                <li key={w} className="flex gap-3 text-base">
                  <Icon name="check" size={20} stroke={2.4} className="mt-1 flex-none text-plum" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-tint p-8">
            <h2 className="text-2xl font-bold">{z.checklistTitle}</h2>
            <p className="text-base text-muted">{z.checklistIntro}</p>
            <ol className="flex flex-col gap-3">
              {z.checklist.map((c, i) => (
                <li key={c} className="flex gap-3 rounded-xl bg-white p-4 text-[15px]">
                  <span className="font-bold text-plum">{locale === "ar" ? "١٢٣٤٥٦"[i] : i + 1}.</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="flex flex-col gap-6 py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{z.faqTitle}</h2>
          <div className="flex flex-col gap-3">
            {z.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-6 open:shadow-sm">
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

      <ContactBlock dict={{ ...d, contact: { ...d.contact, title: z.ctaTitle, text: z.ctaText } }} locale={locale} />
    </>
  );
}
