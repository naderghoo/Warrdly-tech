// =====================================================================
// اختبار جاهزية ERP — الأسئلة والنتائج
// ERP readiness assessment — questions and results
// score: 0 (ضعيف) → 3 (ممتاز). null = لا ينطبق ولا يُحتسب
// =====================================================================

export type AreaKey = "systems" | "compliance" | "inventory" | "sales" | "credit" | "channels" | "reporting";

export type Question = {
  id: string;
  area: AreaKey | "size";
  q: string;
  options: { label: string; score: number | null }[];
};

export type AssessmentContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  start: string;
  question: string;
  of: string;
  back: string;
  next: string;
  seeResult: string;
  questions: Question[];
  areas: Record<AreaKey, { name: string; advice: string; href: string; link: string }>;
  levels: { min: number; title: string; text: string }[];
  resultTitle: string;
  scoreLabel: string;
  areasTitle: string;
  strong: string;
  gapsTitle: string;
  noGaps: string;
  packageTitle: string;
  packages: { starter: string; growth: string; enterprise: string };
  packageNote: string;
  leadTitle: string;
  leadText: string;
  restart: string;
};

export const assessAr: AssessmentContent = {
  metaTitle: "اختبار جاهزية شركتك لنظام ERP",
  metaDescription: "اختبار مجاني من 10 أسئلة يقيس نضج أنظمة شركتك في المبيعات والمخزون والامتثال لفاتورة، ويعطيك توصيات فورية.",
  eyebrow: "اختبار مجاني · دقيقتان",
  title: "هل شركتك جاهزة لنظام ERP؟",
  intro: "أجب عن 10 أسئلة سريعة عن طريقة عمل شركتك، واحصل فوراً على تقييم لنضج أنظمتك وأين تخسر الوقت والمال، مع توصيات عملية.",
  points: ["نتيجة فورية دون تسجيل", "توصيات حسب نقاط الضعف", "اقتراح الباقة المناسبة"],
  start: "ابدأ الاختبار",
  question: "سؤال",
  of: "من",
  back: "السابق",
  next: "التالي",
  seeResult: "اعرض النتيجة",
  questions: [
    {
      id: "systems",
      area: "systems",
      q: "كيف تدير المبيعات والفواتير اليوم؟",
      options: [
        { label: "ملفات Excel أو دفاتر ورقية", score: 0 },
        { label: "برنامج محاسبة فقط", score: 1 },
        { label: "عدة أنظمة منفصلة لا تتكلم مع بعضها", score: 1 },
        { label: "نظام ERP واحد متكامل", score: 3 },
      ],
    },
    {
      id: "compliance",
      area: "compliance",
      q: "ما وضعك مع المرحلة الثانية من الفوترة الإلكترونية (الربط مع فاتورة)؟",
      options: [
        { label: "لا أعرف إن كانت تنطبق علينا", score: 0 },
        { label: "وصلنا الإشعار ولم نبدأ", score: 1 },
        { label: "بدأنا التجهيز", score: 2 },
        { label: "مربوطون ونعمل بشكل طبيعي", score: 3 },
      ],
    },
    {
      id: "stock",
      area: "inventory",
      q: "عند الجرد، كم يطابق المخزون الفعلي ما في النظام؟",
      options: [
        { label: "لا نعرف رصيدنا الحقيقي", score: 0 },
        { label: "فروقات كبيرة في كل جرد", score: 1 },
        { label: "فروقات بسيطة", score: 2 },
        { label: "يطابق تقريباً دائماً", score: 3 },
      ],
    },
    {
      id: "expiry",
      area: "inventory",
      q: "كيف تتابع التشغيلات وتواريخ الصلاحية؟",
      options: [
        { label: "لا نتابعها", score: 0 },
        { label: "يدوياً في Excel", score: 1 },
        { label: "جزئياً في النظام", score: 2 },
        { label: "بالكامل في النظام مع تنبيهات", score: 3 },
        { label: "لا تنطبق على منتجاتنا", score: null },
      ],
    },
    {
      id: "pricing",
      area: "sales",
      q: "كيف تُطبّق أسعار العملاء والخصومات؟",
      options: [
        { label: "يدوياً في كل طلب", score: 0 },
        { label: "قوائم أسعار في Excel", score: 1 },
        { label: "في النظام مع تعديلات يدوية كثيرة", score: 2 },
        { label: "تلقائياً من النظام لكل عميل", score: 3 },
      ],
    },
    {
      id: "reps",
      area: "sales",
      q: "كيف تصل طلبات المناديب؟",
      options: [
        { label: "بالهاتف أو الواتساب", score: 0 },
        { label: "ورقياً ثم تُدخل في النظام", score: 1 },
        { label: "تطبيق جزئي", score: 2 },
        { label: "تطبيق جوال يُدخلها في النظام مباشرة", score: 3 },
        { label: "ليس لدينا مناديب", score: null },
      ],
    },
    {
      id: "credit",
      area: "credit",
      q: "كيف تتحكم في حدود الائتمان والتحصيل؟",
      options: [
        { label: "لا توجد متابعة واضحة", score: 0 },
        { label: "متابعة في Excel", score: 1 },
        { label: "تقارير في النظام دون إيقاف تلقائي", score: 2 },
        { label: "النظام يوقف البيع الآجل تلقائياً", score: 3 },
        { label: "نبيع نقداً فقط", score: null },
      ],
    },
    {
      id: "channels",
      area: "channels",
      q: "هل تبيع عبر منصات مثل أمازون ونون وسلة وزد؟",
      options: [
        { label: "نعم، ونُدخل الطلبات يدوياً", score: 0 },
        { label: "نعم، وبعضها مربوط بالنظام", score: 2 },
        { label: "نعم، وكلها مربوطة بمخزون واحد", score: 3 },
        { label: "لا نبيع إلكترونياً", score: null },
      ],
    },
    {
      id: "reporting",
      area: "reporting",
      q: "كم تحتاج لتعرف ربحية الشهر الماضي لكل علامة تجارية أو منتج؟",
      options: [
        { label: "لا نستطيع معرفتها بدقة", score: 0 },
        { label: "أكثر من أسبوع", score: 1 },
        { label: "يوم أو يومين", score: 2 },
        { label: "فوراً من النظام", score: 3 },
      ],
    },
    {
      id: "size",
      area: "size",
      q: "كم عدد الموظفين الذين سيستخدمون النظام تقريباً؟",
      options: [
        { label: "1 – 5", score: null },
        { label: "6 – 20", score: null },
        { label: "21 – 50", score: null },
        { label: "أكثر من 50", score: null },
      ],
    },
  ],
  areas: {
    systems: { name: "توحيد الأنظمة", advice: "بياناتك موزعة بين أدوات منفصلة. نظام واحد يربط المبيعات والمخزون والمحاسبة يوفر ساعات من الإدخال المكرر.", href: "/#packages", link: "الباقات" },
    compliance: { name: "الامتثال لفاتورة", advice: "جهّز بياناتك واختبر الربط قبل موعد موجتك، فالتأخير يعرّضك للمخالفات.", href: "/zatca", link: "دليل الامتثال" },
    inventory: { name: "دقة المخزون", advice: "الجرد الأعمى، وتتبّع التشغيلات والصلاحية، والصرف حسب الأقرب انتهاءً تقلل الفروقات والهدر.", href: "/addons#inventory", link: "حلول المخزون" },
    sales: { name: "المبيعات والمناديب", advice: "قوائم أسعار تلقائية وتطبيق للمناديب يمنعان أخطاء التسعير ويسرّعان وصول الطلب للمستودع.", href: "/solutions/distribution", link: "حلول التوزيع" },
    credit: { name: "الائتمان والتحصيل", advice: "إيقاف البيع الآجل تلقائياً عند تجاوز الحد، واعتماد البيع حسب هامش الربح، يحميان سيولتك.", href: "/addons#sales", link: "حلول المبيعات والائتمان" },
    channels: { name: "ربط المنصات", advice: "ربط أمازون ونون وسلة والمنصات بمخزون واحد يوقف الإدخال اليدوي ويمنع بيع ما ليس لديك.", href: "/integrations", link: "التكاملات" },
    reporting: { name: "التقارير والربحية", advice: "تقارير فورية لكل علامة ومندوب تكشف أين تربح وأين تخسر، دون انتظار نهاية الشهر.", href: "/addons#sales", link: "التقارير" },
  },
  levels: [
    { min: 0, title: "أنظمتك تحتاج تحولاً شاملاً", text: "معظم عملياتك يدوية أو موزعة، وهذا يعني وقتاً ضائعاً وأخطاء مكلفة. الخبر الجيد: هذه أكبر فرصة للتحسين، والانتقال إلى ERP واحد سيظهر أثره بسرعة." },
    { min: 40, title: "أساس جيد مع فجوات واضحة", text: "لديك بعض الأنظمة، لكن هناك فجوات تستهلك وقت فريقك وتؤثر على دقة أرقامك. معالجة هذه الفجوات تحديداً ستعطيك أكبر عائد." },
    { min: 75, title: "مستوى متقدم", text: "أنظمتك ناضجة في أغلب الجوانب. ما تحتاجه هو تحسينات محددة وتكاملات تكمل الصورة، لا تغييراً شاملاً." },
  ],
  resultTitle: "نتيجتك",
  scoreLabel: "مستوى نضج أنظمتك",
  areasTitle: "التقييم حسب المجال",
  strong: "جيد",
  gapsTitle: "أهم الفجوات وما نوصي به",
  noGaps: "لا توجد فجوات كبيرة. نوصي بمراجعة سريعة لاكتشاف فرص التحسين الدقيقة.",
  packageTitle: "الباقة المقترحة",
  packages: { starter: "انطلاقة", growth: "نمو", enterprise: "مؤسسات" },
  packageNote: "اقتراح مبدئي حسب حجم فريقك وإجاباتك.",
  leadTitle: "احصل على خطة تفصيلية لشركتك",
  leadText: "أرسل بياناتك وسيتواصل معك أحد خبرائنا لمراجعة نتيجتك معك في جلسة مجانية مدتها 30 دقيقة.",
  restart: "أعد الاختبار",
};

