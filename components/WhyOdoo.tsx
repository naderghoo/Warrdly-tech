import type { OdooContent } from "@/content/odoo";
import { Icon } from "./Icon";
import { Container, SectionHead } from "./ui";

export function WhyOdoo({ c }: { c: OdooContent }) {
  return (
    <>
      {/* Features + global figures */}
      <section id="why-odoo" className="scroll-mt-24 bg-transparent">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <SectionHead eyebrow={c.eyebrow} title={c.title} subtitle={c.intro} />

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {c.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-2xl glass p-6">
                <dt className="order-2 text-[15px] text-muted">{s.label}</dt>
                <dd className="order-1 text-3xl font-bold text-plum sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 rounded-2xl glass p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-plum">
                  <Icon name={f.icon} size={22} stroke={1.8} />
                </span>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-[15px] text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="bg-transparent">
        <Container className="flex flex-col gap-8 pb-20 sm:pb-24">
          <div className="flex max-w-[720px] flex-col gap-2">
            <h2 className="text-2xl font-bold sm:text-3xl">{c.compareTitle}</h2>
            <p className="text-lg text-muted">{c.compareIntro}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl glass">
            <table className="w-full min-w-[720px] border-collapse text-start text-[15px]">
              <thead>
                <tr>
                  {c.compareCols.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-5 py-4 text-start font-bold ${i === 1 ? "bg-plum text-white" : "text-ink"} ${i === 0 ? "w-[22%]" : ""}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.compareRows.map((r) => (
                  <tr key={r.label} className="border-t border-white/70">
                    <th scope="row" className="px-5 py-4 text-start font-semibold text-ink">
                      {r.label}
                    </th>
                    <td className="bg-plum/8 px-5 py-4 font-semibold text-plum-dark">
                      <span className="inline-flex items-center gap-2">
                        <Icon name="check" size={16} stroke={2.6} className="flex-none text-plum" />
                        {r.odoo}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted">{r.local}</td>
                    <td className="px-5 py-4 text-muted">{r.legacy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-2">{c.compareNote}</p>
        </Container>
      </section>

      {/* Region */}
      <section className="glow-dark text-white">
        <Container className="flex flex-col gap-10 py-20">
          <h2 className="text-3xl font-bold sm:text-[40px]">{c.regionTitle}</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {c.regionStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-2xl glass-dark p-6">
                <dt className="order-2 text-[15px] text-mist">{s.label}</dt>
                <dd className="order-1 text-3xl font-bold text-gold sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">{c.clientsTitle}</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.clients.map((cl) => (
                <li key={cl.name} className="flex flex-col gap-0.5 rounded-2xl glass-dark px-5 py-4">
                  <span className="text-[17px] font-semibold">{cl.name}</span>
                  <span className="text-sm text-mist">{cl.type}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-mist">{c.clientsNote}</p>
          </div>

          <details className="group rounded-2xl glass-dark px-5 py-4 text-sm text-mist">
            <summary className="cursor-pointer list-none font-semibold text-mist-2">
              {c.sourcesTitle} <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-45">+</span>
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
  );
}
