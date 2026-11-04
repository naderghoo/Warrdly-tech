// Runtime-neutral SMTP sender.
// On Cloudflare Workers it uses worker-mailer (Cloudflare TCP sockets);
// under Node.js (local `next dev` / `next start`) it uses nodemailer.

export type Mail = {
  from: string; // "Name <email>" or "email"
  to: string; // one or more addresses, comma-separated
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
};

const env = (k: string) => process.env[k]?.trim() || "";

function parseAddress(v: string): { name?: string; email: string } {
  const m = v.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  return m ? { name: m[1].trim() || undefined, email: m[2].trim() } : { email: v.trim() };
}

const isWorkers = () =>
  typeof navigator !== "undefined" && (navigator as { userAgent?: string }).userAgent === "Cloudflare-Workers";

export const smtpConfigured = () => Boolean(env("SMTP_HOST"));

export async function sendMail(mail: Mail) {
  const host = env("SMTP_HOST");
  const port = Number(env("SMTP_PORT") || 587);
  const secure = port === 465;
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const to = mail.to.split(",").map((s) => s.trim()).filter(Boolean);

  if (isWorkers()) {
    const { WorkerMailer } = await import("worker-mailer");
    await WorkerMailer.send(
      {
        host,
        port,
        secure,
        startTls: !secure,
        ...(user ? { credentials: { username: user, password: pass }, authType: ["plain", "login"] as ("plain" | "login")[] } : {}),
        socketTimeoutMs: 15000,
        responseTimeoutMs: 15000,
      },
      {
        from: parseAddress(mail.from),
        to: to.map((t) => parseAddress(t)),
        ...(mail.replyTo ? { reply: parseAddress(mail.replyTo) } : {}),
        subject: mail.subject,
        text: mail.text,
        ...(mail.html ? { html: mail.html } : {}),
      },
    );
    return;
  }

  const nodemailer = (await import("nodemailer")).default;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    ...(user ? { auth: { user, pass } } : {}),
  });
  await transporter.sendMail({
    from: mail.from,
    to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}
