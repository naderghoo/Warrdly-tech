// Article authors. Shown on posts (byline) and on /team/<slug>, and used for Person structured data.
export type Author = {
  slug: string;
  sameAs: string[]; // public profiles (LinkedIn etc.)
  ar: { name: string; role: string; bio: string[]; expertise: string[] };
  en: { name: string; role: string; bio: string[]; expertise: string[] };
};

export const authors: Author[] = [
  {
    slug: "hothyfa-alareqi",
    sameAs: [],
    ar: {
      name: "حذيفة العريقي",
      role: "مؤسس وردلي تيكنولوجيز",
      bio: [
        "مؤسس وردلي تيكنولوجيز، شريك Odoo الرسمي في المملكة العربية السعودية، ومؤسس منصة وردلي لتجارة الجملة.",
        "يجمع بين خلفية في تقنية المعلومات وخبرة عملية في إدارة شركات التوزيع والجملة في السعودية، ويكتب عن Odoo والامتثال والتحول الرقمي من واقع التشغيل اليومي.",
      ],
      expertise: ["تطبيق Odoo", "التوزيع والجملة", "الفوترة الإلكترونية", "التجارة الإلكترونية B2B"],
    },
    en: {
      name: "Hothyfa Alareqi",
      role: "Founder, Warrdly Technologies",
      bio: [
        "Founder of Warrdly Technologies, an official Odoo partner in Saudi Arabia, and of the Warrdly wholesale marketplace.",
        "He combines an IT background with hands-on experience running distribution and wholesale companies in Saudi Arabia, and writes about Odoo, compliance and digital transformation from day-to-day operations.",
      ],
      expertise: ["Odoo implementation", "Distribution & wholesale", "E-invoicing", "B2B e-commerce"],
    },
  },
];

export const defaultAuthor = authors[0];
export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
