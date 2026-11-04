import { sendMail, smtpConfigured } from "@/lib/mailer";
import { site } from "@/content/site";

export type Lead = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  users?: string;
  sector?: string;
  message?: string;
  locale?: string;
  source?: string;
  assessment?: string;
};

const subject = (lead: Lead) =>
  [lead.source === "readiness-assessment" ? "اختبار الجاهزية" : "طلب استشارة", lead.company, lead.name, lead.phone]
    .filter(Boolean)
    .join(" - ");

const env = (k: string) => process.env[k]?.trim() || "";

const EMAIL_RE = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[a-z]{2,}$/i;

function describe(lead: Lead) {
  return [
    `الاسم / Name: ${lead.name}`,
    `الشركة / Company: ${lead.company || "-"}`,
    `الجوال / Phone: ${lead.phone}`,
    `البريد / Email: ${lead.email || "-"}`,
    `عدد المستخدمين / Users: ${lead.users || "-"}`,
    `القطاع / Industry: ${lead.sector || "-"}`,
    `لغة الموقع / Site language: ${lead.locale || "-"}`,
    `المصدر / Source: ${lead.source || "contact-form"}`,
    "",
    lead.message || "",
    ...(lead.assessment ? ["", "----- اختبار الجاهزية / Readiness assessment -----", lead.assessment] : []),
  ].join("\n");
}

async function rpc(url: string, service: string, method: string, args: unknown[]) {
  const res = await fetch(`${url.replace(/\/$/, "")}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", params: { service, method, args }, id: Date.now() }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.data?.message || json.error.message || "Odoo RPC error");
  return json.result;
}

/** Option A — create a CRM lead directly through Odoo's external API */
async function sendToOdooApi(lead: Lead) {
  const url = env("ODOO_URL");
  const db = env("ODOO_DB");
  const login = env("ODOO_LOGIN");
  const key = env("ODOO_API_KEY");
  const uid = await rpc(url, "common", "authenticate", [db, login, key, {}]);
  if (!uid) throw new Error("Odoo authentication failed");
  const vals: Record<string, unknown> = {
    name: subject(lead),
    contact_name: lead.name,
    partner_name: lead.company || false,
    phone: lead.phone,
    email_from: lead.email || false,
    description: describe(lead),
    type: "lead",
  };
  const teamId = Number(env("ODOO_TEAM_ID"));
  if (teamId) vals.team_id = teamId;
  return rpc(url, "object", "execute_kw", [db, uid, key, "crm.lead", "create", [vals]]);
}

/** Option B — email the lead to the Odoo CRM mail alias (works on every Odoo plan) */
async function sendByEmail(lead: Lead) {
  await sendMail({
    from: env("SMTP_FROM") || env("SMTP_USER"),
    to: env("LEAD_TO_EMAIL"),
    replyTo: lead.email && EMAIL_RE.test(lead.email) ? lead.email : undefined,
    subject: subject(lead),
    text: describe(lead),
  });
}

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Confirmation email to the customer — fixed copy only; user input limited to an escaped first name */
async function sendConfirmation(lead: Lead) {
  if (!smtpConfigured() || !lead.email || !EMAIL_RE.test(lead.email)) return;
  const en = lead.locale === "en";
  const first = esc(lead.name.split(/\s+/)[0].slice(0, 40));
  const wa = site.whatsapp;
  const waDisplay = wa ? `+${wa}` : "";
  const subject = en
    ? "We received your request | Warrdly Technologies"
    : "استلمنا طلبك | وردلي تيكنولوجيز";
  const lines = en
    ? [
        `Dear ${first},`,
        "Thank you for contacting Warrdly Technologies. We have received your request, and one of our consultants will call you within one business day to understand your needs and arrange a free consultation.",
        "All information you share with us is treated as confidential, and we are happy to sign a non-disclosure agreement before any detailed discussion.",
        wa ? `For anything urgent, reach us on WhatsApp: ${waDisplay}` : "",
        "Kind regards,",
        "Warrdly Technologies — Official Odoo Partner in Saudi Arabia",
      ]
    : [
        `الأستاذ/ة ${first}، تحية طيبة،`,
        "شكراً لتواصلك مع وردلي تيكنولوجيز. استلمنا طلبك، وسيتصل بك أحد مستشارينا خلال يوم عمل واحد لفهم احتياجك وترتيب الاستشارة المجانية.",
        "نتعامل مع كل المعلومات التي تشاركها معنا بسرية، ويسعدنا توقيع اتفاقية عدم إفصاح قبل أي نقاش تفصيلي.",
        wa ? `للاستفسارات العاجلة تواصل معنا عبر واتساب: ${waDisplay}` : "",
        "مع خالص التحية،",
        "وردلي تيكنولوجيز — شريك Odoo الرسمي في المملكة العربية السعودية",
      ];
  const body = lines.filter(Boolean);
  const dir = en ? "ltr" : "rtl";
  const html = `<!doctype html><html lang="${en ? "en" : "ar"}" dir="${dir}"><body style="margin:0;background:#f8f7f6;padding:24px;font-family:Tahoma,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7e3e6;border-radius:12px">
<tr><td style="background:#24152A;border-radius:12px 12px 0 0;padding:18px 24px;color:#ffffff;font-size:18px;font-weight:bold;text-align:${en ? "left" : "right"}">${en ? "Warrdly Technologies" : "وردلي تيكنولوجيز"}</td></tr>
<tr><td dir="${dir}" style="padding:24px;color:#24152A;font-size:15px;line-height:1.8;text-align:${en ? "left" : "right"}">
${body.map((l) => `<p style="margin:0 0 14px">${waDisplay ? l.replace(waDisplay, `<span dir="ltr" style="unicode-bidi:isolate">${waDisplay}</span>`) : l}</p>`).join("\n")}
${wa ? `<p style="margin:18px 0 0"><a href="https://wa.me/${wa}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold">${en ? "Chat on WhatsApp" : "تواصل عبر واتساب"}</a></p>` : ""}
</td></tr>
<tr><td style="padding:14px 24px;border-top:1px solid #e7e3e6;color:#7a6f78;font-size:12px;text-align:${en ? "left" : "right"}"><a href="${site.url}/${en ? "en" : "ar"}" style="color:#6b2d5c">tech.warrdly.com</a></td></tr>
</table></body></html>`;
  await sendMail({
    from: env("SMTP_FROM") || env("SMTP_USER"),
    to: lead.email,
    subject,
    text: body.join("\n\n"),
    html,
  });
}

export async function deliverLead(lead: Lead): Promise<"odoo" | "email" | "none"> {
  let channel: "odoo" | "email" | "none" = "none";
  if (env("ODOO_URL") && env("ODOO_DB") && env("ODOO_LOGIN") && env("ODOO_API_KEY")) {
    await sendToOdooApi(lead);
    channel = "odoo";
  } else if (env("SMTP_HOST") && env("LEAD_TO_EMAIL")) {
    await sendByEmail(lead);
    channel = "email";
  }
  if (channel !== "none") {
    // Never fail the lead because the courtesy email failed
    await sendConfirmation(lead).catch((err) => console.error("[lead] confirmation email failed", err));
  }
  return channel;
}
