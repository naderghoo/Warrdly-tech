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
    text: "نربط Odoo بأمازون ونون وترينديول وسلة وشركات الشحن، ونهيّئه للربط مع منصة فاتورة.",
    channelsTitle: "القنوات والمنصات",
    zatcaTitle: "الامتثال لفاتورة",
    integrationsCta: "تفاصيل التكاملات",
    zatcaCta: "دليل الامتثال",
  },
  trustProcess: { processTitle: "كيف نعمل" },
  whyLink: "المقارنة والأرقام الإقليمية",
  whyPage: "لماذا Odoo",
  faqTitle: "أسئلة شائعة",
  faq: [
    { q: "ما الذي تقدمه وردلي تيكنولوجيز؟", a: "نحن شريك Odoo الرسمي في المملكة العربية السعودية. نطبّق Odoo للشركات، ونربطه بالمنصات ومنصة فاتورة، ونطوّر الإضافات، وندعم الشركات التي تستخدم Odoo بالفعل." },
    { q: "كم تكلفة نظام Odoo في السعودية؟", a: "تتكون التكلفة من اشتراك Odoo الذي يُحسب لكل مستخدم شهرياً، وتكلفة التطبيق التي تعتمد على حجم شركتك وعدد التطبيقات. يمكنك حساب تكلفة الاشتراك لشركتك عبر حاسبة تكلفة Odoo في موقعنا." },
    { q: "هل Odoo متوافق مع متطلبات هيئة الزكاة والضريبة والجمارك؟", a: "نعم. يتضمن Odoo توطيناً سعودياً يدعم الفوترة الإلكترونية والربط مع منصة فاتورة، ونتولى التهيئة والاختبار حتى الاعتماد." },
    { q: "لدينا Odoo بالفعل مع شريك آخر، هل يمكنكم مساعدتنا؟", a: "نعم. نراجع نظامك كما هو، ونحل المشكلات العالقة، ونطوّر الإضافات، ونساعدك في نقل الشراكة إذا قررت ذلك." },
    { q: "هل تعملون مع شركات خارج جدة؟", a: "نعم. نعمل مع الشركات في كل مناطق المملكة، ومعظم العمل يتم عن بُعد مع زيارات ميدانية عند الحاجة." },
  ],
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
    text: "We connect Odoo to Amazon, noon, Trendyol, Salla and couriers, and configure it for Fatoora integration.",
    channelsTitle: "Channels & platforms",
    zatcaTitle: "Fatoora compliance",
    integrationsCta: "Integration details",
    zatcaCta: "Compliance guide",
  },
  trustProcess: { processTitle: "How we work" },
  whyLink: "Comparison & regional figures",
  whyPage: "Why Odoo",
  faqTitle: "Frequently asked questions",
  faq: [
    { q: "What does Warrdly Technologies do?", a: "We are an official Odoo partner in Saudi Arabia. We implement Odoo, connect it to marketplaces and the Fatoora platform, build add-ons, and support companies already running Odoo." },
    { q: "How much does Odoo cost in Saudi Arabia?", a: "Cost has two parts: the Odoo subscription, charged per user per month, and the implementation, which depends on your company size and the apps you need. You can work out your subscription cost with the Odoo cost calculator on our site." },
    { q: "Is Odoo compliant with ZATCA requirements?", a: "Yes. Odoo includes a Saudi localisation that supports e-invoicing and connection to the Fatoora platform, and we handle configuration and testing through to approval." },
    { q: "We already use Odoo with another partner. Can you help?", a: "Yes. We review your system as it is, fix stuck issues, build add-ons, and help you change partner if you decide to." },
    { q: "Do you work with companies outside Jeddah?", a: "Yes. We work with companies across Saudi Arabia; most work is done remotely, with on-site visits when needed." },
  ],
};

export const getHome = (locale: "ar" | "en") => (locale === "en" ? homeEn : homeAr);
