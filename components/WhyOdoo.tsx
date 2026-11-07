import type { OdooContent } from "@/content/odoo";
import { Icon } from "./Icon";
import { Container, Eyebrow, TextLink } from "./ui";

/** Figures always read left-to-right (e.g. "+7,000", "€5B"), even inside Arabic text */
function Figure({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span dir="ltr" className={`inline-block tabular-nums ${className}`}>
      {value}
    </span>
  );
}

export function WhyOdoo({
  c,
  compact = false,
  moreHref,
  moreLabel,
  asPage = false,
}: {
  c: OdooContent;
  /** homepage version: figures + advantages only */
  compact?: boolean;
  moreHref?: string;
  moreLabel?: string;
  /** render the intro title as the page's h1 */
  asPage?: boolean;
}) {
  const Title = asPage ? "h1" : "h2";
  return (
    <>
      {/* ---------- Why Odoo: intro, key figures, advantages ---------- */}
      <section id="why-odoo" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="flex flex-col gap-3">
              <span className="accent-line" aria-hidden="true" />
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <Title className="text-balance text-3xl font-bold leading-snug text-ink sm:text-[40px]">{c.title}</Title>
            </div>
            <p className="border-s-2 border-plum/25 ps-6 text-[17px] leading-[1.9] text-muted lg:mb-1.5">{c.intro}</p>
          </div>

          {/* Key figures: one formal band with dividers */}
          <dl className="panel grid grid-cols-2 overflow-hidden rounded-xl lg:grid-cols-4">
            {c.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-1.5 p-6 sm:p-7 ${i % 2 === 1 ? "border-s border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
              >
                <dd className="text-3xl font-bold text-ink sm:text-[38px]">
                  <Figure value={s.value} />
                </dd>
                <dt className="text-[15px] text-muted">{s.label}</dt>
                <span aria-hidden="true" className="mt-2 h-[3px] w-10 rounded-full bg-plum" />
              </div>
            ))}
          </dl>

          {/* Advantages: structured grid inside a single panel */}
          <div className="panel grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-4">
            {c.features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-3 border-line p-6 sm:p-7 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i % 4 !== 0 ? "lg:border-s" : "lg:border-s-0"} ${i >= 4 ? "lg:border-t" : "lg:border-t-0"}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-plum/20 bg-plum/5 text-plum">
                  <Icon name={f.icon} size={20} stroke={1.8} />
                </span>
                <h3 className="text-[17px] font-bold text-ink">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>

          {compact && moreHref && moreLabel && (
            <div>
              <TextLink href={moreHref}>{moreLabel}</TextLink>
            </div>
          )}
        </Container>
      </section>

      {!compact && (
        <>
      {/* ---------- Comparison table ---------- */}
      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 pb-20 sm:pb-24">
          <div className="flex max-w-[720px] flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">{c.compareTitle}</h2>
            <p className="text-lg text-muted">{c.compareIntro}</p>
          </div>
          <div className="panel overflow-x-auto rounded-xl">
            <table className="w-full min-w-[720px] border-collapse text-start text-[15px]">
              <thead>
                <tr className="bg-ink text-white">
                  {c.compareCols.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-5 py-4 text-start font-semibold ${i === 1 ? "bg-plum" : ""} ${i === 0 ? "w-[22%]" : ""}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.compareRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 1 ? "bg-paper/70" : "bg-white/70"}>
                    <th scope="row" className="border-t border-line px-5 py-4 text-start font-semibold text-ink">
                      {r.label}
                    </th>
                    <td className="border-t border-line bg-plum/[0.06] px-5 py-4 font-semibold text-plum-dark">
                      <span className="inline-flex items-center gap-2">
                        <Icon name="check" size={16} stroke={2.6} className="flex-none text-plum" />
                        {r.odoo}
                      </span>
                    </td>
                    <td className="border-t border-line px-5 py-4 text-muted">{r.local}</td>
                    <td className="border-t border-line px-5 py-4 text-muted">{r.legacy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-2">{c.compareNote}</p>
        </Container>
      </section>

      {/* ---------- Odoo in the region ---------- */}
      <section className="bg-ink text-white">
        <Container className="flex flex-col gap-10 py-20">
          <div className="flex flex-col gap-3">
            <span className="h-[3px] w-12 rounded-full bg-gold" aria-hidden="true" />
            <h2 className="text-3xl font-bold sm:text-[40px]">{c.regionTitle}</h2>
          </div>

          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/12 lg:grid-cols-4">
            {c.regionStats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-1.5 bg-white/[0.03] p-6 ${i % 2 === 1 ? "border-s border-white/12" : ""} ${i >= 2 ? "border-t border-white/12 lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
              >
                <dd className="text-3xl font-bold text-gold sm:text-4xl">
                  <Figure value={s.value} />
                </dd>
                <dt className="text-[15px] text-mist-2">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold sm:text-2xl">{c.clientsTitle}</h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {c.clients.map((cl) => (
                <li key={cl.name} className="flex flex-col gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span dir="ltr" className="text-lg font-bold">
                      {cl.name}
                    </span>
                    <span className="flex-none rounded-md border border-white/15 px-2 py-0.5 text-[12px] font-medium text-mist-2">
                      {cl.place}
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-gold">{cl.type}</span>
                  <p className="text-[15px] leading-relaxed text-mist-2">{cl.detail}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-mist">{c.clientsNote}</p>
          </div>

          <details className="group rounded-xl border border-white/12 px-5 py-4 text-sm text-mist-2">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {c.sourcesTitle}
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <ul className="flex flex-col gap-2 pt-3">
              {c.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-lilac underline-offset-4 hover:text-white hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </Container>
      </section>
        </>
      )}
    </>
  );
}
