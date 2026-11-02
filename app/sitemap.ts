import type { MetadataRoute } from "next";
import { ar } from "@/content/ar";
import { locales } from "@/content/i18n";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/zatca", "/contact", ...ar.sectors.map((s) => `/solutions/${s.slug}`)];
  return locales.flatMap((l) =>
    paths.map((p) => ({ url: `${site.url}/${l}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
  );
}
