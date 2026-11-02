import { NextResponse } from "next/server";
import { deliverLead, type Lead } from "@/lib/leads";

const clip = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields — pretend success
  if (clip(body.website)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    name: clip(body.name, 120),
    company: clip(body.company, 160),
    phone: clip(body.phone, 30),
    email: clip(body.email, 160),
    users: clip(body.users, 40),
    sector: clip(body.sector, 80),
    message: clip(body.message, 2000),
    locale: clip(body.locale, 5),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  try {
    const channel = await deliverLead(lead);
    if (channel === "none") {
      console.warn("[lead] No delivery channel configured (see .env.example). Lead:", lead);
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
