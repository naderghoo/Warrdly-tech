// Notifies Bing and other IndexNow search engines about the site's pages after a deploy.
// Usage: node scripts/indexnow.mjs [origin]   (default https://tech.warrdly.com)
// Never fails the deploy: errors are logged and the script exits 0.
const KEY = "b018f60d300fb7f3982d5d1d486c318b"; // also served at /<KEY>.txt (public/)
const origin = (process.argv[2] || "https://tech.warrdly.com").replace(/\/$/, "");
const host = new URL(origin).host;

try {
  const res = await fetch(`${origin}/sitemap.xml`, { headers: { "user-agent": "warrdly-indexnow" } });
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))]
    .filter((u) => new URL(u).host === host);
  if (!urlList.length) throw new Error("no URLs in sitemap");

  const submit = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
  });
  // 200 = accepted, 202 = accepted (key validation pending)
  console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${submit.status}`);
} catch (e) {
  console.warn("IndexNow skipped:", e instanceof Error ? e.message : e);
}
