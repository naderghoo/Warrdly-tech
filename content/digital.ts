// =====================================================================
// الخدمات التقنية الشاملة — مواقع، متاجر، منصات، تطبيقات، برمجيات
// Full technology services — websites, stores, platforms, apps, software
// =====================================================================

type Service = { key: string; icon: string; title: string; text: string; items: string[] };

export type DigitalContent = {
  metaTitle: string;
  metaDescription: string;
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  pillars: { value: string; label: string }[];
  servicesTitle: string;
  servicesIntro: string;
  services: Service[];
  workTitle: string;
  workIntro: string;
  work: { name: string; type: string; text: string; tags: string[]; url?: string }[];
  stackTitle: string;
  stackIntro: string;
  stack: { group: string; items: string[] }[];
  processTitle: string;
  process: { title: string; text: string }[];
  modelsTitle: string;
  models: { title: string; text: string; best: string }[];
  ctaTitle: string;
  ctaText: string;
  home: { eyebrow: string; title: string; text: string; cta: string };
};

export const digitalAr: DigitalContent = {
  metaTitle: "الخدمات التقنية: مواقع ومنصات وتطبيقات جوال",
  metaDescription:
    "تطوير المواقع الإلكترونية والمتاجر ومنصات B2B وتطبيقات الجوال والأنظمة المخصصة، مع الربط بـ Odoo والاستضافة والدعم.",
  nav: "الخدمات التقنية",
  eyebrow: "الخدمات التقنية",
  title: "شريكك التقني من الفكرة حتى الإطلاق",
  intro:
    "إلى جانب Odoo، نصمم ونطوّر المواقع والمتاجر الإلكترونية ومنصات الأعمال وتطبيقات الجوال، ونربطها بأنظمتك لتعمل كمنظومة واحدة. بنينا منصة وردلي B2B وتطبيقات جاسمين بيوتي، ونقدم الخبرة نفسها لعملائنا.",
  primary: "ناقش مشروعك",
  secondary: "استعرض أعمالنا",
  pillars: [
    { value: "Web", label: "مواقع ومتاجر ومنصات" },
    { value: "Mobile", label: "تطبيقات iOS وAndroid" },
    { value: "ERP", label: "ربط كامل مع Odoo" },
    { value: "24/7", label: "استضافة ومراقبة ودعم" },
  ],
  servicesTitle: "خدمات تقنية متكاملة تحت سقف واحد",
  servicesIntro: "فريق واحد يصمم ويطوّر ويربط ويستضيف ويدعم، فلا تتنقل بين عدة مزودين.",
  services: [
    {
      key: "web",
      icon: "globe",
      title: "المواقع الإلكترونية",
      text: "مواقع شركات احترافية وسريعة بالعربية والإنجليزية، مهيأة لمحركات البحث.",
      items: ["مواقع الشركات والصفحات التعريفية", "صفحات هبوط للحملات التسويقية", "نظام إدارة محتوى سهل", "تحسين الظهور في Google"],
    },
    {
      key: "ecommerce",
      icon: "store",
      title: "المتاجر الإلكترونية",
      text: "متاجر تبيع فعلاً: تجربة شراء سلسة، ودفع محلي، وشحن متكامل.",
      items: ["متاجر على Odoo أو سلة أو زد أو حلول مخصصة", "الدفع بمدى وApple Pay والبطاقات", "ربط شركات الشحن والتتبّع", "ربط المخزون مع Odoo"],
    },
    {
      key: "b2b",
      icon: "box",
      title: "منصات B2B وبوابات العملاء",
      text: "منصات جملة وبوابات طلبات لعملاء الأعمال، بأسعار وشروط خاصة بكل عميل.",
      items: ["أسواق إلكترونية متعددة البائعين", "بوابات طلبات لعملاء الجملة", "أسعار وحدود ائتمان لكل عميل", "كشوف حساب وفواتير إلكترونية"],
    },
    {
      key: "mobile",
      icon: "chat",
      title: "تطبيقات الجوال",
      text: "تطبيقات iOS وAndroid للعملاء والموظفين والمناديب، مرتبطة بأنظمتك.",
      items: ["تطبيقات طلبات للعملاء", "تطبيقات المناديب والفرق الميدانية", "تطبيقات الموظفين والحضور", "إشعارات فورية ودفع داخل التطبيق"],
    },
    {
      key: "custom",
      icon: "code",
      title: "الأنظمة والبرمجيات المخصصة",
      text: "عندما لا يكفي الجاهز، نبني النظام الذي يطابق طريقة عملك.",
      items: ["لوحات تحكم وأنظمة داخلية", "أتمتة سير العمل والموافقات", "تطوير مديولات Odoo مخصصة", "تحديث الأنظمة القديمة"],
    },
    {
      key: "api",
      icon: "swap",
      title: "التكاملات وواجهات API",
      text: "نربط أنظمتك ببعضها وبالمنصات الخارجية لتنتقل البيانات تلقائياً.",
      items: ["ربط المتاجر والأسواق بـ Odoo", "بوابات الدفع وشركات الشحن", "الربط مع منصة فاتورة", "تطوير واجهات API آمنة"],
    },
    {
      key: "design",
      icon: "gear",
      title: "تصميم تجربة المستخدم",
      text: "تصميم واجهات واضحة وجميلة تُختبر قبل البرمجة.",
      items: ["أبحاث المستخدم ورحلة العميل", "نماذج تفاعلية قبل التطوير", "أنظمة تصميم موحّدة", "واجهات عربية من اليمين لليسار"],
    },
    {
      key: "cloud",
      icon: "cloud",
      title: "الاستضافة والسحابة",
      text: "بنية تحتية آمنة وسريعة، مع نسخ احتياطي ومراقبة مستمرة.",
      items: ["استضافة سحابية مُدارة", "نسخ احتياطي واستعادة", "شهادات SSL وحماية", "مراقبة الأداء والتوفّر"],
    },
    {
      key: "automation",
      icon: "shield",
      title: "الأتمتة والذكاء الاصطناعي",
      text: "وفّر وقت فريقك بأتمتة المهام المتكررة والردود.",
      items: ["روبوتات واتساب للطلبات والاستفسارات", "أتمتة التقارير والتنبيهات", "مساعدات ذكية لخدمة العملاء", "استخراج البيانات من المستندات"],
    },
    {
      key: "data",
      icon: "check",
      title: "البيانات ولوحات المؤشرات",
      text: "حوّل بياناتك من عدة مصادر إلى لوحات تساعدك على القرار.",
      items: ["لوحات مبيعات ومخزون لحظية", "دمج البيانات من Odoo والمتاجر", "تقارير مجدولة للإدارة", "مؤشرات أداء لكل فريق"],
    },
    {
      key: "support",
      icon: "buoy",
      title: "الدعم والصيانة المستمرة",
      text: "نبقى معك بعد الإطلاق: تحديثات وإصلاحات وتحسين مستمر.",
      items: ["باقات دعم شهرية بزمن استجابة محدد", "تحديثات أمنية دورية", "تطوير مزايا جديدة", "تقارير أداء شهرية"],
    },
    {
      key: "consulting",
      icon: "cap",
      title: "الاستشارات التقنية",
      text: "نساعدك على اختيار التقنية الصحيحة قبل أن تنفق عليها.",
      items: ["تقييم الأنظمة الحالية", "خارطة طريق التحول الرقمي", "اختيار المنصات والمزودين", "كتابة متطلبات المشاريع"],
    },
  ],
  workTitle: "من أعمالنا",
  workIntro: "منتجات بنيناها ونشغّلها يومياً، وليست مجرد نماذج عرض.",
  work: [
    {
      name: "منصة وردلي B2B",
      type: "سوق إلكتروني للجملة",
      text: "منصة جملة لمنتجات الصحة والجمال تخدم المحلات والصيدليات في السعودية والخليج، مرتبطة بـ Odoo لمزامنة المخزون والأسعار والطلبات.",
      tags: ["منصة ويب", "B2B", "ربط Odoo"],
      url: "https://warrdly.com",
    },
    {
      name: "تطبيق جاسمين بيوتي B2B",
      type: "تطبيق جوال لعملاء الجملة",
      text: "تطبيق للعملاء التجاريين: كتالوج بأسعار العميل، سلة وطلبات، مرتجعات، كشف حساب، دفع إلكتروني، وتتبّع شحنات أرامكس وJ&T.",
      tags: ["تطبيق جوال", "واجهة API", "شحن ودفع"],
    },
    {
      name: "تطبيق بوابة الموظفين",
      type: "تطبيق جوال داخلي",
      text: "حضور من الجوال مع التحقق برمز QR لموقع العمل، تتبّع مسار المناديب، مهام وموافقات، ومؤشرات أداء المبيعات.",
      tags: ["تطبيق جوال", "موارد بشرية", "Odoo"],
    },
    {
      name: "موقع وردلي تيكنولوجيز",
      type: "موقع شركة ثنائي اللغة",
      text: "الموقع الذي تتصفحه الآن: عربي وإنجليزي، سريع، مهيأ لمحركات البحث، مع اختبار تفاعلي ونماذج مرتبطة بـ CRM.",
      tags: ["موقع ويب", "SEO", "ربط CRM"],
    },
  ],
  stackTitle: "التقنيات التي نعمل بها",
  stackIntro: "نختار التقنية المناسبة لكل مشروع، لا العكس.",
  stack: [
    { group: "الويب", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { group: "الجوال", items: ["iOS", "Android", "تطبيقات متعددة المنصات"] },
    { group: "الأنظمة الخلفية", items: ["Python", "Node.js", "PostgreSQL", "REST APIs"] },
    { group: "الأعمال", items: ["Odoo", "سلة", "زد", "منصة فاتورة"] },
    { group: "السحابة", items: ["Vercel", "Odoo.sh", "استضافة مُدارة", "مراقبة ونسخ احتياطي"] },
  ],
  processTitle: "كيف ننفذ مشروعك",
  process: [
    { title: "الاكتشاف", text: "نفهم هدفك ومستخدميك، ونكتب المتطلبات والنطاق والميزانية." },
    { title: "التصميم", text: "نصمم الواجهات ونختبرها معك قبل كتابة أي سطر برمجي." },
    { title: "التطوير", text: "نطوّر على مراحل قصيرة، وتشاهد التقدم كل أسبوعين." },
    { title: "الاختبار", text: "نختبر الأداء والأمان والتوافق مع الأجهزة واللغتين." },
    { title: "الإطلاق", text: "ننشر المشروع ونتابع أول أسابيع التشغيل عن قرب." },
    { title: "النمو", text: "دعم مستمر وتحسينات مبنية على بيانات الاستخدام." },
  ],
  modelsTitle: "طرق التعاقد",
  models: [
    { title: "مشروع بسعر ثابت", text: "نطاق واضح، وجدول زمني، وسعر متفق عليه مسبقاً.", best: "الأنسب للمواقع والمتاجر والمشاريع المحددة." },
    { title: "فريق مخصص شهرياً", text: "فريق تطوير يعمل على منتجك بساعات شهرية مرنة.", best: "الأنسب للمنصات والتطبيقات المستمرة التطوير." },
    { title: "دعم وصيانة", text: "باقة شهرية للتحديثات والإصلاحات والتحسينات.", best: "الأنسب للأنظمة القائمة بعد الإطلاق." },
  ],
  ctaTitle: "لديك فكرة مشروع تقني؟",
  ctaText: "أخبرنا بما تريد بناءه، ونعود إليك بتصور أولي وتقدير للتكلفة والمدة.",
  home: {
    eyebrow: "أكثر من Odoo",
    title: "خدمات تقنية متكاملة لأعمالك",
    text: "مواقع ومتاجر إلكترونية ومنصات B2B وتطبيقات جوال وأنظمة مخصصة، يبنيها فريق واحد ويربطها بـ Odoo.",
    cta: "كل الخدمات التقنية",
  },
};

export const digitalEn: DigitalContent = {
  metaTitle: "Tech services: web, platforms & mobile apps",
  metaDescription:
    "Websites, online stores, B2B platforms, mobile apps and custom software, integrated with Odoo, plus hosting and support.",
  nav: "Tech services",
  eyebrow: "Technology services",
  title: "Your technology partner from idea to launch",
  intro:
    "Beyond Odoo, we design and build websites, online stores, business platforms and mobile apps, and connect them to your systems so everything works as one. We built the Warrdly B2B marketplace and Jasmine Beauty's apps, and we bring the same experience to our clients.",
  primary: "Discuss your project",
  secondary: "See our work",
  pillars: [
    { value: "Web", label: "Websites, stores & platforms" },
    { value: "Mobile", label: "iOS & Android apps" },
    { value: "ERP", label: "Full Odoo integration" },
    { value: "24/7", label: "Hosting, monitoring & support" },
  ],
  servicesTitle: "Complete technology services under one roof",
  servicesIntro: "One team that designs, builds, integrates, hosts and supports — no juggling vendors.",
  services: [
    { key: "web", icon: "globe", title: "Websites", text: "Fast, professional company websites in Arabic and English, built for search.", items: ["Corporate and brand websites", "Campaign landing pages", "Easy content management", "Search engine optimization"] },
    { key: "ecommerce", icon: "store", title: "Online stores", text: "Stores that actually sell: smooth checkout, local payments and integrated shipping.", items: ["Stores on Odoo, Salla, Zid or custom", "mada, Apple Pay and card payments", "Courier integration and tracking", "Inventory synced with Odoo"] },
    { key: "b2b", icon: "box", title: "B2B platforms & customer portals", text: "Wholesale platforms and ordering portals with customer-specific prices and terms.", items: ["Multi-vendor marketplaces", "Wholesale ordering portals", "Per-customer pricing and credit limits", "Statements and e-invoices"] },
    { key: "mobile", icon: "chat", title: "Mobile apps", text: "iOS and Android apps for customers, staff and sales reps, connected to your systems.", items: ["Customer ordering apps", "Sales rep and field team apps", "Employee and attendance apps", "Push notifications and in-app payment"] },
    { key: "custom", icon: "code", title: "Custom software", text: "When off-the-shelf isn't enough, we build the system that fits how you work.", items: ["Dashboards and internal tools", "Workflow and approval automation", "Custom Odoo modules", "Legacy system modernization"] },
    { key: "api", icon: "swap", title: "Integrations & APIs", text: "We connect your systems to each other and to external platforms so data flows automatically.", items: ["Stores and marketplaces to Odoo", "Payment gateways and couriers", "Fatoora integration", "Secure API development"] },
    { key: "design", icon: "gear", title: "UX/UI design", text: "Clear, attractive interfaces, tested before development.", items: ["User research and journeys", "Interactive prototypes", "Unified design systems", "Right-to-left Arabic interfaces"] },
    { key: "cloud", icon: "cloud", title: "Hosting & cloud", text: "Secure, fast infrastructure with backups and continuous monitoring.", items: ["Managed cloud hosting", "Backup and recovery", "SSL and security hardening", "Performance and uptime monitoring"] },
    { key: "automation", icon: "shield", title: "Automation & AI", text: "Save your team's time by automating repetitive tasks and replies.", items: ["WhatsApp bots for orders and enquiries", "Automated reports and alerts", "AI assistants for customer service", "Data extraction from documents"] },
    { key: "data", icon: "check", title: "Data & dashboards", text: "Turn data from many sources into dashboards that support decisions.", items: ["Real-time sales and stock dashboards", "Data from Odoo and stores combined", "Scheduled management reports", "KPIs for every team"] },
    { key: "support", icon: "buoy", title: "Ongoing support & maintenance", text: "We stay with you after launch: updates, fixes and continuous improvement.", items: ["Monthly plans with set response times", "Regular security updates", "New feature development", "Monthly performance reports"] },
    { key: "consulting", icon: "cap", title: "Technology consulting", text: "We help you choose the right technology before you spend on it.", items: ["Current systems assessment", "Digital transformation roadmap", "Platform and vendor selection", "Project requirements writing"] },
  ],
  workTitle: "Our work",
  workIntro: "Products we built and run every day — not just demos.",
  work: [
    { name: "Warrdly B2B marketplace", type: "Wholesale marketplace", text: "A health and beauty wholesale platform serving shops and pharmacies in Saudi Arabia and the Gulf, connected to Odoo for stock, price and order sync.", tags: ["Web platform", "B2B", "Odoo integration"], url: "https://warrdly.com" },
    { name: "Jasmine Beauty B2B app", type: "Mobile app for wholesale customers", text: "An app for business customers: catalog at customer prices, cart and orders, returns, statements, online payment and Aramex/J&T shipment tracking.", tags: ["Mobile app", "API", "Shipping & payments"] },
    { name: "Employee portal app", type: "Internal mobile app", text: "Mobile attendance with worksite QR verification, sales rep route tracking, tasks and approvals, and sales KPIs.", tags: ["Mobile app", "HR", "Odoo"] },
    { name: "Warrdly Technologies website", type: "Bilingual company website", text: "The site you're browsing: Arabic and English, fast, search-optimized, with an interactive assessment and CRM-connected forms.", tags: ["Website", "SEO", "CRM integration"] },
  ],
  stackTitle: "Technologies we work with",
  stackIntro: "We pick the right technology for each project, not the other way round.",
  stack: [
    { group: "Web", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { group: "Mobile", items: ["iOS", "Android", "Cross-platform apps"] },
    { group: "Backend", items: ["Python", "Node.js", "PostgreSQL", "REST APIs"] },
    { group: "Business", items: ["Odoo", "Salla", "Zid", "Fatoora"] },
    { group: "Cloud", items: ["Vercel", "Odoo.sh", "Managed hosting", "Monitoring & backups"] },
  ],
  processTitle: "How we deliver your project",
  process: [
    { title: "Discovery", text: "We understand your goals and users, and define requirements, scope and budget." },
    { title: "Design", text: "We design and test the interfaces with you before writing any code." },
    { title: "Development", text: "We build in short cycles, and you see progress every two weeks." },
    { title: "Testing", text: "We test performance, security and compatibility across devices and both languages." },
    { title: "Launch", text: "We deploy and watch the first weeks of operation closely." },
    { title: "Growth", text: "Ongoing support and improvements based on usage data." },
  ],
  modelsTitle: "Ways to work with us",
  models: [
    { title: "Fixed-price project", text: "Clear scope, timeline and an agreed price up front.", best: "Best for websites, stores and well-defined projects." },
    { title: "Dedicated monthly team", text: "A development team working on your product with flexible monthly hours.", best: "Best for platforms and apps under continuous development." },
    { title: "Support & maintenance", text: "A monthly plan for updates, fixes and improvements.", best: "Best for live systems after launch." },
  ],
  ctaTitle: "Have a technology project in mind?",
  ctaText: "Tell us what you want to build and we'll come back with an initial concept, cost and timeline estimate.",
  home: {
    eyebrow: "Beyond Odoo",
    title: "Complete technology services for your business",
    text: "Websites, online stores, B2B platforms, mobile apps and custom software, built by one team and connected to Odoo.",
    cta: "All technology services",
  },
};

export const getDigital = (locale: "ar" | "en") => (locale === "en" ? digitalEn : digitalAr);
