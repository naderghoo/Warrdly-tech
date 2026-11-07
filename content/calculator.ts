// Odoo subscription cost calculator: official Saudi prices + page copy (AR/EN).
// To update prices: edit `odooPricing` (per user per month, USD) and `checked`.

export const odooPricing = {
  checked: { ar: "نوفمبر 2026", en: "November 2026" },
  source: "https://www.odoo.com/ar/pricing",
  usdToSar: 3.75,
  vat: 0.15,
  plans: {
    standard: { yearlyFirst: 13.5, yearlyRenewal: 16.9, monthlyOffer: 16.9, monthlyAfter: 21.1 },
    custom: { yearlyFirst: 25.5, yearlyRenewal: 32.0, monthlyOffer: 32.0, monthlyAfter: 40.0 },
  },
} as const;

export type PlanKey = keyof typeof odooPricing.plans;

export const calcAr = {
  path: "/odoo-cost-calculator",
  nav: "حاسبة تكلفة Odoo",
  metaTitle: "حاسبة تكلفة اشتراك Odoo في السعودية",
  metaDescription:
    "احسب تكلفة اشتراك Odoo لشركتك بالريال: عدد المستخدمين، وباقة Standard أو Custom، والدفع السنوي أو الشهري، بالأسعار الرسمية في السعودية مع سعر التجديد.",
  hero: {
    eyebrow: "أداة مجانية",
    title: "حاسبة تكلفة اشتراك Odoo",
    text: "اعرف تكلفة اشتراك Odoo لشركتك بالريال خلال ثوانٍ، بالأسعار الرسمية المعلنة للسعودية، مع سعر السنة الأولى وسعر التجديد.",
  },
  inputs: {
    users: "عدد المستخدمين",
    usersHint: "من يدخل النظام فعلياً. العملاء والموردون في بوابة العملاء لا يُحتسبون.",
    plan: "الباقة",
    standard: "Standard",
    custom: "Custom",
    standardHint: "كل التطبيقات على السحابة دون وحدات مخصصة",
    customHint: "للوحدات المخصصة والتكاملات والاستضافة الخاصة",
    billing: "طريقة الدفع",
    yearly: "سنوي",
    monthly: "شهري",
    vat: "إظهار الأسعار شاملة ضريبة القيمة المضافة 15%",
    needsTitle: "هل تحتاج أياً من هذه؟",
    needsHint: "إن احتجت أياً منها فباقة Custom هي المناسبة.",
    needs: [
      "ربط منصات البيع مثل أمازون ونون وسلة",
      "وحدات أو تقارير مخصصة برمجياً",
      "الاستضافة على Odoo.sh أو على خوادمك",
      "أكثر من شركة في النظام نفسه",
      "تعديل الشاشات بنفسك عبر Studio",
      "ربط أنظمة خارجية عبر الواجهة البرمجية (API)",
    ],
    switchToCustom: "انتقل إلى باقة Custom",
    recommendCustom: "باقة Custom هي المناسبة لاختياراتك.",
  },
  results: {
    title: "التكلفة التقديرية",
    firstYear: "السنة الأولى",
    renewal: "سنوياً بعد التجديد",
    perUser: "للمستخدم شهرياً",
    monthlyOffer: "شهرياً خلال فترة العرض",
    monthlyAfter: "شهرياً بعد العرض",
    annualEquivalent: "ما يعادل سنوياً بعد العرض",
    sar: "ريال",
    usd: "دولار",
    inclVat: "شامل الضريبة",
    exclVat: "قبل الضريبة",
    saving: "توفير الدفع السنوي مقارنة بالشهري بعد العرض",
    note: "السعر للاشتراك فقط، ولا يشمل تكلفة التطبيق والتهيئة والدعم.",
    sourcePrefix: "الأسعار الرسمية من صفحة أسعار Odoo للسعودية،",
    sourceSuffix: "بسعر صرف 3.75. قد تتغير الأسعار، والسعر النهائي هو ما يظهر في عرض Odoo الرسمي.",
    free: "تحتاج تطبيقاً واحداً فقط؟ يمكنك استخدامه مجاناً على Odoo Online بعدد مستخدمين غير محدود.",
  },
  estimate: {
    title: "احصل على تقدير لتكلفة التطبيق",
    text: "الاشتراك جزء من التكلفة فقط. أرسل بياناتك وسنرسل لك تقديراً لتكلفة التطبيق والتهيئة حسب عدد مستخدميك وتطبيقاتك وتكاملاتك، خلال يوم عمل.",
    summaryTitle: "ملخص الحاسبة",
  },
  howTitle: "ما الذي تحسبه الأداة؟",
  how: [
    { title: "اشتراك Odoo", text: "السعر الرسمي لكل مستخدم شهرياً، مضروباً في عدد المستخدمين ومدة الدفع." },
    { title: "سعر التجديد", text: "خصم السنة الأولى لا يستمر. نعرض لك سعر التجديد لتبني ميزانيتك عليه." },
    { title: "ما لا تحسبه", text: "تكلفة التطبيق والتهيئة والتكاملات والتدريب والدعم. هذه تحتاج تقديراً خاصاً بشركتك." },
  ],
  faqTitle: "أسئلة شائعة عن تكلفة Odoo",
  faq: [
    {
      q: "هل هذه الأسعار رسمية؟",
      a: "نعم. هي أسعار Odoo المعلنة للسعودية بالدولار على صفحة الأسعار الرسمية، محوّلة إلى الريال بسعر 3.75. قد تتغير الأسعار، والسعر النهائي هو ما يظهر في عرض الاشتراك من Odoo.",
    },
    {
      q: "لماذا يرتفع السعر بعد السنة الأولى؟",
      a: "تمنح Odoo خصماً في السنة الأولى للمستخدمين المطلوبين عند البداية، ويرتفع السعر عند التجديد. لذلك نعرض سعر التجديد بجانب سعر السنة الأولى.",
    },
    {
      q: "هل تشمل الحاسبة تكلفة التطبيق؟",
      a: "لا. الحاسبة تحسب اشتراك Odoo فقط. تكلفة التطبيق تعتمد على عدد التطبيقات والتكاملات وحالة بياناتك، ونرسل لك تقديراً لها عند تعبئة النموذج.",
    },
    {
      q: "من يُحتسب مستخدماً في Odoo؟",
      a: "المستخدم هو من يدخل النظام للعمل فيه. أما العملاء والموردون الذين يستخدمون بوابة العملاء لمتابعة طلباتهم وفواتيرهم فلا يُحتسبون.",
    },
    {
      q: "متى أحتاج باقة Custom بدل Standard؟",
      a: "عندما تحتاج وحدات مخصصة أو تكاملات غير موجودة في Odoo القياسي، أو الاستضافة على Odoo.sh أو خوادمك، أو Studio، أو تعدد الشركات، أو الواجهة البرمجية الخارجية.",
    },
  ],
  articleLink: { label: "اقرأ الدليل الكامل لتكلفة Odoo في السعودية", href: "/blog/odoo-cost-saudi-arabia" },
};

