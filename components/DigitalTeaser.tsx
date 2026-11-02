import Link from "next/link";
import type { DigitalContent } from "@/content/digital";
import { Icon } from "./Icon";
import { Container, Eyebrow, TextLink } from "./ui";

/** Homepage block introducing the full technology services */
export function DigitalTeaser({ c, locale }: { c: DigitalContent; locale: string }) {
  const base = `/${locale}`;
  const picks = c.services.slice(0, 8);
  return (
    <section id="tech-services" className="scroll-mt-24 bg-transparent">
      <Container className="flex flex-col gap-10 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[680px] flex-col gap-3">
            <Eyebrow>{c.home.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug text-ink sm:text-[40px]">{c.home.title}</h2>
            <p className="text-lg text-muted">{c.home.text}</p>
          </div>
          <TextLink href={`${base}/services`}>{c.home.cta}</TextLink>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((s) => (
            <Link
              key={s.key}
              href={`${base}/services#${s.key}`}
              className="group flex flex-col gap-3 rounded-xl glass p-6 text-ink"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-plum/20 bg-plum/5 text-plum">
                <Icon name={s.icon} size={22} stroke={1.8} />
              </span>
              <h3 className="text-[17px] font-bold">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted">{s.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