export const assessEn: AssessmentContent = {
  metaTitle: "Is your company ready for an ERP?",
  metaDescription: "A free 10-question assessment of how mature your sales, inventory and Fatoora compliance processes are, with instant recommendations.",
  eyebrow: "Free assessment · 2 minutes",
  title: "Is your company ready for an ERP?",
  intro: "Answer 10 quick questions about how your company works and get an instant assessment of your systems — where you lose time and money — with practical recommendations.",
  points: ["Instant result, no sign-up", "Recommendations for your gaps", "Suggested package"],
  start: "Start the assessment",
  question: "Question",
  of: "of",
  back: "Back",
  next: "Next",
  seeResult: "See my result",
  questions: [
    { id: "systems", area: "systems", q: "How do you manage sales and invoices today?", options: [
      { label: "Excel files or paper", score: 0 },
      { label: "Accounting software only", score: 1 },
      { label: "Several separate systems that don't talk to each other", score: 1 },
      { label: "One integrated ERP", score: 3 },
    ] },
    { id: "compliance", area: "compliance", q: "Where are you with e-invoicing Phase 2 (Fatoora integration)?", options: [
      { label: "Not sure if it applies to us", score: 0 },
      { label: "Notified but not started", score: 1 },
      { label: "Preparing", score: 2 },
      { label: "Integrated and running", score: 3 },
    ] },
    { id: "stock", area: "inventory", q: "At stock count, how well does physical stock match the system?", options: [
      { label: "We don't know our real stock", score: 0 },
      { label: "Large variances every count", score: 1 },
      { label: "Small variances", score: 2 },
      { label: "Almost always matches", score: 3 },
    ] },
    { id: "expiry", area: "inventory", q: "How do you track lots and expiry dates?", options: [
      { label: "We don't", score: 0 },
      { label: "Manually in Excel", score: 1 },
      { label: "Partly in the system", score: 2 },
      { label: "Fully in the system with alerts", score: 3 },
      { label: "Not relevant to our products", score: null },
    ] },
    { id: "pricing", area: "sales", q: "How are customer prices and discounts applied?", options: [
      { label: "Manually on every order", score: 0 },
      { label: "Excel price lists", score: 1 },
      { label: "In the system with many manual edits", score: 2 },
      { label: "Automatically per customer in the system", score: 3 },
    ] },
    { id: "reps", area: "sales", q: "How do sales rep orders reach you?", options: [
      { label: "By phone or WhatsApp", score: 0 },
      { label: "On paper, then keyed in", score: 1 },
      { label: "Partly through an app", score: 2 },
      { label: "A mobile app that feeds the system directly", score: 3 },
      { label: "We don't have sales reps", score: null },
    ] },
    { id: "credit", area: "credit", q: "How do you control credit limits and collections?", options: [
      { label: "No clear tracking", score: 0 },
      { label: "Tracked in Excel", score: 1 },
      { label: "System reports, no automatic blocking", score: 2 },
      { label: "The system blocks credit sales automatically", score: 3 },
      { label: "We only sell for cash", score: null },
    ] },
    { id: "channels", area: "channels", q: "Do you sell on platforms like Amazon, noon, Salla or Zid?", options: [
      { label: "Yes, and we key orders in manually", score: 0 },
      { label: "Yes, some are connected", score: 2 },
      { label: "Yes, all connected to one inventory", score: 3 },
      { label: "We don't sell online", score: null },
    ] },
    { id: "reporting", area: "reporting", q: "How long does it take to know last month's margin per brand or product?", options: [
      { label: "We can't know it accurately", score: 0 },
      { label: "More than a week", score: 1 },
      { label: "A day or two", score: 2 },
      { label: "Instantly from the system", score: 3 },
    ] },
    { id: "size", area: "size", q: "Roughly how many people will use the system?", options: [
      { label: "1 – 5", score: null },
      { label: "6 – 20", score: null },
      { label: "21 – 50", score: null },
      { label: "More than 50", score: null },
    ] },
  ],
  areas: {
    systems: { name: "Unified systems", advice: "Your data is spread across separate tools. One system linking sales, inventory and accounting saves hours of duplicate entry.", href: "/#packages", link: "Packages" },
    compliance: { name: "Fatoora compliance", advice: "Prepare your data and test the integration before your wave date — delays risk penalties.", href: "/zatca", link: "Compliance guide" },
    inventory: { name: "Inventory accuracy", advice: "Blind counts, lot and expiry tracking and first-expiry-first-out picking reduce variances and waste.", href: "/addons#inventory", link: "Inventory solutions" },
    sales: { name: "Sales & reps", advice: "Automatic price lists and a rep app prevent pricing errors and get orders to the warehouse faster.", href: "/solutions/distribution", link: "Distribution solutions" },
    credit: { name: "Credit & collections", advice: "Automatic credit blocking and margin-based sales approval protect your cash flow.", href: "/addons#sales", link: "Sales & credit solutions" },
    channels: { name: "Platform integration", advice: "Connecting Amazon, noon, Salla and other platforms to one inventory ends manual entry and overselling.", href: "/integrations", link: "Integrations" },
    reporting: { name: "Reporting & margin", advice: "Instant reports per brand and rep show where you make and lose money, without waiting for month-end.", href: "/addons#sales", link: "Reports" },
  },
  levels: [
    { min: 0, title: "Your systems need a full transformation", text: "Most of your operations are manual or scattered, which means lost time and costly errors. The good news: this is the biggest opportunity to improve, and moving to one ERP shows results quickly." },
    { min: 40, title: "A solid base with clear gaps", text: "You have some systems in place, but gaps are costing your team time and affecting the accuracy of your numbers. Fixing these specific gaps will give you the biggest return." },
    { min: 75, title: "Advanced", text: "Your systems are mature in most areas. What you need is targeted improvements and integrations, not a full overhaul." },
  ],
  resultTitle: "Your result",
  scoreLabel: "Systems maturity",
  areasTitle: "Score by area",
  strong: "Good",
  gapsTitle: "Your main gaps and what we recommend",
  noGaps: "No major gaps. We recommend a quick review to find fine-tuning opportunities.",
  packageTitle: "Suggested package",
  packages: { starter: "Starter", growth: "Growth", enterprise: "Enterprise" },
  packageNote: "An initial suggestion based on team size and your answers.",
  leadTitle: "Get a detailed plan for your company",
  leadText: "Send your details and one of our experts will walk through your result with you in a free 30-minute session.",
  restart: "Retake the assessment",
};

export const getAssessment = (locale: "ar" | "en") => (locale === "en" ? assessEn : assessAr);
