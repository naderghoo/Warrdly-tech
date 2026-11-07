// Page for companies that already run Odoo: rescue, add-ons, upgrades and partner change.

export const existingAr = {
  path: "/odoo-support",
  metaTitle: "دعم Odoo وإصلاحه وتطويره للشركات التي تستخدمه",
  metaDescription:
    "لديك Odoo ويعاني من مشكلات عالقة أو بطء في الدعم؟ نراجع نظامك، ونحل المشكلات، ونطوّر الإضافات والتكاملات، ونرقّي الإصدار، وننقل الشراكة بسلاسة.",
  nav: "لعملاء Odoo الحاليين",
  hero: {
    eyebrow: "لعملاء Odoo الحاليين",
    title: "لديك Odoo بالفعل؟ نجعله يعمل كما يجب",
    text: "مشكلات عالقة منذ أشهر، أو إضافة لم تُنفّذ، أو دعم لا يرد. نراجع نظامك كما هو، ونبدأ بما يؤثر على عملك اليوم، دون إعادة التطبيق من الصفر.",
    cta: "احجز جلسة مراجعة مجانية",
    secondary: "انتقل إلى الخدمات",
  },
  pains: {
    title: "هل يبدو هذا مألوفاً؟",
    guide: { label: "اقرأ: أشهر مشكلات Odoo بعد التطبيق وكيف تُحل", href: "/blog/common-odoo-problems" },
    items: [
      { icon: "x", title: "مشكلات عالقة", text: "أخطاء أو إجراءات لا تعمل كما يجب، وطلبات إصلاح مفتوحة منذ أسابيع." },
      { icon: "chat", title: "دعم بطيء أو منقطع", text: "ردود متأخرة، أو تواصل انقطع مع الشريك الذي طبّق النظام." },
      { icon: "swap", title: "عودة إلى Excel", text: "الفريق لا يثق بأرقام النظام، فيعيد إدخالها في ملفات جانبية." },
      { icon: "code", title: "إضافة لم تُنفّذ", text: "تقرير أو اعتماد أو تكامل تحتاجه منذ فترة، ولا أحد ينفّذه." },
      { icon: "cloud", title: "إصدار قديم", text: "ترقية مؤجلة، ووحدات مخصصة يخشى الجميع أن تتعطل." },
      { icon: "shield", title: "فواتير مرفوضة", text: "رفض متكرر من منصة فاتورة، أو إعداد ضريبي غير مكتمل." },
    ],
  },
  services: {
    eyebrow: "ماذا نقدّم",
    title: "من المراجعة إلى الحل",
    items: [
      { icon: "check", title: "جلسة مراجعة مجانية", text: "30 دقيقة نطّلع فيها على نظامك معك عبر مشاركة الشاشة، ونحدد أهم ما يحتاج معالجة." },
      { icon: "gear", title: "فحص شامل للنظام", text: "مراجعة الإعدادات والبيانات والوحدات المخصصة والصلاحيات، بتقرير مكتوب يرتّب المشكلات حسب أثرها." },
      { icon: "buoy", title: "إصلاح المشكلات العالقة", text: "معالجة الأخطاء، وتصحيح الإجراءات، وتنظيف البيانات التي أفقدت الفريق الثقة بالنظام." },
      { icon: "code", title: "إضافات وتطوير", text: "تقارير، وسير اعتماد، وشاشات، ووحدات مخصصة تُبنى بمعايير Odoo وتُوثَّق وتُسلَّم لك." },
      { icon: "swap", title: "تكاملات", text: "ربط Odoo بأمازون ونون وترينديول وسلة وشركات الشحن ومنصة فاتورة وغيرها." },
      { icon: "cloud", title: "ترقية الإصدار", text: "نقل نظامك إلى إصدار أحدث مع اختبار الوحدات المخصصة على نسخة تجريبية قبل التشغيل." },
      { icon: "cap", title: "تدريب وإعادة ضبط", text: "تدريب الفريق على الطريقة الصحيحة، وضبط الإجراءات لتطابق طريقة عملكم الفعلية." },
      { icon: "calendar", title: "دعم شهري", text: "باقة ساعات شهرية بزمن استجابة واضح، ومتابعة عبر بوابة العملاء." },
    ],
  },
  process: {
    title: "كيف نبدأ مع نظام قائم",
    steps: [
      { title: "اتفاقية السرية", text: "نوقّعها قبل الاطلاع على أي بيانات." },
      { title: "صلاحية مؤقتة", text: "حساب بصلاحيات محددة، يُلغى عند انتهاء العمل." },
      { title: "تقرير وأولويات", text: "ما المشكلة، وأثرها، والحل المقترح، والتكلفة." },
      { title: "التنفيذ على نسخة تجريبية", text: "نختبر كل تعديل قبل نقله إلى نظامك الفعلي." },
    ],
  },
  partner: {
    title: "تفكّر في تغيير شريك Odoo؟",
    text: "اشتراك Odoo عقد بين شركتك وOdoo مباشرة، والقرار في يدك. نتولى التنسيق مع Odoo ومع الشريك الحالي ليكون الانتقال منظماً، دون أن يتوقف عملك. ونتعامل مع الشريك السابق باحترام، فهدفنا استقرار نظامك لا الخلاف.",
    checklistTitle: "ما نتأكد من استلامه قبل الانتقال",
    checklist: [
      "نسخة احتياطية كاملة من قاعدة البيانات والملفات، محفوظة لدى شركتك",
      "الشيفرة المصدرية لكل الوحدات المخصصة، في مستودع تملكه شركتك",
      "صلاحيات المدير على Odoo وOdoo.sh أو الخادم",
      "مفاتيح التكاملات: منصات البيع، والدفع، والشحن، والبريد",
      "الحساب الذي اشتُريت منه الإضافات المدفوعة",
      "توثيق التخصيصات والطلبات المفتوحة",
    ],
    note: "راجع عقدك مع الشريك الحالي قبل الإشعار: مدة الإشعار، والفواتير المستحقة، وملكية الشيفرة المخصصة.",
    guide: { label: "اقرأ الدليل الكامل لتغيير شريك Odoo", href: "/blog/change-odoo-partner" },
  },
  faqTitle: "أسئلة شائعة",
  faq: [
    {
      q: "هل يمكن تغيير شريك Odoo؟",
      a: "نعم. الاشتراك باسم شركتك مع Odoo، ويُطلب التغيير من مدير حسابك في Odoo. نساعدك في الخطوات، ونراجع معك شروط عقدك الحالي أولاً.",
    },
    {
      q: "هل نخسر بياناتنا أو تعديلاتنا عند الانتقال؟",
      a: "لا، إذا استُلمت النسخة الاحتياطية والشيفرة المصدرية قبل الانتقال. هذا أول ما نتحقق منه في القائمة أعلاه.",
    },
    {
      q: "هل يجب أن ننقل الشراكة لكي تساعدونا؟",
      a: "ليس بالضرورة. يمكننا تنفيذ مهمة محددة، كإضافة أو تكامل أو فحص، وتقرر بعدها ما يناسبك.",
    },
    {
      q: "هل تعملون على Odoo Online وOdoo.sh والخوادم الخاصة؟",
      a: "نعم. نحدد في جلسة المراجعة نوع الاستضافة والإصدار، وما يمكن تنفيذه على كل منها. فمثلاً، الوحدات المخصصة لا تعمل على باقة Standard في Odoo Online.",
    },
    {
      q: "ما الفرق بين جلسة المراجعة المجانية والفحص الشامل؟",
      a: "الجلسة المجانية 30 دقيقة نحدد فيها أهم المشكلات معك. أما الفحص الشامل فمراجعة مفصّلة للنظام بتقرير مكتوب، ويُسعَّر حسب حجم النظام.",
    },
  ],
  homeBand: {
    eyebrow: "لعملاء Odoo الحاليين",
    title: "لديك Odoo ويحتاج من ينقذه؟",
    text: "مشكلات عالقة، أو إضافة لم تُنفّذ، أو ترقية مؤجلة، أو شريك لا يرد. نراجع نظامك كما هو، ونبدأ بما يؤثر على عملك اليوم.",
    cta: "دعم أنظمة Odoo القائمة",
  },
  ctaTitle: "احجز جلسة مراجعة مجانية لنظام Odoo",
  ctaText: "أخبرنا بأهم مشكلة تواجهك، وسنتواصل معك خلال يوم عمل لترتيب الجلسة.",
  sectorOption: "لدينا Odoo ونحتاج دعماً أو تطويراً",
};

