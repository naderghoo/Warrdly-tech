// Article author. Shown on posts (byline) and on /team/<slug>.
// The site shows the role only (no personal name), so structured data credits the company.
export type Author = {
  slug: string;
  ar: { name: string; role: string; bio: string[]; expertise: string[] };
  en: { name: string; role: string; bio: string[]; expertise: string[] };
};

export const authors: Author[] = [
  {
    slug: "general-manager",
    ar: {
      name: "المدير العام",
      role: "وردلي تيكنولوجيز",
      bio: [
        "المدير العام لوردلي تيكنولوجيز، شريك Odoo الرسمي في المملكة العربية السعودية.",
        "يجمع بين خلفية في تقنية المعلومات وخبرة عملية في إدارة شركات التوزيع والجملة في السعودية، ويكتب عن Odoo والامتثال والتحول الرقمي من واقع التشغيل اليومي.",
      ],
      expertise: ["تطبيق Odoo", "التوزيع والجملة", "الفوترة الإلكترونية", "التجارة الإلكترونية B2B"],
    },
    en: {
      name: "General Manager",
      role: "Warrdly Technologies",
      bio: [
        "General Manager of Warrdly Technologies, an official Odoo partner in Saudi Arabia.",
        "Combines an IT background with hands-on experience running distribution and wholesale companies in Saudi Arabia, and writes about Odoo, compliance and digital transformation from day-to-day operations.",
      ],
      expertise: ["Odoo implementation", "Distribution & wholesale", "E-invoicing", "B2B e-commerce"],
    },
  },
];

/** Old author URLs that must redirect to the current slug */
export const legacyAuthorSlugs: Record<string, string> = { "hothyfa-alareqi": "general-manager" };

export const defaultAuthor = authors[0];
export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
