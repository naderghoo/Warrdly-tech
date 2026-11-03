// Homepage-only copy for the reorganized layout (trust strip, "what we do", combined dark band)

export const homeAr = {
  trust: ["شريك Odoo الرسمي", "متوافق مع هيئة الزكاة والضريبة والجمارك", "اتفاقية سرية مع كل عميل", "واجهة عربية بالكامل"],
  what: {
    eyebrow: "ماذا نقدّم",
    title: "Odoo وكل ما يحيط به، من فريق واحد",
    subtitle: "نطبّق Odoo ونطوّره، ونبني حوله المواقع والمتاجر والتطبيقات التي تكمل منظومة أعمالك.",
    odooTitle: "خدمات Odoo",
    odooLinks: [
      { label: "الحلول الجاهزة", href: "/addons" },
      { label: "التكاملات", href: "/integrations" },
    ],
    techTitle: "الخدمات التقنية",
    techLink: { label: "كل الخدمات التقنية", href: "/services" },
  },
  band: {
    eyebrow: "التكاملات والامتثال",
    title: "كل قنوات بيعك في نظام واحد، وفواتيرك متوافقة",
    text: "نربط Odoo بأمازون ونون وترينديول وسلة وزد وشركات الشحن، ونهيّئه للربط مع منصة فاتورة.",
    channelsTitle: "القنوات والمنصات",
    zatcaTitle: "الامتثال لفاتورة",
    integrationsCta: "تفاصيل التكاملات",
    zatcaCta: "دليل الامتثال",
  },
  trustProcess: { processTitle: "كيف نعمل" },
  whyLink: "المقارنة والأرقام الإقليمية",
  whyPage: "لماذا Odoo",
};

export const homeEn: typeof homeAr = {
  trust: ["Official Odoo Partner", "ZATCA compliant", "An NDA with every client", "Fully Arabic interface"],
  what: {
    eyebrow: "What we do",
    title: "Odoo and everything around it, from one team",
    subtitle: "We implement and extend Odoo, and build the websites, stores and apps that complete your business systems.",
    odooTitle: "Odoo services",
    odooLinks: [
      { label: "Ready-built solutions", href: "/addons" },
      { label: "Integrations", href: "/integrations" },
    ],
    techTitle: "Technology services",
    techLink: { label: "All technology services", href: "/services" },
  },
  band: {
    eyebrow: "Integrations & compliance",
    title: "Every sales channel in one system, every invoice compliant",
    text: "We connect Odoo to Amazon, noon, Trendyol, Salla, Zid and couriers, and configure it for Fatoora integration.",
    channelsTitle: "Channels & platforms",
    zatcaTitle: "Fatoora compliance",
    integrationsCta: "Integration details",
    zatcaCta: "Compliance guide",
  },
  trustProcess: { processTitle: "How we work" },
  whyLink: "Comparison & regional figures",
  whyPage: "Why Odoo",
};

export const getHome = (locale: "ar" | "en") => (locale === "en" ? homeEn : homeAr);