export const existingEn: typeof existingAr = {
  path: "/odoo-support",
  metaTitle: "Odoo support, rescue and development",
  metaDescription:
    "Already on Odoo but stuck with open issues or slow support? We review your system, fix problems, build add-ons and integrations, upgrade versions and handle partner change.",
  nav: "Already on Odoo?",
  hero: {
    eyebrow: "For existing Odoo users",
    title: "Already on Odoo? Let's make it work properly",
    text: "Issues open for months, an add-on that never got built, or support that doesn't answer. We review your system as it is and start with what affects your business today, without re-implementing from scratch.",
    cta: "Book a free review session",
    secondary: "See services",
  },
  pains: {
    title: "Does this sound familiar?",
    guide: { label: "Read: the most common Odoo problems after implementation", href: "/blog/common-odoo-problems" },
    items: [
      { icon: "x", title: "Stuck issues", text: "Errors or processes that don't work as they should, and fix requests open for weeks." },
      { icon: "chat", title: "Slow or no support", text: "Late replies, or contact lost with the partner who implemented the system." },
      { icon: "swap", title: "Back to Excel", text: "The team doesn't trust the system's numbers and re-enters them in side files." },
      { icon: "code", title: "An add-on never built", text: "A report, approval or integration you've needed for a while that nobody delivers." },
      { icon: "cloud", title: "Outdated version", text: "A postponed upgrade and custom modules everyone fears will break." },
      { icon: "shield", title: "Rejected invoices", text: "Repeated rejections from Fatoora, or an incomplete tax setup." },
    ],
  },
  services: {
    eyebrow: "What we offer",
    title: "From review to resolution",
    items: [
      { icon: "check", title: "Free review session", text: "30 minutes looking at your system with you over screen share, to pinpoint what needs attention most." },
      { icon: "gear", title: "Full system audit", text: "A review of settings, data, custom modules and access rights, with a written report ranked by impact." },
      { icon: "buoy", title: "Fixing stuck issues", text: "Resolving errors, correcting processes and cleaning the data that cost your team's trust in the system." },
      { icon: "code", title: "Add-ons and development", text: "Reports, approval flows, screens and custom modules built to Odoo standards, documented and handed over to you." },
      { icon: "swap", title: "Integrations", text: "Connecting Odoo to Amazon, noon, Trendyol, Salla, couriers, the Fatoora platform and more." },
      { icon: "cloud", title: "Version upgrades", text: "Moving your system to a newer version, testing custom modules on a staging copy before go-live." },
      { icon: "cap", title: "Training and re-alignment", text: "Training your team the right way and aligning processes with how you actually work." },
      { icon: "calendar", title: "Monthly support", text: "A monthly hours package with clear response times, tracked through the client portal." },
    ],
  },
  process: {
    title: "How we start with an existing system",
    steps: [
      { title: "Non-disclosure agreement", text: "Signed before we see any data." },
      { title: "Temporary access", text: "An account with limited rights, removed when the work ends." },
      { title: "Report and priorities", text: "The problem, its impact, the proposed fix and the cost." },
      { title: "Changes on staging first", text: "Every change is tested before it reaches your live system." },
    ],
  },
  partner: {
    title: "Thinking about changing your Odoo partner?",
    text: "Your Odoo subscription is a contract between your company and Odoo, and the decision is yours. We coordinate with Odoo and your current partner so the move is orderly and your operations don't stop. We treat the previous partner with respect; our goal is a stable system, not a dispute.",
    checklistTitle: "What we make sure you receive before the switch",
    checklist: [
      "A full backup of the database and files, stored with your company",
      "Source code for every custom module, in a repository your company owns",
      "Admin access to Odoo and to Odoo.sh or the server",
      "Integration keys: sales channels, payments, couriers and email",
      "The account used to buy paid add-ons",
      "Documentation of customisations and open requests",
    ],
    note: "Check your contract with the current partner before giving notice: notice period, outstanding invoices and ownership of custom code.",
    guide: { label: "Read the full guide to changing your Odoo partner", href: "/blog/change-odoo-partner" },
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Can we change our Odoo partner?",
      a: "Yes. The subscription is in your company's name with Odoo, and the change is requested through your Odoo account manager. We guide you through the steps and review your current contract terms first.",
    },
    {
      q: "Do we lose data or customisations when switching?",
      a: "No, as long as the backup and source code are handed over before the switch. That is the first thing we check in the list above.",
    },
    {
      q: "Do we have to switch partners for you to help?",
      a: "Not necessarily. We can deliver a specific piece of work, such as an add-on, an integration or an audit, and you decide what suits you afterwards.",
    },
    {
      q: "Do you work on Odoo Online, Odoo.sh and self-hosted servers?",
      a: "Yes. In the review session we confirm your hosting and version and what can be done on each. For example, custom modules don't run on the Standard plan of Odoo Online.",
    },
    {
      q: "What's the difference between the free review and the full audit?",
      a: "The free session is 30 minutes to identify your main issues together. The full audit is a detailed review with a written report, priced by system size.",
    },
  ],
  homeBand: {
    eyebrow: "For existing Odoo users",
    title: "Already on Odoo and need a rescue?",
    text: "Stuck issues, an add-on never built, a postponed upgrade or a partner who doesn't answer. We review your system as it is and start with what affects your business today.",
    cta: "Support for existing Odoo systems",
  },
  ctaTitle: "Book a free Odoo review session",
  ctaText: "Tell us the main issue you're facing and we'll get back to you within one business day to arrange the session.",
  sectorOption: "We already use Odoo and need support or development",
};

export const getExisting = (locale: "ar" | "en") => (locale === "en" ? existingEn : existingAr);
