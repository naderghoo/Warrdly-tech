"use client";

import { useMemo, useState } from "react";
import type { Dict } from "@/content/ar";
import { odooPricing, type PlanKey, calcAr } from "@/content/calculator";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

type Copy = typeof calcAr;
type Billing = "yearly" | "monthly";

const MAX_USERS = 500;

export function CostCalculator({ c, dict, locale }: { c: Copy; dict: Dict; locale: "ar" | "en" }) {
  const [users, setUsers] = useState(10);
  const [plan, setPlan] = useState<PlanKey>("standard");
  const [billing, setBilling] = useState<Billing>("yearly");
  const [vat, setVat] = useState(false);
  const [needs, setNeeds] = useState<boolean[]>(() => c.inputs.needs.map(() => false));

  const nf = useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US", { maximumFractionDigits: 0 }),
    [locale],
  );
  const nf2 = useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale],
  );

  const needsCustom = needs.some(Boolean);
  const p = odooPricing.plans[plan];
  const n = Math.min(Math.max(users || 1, 1), MAX_USERS);
  const tax = vat ? 1 + odooPricing.vat : 1;
  const sar = (usd: number) => usd * odooPricing.usdToSar * tax;

  const r = {
    perUserFirst: billing === "yearly" ? p.yearlyFirst : p.monthlyOffer,
    perUserAfter: billing === "yearly" ? p.yearlyRenewal : p.monthlyAfter,
    firstYear: p.yearlyFirst * n * 12,
    renewal: p.yearlyRenewal * n * 12,
    monthlyOffer: p.monthlyOffer * n,
    monthlyAfter: p.monthlyAfter * n,
  };
  const yearlySaving = (p.monthlyAfter - p.yearlyRenewal) * n * 12;

  const money = (usd: number) => (
    <>
      <span className="tabular-nums">{nf.format(sar(usd))}</span> <span className="text-[0.6em] font-semibold opacity-80">{c.results.sar}</span>
    </>
  );

  const planName = plan === "standard" ? c.inputs.standard : c.inputs.custom;
  const summary = [
    `${c.inputs.users}: ${n}`,
    `${c.inputs.plan}: ${planName}`,
    `${c.inputs.billing}: ${billing === "yearly" ? c.inputs.yearly : c.inputs.monthly}`,
    billing === "yearly"
      ? `${c.results.firstYear}: ${nf.format(sar(r.firstYear))} ${c.results.sar} / ${c.results.renewal}: ${nf.format(sar(r.renewal))} ${c.results.sar}`
      : `${c.results.monthlyOffer}: ${nf.format(sar(r.monthlyOffer))} ${c.results.sar} / ${c.results.monthlyAfter}: ${nf.format(sar(r.monthlyAfter))} ${c.results.sar}`,
    `(${vat ? c.results.inclVat : c.results.exclVat})`,
    ...(needsCustom ? [`${c.inputs.needsTitle} ${c.inputs.needs.filter((_, i) => needs[i]).join(locale === "ar" ? "، " : ", ")}`] : []),
  ].join("\n");

  const seg = (active: boolean) =>
    `flex min-h-[48px] flex-1 flex-col items-center justify-center rounded-lg px-3 py-2 text-center transition-colors ${
      active ? "bg-white text-plum-dark shadow-sm ring-1 ring-plum/30" : "text-muted hover:text-ink"
    }`;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Inputs */}
        <div className="flex flex-col gap-7 rounded-3xl glass p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="calc-users" className="text-[15px] font-semibold text-ink">
              {c.inputs.users}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="-"
                onClick={() => setUsers((u) => Math.max(1, (u || 1) - 1))}
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-line-2 bg-white text-2xl font-semibold text-ink hover:border-plum"
              >
                −
              </button>
              <input
                id="calc-users"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_USERS}
                value={users || ""}
                onChange={(e) => setUsers(Math.min(MAX_USERS, Math.max(0, Math.floor(Number(e.target.value) || 0))))}
                onBlur={() => setUsers((u) => Math.max(1, u || 1))}
                className="h-12 w-full min-w-0 rounded-xl border border-line-2 bg-white text-center text-2xl font-bold tabular-nums text-ink focus:border-plum focus:outline-none"
              />
              <button
                type="button"
                aria-label="+"
                onClick={() => setUsers((u) => Math.min(MAX_USERS, (u || 0) + 1))}
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-line-2 bg-white text-2xl font-semibold text-ink hover:border-plum"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={Math.min(n, 100)}
              onChange={(e) => setUsers(Number(e.target.value))}
              aria-label={c.inputs.users}
              className="w-full accent-[var(--color-plum)]"
            />
            <p className="text-[13px] text-muted-2">{c.inputs.usersHint}</p>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-semibold text-ink">{c.inputs.plan}</legend>
            <div className="flex gap-1.5 rounded-xl bg-tint/70 p-1.5">
              {(["standard", "custom"] as const).map((k) => (
                <button key={k} type="button" aria-pressed={plan === k} onClick={() => setPlan(k)} className={seg(plan === k)}>
                  <span className="text-base font-bold">{k === "standard" ? c.inputs.standard : c.inputs.custom}</span>
                  <span className="text-[12px] leading-snug opacity-80">{k === "standard" ? c.inputs.standardHint : c.inputs.customHint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-semibold text-ink">{c.inputs.billing}</legend>
            <div className="flex gap-1.5 rounded-xl bg-tint/70 p-1.5">
              {(["yearly", "monthly"] as const).map((k) => (
                <button key={k} type="button" aria-pressed={billing === k} onClick={() => setBilling(k)} className={seg(billing === k)}>
                  <span className="text-base font-bold">{k === "yearly" ? c.inputs.yearly : c.inputs.monthly}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-center gap-3 text-[15px] text-ink">
            <input type="checkbox" checked={vat} onChange={(e) => setVat(e.target.checked)} className="h-5 w-5 accent-[var(--color-plum)]" />
            {c.inputs.vat}
          </label>

          <fieldset className="flex flex-col gap-2.5 border-t border-line pt-6">
            <legend className="pt-6 text-[15px] font-semibold text-ink">{c.inputs.needsTitle}</legend>
            <p className="text-[13px] text-muted-2">{c.inputs.needsHint}</p>
            {c.inputs.needs.map((label, i) => (
              <label key={label} className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
                <input
                  type="checkbox"
                  checked={needs[i]}
                  onChange={(e) => {
                    const next = [...needs];
                    next[i] = e.target.checked;
                    setNeeds(next);
                    if (e.target.checked) setPlan("custom");
                  }}
                  className="mt-0.5 h-5 w-5 flex-none accent-[var(--color-plum)]"
                />
                {label}
              </label>
            ))}
            {needsCustom && plan === "standard" && (
              <div role="status" className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/60 bg-gold/10 p-3 text-[14px] text-ink">
                {c.inputs.recommendCustom}
                <button type="button" onClick={() => setPlan("custom")} className="font-semibold text-plum hover:text-plum-dark">
                  {c.inputs.switchToCustom}
                </button>
              </div>
            )}
          </fieldset>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6 self-start rounded-3xl bg-ink p-6 text-white sm:p-8 lg:sticky lg:top-28" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">{c.results.title}</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-mist-2">
              {planName} · {vat ? c.results.inclVat : c.results.exclVat}
            </span>
          </div>

          {billing === "yearly" ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] text-mist-2">{c.results.firstYear}</span>
                <span className="text-[44px] font-bold leading-tight text-gold sm:text-[52px]">{money(r.firstYear)}</span>
                <span className="text-[13px] text-mist-2" dir="ltr">
                  ≈ ${nf.format(r.firstYear * tax)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="block text-[13px] text-mist-2">{c.results.renewal}</span>
                  <span className="text-2xl font-bold">{money(r.renewal)}</span>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="block text-[13px] text-mist-2">{c.results.perUser}</span>
                  <span className="text-2xl font-bold">
                    <span className="tabular-nums">{nf2.format(sar(r.perUserFirst))}</span>
                    <span className="text-[0.6em] font-semibold opacity-80"> {c.results.sar}</span>
                  </span>
                  <span className="block text-[12px] text-mist-2">
                    {locale === "ar" ? "←" : "→"} {nf2.format(sar(r.perUserAfter))} {c.results.sar}
                  </span>
                </div>
              </div>
              {yearlySaving > 0 && (
                <p className="rounded-xl bg-white/5 px-4 py-3 text-[14px] text-mist-2">
                  {c.results.saving}: <strong className="text-white">{money(yearlySaving)}</strong>
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] text-mist-2">{c.results.monthlyOffer}</span>
                <span className="text-[44px] font-bold leading-tight text-gold sm:text-[52px]">{money(r.monthlyOffer)}</span>
                <span className="text-[13px] text-mist-2" dir="ltr">
                  ≈ ${nf.format(r.monthlyOffer * tax)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="block text-[13px] text-mist-2">{c.results.monthlyAfter}</span>
                  <span className="text-2xl font-bold">{money(r.monthlyAfter)}</span>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="block text-[13px] text-mist-2">{c.results.annualEquivalent}</span>
                  <span className="text-2xl font-bold">{money(r.monthlyAfter * 12)}</span>
                </div>
              </div>
            </>
          )}

          <ul className="flex flex-col gap-2 border-t border-white/10 pt-5 text-[13px] leading-relaxed text-mist-2">
            <li className="flex gap-2">
              <Icon name="check" size={16} stroke={2.4} className="mt-0.5 flex-none text-gold" />
              {c.results.note}
            </li>
            <li className="flex gap-2">
              <Icon name="check" size={16} stroke={2.4} className="mt-0.5 flex-none text-gold" />
              {c.results.free}
            </li>
            <li className="flex gap-2">
              <Icon name="check" size={16} stroke={2.4} className="mt-0.5 flex-none text-gold" />
              <span>
                {c.results.sourcePrefix}{" "}
                <a href={odooPricing.source} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-white">
                  {odooPricing.checked[locale]}
                </a>
                {locale === "ar" ? "، " : ", "}
                {c.results.sourceSuffix}
              </span>
            </li>
          </ul>

          <a
            href="#estimate"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gold px-6 text-[16px] font-bold text-ink hover:bg-[#F5B95A]"
          >
            {c.estimate.title}
          </a>
        </div>
      </div>

      {/* Lead form with the calculator summary attached */}
      <div id="estimate" className="mt-16 grid scroll-mt-28 grid-cols-1 gap-8 rounded-3xl glass-tint p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{c.estimate.title}</h2>
          <p className="text-lg text-muted">{c.estimate.text}</p>
          <div className="rounded-2xl border border-line bg-white/70 p-5">
            <span className="mb-2 block text-[13px] font-semibold text-muted-2">{c.estimate.summaryTitle}</span>
            <pre className="whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-ink">{summary}</pre>
          </div>
        </div>
        <LeadForm dict={dict} locale={locale} compact extra={{ source: "cost-calculator", users: String(n), assessment: summary }} />
      </div>
    </>
  );
}
