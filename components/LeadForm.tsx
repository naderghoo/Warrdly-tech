"use client";

import { useState } from "react";
import type { Dict } from "@/content/ar";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "min-h-[48px] w-full rounded-[10px] border border-line-2 bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted-2/70 focus:border-plum focus:outline-none";
const label = "flex flex-col gap-1.5 text-[15px] font-semibold text-ink";

export function LeadForm({ dict, locale }: { dict: Dict; locale: string }) {
  const f = dict.form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim()) {
      setError(f.required);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[20px] border border-line bg-tint p-8 text-lg font-medium text-plum-dark">
        {f.success}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-4.5 rounded-[20px] border border-line bg-paper p-6 sm:grid-cols-2 sm:p-8"
    >
      <label className={label}>
        {f.name}
        <input name="name" type="text" autoComplete="name" placeholder={f.namePh} className={field} required />
      </label>
      <label className={label}>
        {f.company}
        <input name="company" type="text" autoComplete="organization" placeholder={f.companyPh} className={field} />
      </label>
      <label className={label}>
        {f.phone}
        <input name="phone" type="tel" autoComplete="tel" placeholder="05xxxxxxxx" dir="ltr" className={`${field} rtl:text-right`} required />
      </label>
      <label className={label}>
        {f.email}
        <input name="email" type="email" autoComplete="email" placeholder="name@company.com" dir="ltr" className={`${field} rtl:text-right`} />
      </label>
      <label className={label}>
        {f.users}
        <select name="users" className={field}>
          {f.usersOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {f.sector}
        <select name="sector" className={field}>
          {f.sectorOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        {f.message}
        <textarea name="message" rows={3} placeholder={f.messagePh} className={`${field} resize-y`} />
      </label>
      {/* honeypot */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {(error || status === "error") && (
        <p role="alert" className="text-[15px] font-medium text-[#A12A3A] sm:col-span-2">
          {error || f.error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[52px] rounded-xl bg-plum text-[17px] font-bold text-white transition-colors hover:bg-plum-dark disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}
