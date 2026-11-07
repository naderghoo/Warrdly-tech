import "../fonts.css";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { dirOf, getDict, isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";
import Script from "next/script";


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
    <html lang={locale} dir={dirOf(locale)}>
      <body className="font-sans">
        {/* Preload the weights used above the fold so text paints in IBM Plex, not a fallback that later reflows */}
        {[400, 600, 700].map((w) => (
          <link
            key={w}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href={`/fonts/ibm-plex-sans-arabic-${locale === "ar" ? "arabic" : "latin"}-${w}-normal.woff2`}
          />
        ))}
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
        {site.clarityId && (
          // Loaded once the browser is idle after page load, so it never competes with the page itself
          <Script id="ms-clarity" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${site.clarityId}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
