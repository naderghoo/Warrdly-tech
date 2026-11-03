import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { WhyOdoo } from "@/components/WhyOdoo";
import { getDict, isLocale } from "@/content/i18n";
import { getOdoo } from "@/content/odoo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getOdoo(locale);
  return {
    title: locale === "ar" ? "لماذا Odoo؟ المزايا والمقارنة والأرقام" : "Why Odoo? Advantages, comparison and figures",
    description: c.intro,
    alternates: { canonical: `/${locale}/why-odoo`, languages: { ar: "/ar/why-odoo", en: "/en/why-odoo", "x-default": "/ar/why-odoo" } },
  };
}

export default async function WhyOdooPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <>
      <WhyOdoo c={getOdoo(locale)} asPage />
      <ContactBlock dict={d} locale={locale} />
    </>
  );
}
