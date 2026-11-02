import nodemailer from "nodemailer";

export type Lead = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  users?: string;
  sector?: string;
  message?: string;
  locale?: string;
};

const env = (k: string) => process.env[k]?.trim() || "";

function describe(lead: Lead) {
  return [
    `الاسم / Name: ${lead.name}`,
    `الشركة / Company: ${lead.company || "-"}`,
    `الجوال / Phone: ${lead.phone}`,
    `البريد / Email: ${lead.email || "-"}`,
    `عدد المستخدمين / Users: ${lead.users || "-"}`,
    `القطاع / Industry: ${lead.sector || "-"}`,
    `لغة الموقع / Site language: ${lead.locale || "-"}`,
    "",
    lead.message || "",
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
    name: `طلب استشارة من الموقع - ${lead.company || lead.name}`,
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
  const transporter = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port: Number(env("SMTP_PORT") || 587),
    secure: env("SMTP_PORT") === "465",
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
  });
  await transporter.sendMail({
    from: env("SMTP_FROM") || env("SMTP_USER"),
    to: env("LEAD_TO_EMAIL"),
    replyTo: lead.email || undefined,
    subject: `طلب استشارة من الموقع - ${lead.company || lead.name}`,
    text: describe(lead),
  });
}

export async function deliverLead(lead: Lead): Promise<"odoo" | "email" | "none"> {
  if (env("ODOO_URL") && env("ODOO_DB") && env("ODOO_LOGIN") && env("ODOO_API_KEY")) {
    await sendToOdooApi(lead);
    return "odoo";
  }
  if (env("SMTP_HOST") && env("LEAD_TO_EMAIL")) {
    await sendByEmail(lead);
    return "email";
  }
  return "none";
}
