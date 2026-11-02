import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { dirOf, getDict, isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${dict.brand.name}` },
    description: dict.meta.description,
    icons: { icon: "/logo.png" },
    alternates: { canonical: `/${locale}`, languages: { ar: "/ar", en: "/en" } },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: ["/logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body className="font-sans">
        <Header dict={dict} locale={locale} />
        <main>{children}</main>
        <Footer dict={dict} locale={locale} />
        <WhatsAppFloat label={dict.contact.whatsapp} />
      </body>
    </html>
  );
}
