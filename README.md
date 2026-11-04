# موقع وردلي تيكنولوجيز — Warrdly Technologies

موقع شريك Odoo الرسمي، مبني بـ Next.js و Tailwind CSS، بالعربية (افتراضي) والإنجليزية.

## الصفحات

| المسار | الصفحة |
|---|---|
| `/ar` · `/en` | الرئيسية |
| `/ar/solutions/distribution` | التوزيع والجملة |
| `/ar/solutions/beauty` | التجميل والعناية الشخصية |
| `/ar/solutions/retail` | التجزئة والتجارة الإلكترونية |
| `/ar/solutions/import` | الاستيراد والتصنيع الخفيف |
| `/ar/zatca` | الامتثال للفوترة الإلكترونية |
| `/ar/contact` | تواصل معنا ونموذج الاستشارة |

## أين أعدّل؟

| ما تريد تعديله | الملف |
|---|---|
| واتساب، البريد، مستوى الشراكة، الأسعار، أرقام الإنجازات | `content/site.ts` |
| كل النصوص العربية | `content/ar.ts` |
| كل النصوص الإنجليزية | `content/en.ts` |
| الألوان والخط | `app/globals.css` |
| الشعار | `public/logo.png` (استبدله بنسخة 512px أو أكبر) |

الأقسام التي تحتاج بيانات تُخفى تلقائياً حتى تملأها: أرقام الإنجازات، زر واتساب، البريد، الأسعار.

## التشغيل على جهازك

يتطلب Node.js 20 أو أحدث.

```bash
npm install
npm run dev
```

ثم افتح http://localhost:3000

## النشر على Vercel

1. ارفع المجلد إلى مستودع GitHub.
2. من vercel.com: Add New → Project → اختر المستودع → Deploy.
3. أضف متغيرات البيئة من `.env.example` في Settings → Environment Variables.
4. اربط الدومين من Settings → Domains.

## ربط نموذج الاستشارة مع Odoo CRM

النموذج يرسل إلى `/api/lead`، والذي يختار تلقائياً:

- **الخيار (أ) — API مباشر:** إذا ضُبطت متغيرات `ODOO_*` تُنشأ فرصة في CRM مباشرة. يتطلب باقة Odoo تسمح بالـAPI الخارجي.
- **الخيار (ب) — بريد:** إذا ضُبطت متغيرات `SMTP_*` و`LEAD_TO_EMAIL` يُرسل الطلب إلى بريد فريق المبيعات في Odoo، فيتحول تلقائياً إلى فرصة. يعمل على كل الباقات.

بدون أي إعداد، يرفض الموقع المنشور الطلبات ويظهر للزائر رسالة خطأ، حتى لا تضيع الطلبات دون علمك.

## Deploying to Cloudflare Workers

The site runs on Cloudflare Workers through `@opennextjs/cloudflare`.

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Runtime variables (SMTP_*, LEAD_TO_EMAIL) go in the Worker's **Variables and Secrets**; SMTP_PASS as a **Secret**.
- Local Worker preview: `npm run preview` (put variables in `.dev.vars`).
- Email is sent over SMTP with `worker-mailer` on Workers (port 465 or 587; port 25 is blocked) and `nodemailer` under Node.js.
