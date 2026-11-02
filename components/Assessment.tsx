"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Dict } from "@/content/ar";
import type { AreaKey, AssessmentContent } from "@/content/assessment";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

type Answers = Record<string, number>; // question id -> option index

const AREA_ORDER: AreaKey[] = ["systems", "compliance", "inventory", "sales", "credit", "channels", "reporting"];

export function Assessment({ c, dict, locale }: { c: AssessmentContent; dict: Dict; locale: "ar" | "en" }) {
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n result
  const [answers, setAnswers] = useState<Answers>({});
  const topRef = useRef<HTMLDivElement>(null);
  const n = c.questions.length;
  const base = `/${locale}`;
  const digits = (v: number | string) => (locale === "ar" ? String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]) : String(v));

  const pctText = (v: number) => (locale === "ar" ? `${digits(v)}٪` : `${v}%`);

  const go = (s: number) => {
    setStep(s);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const pick = (qid: string, idx: number) => {
    setAnswers((a) => ({ ...a, [qid]: idx }));
    setTimeout(() => go(Math.min(step + 1, n)), 220);
  };

  const result = useMemo(() => {
    const per: Partial<Record<AreaKey, { sum: number; max: number }>> = {};
    let sum = 0;
    let max = 0;
    for (const q of c.questions) {
      if (q.area === "size") continue;
      const idx = answers[q.id];
      if (idx === undefined) continue;
      const s = q.options[idx].score;
      if (s === null) continue;
      sum += s;
      max += 3;
      const a = (per[q.area] ||= { sum: 0, max: 0 });
      a.sum += s;
      a.max += 3;
    }
    const pct = max ? Math.round((sum / max) * 100) : 0;
    const areas = AREA_ORDER.filter((k) => per[k]).map((k) => ({ key: k, pct: Math.round((per[k]!.sum / per[k]!.max) * 100) }));
    const gaps = areas.filter((a) => a.pct < 67).sort((a, b) => a.pct - b.pct);
    const level = [...c.levels].reverse().find((l) => pct >= l.min) || c.levels[0];
    const sizeIdx = answers["size"] ?? 0;
    const pkg: keyof AssessmentContent["packages"] = sizeIdx >= 3 ? "enterprise" : sizeIdx >= 1 || (answers["channels"] !== undefined && pct < 75) ? "growth" : "starter";
    return { pct, areas, gaps, level, pkg };
  }, [answers, c]);

  const summary = useMemo(() => {
    const lines = c.questions.map((q) => {
      const idx = answers[q.id];
      return `- ${q.q} → ${idx === undefined ? "-" : q.options[idx].label}`;
    });
    return [
      `نتيجة اختبار الجاهزية / Readiness score: ${result.pct}%`,
      `المستوى / Level: ${result.level.title}`,
      `الفجوات / Gaps: ${result.gaps.map((g) => c.areas[g.key].name).join("، ") || "-"}`,
      `الباقة المقترحة / Package: ${c.packages[result.pkg]}`,
      "",
      ...lines,
    ].join("\n");
  }, [answers, result, c]);

  // ---------- Intro ----------
  if (step === -1) {
    return (
      <div ref={topRef} className="scroll-mt-28 flex flex-col items-start gap-6 rounded-3xl glass p-8 sm:p-12">
        <ul className="flex flex-col gap-3 text-lg">
          {c.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <Icon name="check" size={20} stroke={2.4} className="text-plum" />
              {p}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go(0)}
          className="inline-flex min-h-[56px] items-center gap-2.5 rounded-xl bg-plum px-8 text-lg font-bold text-white hover:bg-plum-dark"
        >
          {c.start}
          <Icon name="arrow" size={20} className="rtl:-scale-x-100" />
        </button>
      </div>
    );
  }

  // ---------- Questions ----------
  if (step < n) {
    const q = c.questions[step];
    const selected = answers[q.id];
    return (
      <div ref={topRef} className="scroll-mt-28 flex flex-col gap-6 rounded-3xl glass p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-semibold text-muted-2">
            <span>
              {c.question} {digits(step + 1)} {c.of} {digits(n)}
            </span>
            <span>{pctText(Math.round((step / n) * 100))}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-tint" role="progressbar" aria-valuemin={0} aria-valuemax={n} aria-valuenow={step}>
            <div className="h-full rounded-full bg-plum transition-all duration-300" style={{ width: `${(step / n) * 100}%` }} />
          </div>
        </div>
        <fieldset className="flex flex-col gap-4">
          <legend className="pb-4 text-2xl font-bold leading-snug sm:text-[28px]">{q.q}</legend>
          {q.options.map((o, i) => {
            const on = selected === i;
            return (
              <button
                key={o.label}
                type="button"
                aria-pressed={on}
                onClick={() => pick(q.id, i)}
                className={`flex min-h-[56px] items-center gap-3.5 rounded-2xl border-2 px-5 py-3.5 text-start text-[17px] font-medium transition-colors ${
                  on ? "border-plum bg-tint text-ink" : "border-line bg-white text-ink hover:border-line-2 hover:bg-paper"
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${on ? "border-plum bg-plum text-white" : "border-line-2"}`}
                  aria-hidden="true"
                >
                  {on && <Icon name="check" size={14} stroke={3} />}
                </span>
                {o.label}
              </button>
            );
          })}
        </fieldset>
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 font-semibold text-muted-2 hover:bg-paper hover:text-ink"
          >
            <Icon name="arrow" size={18} className="ltr:-scale-x-100" />
            {c.back}
          </button>
          <button
            type="button"
            disabled={selected === undefined}
            onClick={() => go(step + 1)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-plum px-6 font-semibold text-white hover:bg-plum-dark disabled:opacity-40"
          >
            {step === n - 1 ? c.seeResult : c.next}
            <Icon name="arrow" size={18} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    );
  }

  // ---------- Result ----------
  const ring = 2 * Math.PI * 54;
  return (
    <div ref={topRef} className="scroll-mt-28 flex flex-col gap-8">
      <section className="flex flex-wrap items-center gap-8 rounded-3xl glow-dark p-8 text-white sm:p-10">
        <div className="relative h-[140px] w-[140px] flex-none">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#3A2539" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#F2A93B"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - result.pct / 100)}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{pctText(result.pct)}</span>
          </span>
        </div>
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2">
          <span className="text-sm font-semibold text-gold">
            {c.resultTitle} · {c.scoreLabel}
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">{result.level.title}</h2>
          <p className="text-lg text-mist-2">{result.level.text}</p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl glass p-6 sm:p-8">
        <h3 className="text-xl font-bold">{c.areasTitle}</h3>
        <ul className="flex flex-col gap-3.5">
          {result.areas.map((a) => (
            <li key={a.key} className="grid grid-cols-[minmax(0,160px)_1fr_48px] items-center gap-3 text-[15px]">
              <span className="font-medium">{c.areas[a.key].name}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-tint">
                <span
                  className={`block h-full rounded-full ${a.pct >= 67 ? "bg-plum" : a.pct >= 34 ? "bg-gold" : "bg-[#C0475A]"}`}
                  style={{ width: `${Math.max(a.pct, 4)}%` }}
                />
              </span>
              <span className="text-end font-semibold text-muted-2">{pctText(a.pct)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">{c.gapsTitle}</h3>
        {result.gaps.length === 0 ? (
          <p className="rounded-2xl glass-tint p-5 text-base text-plum-dark">{c.noGaps}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {result.gaps.slice(0, 4).map((g) => {
              const a = c.areas[g.key];
              return (
                <div key={g.key} className="flex flex-col gap-2.5 rounded-2xl glass p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold">{a.name}</h4>
                    <span className="text-sm font-semibold text-muted-2">{pctText(g.pct)}</span>
                  </div>
                  <p className="text-[15px] text-muted">{a.advice}</p>
                  <Link href={`${base}${a.href}`} className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[15px] font-semibold text-plum hover:text-plum-dark">
                    {a.link}
                    <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl glass-tint p-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-plum-dark">{c.packageTitle}</span>
          <span className="text-2xl font-bold">{c.packages[result.pkg]}</span>
          <span className="text-sm text-muted">{c.packageNote}</span>
        </div>
        <Link href={`${base}#packages`} className="inline-flex min-h-[48px] items-center rounded-xl border-[1.5px] border-plum px-5 font-semibold text-plum hover:bg-white">
          {dict.nav.packages}
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">{c.leadTitle}</h3>
        <p className="text-lg text-muted">{c.leadText}</p>
        <LeadForm dict={dict} locale={locale} compact extra={{ source: "readiness-assessment", assessment: summary }} />
      </section>

      <button
        type="button"
        onClick={() => {
          setAnswers({});
          go(0);
        }}
        className="self-start text-[15px] font-semibold text-muted-2 underline-offset-4 hover:text-plum hover:underline"
      >
        {c.restart}
      </button>
    </div>
  );
}
