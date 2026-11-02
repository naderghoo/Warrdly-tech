import type { Dict } from "@/content/ar";
import type { Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";
import { Container, Eyebrow } from "./ui";

export function ContactBlock({ dict, locale, heading = true }: { dict: Dict; locale: Locale; heading?: boolean }) {
  return (
    <section id="contact" className="bg-transparent">
      <Container className="flex flex-wrap gap-14 py-20 sm:py-24">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4.5">
          {heading && (
            <>
              <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-[40px]">{dict.contact.title}</h2>
            </>
          )}
          <p className="text-lg text-muted">{dict.contact.text}</p>
          <div className="flex flex-col gap-3.5 pt-2 text-base">
            {site.appointmentUrl && (
              <a href={site.appointmentUrl} className="inline-flex items-center gap-2.5 font-semibold text-plum hover:text-plum-dark">
                <Icon name="calendar" size={22} />
                {dict.contact.book}
              </a>
            )}
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} className="inline-flex items-center gap-2.5 text-ink hover:text-plum">
                <Icon name="chat" size={22} className="text-plum" />
                {dict.contact.whatsapp}: <span dir="ltr">+{site.whatsapp}</span>
              </a>
            )}
            {site.email && (
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-ink hover:text-plum">
                <Icon name="mail" size={22} className="text-plum" />
                <span dir="ltr">{site.email}</span>
              </a>
            )}
            <span className="inline-flex items-center gap-2.5">
              <Icon name="pin" size={22} className="flex-none text-plum" />
              {locale === "ar" ? site.company.cityAr : site.company.cityEn}
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_460px]">
          <LeadForm dict={dict} locale={locale} />
        </div>
      </Container>
    </section>
  );
}
