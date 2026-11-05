import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/ContactBlock";
import { WhyOdoo } from "@/components/WhyOdoo";
import { getDict, isLocale } from "@/content/i18n";
import { getOdoo } from "@/content/odoo";
import { pageMeta } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getOdoo(locale);
  return pageMeta(
    locale,
    "/why-odoo",
    locale === "ar" ? "لماذا Odoo؟ المزايا والمقارنة والأرقام" : "Why Odoo? Benefits and figures",
    locale === "ar"
      ? "لماذا Odoo؟ نظام واحد للمبيعات والمخزون والمحاسبة والمتجر الإلكتروني، بتكلفة أقل ووقت تطبيق أقصر. مزايا ومقارنة وأرقام Odoo في السعودية والخليج."
      : "Why Odoo? One system for sales, inventory, accounting and e-commerce, at lower cost and faster rollout. Benefits, comparison and figures for Saudi Arabia.",
  );
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
