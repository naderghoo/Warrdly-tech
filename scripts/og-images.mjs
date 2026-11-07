// Generates a share image (1200x630) for every page in the sitemap, matching /public/og.png.
// Usage: build + start the site, then:  node scripts/og-images.mjs http://localhost:3000
// Output: public/og/<locale>/<path>.jpg  (the home page keeps /public/og.png)
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright"); // devDependency or global install
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const origin = process.argv[2] || "http://localhost:3000";
const root = new URL("..", import.meta.url).pathname;
const font = (f) =>
  `data:font/woff2;base64,${readFileSync(join(root, "node_modules/@fontsource/ibm-plex-sans-arabic/files", f)).toString("base64")}`;
const logo = `data:image/png;base64,${readFileSync(join(root, "public/logo.png")).toString("base64")}`;

const BRAND = { ar: "وردلي تيكنولوجيز", en: "Warrdly Technologies" };
const TAG = { ar: "المملكة العربية السعودية", en: "Saudi Arabia" };
const SECTION = {
  ar: { blog: "المدونة", solutions: "الحلول", team: "فريقنا" },
  en: { blog: "Blog", solutions: "Solutions", team: "Our team" },
};

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function html(locale, title, kicker) {
  const ar = locale === "ar";
  return `<!doctype html><html lang="${locale}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><style>
@font-face{font-family:P;font-weight:400;src:url(${font("ibm-plex-sans-arabic-arabic-400-normal.woff2")});unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F}
@font-face{font-family:P;font-weight:700;src:url(${font("ibm-plex-sans-arabic-arabic-700-normal.woff2")});unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F}
@font-face{font-family:P;font-weight:400;src:url(${font("ibm-plex-sans-arabic-latin-400-normal.woff2")});unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:P;font-weight:700;src:url(${font("ibm-plex-sans-arabic-latin-700-normal.woff2")});unicode-range:U+0000-00FF,U+2000-206F}
*{margin:0;box-sizing:border-box}
html{width:1200px;height:630px;overflow:hidden}
body{width:1200px;height:630px;overflow:hidden;background:#24172B;font-family:P,sans-serif;color:#fff;position:relative}
.c1{position:absolute;width:520px;height:520px;border-radius:50%;background:#4E2547;${ar ? "left" : "right"}:-120px;bottom:-250px}
.c2{position:absolute;width:360px;height:360px;border-radius:50%;border:1.5px solid rgba(232,170,214,.28);${ar ? "left" : "right"}:220px;top:-200px}
.wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:20px}
.brand img{width:84px;height:84px;border-radius:50%}
.brand b{display:block;font-size:34px;font-weight:700;line-height:1.15}
.brand small{display:block;font-size:19px;letter-spacing:.14em;color:#CDB7CF;margin-top:4px}
.kicker{font-size:26px;font-weight:700;color:#F2A93B;margin-bottom:16px}
h1{font-size:${title.length > 60 ? 50 : title.length > 38 ? 58 : 66}px;font-weight:700;line-height:1.28;max-width:1000px;color:#fff}
.foot{display:flex;gap:16px;align-items:center}
.pill{border-radius:999px;padding:12px 24px;font-size:22px;font-weight:700}
.gold{background:#F2A93B;color:#24172B}.line{border:1.5px solid rgba(255,255,255,.25);color:#E9DDEA;font-weight:400}
.url{margin-${ar ? "right" : "left"}:auto;font-size:22px;color:#CDB7CF;direction:ltr}
</style></head><body><div class="c1"></div><div class="c2"></div><div class="wrap">
<div class="brand"><img src="${logo}"><div><b>${BRAND[locale]}</b><small>WARRDLY TECHNOLOGIES</small></div></div>
<div>${kicker ? `<div class="kicker">${esc(kicker)}</div>` : ""}<h1>${esc(title)}</h1></div>
<div class="foot"><span class="pill gold">Official Odoo Partner</span><span class="pill line">${TAG[locale]}</span><span class="url">tech.warrdly.com</span></div>
</div></body></html>`;
}

const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const pathname of urls) {
  const [, locale, ...rest] = pathname.split("/");
  const sub = rest.join("/");
  if (!sub) continue; // the home page keeps the hand-designed /og.png
  const res = await fetch(origin + pathname);
  const doc = await res.text();
  const og = doc.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? "";
  const title = og
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(new RegExp(`\\s*\\|\\s*${BRAND[locale]}$`), "");
  const kicker = SECTION[locale][rest[0]] ?? "";
  await page.setContent(html(locale, title, kicker), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const out = join(root, "public/og", locale, `${sub || "index"}.jpg`);
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
  n++;
}
await browser.close();
console.log(`${n} share images written to public/og/`);
