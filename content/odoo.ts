// =====================================================================
// قسم "لماذا Odoo" — الأرقام موثّقة بمصادرها وتاريخها. حدّثها عند صدور أرقام جديدة.
// "Why Odoo" section — every figure is tied to a dated source. Update when new figures are published.
// =====================================================================

export type OdooContent = {
  eyebrow: string;
  title: string;
  intro: string;
  stats: { value: string; label: string }[];
  features: { icon: string; title: string; text: string }[];
  compareTitle: string;
  compareIntro: string;
  compareCols: [string, string, string, string];
  compareRows: { label: string; odoo: string; local: string; legacy: string }[];
  compareNote: string;
  regionTitle: string;
  regionStats: { value: string; label: string }[];
  clientsTitle: string;
  clientsNote: string;
  clients: { name: string; type: string; place: string; detail: string }[];
  sourcesTitle: string;
  sources: { label: string; url: string }[];
};

export const odooAr: OdooContent = {
  eyebrow: "لماذا Odoo؟",
  title: "نظام واحد يدير شركتك كاملة، ويكبر معك",
  intro:
    "Odoo من أسرع أنظمة إدارة الأعمال نمواً في العالم. يجمع المبيعات والمخزون والمحاسبة والموارد البشرية والمتجر الإلكتروني في منصة واحدة، بتكلفة أقل ووقت تطبيق أقصر من الأنظمة التقليدية.",
  stats: [
    { value: "+13", label: "مليون مستخدم حول العالم" },
    { value: "+7,000", label: "عميل جديد كل شهر" },
    { value: "+100", label: "دولة يعمل فيها عملاء Odoo" },
    { value: "€5B", label: "قيمة الشركة (2024)" },
  ],
  features: [
    { icon: "box", title: "كل أعمالك في منصة واحدة", text: "المبيعات والمشتريات والمخزون والمحاسبة والموارد البشرية والمتجر ونقاط البيع على قاعدة بيانات واحدة، دون ربط أنظمة منفصلة." },
    { icon: "gear", title: "ابدأ صغيراً وتوسّع", text: "فعّل التطبيقات التي تحتاجها اليوم، وأضف غيرها متى احتجت، دون تغيير النظام أو نقل البيانات." },
    { icon: "check", title: "تكلفة واضحة ومعقولة", text: "ترخيص حسب عدد المستخدمين، وتطبيق أسرع، فيصبح العائد على الاستثمار أسرع من الأنظمة التقليدية الكبيرة." },
    { icon: "globe", title: "واجهة حديثة وسهلة", text: "تصميم بسيط يعمل على الكمبيوتر والجوال، وبالعربية كاملة، فيتعلّمه فريقك بسرعة." },
    { icon: "code", title: "مرن وقابل للتخصيص", text: "مبني على تقنية مفتوحة المصدر، مع آلاف التطبيقات الإضافية، ويمكن تطويره حسب طريقة عملك." },
    { icon: "shield", title: "جاهز للسوق السعودي", text: "توطين سعودي يدعم الفوترة الإلكترونية والربط مع منصة فاتورة وضريبة القيمة المضافة." },
    { icon: "cloud", title: "سحابي أو على خوادمك", text: "اختر Odoo Online أو Odoo.sh أو تشغيله على خوادمك الخاصة حسب سياسة شركتك." },
    { icon: "swap", title: "تطوير مستمر", text: "إصدار رئيسي جديد كل سنة بمزايا جديدة، مع إمكانية الترقية." },
  ],
  compareTitle: "Odoo مقارنة بالبدائل",
  compareIntro: "مقارنة عامة تساعدك على فهم الفروقات. كل شركة لها احتياجاتها، ونساعدك على الاختيار بموضوعية.",
  compareCols: ["المعيار", "Odoo", "برامج المحاسبة المحلية", "أنظمة ERP التقليدية الكبيرة"],
  compareRows: [
    { label: "نطاق النظام", odoo: "كل الأقسام في منصة واحدة", local: "محاسبة ومخزون غالباً", legacy: "شامل" },
    { label: "تكلفة الترخيص", odoo: "معقولة، حسب المستخدم", local: "منخفضة", legacy: "مرتفعة" },
    { label: "مدة التطبيق", odoo: "أسابيع إلى بضعة أشهر", local: "قصيرة", legacy: "أشهر إلى سنوات" },
    { label: "سهولة الاستخدام", odoo: "واجهة حديثة", local: "متفاوتة", legacy: "تحتاج تدريباً طويلاً" },
    { label: "التوسّع مع نمو الشركة", odoo: "أضف تطبيقات متى احتجت", local: "محدود", legacy: "ممكن بتكلفة عالية" },
    { label: "التجارة الإلكترونية والمنصات", odoo: "متجر مدمج وتكاملات جاهزة", local: "محدود أو غير متوفر", legacy: "يحتاج تكاملات مخصصة" },
    { label: "التخصيص", odoo: "مرن ومفتوح المصدر", local: "محدود", legacy: "ممكن بتكلفة عالية" },
  ],
  compareNote: "مقارنة عامة حسب الفئة وليست تقييماً لمنتج بعينه.",
  regionTitle: "Odoo في السعودية والخليج",
  regionStats: [
    { value: "189", label: "شريكاً رسمياً لـ Odoo في السعودية" },
    { value: "+930", label: "موقعاً إلكترونياً سعودياً يعمل على Odoo" },
    { value: "+600K", label: "مستخدم في الشرق الأوسط (2021)" },
    { value: "دبي", label: "مقر Odoo الإقليمي منذ 2018" },
  ],
  clientsTitle: "شركات توزيع وتجارة إلكترونية تعمل على Odoo في الخليج",
  clientsNote: "من قصص العملاء ومراجع الشركات المنشورة على موقع Odoo. هذه شركات تستخدم Odoo، وليست بالضرورة عملاءً لوردلي تيكنولوجيز.",
  clients: [
    { name: "Aromatic", type: "تجزئة وتجارة إلكترونية · B2B وB2C", place: "السعودية", detail: "بدأت متجراً إلكترونياً وتدير اليوم 45 فرعاً على Odoo: نقاط البيع والمخزون والمبيعات والمحاسبة." },
    { name: "Al Taqah Trading Est.", type: "توزيع B2B", place: "الرياض", detail: "موزّع لاصقات صناعية للمصانع في السعودية والخليج، مع فوترة إلكترونية متوافقة مع الهيئة." },
    { name: "Sugar Sprinkles", type: "تجزئة متعددة الفروع", place: "السعودية", detail: "11 فرعاً ووحدتا إنتاج تُدار من نظام واحد." },
    { name: "Al Mana Partners", type: "توزيع علامات تجارية", place: "قطر", detail: "موزّع لعلامات استهلاكية وتقنية للمنازل والشركات." },
    { name: "Al Wahda Trading", type: "استيراد وتوزيع أغذية · B2B", place: "قطر", detail: "يورّد للمطاعم والمقاهي ومحلات التجزئة وشركات التموين." },
    { name: "Al Zelal Al Qatariya", type: "توزيع سلع استهلاكية · B2B", place: "قطر والعراق", detail: "يورّد لتجار الجملة ومحلات التجزئة والهايبر ماركت." },
  ],
  sourcesTitle: "المصادر",
  sources: [
    { label: "إعلان Odoo الرسمي، نوفمبر 2024 (المستخدمون، العملاء الجدد، الدول، التقييم)", url: "https://www.newswire.ca/news-releases/odoo-s-a-announces-a-eur500-million-transaction-increasing-the-belgian-unicorn-s-valuation-to-eur5-billion-833233161.html" },
    { label: "دليل شركاء Odoo في السعودية (نوفمبر 2026)", url: "https://www.odoo.com/partners/country/saudi-arabia-185" },
    { label: "BuiltWith: المواقع التي تعمل على Odoo في السعودية (نوفمبر 2026)", url: "https://trends.builtwith.com/websitelist/Odoo/Saudi-Arabia" },
    { label: "خليج تايمز، أبريل 2021 (مستخدمو الشرق الأوسط)", url: "https://www.khaleejtimes.com/business-technology-review/odoo-shows-unstoppable-growth" },
    { label: "Odoo: قصة عميل Aromatic", url: "https://www.odoo.com/blog/customer-reviews-6/scent-of-success-aromatic-s-journey-with-odoo-1280" },
    { label: "Odoo: مرجع Al Taqah Trading", url: "https://www.odoo.com/customers/al-taqah-trading-est-7494715" },
    { label: "Odoo: مراجع العملاء في السعودية", url: "https://www.odoo.com/customers/country/saudi-arabia-185" },
    { label: "Odoo: مراجع شركات الجملة والتجزئة في قطر", url: "https://www.odoo.com/customers/industry/wholesale-retail-7/country/qatar-180" },
  ],
};

