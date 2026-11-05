import "../globals.css";
import localFont from "next/font/local";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { dirOf, getDict, isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";

// Self-hosted IBM Plex Sans Arabic via next/font: preloaded, swap, and a metric-matched fallback (less layout shift)
const plexArabic = localFont({
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

const plexLatin = localFont({
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-plex-latin",
  display: "swap",
  preload: false,
});

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
    icons: { icon: "/logo.png", apple: "/logo.png" },
    alternates: { canonical: `/${locale}`, languages: { ar: "/ar", en: "/en", "x-default": "/ar" } },
    openGraph: {
      url: `/${locale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: dict.brand.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description, images: ["/og.png"] },
  };
}

export const viewport: Viewport = { themeColor: "#24152A" };

function orgJsonLd(locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: locale === "ar" ? "وردلي تيكنولوجيز" : "Warrdly Technologies",
    legalName: site.company.legalNameEn,
    alternateName: [site.company.legalNameAr, "Warrdly Technologies"],
    url: `${site.url}/${locale}`,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og.png`,
    vatID: site.company.vatNumber,
    description: getDict(locale).meta.description,
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    knowsAbout: ["Odoo", "ERP", "ZATCA e-invoicing", "Distribution", "Wholesale", "Retail"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "King Abdulaziz University 104, Building 3170",
      addressLocality: "Jeddah",
      postalCode: "22252",
      addressCountry: "SA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
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
  const cfToken = site.cfAnalyticsToken || process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${plexArabic.variable} ${plexLatin.variable}`}>
      <body className="font-sans">
        <div className="mesh" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(locale)) }}
        />
        <Header dict={dict} locale={locale} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <WhatsAppFloat label={dict.contact.whatsapp} />
        <Reveal />
        {site.odooLivechat.url && (
          <>
            <script defer src={`${site.odooLivechat.url}/im_livechat/loader/${site.odooLivechat.channelId}`} />
            <script defer src={`${site.odooLivechat.url}/im_livechat/assets_embed.js`} />
          </>
        )}
        {cfToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfToken })}
          />
        )}
      </body>
    </html>
  );
}
