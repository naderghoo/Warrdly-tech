import type { MetadataRoute } from "next";
import { ar } from "@/content/ar";
import { posts } from "@/content/blog";
import { locales } from "@/content/i18n";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/integrations", "/addons", "/zatca", "/contact", "/blog", "/assessment", ...ar.sectors.map((s) => `/solutions/${s.slug}`)];
  const entries = locales.flatMap((l) =>
    pages.map((p) => ({ url: `${site.url}/${l}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
  );
  const articles = locales.flatMap((l) =>
    posts.map((p) => ({ url: `${site.url}/${l}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.7 })),
  );
  return [...entries, ...articles];
}