export const odooEn: OdooContent = {
  eyebrow: "Why Odoo?",
  title: "One system that runs your whole company — and grows with you",
  intro:
    "Odoo is one of the fastest-growing business management platforms in the world. It brings sales, inventory, accounting, HR and e-commerce together on one platform, at lower cost and with faster implementation than traditional systems.",
  stats: [
    { value: "13M+", label: "users worldwide" },
    { value: "7,000+", label: "new customers every month" },
    { value: "100+", label: "countries with Odoo customers" },
    { value: "€5B", label: "company valuation in 2024" },
  ],
  features: [
    { icon: "box", title: "Your whole business on one platform", text: "Sales, purchasing, inventory, accounting, HR, e-commerce and POS on one database — no stitching separate systems together." },
    { icon: "gear", title: "Start small, scale up", text: "Turn on the apps you need today and add more whenever you need them, without changing systems or migrating data." },
    { icon: "check", title: "Clear, reasonable cost", text: "Per-user licensing and faster implementation mean a quicker return on investment than large traditional ERPs." },
    { icon: "globe", title: "Modern, easy interface", text: "A clean design that works on desktop and mobile, fully in Arabic, so your team learns it quickly." },
    { icon: "code", title: "Flexible and customizable", text: "Built on open-source technology with thousands of add-on apps, and extendable to how you work." },
    { icon: "shield", title: "Ready for Saudi Arabia", text: "Saudi localization supporting e-invoicing, Fatoora integration and VAT." },
    { icon: "cloud", title: "Cloud or on your servers", text: "Choose Odoo Online, Odoo.sh or your own servers, according to company policy." },
    { icon: "swap", title: "Continuous improvement", text: "A new major release every year with new features, and an upgrade path." },
  ],
  compareTitle: "Odoo compared with the alternatives",
  compareIntro: "A general comparison to help you see the differences. Every company is different, and we'll help you choose objectively.",
  compareCols: ["Criterion", "Odoo", "Local accounting software", "Large traditional ERPs"],
  compareRows: [
    { label: "Scope", odoo: "Every department on one platform", local: "Mostly accounting and stock", legacy: "Comprehensive" },
    { label: "License cost", odoo: "Reasonable, per user", local: "Low", legacy: "High" },
    { label: "Implementation time", odoo: "Weeks to a few months", local: "Short", legacy: "Months to years" },
    { label: "Ease of use", odoo: "Modern interface", local: "Varies", legacy: "Long training needed" },
    { label: "Scaling with growth", odoo: "Add apps when needed", local: "Limited", legacy: "Possible at high cost" },
    { label: "E-commerce & marketplaces", odoo: "Built-in store, ready integrations", local: "Limited or none", legacy: "Custom integrations needed" },
    { label: "Customization", odoo: "Flexible, open source", local: "Limited", legacy: "Possible at high cost" },
  ],
  compareNote: "A general comparison by category, not an assessment of any specific product.",
  regionTitle: "Odoo in Saudi Arabia and the Gulf",
  regionStats: [
    { value: "189", label: "official Odoo partners in Saudi Arabia" },
    { value: "930+", label: "Saudi websites running on Odoo" },
    { value: "600K+", label: "users in the Middle East (2021)" },
    { value: "Dubai", label: "Odoo regional office since 2018" },
  ],
  clientsTitle: "Distribution and e-commerce companies running on Odoo in the Gulf",
  clientsNote: "From customer stories and references published on odoo.com. These companies use Odoo; they are not necessarily Warrdly Technologies clients.",
  clients: [
    { name: "Aromatic", type: "Retail & e-commerce · B2B and B2C", place: "Saudi Arabia", detail: "Started as an online store and now runs 45 branches on Odoo: POS, inventory, sales and accounting." },
    { name: "Al Taqah Trading Est.", type: "B2B distribution", place: "Riyadh", detail: "Distributor of industrial adhesives to manufacturers in Saudi Arabia and the Gulf, with ZATCA-compliant e-invoicing." },
    { name: "Sugar Sprinkles", type: "Multi-branch retail", place: "Saudi Arabia", detail: "11 branches and two production units run from one system." },
    { name: "Al Mana Partners", type: "Brand distribution", place: "Qatar", detail: "Distributor of consumer and technology brands to households and businesses." },
    { name: "Al Wahda Trading", type: "Food import & distribution · B2B", place: "Qatar", detail: "Supplies restaurants, cafés, retailers and caterers." },
    { name: "Al Zelal Al Qatariya", type: "FMCG distribution · B2B", place: "Qatar & Iraq", detail: "Supplies wholesalers, retailers and hypermarkets." },
  ],
  sourcesTitle: "Sources",
  sources: [
    { label: "Odoo official announcement, November 2024 (users, new customers, countries, valuation)", url: "https://www.newswire.ca/news-releases/odoo-s-a-announces-a-eur500-million-transaction-increasing-the-belgian-unicorn-s-valuation-to-eur5-billion-833233161.html" },
    { label: "Odoo partner directory, Saudi Arabia (November 2026)", url: "https://www.odoo.com/partners/country/saudi-arabia-185" },
    { label: "BuiltWith: websites using Odoo in Saudi Arabia (November 2026)", url: "https://trends.builtwith.com/websitelist/Odoo/Saudi-Arabia" },
    { label: "Khaleej Times, April 2021 (Middle East users)", url: "https://www.khaleejtimes.com/business-technology-review/odoo-shows-unstoppable-growth" },
    { label: "Odoo: Aromatic customer story", url: "https://www.odoo.com/blog/customer-reviews-6/scent-of-success-aromatic-s-journey-with-odoo-1280" },
    { label: "Odoo: Al Taqah Trading reference", url: "https://www.odoo.com/customers/al-taqah-trading-est-7494715" },
    { label: "Odoo: customer references in Saudi Arabia", url: "https://www.odoo.com/customers/country/saudi-arabia-185" },
    { label: "Odoo: wholesale & retail references in Qatar", url: "https://www.odoo.com/customers/industry/wholesale-retail-7/country/qatar-180" },
  ],
};

export const getOdoo = (locale: "ar" | "en") => (locale === "en" ? odooEn : odooAr);