export const calcEn: typeof calcAr = {
  path: "/odoo-cost-calculator",
  nav: "Odoo cost calculator",
  metaTitle: "Odoo subscription cost calculator for Saudi Arabia",
  metaDescription:
    "Calculate your Odoo subscription cost in SAR: number of users, Standard or Custom plan, yearly or monthly billing, using official Saudi prices including the renewal price.",
  hero: {
    eyebrow: "Free tool",
    title: "Odoo subscription cost calculator",
    text: "See your Odoo subscription cost in SAR in seconds, using the official prices published for Saudi Arabia, with both the first-year and renewal price.",
  },
  inputs: {
    users: "Number of users",
    usersHint: "People who log in to work. Customers and suppliers on the portal are not counted.",
    plan: "Plan",
    standard: "Standard",
    custom: "Custom",
    standardHint: "All apps in the cloud, no custom modules",
    customHint: "For custom modules, integrations and own hosting",
    billing: "Billing",
    yearly: "Yearly",
    monthly: "Monthly",
    vat: "Show prices including 15% VAT",
    needsTitle: "Do you need any of these?",
    needsHint: "If you need any of them, the right plan is Custom.",
    needs: [
      "Marketplace integrations such as Amazon, noon and Salla",
      "Custom-developed modules or reports",
      "Hosting on Odoo.sh or your own servers",
      "More than one company in the same system",
      "Editing screens yourself with Studio",
      "Connecting external systems through the API",
    ],
    switchToCustom: "Switch to Custom",
    recommendCustom: "Your choices need the Custom plan.",
  },
  results: {
    title: "Estimated cost",
    firstYear: "First year",
    renewal: "Per year after renewal",
    perUser: "per user / month",
    monthlyOffer: "Per month during the offer",
    monthlyAfter: "Per month after the offer",
    annualEquivalent: "Yearly equivalent after the offer",
    sar: "SAR",
    usd: "USD",
    inclVat: "incl. VAT",
    exclVat: "excl. VAT",
    saving: "Yearly billing saves, compared with monthly after the offer",
    note: "Subscription only. Implementation, configuration and support are not included.",
    sourcePrefix: "Official prices from Odoo's Saudi pricing page,",
    sourceSuffix: "converted at 3.75. Prices may change; the final price is the one in Odoo's quote.",
    free: "Need just one app? You can use it free with unlimited users on Odoo Online.",
  },
  estimate: {
    title: "Get an implementation estimate",
    text: "The subscription is only part of the cost. Send your details and we'll send an implementation and configuration estimate based on your users, apps and integrations within one business day.",
    summaryTitle: "Calculator summary",
  },
  howTitle: "What does the tool calculate?",
  how: [
    { title: "Odoo subscription", text: "The official price per user per month, multiplied by your users and billing period." },
    { title: "Renewal price", text: "The first-year discount doesn't last. We show the renewal price so you can budget on it." },
    { title: "What it doesn't include", text: "Implementation, configuration, integrations, training and support. These need an estimate for your company." },
  ],
  faqTitle: "Odoo cost FAQ",
  faq: [
    {
      q: "Are these official prices?",
      a: "Yes. They are Odoo's published Saudi prices in USD from the official pricing page, converted to SAR at 3.75. Prices may change; the final price is the one in Odoo's subscription quote.",
    },
    {
      q: "Why does the price go up after the first year?",
      a: "Odoo gives a first-year discount for the users ordered at the start, and the price rises at renewal. That's why we show the renewal price next to the first-year price.",
    },
    {
      q: "Does the calculator include implementation cost?",
      a: "No. It calculates the Odoo subscription only. Implementation depends on your apps, integrations and data, and we send you an estimate when you fill in the form.",
    },
    {
      q: "Who counts as a user in Odoo?",
      a: "A user is someone who logs in to work in the system. Customers and suppliers who use the portal to follow orders and invoices are not counted.",
    },
    {
      q: "When do I need Custom instead of Standard?",
      a: "When you need custom modules or integrations not in standard Odoo, hosting on Odoo.sh or your own servers, Studio, multi-company, or the external API.",
    },
  ],
  articleLink: { label: "Read the full guide to Odoo cost in Saudi Arabia", href: "/blog/odoo-cost-saudi-arabia" },
};

export const getCalc = (locale: "ar" | "en") => (locale === "en" ? calcEn : calcAr);
