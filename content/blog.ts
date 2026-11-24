// =====================================================================
// المدونة — لإضافة مقال: انسخ عنصراً من المصفوفة وعدّل محتواه
// Blog — to add a post, copy an entry in the array and edit it
// =====================================================================

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
  /** Internal link (path after the locale, e.g. "/zatca", or "#packages" for the home page section) or full external URL */
  | { type: "link"; text: string; href: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string };

export type PostContent = {
  title: string;
  /** Shorter title for search results (optional) */
  seoTitle?: string;
  description: string;
  category: string;
  readMinutes: number;
  body: Block[];
};

export type Post = {
  slug: string;
  date: string; // YYYY-MM-DD
  /** تاريخ آخر تحديث جوهري للمقال (اختياري) — يظهر لمحركات البحث كـ dateModified */
  updated?: string; // YYYY-MM-DD
  related: { label: { ar: string; en: string }; href: string };
  ar: PostContent;
  en: PostContent;
};

export const blogUi = {
  ar: {
    title: "المدونة",
    intro: "مقالات عملية عن Odoo والامتثال السعودي وإدارة شركات التوزيع، من فريق يشغّل هذه الأنظمة كل يوم.",
    read: "اقرأ المقال",
    minutes: "دقائق قراءة",
    back: "كل المقالات",
    ctaTitle: "تريد تطبيق هذا في شركتك؟",
    ctaText: "احجز استشارة مجانية، ونراجع وضعك الحالي ونقترح الخطوات المناسبة.",
    more: "مقالات أخرى",
    related: "اقرأ أيضاً",
  },
  en: {
    title: "Blog",
    intro: "Practical articles on Odoo, Saudi compliance and running distribution companies, from a team that operates these systems every day.",
    read: "Read article",
    minutes: "min read",
    back: "All articles",
    ctaTitle: "Want to apply this in your company?",
    ctaText: "Book a free consultation and we'll review your current setup and recommend next steps.",
    more: "More articles",
    related: "Related",
  },
};

export const posts: Post[] = [
  // -------------------------------------------------------------------
  {
    slug: "odoo-zatca-fatoora-integration",
    date: "2026-11-02",
    updated: "2026-11-23",
    related: { label: { ar: "صفحة الامتثال لفاتورة", en: "ZATCA compliance page" }, href: "/zatca" },
    ar: {
      title: "ربط أودو Odoo بمنصة فاتورة: دليل المرحلة الثانية والموجة 25 خطوة بخطوة",
      seoTitle: "ربط أودو Odoo مع فاتورة: المرحلة الثانية والموجة 25",
      description:
        "دليل عملي لربط أودو (Odoo) بمنصة فاتورة: من تشملهم الموجة 25 (إيرادات تتجاوز 187,500 ريال والربط قبل 1 فبراير 2027)، والفرق بين الفاتورة القياسية والمبسطة، وخطوات التهيئة، وأسباب رفض الفواتير.",
      category: "الامتثال",
      readMinutes: 10,
      body: [
        {
          type: "p",
          text: "تطبّق هيئة الزكاة والضريبة والجمارك الفوترة الإلكترونية على مرحلتين. الأولى هي إصدار الفواتير وحفظها إلكترونياً، والثانية هي الربط والتكامل: أن يرسل نظامك الفواتير إلى منصة فاتورة مباشرة بصيغة محددة وحقول إضافية. المرحلة الثانية تُطبّق على موجات حسب حجم الإيرادات، وكل موجة جديدة تنزل بالحد لتشمل منشآت أصغر.",
        },
        {
          type: "p",
          text: "إذا كنت تستخدم Odoo، فالنظام يتضمن توطيناً سعودياً يدعم المرحلة الثانية بشكل أساسي، دون برنامج وسيط. لكن الربط لا ينجح بمجرد تفعيل الإعداد؛ نجاحه يعتمد على جودة بياناتك وطريقة التهيئة والاختبار. هذا الدليل يشرح الخطوات كما نطبّقها مع عملائنا.",
        },
        { type: "h2", text: "هل منشأتك ملزمة؟ الموجة 25 والموجات الأخيرة" },
        {
          type: "p",
          text: "أعلنت الهيئة في 24 يوليو 2026 معيار الموجة الخامسة والعشرين: تشمل المنشآت المقيمة التي تجاوزت إيراداتها الخاضعة لضريبة القيمة المضافة 187,500 ريال في أي من الأعوام 2022 أو 2023 أو 2024 أو 2025، وعليها ربط أنظمتها بمنصة فاتورة بحلول 1 فبراير 2027. وهذه أول موجة تُحتسب فيها إيرادات 2025، فتدخلها منشآت تأسست حديثاً.",
        },
        {
          type: "table",
          head: ["الموجة", "حد الإيرادات الخاضعة للضريبة", "موعد الربط"],
          rows: [
            ["23", "أكثر من 750,000 ريال", "قبل 31 مارس 2026"],
            ["24", "أكثر من 375,000 ريال", "قبل 30 يونيو 2026"],
            ["25", "أكثر من 187,500 ريال (2022–2025)", "بحلول 1 فبراير 2027"],
          ],
          caption: "تُشعر الهيئة كل منشأة مستهدفة مباشرة، وتلتزم بإشعار الموجات التالية قبل ستة أشهر على الأقل من موعد ربطها. المصدر: أخبار هيئة الزكاة والضريبة والجمارك.",
        },
        { type: "link", text: "إعلان الهيئة عن معيار الموجة 25 (zatca.gov.sa)", href: "https://zatca.gov.sa/ar/MediaCenter/News/Pages/Wave25-E-invoicing.aspx" },
        {
          type: "note",
          text: "إن لم يصلك إشعار بعد، فلا تفترض أنك خارج النطاق. راجع إيراداتك الخاضعة للضريبة في السنوات الأربع، فإن تجاوزت 187,500 ريال في أي منها فابدأ التجهيز الآن.",
        },
        { type: "h2", text: "الفاتورة القياسية والفاتورة المبسطة: نموذجان مختلفان" },
        {
          type: "table",
          head: ["", "الفاتورة الضريبية القياسية", "الفاتورة الضريبية المبسطة"],
          rows: [
            ["لمن تصدر", "للمنشآت (B2B) والجهات الحكومية", "للأفراد (B2C)، مثل فواتير نقاط البيع"],
            ["النموذج", "الاعتماد المسبق (Clearance)", "الإبلاغ (Reporting)"],
            ["متى تُرسل للمنصة", "قبل مشاركتها مع المشتري، ولا تُعتبر صالحة قبل اعتمادها", "خلال 24 ساعة من إصدارها"],
            ["الختم", "تختمها الهيئة عند الاعتماد", "يختمها نظامك قبل الإبلاغ"],
          ],
          caption: "الإشعارات الدائنة والمدينة تتبع نوع الفاتورة الأصلية، ويجب أن ترتبط بها.",
        },
        { type: "link", text: "سؤال الهيئة الشائع عن مهلة الإبلاغ بالفواتير المبسطة", href: "https://zatca.gov.sa/en/E-Invoicing/Introduction/FAQ/Pages/FAQ_053.aspx" },
        { type: "h2", text: "ما الذي يوفّره Odoo جاهزاً؟" },
        {
          type: "p",
          text: "التوطين السعودي في Odoo مقسّم إلى وحدات تُثبَّت حسب الحاجة. أهمها:",
        },
        {
          type: "ul",
          items: [
            "التوطين الأساسي (l10n_sa): شجرة الحسابات والضرائب ورمز QR للمرحلة الأولى، ويُثبَّت تلقائياً للشركات السعودية.",
            "الفوترة الإلكترونية (l10n_sa_edi): الربط مع منصة فاتورة للمرحلة الثانية.",
            "نقاط البيع (l10n_sa_pos وl10n_sa_edi_pos): حقول الامتثال في فواتير نقاط البيع والربط مع المنصة منها.",
            "التقارير (l10n_sa_reports): إقرار ضريبة القيمة المضافة وتقارير الاستقطاع.",
          ],
        },
        { type: "link", text: "توثيق Odoo الرسمي للتوطين السعودي", href: "https://www.odoo.com/documentation/19.0/applications/finance/fiscal_localizations/saudi_arabia.html" },
        { type: "h2", text: "خطوات تهيئة Odoo للربط" },
        {
          type: "ol",
          items: [
            "بيانات الشركة: الاسم القانوني (لا يتجاوز 63 حرفاً)، والرقم الضريبي، ورقم السجل التجاري، والعنوان الوطني كاملاً (رقم المبنى، والرقم الإضافي، والحي، والرمز البريدي)، وعملة الشركة بالريال.",
            "الفروع: يستخدم كل فرع الرقم الضريبي للشركة الأم مع رقم سجله التجاري الخاص.",
            "بيانات العملاء من المنشآت: الرقم الضريبي والعنوان الوطني لكل عميل تصدر له فواتير قياسية.",
            "لغة الفاتورة: يجب أن تكون الفواتير بالعربية، ويجوز أن تكون ثنائية اللغة. نضبط نماذج الطباعة على ذلك.",
            "تسجيل دفاتر المبيعات: يُسجَّل كل دفتر مبيعات منفصلاً برمز تحقق لمرة واحدة (OTP) من بوابة فاتورة. صلاحية الرمز 60 دقيقة، فجهّز كل شيء قبل طلبه.",
            "الاختبار في بيئة المحاكاة: إصدار فواتير قياسية ومبسطة وإشعارات دائنة ومدينة، والتأكد من قبولها. فواتير المحاكاة غير صالحة نظاماً، والأفضل إجراؤها على نسخة من قاعدة البيانات.",
            "الانتقال إلى بيئة الإنتاج: بعد إرسال أول فاتورة في الإنتاج لا يمكن الرجوع إلى بيئة الاختبار، فلا تنتقل قبل إغلاق كل ملاحظات المحاكاة.",
            "نقاط البيع: تسجيل دفتر الفواتير المرتبط بنقاط البيع، وتفعيل صيغة إيصالات دول الخليج لطباعة الإيصال بالعربية مع رمز QR.",
          ],
        },
        { type: "h2", text: "أخطاء شائعة تؤدي إلى رفض الفواتير" },
        {
          type: "ul",
          items: [
            "عنوان وطني ناقص للشركة أو للعميل، خاصة الرقم الإضافي أو الرمز البريدي.",
            "رقم ضريبي غير صحيح للعميل؛ الرقم الضريبي في المملكة مكوّن من 15 رقماً.",
            "تعديل فاتورة بعد إرسالها بدلاً من إصدار إشعار دائن مرتبط بها.",
            "إشعار دائن لا يشير إلى الفاتورة الأصلية أو سبب الإصدار.",
            "فواتير مبسطة من نقاط البيع لم تُبلَّغ خلال 24 ساعة بسبب انقطاع الاتصال دون متابعة.",
            "تجاهل الفواتير المرفوضة أو التي تحمل تحذيرات، فتتراكم دون معالجة.",
            "إصدار فواتير يدوية من نظام آخر بجانب Odoo، فتتشتت الأرقام التسلسلية.",
          ],
        },
        {
          type: "note",
          text: "نصيحة من تجربتنا: نظّف بيانات العملاء قبل الربط، لا بعده. معظم الفواتير المرفوضة سببها بيانات عميل ناقصة، وليس النظام.",
        },
        { type: "h2", text: "بعد التشغيل: متابعة يومية لا تُهمل" },
        {
          type: "p",
          text: "الأسابيع الأولى بعد الربط هي الأهم. خصّص شخصاً في المحاسبة يراجع يومياً الفواتير المرفوضة أو التي تحمل تحذيرات، ويصحح سببها من المصدر، كبيانات العميل أو إعداد الضريبة، لا من الفاتورة وحدها. ونقترح تقريراً أسبوعياً بعدد الفواتير المرسلة والمقبولة والمرفوضة حتى يستقر الوضع.",
        },
        { type: "link", text: "اقرأ: أشهر مشكلات Odoo بعد التطبيق وكيف تُحل", href: "/blog/common-odoo-problems" },
        { type: "h2", text: "تستخدم Odoo بالفعل لكن الربط لم يكتمل؟" },
        {
          type: "p",
          text: "كثير من الشركات طبّقت Odoo قبل أن تصلها موجتها، أو على إصدار قديم، أو مع شريك لم يعد يتابع. في هذه الحالة نبدأ بفحص النظام: إصدار Odoo والوحدات المثبتة، واكتمال بيانات الشركة والعملاء، ونتيجة اختبار المحاكاة. ثم نصلح ما يلزم ونسجّل الدفاتر وننتقل إلى الإنتاج قبل موعد موجتك.",
        },
        { type: "link", text: "دعم Odoo وإصلاحه للشركات التي تستخدمه", href: "/odoo-support" },
        { type: "h2", text: "قائمة تحقق قبل موعد موجتك" },
        {
          type: "ul",
          items: [
            "هل تأكدت من موجتك وموعد ربطك؟",
            "هل بيانات الشركة والفروع والعنوان الوطني مكتملة في Odoo؟",
            "هل لكل عميل من المنشآت رقم ضريبي وعنوان صحيحان؟",
            "هل نماذج الفواتير بالعربية أو ثنائية اللغة؟",
            "هل اختبرت كل أنواع الفواتير والإشعارات في بيئة المحاكاة؟",
            "هل يعرف فريق المحاسبة كيف يعالج فاتورة مرفوضة؟",
            "هل نقاط البيع جاهزة لإصدار فواتير مبسطة والإبلاغ بها خلال 24 ساعة؟",
          ],
        },
        {
          type: "p",
          text: "إذا كانت إجابتك «لا» على أي سؤال، فابدأ الآن ولا تنتظر موعد الموجة. الربط نفسه قصير، لكن تجهيز البيانات واختبارها هو ما يأخذ الوقت.",
        },
        { type: "link", text: "اقرأ: كم تكلفة أودو Odoo في السعودية؟", href: "/blog/odoo-cost-saudi-arabia" },
      ],
    },
    en: {
      title: "Connecting Odoo to Fatoora: a step-by-step guide to Phase 2 and Wave 25",
      seoTitle: "Odoo ZATCA Fatoora integration: Phase 2 and Wave 25",
      description:
        "A practical guide to connecting Odoo to Fatoora: who Wave 25 covers (taxable revenue above SAR 187,500, integration by 1 February 2027), standard vs simplified invoices, setup steps and why invoices get rejected.",
      category: "Compliance",
      readMinutes: 9,
      body: [
        {
          type: "p",
          text: "ZATCA applies e-invoicing in two phases: generating and storing invoices electronically, then integration, where your system sends invoices to the Fatoora platform in a set format with extra fields. Integration is rolled out in revenue-based waves, each reaching smaller businesses.",
        },
        {
          type: "p",
          text: "Odoo's Saudi localization supports Phase 2 natively, with no middleware. But success depends on your data quality, configuration and testing, not on ticking a setting.",
        },
        { type: "h2", text: "Are you in scope? Wave 25 and recent waves" },
        {
          type: "p",
          text: "On 24 July 2026 ZATCA announced Wave 25: resident taxpayers whose VAT-taxable revenue exceeded SAR 187,500 in any of 2022, 2023, 2024 or 2025 must integrate with Fatoora by 1 February 2027. It is the first wave to count 2025 revenue, so recently founded businesses can fall in scope.",
        },
        {
          type: "table",
          head: ["Wave", "Taxable revenue threshold", "Integration deadline"],
          rows: [
            ["23", "Above SAR 750,000", "By 31 March 2026"],
            ["24", "Above SAR 375,000", "By 30 June 2026"],
            ["25", "Above SAR 187,500 (2022–2025)", "By 1 February 2027"],
          ],
          caption: "ZATCA notifies each targeted taxpayer directly, at least six months before its integration date. Source: ZATCA news.",
        },
        { type: "link", text: "ZATCA's Wave 25 announcement", href: "https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx" },
        { type: "h2", text: "Standard vs simplified invoices" },
        {
          type: "table",
          head: ["", "Standard tax invoice", "Simplified tax invoice"],
          rows: [
            ["Issued to", "Businesses (B2B) and government", "Consumers (B2C), e.g. POS receipts"],
            ["Model", "Clearance", "Reporting"],
            ["Sent to Fatoora", "Before sharing with the buyer; not valid until cleared", "Within 24 hours of issue"],
            ["Stamp", "Applied by ZATCA on clearance", "Applied by your system"],
          ],
          caption: "Credit and debit notes follow the type of the original invoice and must reference it.",
        },
        { type: "link", text: "ZATCA FAQ on the 24-hour reporting window", href: "https://zatca.gov.sa/en/E-Invoicing/Introduction/FAQ/Pages/FAQ_053.aspx" },
        { type: "h2", text: "What Odoo provides out of the box" },
        {
          type: "ul",
          items: [
            "l10n_sa: chart of accounts, taxes and the Phase 1 QR code, installed automatically.",
            "l10n_sa_edi: the Phase 2 Fatoora integration.",
            "l10n_sa_pos and l10n_sa_edi_pos: compliance fields and e-invoicing from point of sale.",
            "l10n_sa_reports: VAT and withholding returns.",
          ],
        },
        { type: "link", text: "Odoo's Saudi Arabia localization documentation", href: "https://www.odoo.com/documentation/19.0/applications/finance/fiscal_localizations/saudi_arabia.html" },
        { type: "h2", text: "Setting Odoo up for integration" },
        {
          type: "ol",
          items: [
            "Company data: legal name (63 characters max), VAT number, CR number, full national address and SAR as currency.",
            "Branches use the parent's VAT number with their own CR number.",
            "B2B customers: VAT number and national address for everyone receiving standard invoices.",
            "Invoice language: invoices must be in Arabic; bilingual is allowed.",
            "Onboard each sales journal separately with a one-time password (OTP) from the Fatoora portal; it expires after 60 minutes.",
            "Test in simulation: standard and simplified invoices, credit and debit notes. Simulation invoices aren't legally valid; use a copy of the database.",
            "Go to production: once a production invoice is sent you can't switch back to testing.",
            "Point of sale: onboard the POS invoice journal and enable the GCC receipt format for Arabic receipts with the QR code.",
          ],
        },
        { type: "h2", text: "Common reasons invoices are rejected" },
        {
          type: "ul",
          items: [
            "Incomplete national address for the company or customer.",
            "Wrong customer VAT number; Saudi VAT numbers have 15 digits.",
            "Editing a sent invoice instead of issuing a linked credit note.",
            "Credit notes without a reference to the original invoice or a reason.",
            "Simplified POS invoices not reported within 24 hours after a connection outage.",
            "Ignoring rejected invoices and warnings until they pile up.",
            "Issuing manual invoices from another system alongside Odoo.",
          ],
        },
        {
          type: "note",
          text: "From experience: clean customer data before integration, not after. Most rejections come from incomplete customer data, not the system.",
        },
        { type: "h2", text: "After go-live" },
        {
          type: "p",
          text: "In the first weeks, assign someone in accounts to review rejected and warned invoices daily and fix the cause at the source, and track sent, accepted and rejected counts weekly until things settle.",
        },
        { type: "link", text: "Already on Odoo but not integrated? Odoo support and rescue", href: "/odoo-support" },
        { type: "h2", text: "Checklist before your wave deadline" },
        {
          type: "ul",
          items: [
            "Have you confirmed your wave and integration date?",
            "Are company, branch and national address details complete in Odoo?",
            "Does every B2B customer have a valid VAT number and address?",
            "Are invoice layouts in Arabic or bilingual?",
            "Have you tested every invoice and note type in simulation?",
            "Does the accounts team know how to handle a rejected invoice?",
            "Is point of sale ready to report simplified invoices within 24 hours?",
          ],
        },
        { type: "link", text: "Read: how much does Odoo cost in Saudi Arabia?", href: "/blog/odoo-cost-saudi-arabia" },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "odoo-amazon-noon-integration",
    date: "2026-11-02",
    related: { label: { ar: "صفحة التكاملات", en: "Integrations page" }, href: "/integrations" },
    ar: {
      title: "ربط أمازون ونون بـ Odoo: مخزون واحد لكل قنواتك",
      description:
        "كيف يعمل ربط Odoo مع أمازون ونون عملياً: ربط المنتجات، مزامنة المخزون والأسعار، الطلبات والمرتجعات، ونصائح من تجربة تشغيل يومية.",
      category: "التجارة الإلكترونية",
      readMinutes: 5,
      body: [
        {
          type: "p",
          text: "عندما تبيع على أمازون ونون ومتجرك الإلكتروني في الوقت نفسه، تبدأ المشكلات بالظهور بسرعة: منتج نفد من المستودع لكنه ما زال معروضاً على منصة، وسعر مختلف بين قناة وأخرى، وموظف يُدخل الطلبات يدوياً كل صباح. الحل ليس موظفاً إضافياً، بل نظاماً واحداً تعمل عليه كل القنوات.",
        },
        { type: "h2", text: "كيف يعمل التكامل عملياً" },
        {
          type: "ol",
          items: [
            "ربط المنتجات: يُطابَق كل منتج على المنصة مع الصنف المقابل في Odoo مرة واحدة، عادة عبر رمز الصنف (SKU) أو الباركود.",
            "مزامنة المخزون: يرسل Odoo الكمية المتاحة لكل منصة تلقائياً، مع إمكانية حجز كمية احتياطية حتى لا تبيع ما لا تملكه.",
            "مزامنة الأسعار: تُدار أسعار كل منصة من قائمة أسعار مستقلة في Odoo، فتعرف هامشك على كل قناة.",
            "استيراد الطلبات: تدخل الطلبات إلى Odoo كأوامر بيع، فيبدأ المستودع التجهيز مباشرة وتصدر الفاتورة من النظام.",
            "الشحن والمرتجعات: تتحدّث حالة الشحن على المنصة، وتُسجَّل المرتجعات في المستودع والمحاسبة.",
          ],
        },
        { type: "h2", text: "الشحن من مستودعك أم من مستودع المنصة؟" },
        {
          type: "p",
          text: "أمازون ونون يقدمان نموذجين: أن تشحن الطلب من مستودعك، أو أن تخزّن بضاعتك في مستودعات المنصة وتتولى هي الشحن (FBA في أمازون وFBN في نون). في Odoo نفصل كل نموذج في مستودع مستقل، فتعرف بدقة ما هو موجود عندك وما هو موجود لدى المنصة، وتُسجَّل الشحنات المرسلة إلى المنصة كتحويلات مخزنية واضحة.",
        },
        { type: "h2", text: "نصائح عملية من مشاريع التكامل" },
        {
          type: "ul",
          items: [
            "وحّد رموز الأصناف قبل الربط؛ رمز واحد للصنف في كل القنوات يوفر عليك أغلب المشكلات.",
            "احجز كمية أمان للمنتجات سريعة البيع حتى لا تتجاوز المبيعات المخزون الفعلي.",
            "افصل مستودعات المنصة عن مستودعك منذ اليوم الأول.",
            "راجع سجل المزامنة يومياً في الأسابيع الأولى، فأغلب الأخطاء تظهر مبكراً.",
            "ابدأ بمنصة واحدة، وأضف الثانية بعد استقرار الأولى.",
          ],
        },
        {
          type: "note",
          text: "التكاملات التي نقدمها مع أمازون ونون وترينديول وسلة اختُبرت في بيئات تشغيل فعلية، وكل تكامل يُنفّذ على حسابات العميل نفسه وبصلاحيات محدودة.",
        },
        { type: "h2", text: "متى تحتاج التكامل؟" },
        {
          type: "p",
          text: "إذا كنت تبيع على أكثر من قناة، أو تُدخل أكثر من عشرين طلباً يومياً يدوياً، أو حدث أن بعت منتجاً غير متوفر، فقد حان وقت الربط. كلما تأخرت، زادت البيانات التي تحتاج تنظيفاً لاحقاً.",
        },
      ],
    },
    en: {
      title: "Connecting Amazon and noon to Odoo: one inventory for every channel",
      seoTitle: "Connect Amazon and noon to Odoo: one inventory",
      description:
        "How Odoo integration with Amazon and noon works in practice: product linking, stock and price sync, orders and returns, and tips from daily operation.",
      category: "E-commerce",
      readMinutes: 4,
      body: [
        {
          type: "p",
          text: "Once you sell on Amazon, noon and your own store at the same time, problems appear quickly: a product that's out of stock but still listed, different prices across channels, and someone keying in orders by hand every morning. The fix isn't another employee — it's one system that every channel runs on.",
        },
        { type: "h2", text: "How the integration works" },
        {
          type: "ol",
          items: [
            "Product linking: each listing is matched once to the Odoo product, usually by SKU or barcode.",
            "Stock sync: Odoo pushes available quantity to each platform automatically, with an optional safety buffer so you never sell what you don't have.",
            "Price sync: each platform's prices come from its own Odoo price list, so you know your margin per channel.",
            "Order import: orders arrive in Odoo as sales orders, so the warehouse starts picking immediately and the invoice is issued from the system.",
            "Shipping and returns: shipment status updates on the platform, and returns are recorded in inventory and accounting.",
          ],
        },
        { type: "h2", text: "Ship from your warehouse or the platform's?" },
        {
          type: "p",
          text: "Amazon and noon both offer two models: you ship from your own warehouse, or you store stock in the platform's warehouses and they ship (FBA on Amazon, FBN on noon). In Odoo we model each as a separate warehouse, so you know exactly what you hold and what the platform holds, and shipments to the platform are clear stock transfers.",
        },
        { type: "h2", text: "Practical tips from integration projects" },
        {
          type: "ul",
          items: [
            "Standardize SKUs before integrating; one code per product across channels prevents most issues.",
            "Keep a safety buffer on fast movers so sales never exceed physical stock.",
            "Separate platform warehouses from your own from day one.",
            "Review the sync log daily for the first few weeks — most errors show up early.",
            "Start with one platform and add the next once the first is stable.",
          ],
        },
        {
          type: "note",
          text: "Our Amazon, noon, Trendyol and Salla integrations are proven in live operations, and every integration runs on the client's own accounts with limited access.",
        },
        { type: "h2", text: "When do you need it?" },
        {
          type: "p",
          text: "If you sell on more than one channel, key in more than twenty orders a day by hand, or have ever sold something you didn't have, it's time to integrate. The longer you wait, the more data you'll need to clean later.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "choosing-erp-for-distribution-saudi",
    date: "2026-11-02",
    related: { label: { ar: "حلول التوزيع والجملة", en: "Distribution solutions" }, href: "/solutions/distribution" },
    ar: {
      title: "كيف تختار نظام ERP لشركة توزيع في السعودية: 10 أسئلة قبل أن توقّع",
      seoTitle: "كيف تختار نظام ERP لشركة توزيع في السعودية: 10 أسئلة",
      description:
        "عشرة أسئلة يجب أن تطرحها على أي مزود نظام ERP قبل التعاقد، من الامتثال لفاتورة إلى قوائم الأسعار والصلاحية والمناديب والتكلفة الكاملة.",
      category: "إدارة الأعمال",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "اختيار نظام ERP قرار يبقى معك سنوات. وشركات التوزيع لها احتياجات لا تظهر في العروض التقديمية العامة: أسعار مختلفة لكل عميل، وتواريخ صلاحية، ومناديب في الميدان، وتحصيل آجل. هذه عشرة أسئلة نوصي بطرحها على أي مزود قبل التوقيع.",
        },
        { type: "h2", text: "الأسئلة العشرة" },
        {
          type: "ol",
          items: [
            "هل النظام متوافق مع المرحلة الثانية من الفوترة الإلكترونية (الربط مع منصة فاتورة)، وهل يشمل ذلك نقاط البيع؟",
            "هل الواجهة والفواتير والتقارير متاحة بالعربية والإنجليزية؟",
            "هل يدعم قوائم أسعار لكل عميل أو فئة، وخصومات الكمية والعروض الترويجية؟",
            "هل يدير مستودعات متعددة، والتشغيلات، وتواريخ الصلاحية مع الصرف حسب الأقرب انتهاءً؟",
            "هل يوجد تطبيق جوال للمناديب يسجّل الطلبات والزيارات والتحصيل؟",
            "هل يمنع تلقائياً البيع الآجل عند تجاوز حد الائتمان أو البيع بأقل من التكلفة؟",
            "هل يرتبط بالمنصات التي تبيع عليها، مثل أمازون ونون وسلة؟",
            "هل تستطيع رؤية المبيعات والربحية لكل علامة تجارية ولكل مندوب؟",
            "ما التكلفة الكاملة: التراخيص، والتطبيق، والتدريب، والدعم السنوي؟",
            "من سيدعمك بعد الإطلاق، وهل لديه فريق محلي يفهم طريقة عملك؟",
          ],
        },
        { type: "h2", text: "لماذا يختار كثير من الموزعين Odoo؟" },
        {
          type: "ul",
          items: [
            "قاعدة بيانات واحدة للمبيعات والمخزون والمشتريات والمحاسبة والموارد البشرية.",
            "تبدأ بالتطبيقات التي تحتاجها وتضيف غيرها لاحقاً.",
            "تكلفة الترخيص تُحتسب حسب عدد المستخدمين.",
            "منظومة واسعة من التطبيقات والتكاملات الجاهزة.",
          ],
        },
        {
          type: "p",
          text: "لكن Odoo، مثل أي نظام ERP، ينجح أو يفشل بحسب جودة التطبيق. النظام نفسه مرن جداً، وهذه المرونة تحتاج شريكاً يعرف كيف يهيئه على طريقة عمل شركة التوزيع، لا أن يفرض عليها إعدادات عامة.",
        },
        {
          type: "note",
          text: "نصيحة: اطلب من المزود عرضاً على بياناتك أنت، لا على بيانات تجريبية. أصناف حقيقية، وعملاء حقيقيون، وقائمة أسعار حقيقية.",
        },
        { type: "h2", text: "الخطوة التالية" },
        {
          type: "p",
          text: "اكتب إجاباتك عن هذه الأسئلة لنظامك الحالي أولاً. ستعرف بسرعة أين تخسر الوقت والمال، وما الذي يجب أن يحله النظام الجديد قبل أي شيء آخر.",
        },
      ],
    },
    en: {
      title: "Choosing an ERP for a Saudi distribution company: 10 questions before you sign",
      seoTitle: "Choosing an ERP for Saudi distributors: 10 questions",
      description:
        "Ten questions to ask any ERP vendor before signing, from Fatoora compliance to price lists, expiry dates, sales reps and total cost.",
      category: "Business",
      readMinutes: 5,
      body: [
        {
          type: "p",
          text: "An ERP is a decision you live with for years. Distribution companies have needs that generic demos don't show: customer-specific prices, expiry dates, field sales reps and credit sales. Here are ten questions we recommend asking any vendor before signing.",
        },
        { type: "h2", text: "The ten questions" },
        {
          type: "ol",
          items: [
            "Is the system compliant with e-invoicing Phase 2 (Fatoora integration), including point of sale?",
            "Are the interface, invoices and reports available in Arabic and English?",
            "Does it support price lists per customer or group, quantity discounts and promotions?",
            "Does it manage multiple warehouses, lots and expiry dates with first-expiry-first-out picking?",
            "Is there a mobile app for sales reps to record orders, visits and collections?",
            "Does it automatically block credit sales over the limit, or sales below cost?",
            "Does it connect to the platforms you sell on, such as Amazon, noon and Salla?",
            "Can you see sales and margin per brand and per sales rep?",
            "What is the total cost: licenses, implementation, training and annual support?",
            "Who supports you after go-live, and do they have a local team that understands how you work?",
          ],
        },
        { type: "h2", text: "Why many distributors choose Odoo" },
        {
          type: "ul",
          items: [
            "One database for sales, inventory, purchasing, accounting and HR.",
            "Start with the apps you need and add more later.",
            "Licensing is priced per user.",
            "A large ecosystem of ready-made apps and integrations.",
          ],
        },
        {
          type: "p",
          text: "But Odoo, like any ERP, succeeds or fails on the quality of the implementation. It's highly flexible, and that flexibility needs a partner who knows how to configure it around how a distributor works — not force generic settings onto it.",
        },
        {
          type: "note",
          text: "Tip: ask the vendor to demo on your data, not sample data. Real products, real customers, a real price list.",
        },
        { type: "h2", text: "Next step" },
        {
          type: "p",
          text: "Write down how your current system answers these questions first. You'll quickly see where you lose time and money, and what the new system must solve before anything else.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "odoo-cost-saudi-arabia",
    date: "2026-11-05",
    updated: "2026-11-23",
    related: { label: { ar: "احسب تكلفة اشتراك Odoo لشركتك", en: "Calculate your Odoo subscription cost" }, href: "/odoo-cost-calculator" },
    ar: {
      title: "كم تكلفة أودو Odoo في السعودية؟ دليل كامل لميزانية الاشتراك والتطبيق والدعم",
      seoTitle: "سعر أودو Odoo في السعودية 2026: الأسعار وما يحدد التكلفة",
      description:
        "أسعار أودو (Odoo) الرسمية في السعودية 2026: Standard من 13.50 دولاراً وCustom من 25.50 دولاراً للمستخدم شهرياً، مع أمثلة ميزانية بالريال وتكلفة التطبيق والربط مع فاتورة والدعم.",
      category: "Odoo",
      readMinutes: 10,
      body: [
        {
          type: "p",
          text: "«كم سعر أودو؟» هو أول سؤال يطرحه كل مدير يفكر في نظام ERP. والجواب الدقيق لا يكون رقماً واحداً، بل ثلاثة بنود منفصلة: اشتراك Odoo نفسه، وتكلفة التطبيق والتهيئة التي تدفعها للشريك، والدعم بعد الإطلاق. الخلط بين هذه البنود هو السبب الأكثر شيوعاً لتجاوز الميزانية، أو لاختيار عرض يبدو رخيصاً ثم تتضاعف تكلفته بعد التشغيل.",
        },
        {
          type: "p",
          text: "في هذا الدليل نشرح كل بند بالأرقام الرسمية المعلنة للسعودية، ونعطيك أمثلة ميزانية بالريال لشركات بأحجام مختلفة، ونذكر التكاليف التي لا تظهر في العروض عادة.",
        },
        { type: "h2", text: "البند الأول: اشتراك Odoo" },
        {
          type: "p",
          text: "تبيع Odoo اشتراكها بالمستخدم شهرياً، والسعر يختلف حسب الدولة. هذه الأسعار المعروضة للسعودية على صفحة الأسعار الرسمية بالدولار الأمريكي، كما راجعناها في 23 نوفمبر 2026:",
        },
        {
          type: "table",
          head: ["الباقة", "الدفع السنوي (السنة الأولى)", "الدفع السنوي (بعد التجديد)", "الدفع الشهري"],
          rows: [
            ["تطبيق واحد مجاني", "0 دولار", "0 دولار", "0 دولار"],
            ["قياسي (Standard)", "13.50 دولار ≈ 50.6 ريال", "16.90 دولار ≈ 63.4 ريال", "16.90 دولار (21.10 بعد العرض)"],
            ["مخصص (Custom)", "25.50 دولار ≈ 95.6 ريال", "32.00 دولار ≈ 120 ريال", "32.00 دولار (40.00 بعد العرض)"],
            ["مستخدم محدود (Light User)", "5.90 دولار ≈ 22.1 ريال", "بعرض سعر من Odoo", "بعرض سعر من Odoo"],
          ],
          caption: "السعر للمستخدم الواحد شهرياً، قبل ضريبة القيمة المضافة. التحويل إلى الريال بسعر 3.75. المصدر: صفحة أسعار Odoo الرسمية، 23 نوفمبر 2026. الأسعار قابلة للتغيير.",
        },
        { type: "link", text: "صفحة أسعار Odoo الرسمية (odoo.com/ar/pricing)", href: "https://www.odoo.com/ar/pricing" },
        {
          type: "ul",
          items: [
            "تطبيق واحد مجاني: تطبيق واحد فقط بعدد مستخدمين غير محدود على Odoo Online. يناسب التجربة، لا تشغيل شركة كاملة.",
            "قياسي (Standard): كل تطبيقات Odoo على السحابة (Odoo Online)، مع الاستضافة والصيانة والدعم، دون وحدات برمجية مخصصة.",
            "مخصص (Custom): يضيف الاستوديو والذكاء الاصطناعي، وتعدد الشركات في قاعدة بيانات واحدة، والواجهة البرمجية الخارجية (API)، وإمكانية الاستضافة على Odoo.sh أو على خوادمك، وتثبيت وحدات مخصصة.",
            "المستخدم المحدود: حساب بصلاحيات محدودة مثل الإجازات والنفقات والحضور وماسح الباركود في المستودع وشاشة نقاط البيع والتصنيع. تمنحه Odoo عبر مستشاري أعمالها بعرض سعر خاص.",
          ],
        },
        {
          type: "note",
          text: "انتبه لخصم السنة الأولى: سعر السنة الأولى مخفّض للمستخدمين المطلوبين عند البداية فقط، ويرتفع عند التجديد بنحو الربع. ابنِ ميزانيتك على سعر التجديد لا على سعر العرض.",
        },
        { type: "h2", text: "من يُحتسب مستخدماً مدفوعاً؟" },
        {
          type: "p",
          text: "حسب Odoo، المستخدم المدفوع هو من يدخل الواجهة الخلفية للنظام لإنشاء المستندات أو عرضها أو تعديلها، مثل موظف المبيعات والمحاسب وأمين المستودع، وحتى المحاسب الخارجي الذي يعمل على حساباتك. أما العملاء والموردون الذين يدخلون البوابة لرؤية فواتيرهم وطلباتهم، وزوار المتجر الإلكتروني، فلا يُحتسبون.",
        },
        {
          type: "p",
          text: "نقطة يغفل عنها كثيرون: سجل الموظف النشط في تطبيق الموارد البشرية دون حساب مستخدم مرتبط به يُحتسب أيضاً، كمستخدم محدود. لذلك راجع عدد سجلات الموظفين قبل التجديد، ولا تُنشئ حسابات لمن لا يحتاج الدخول فعلاً.",
        },
        { type: "h2", text: "Standard أم Custom؟ القرار الذي يغيّر التكلفة" },
        {
          type: "table",
          head: ["تحتاج إلى...", "Standard", "Custom"],
          rows: [
            ["المبيعات والمخزون والمحاسبة ونقاط البيع القياسية", "نعم", "نعم"],
            ["أكثر من شركة في قاعدة بيانات واحدة", "لا", "نعم"],
            ["تعديل الشاشات والحقول بالاستوديو", "لا", "نعم"],
            ["ربط برنامج خارجي عبر الواجهة البرمجية (API)", "لا", "نعم"],
            ["وحدات مخصصة: ربط أمازون ونون وسلة، أو تطبيق خاص للمندوبين", "لا", "نعم"],
            ["الاستضافة على Odoo.sh أو خوادمك الخاصة", "لا", "نعم"],
          ],
          caption: "مزوّدو الدفع وشركات الشحن والمزامنة البنكية المدمجة في Odoo لا تُعدّ واجهة برمجية خارجية، وتعمل على باقة Standard.",
        },
        {
          type: "p",
          text: "القاعدة العملية: الشركة الصغيرة التي تكفيها المبيعات والمخزون والمحاسبة كما هي تكفيها Standard. أما شركات التوزيع والتجارة الإلكترونية التي تبيع على المنصات، أو المجموعات متعددة الشركات، فتحتاج غالباً Custom. والانتقال من Standard إلى Custom لاحقاً ممكن، لكن الأفضل أن يُحسم القرار قبل التطبيق لأنه يؤثر على تصميم الحل.",
        },
        { type: "h2", text: "أين يُستضاف النظام، وهل للاستضافة تكلفة؟" },
        {
          type: "ul",
          items: [
            "Odoo Online: مشمولة في الباقتين دون تكلفة إضافية، وتتولى Odoo الاستضافة والنسخ الاحتياطي والتحديثات.",
            "Odoo.sh: منصة استضافة وتطوير للوحدات المخصصة، متاحة مع Custom، ولها تكلفة استضافة منفصلة عن الاشتراك.",
            "خوادمك الخاصة: متاحة مع Custom، وتتحمل أنت تكلفة الخادم وإدارته وأمنه ونسخه الاحتياطية.",
          ],
        },
        { type: "link", text: "اقرأ: Odoo Online أم Odoo.sh أم خادم خاص؟ أي استضافة تناسب شركتك", href: "/blog/odoo-online-vs-odoo-sh-vs-on-premise" },
        { type: "h2", text: "أمثلة ميزانية الاشتراك بالريال" },
        {
          type: "table",
          head: ["الشركة", "الباقة", "السنة الأولى", "سنوياً بعد التجديد"],
          rows: [
            ["5 مستخدمين", "Standard", "≈ 3,040 ريال (810 دولار)", "≈ 3,800 ريال (1,014 دولار)"],
            ["10 مستخدمين", "Custom", "≈ 11,475 ريال (3,060 دولار)", "≈ 14,400 ريال (3,840 دولار)"],
            ["25 مستخدماً", "Custom", "≈ 28,690 ريال (7,650 دولار)", "≈ 36,000 ريال (9,600 دولار)"],
          ],
          caption: "بالدفع السنوي، قبل ضريبة القيمة المضافة (15٪)، ودون المستخدمين المحدودين أو تكلفة Odoo.sh. التحويل بسعر 3.75 ريال للدولار.",
        },
        { type: "h2", text: "البند الثاني: تكلفة التطبيق والتهيئة" },
        {
          type: "p",
          text: "هذا ما تدفعه لشريك Odoo مقابل تحويل النظام من برنامج عام إلى نظام يعمل على طريقة شركتك: تحليل الإجراءات، والتهيئة، وترحيل البيانات، والتكاملات، والتدريب. تذكر Odoo نفسها أن الشركات المتوسطة والكبيرة تعمل عادة مع شريك محلي يدير المشروع. لا يوجد سعر ثابت لهذا البند لأنه يعتمد على النطاق، وأهم ما يحدده:",
        },
        {
          type: "ol",
          items: [
            "عدد التطبيقات: المبيعات والمخزون والمحاسبة أبسط بكثير من إضافة التصنيع والموارد البشرية ونقاط البيع.",
            "عدد الفروع والمستودعات والشركات، فكل مستودع وفرع يضيف إعدادات ومسارات وصلاحيات.",
            "ترحيل البيانات: نقل الأصناف والعملاء والأرصدة الافتتاحية من نظامك الحالي، وحالة هذه البيانات ونظافتها.",
            "التكاملات: كل منصة بيع أو شركة شحن أو جهاز بصمة يُربط بالنظام.",
            "التخصيص: تقارير خاصة، ونماذج فواتير وعروض أسعار مطبوعة، وسير اعتماد خاص بشركتك.",
            "الربط مع منصة فاتورة، وعدد دفاتر المبيعات ونقاط البيع التي تُصدر فواتير.",
            "التدريب: عدد الأقسام والموظفين ومدة التدريب.",
          ],
        },
        {
          type: "p",
          text: "كمرجع، هذه باقات التطبيق المنشورة لدينا بأسعار ثابتة ونطاق مكتوب، قبل ضريبة القيمة المضافة ودون اشتراك Odoo:",
        },
        {
          type: "table",
          head: ["الباقة", "تناسب", "تبدأ من", "المدة"],
          rows: [
            ["انطلاقة", "منشأة صغيرة حتى 5 مستخدمين: مبيعات وفوترة ومحاسبة وربط فاتورة", "9,900 ريال", "3–4 أسابيع"],
            ["نمو", "توزيع وجملة وتجميل وتجزئة حتى 20 مستخدماً، مع المخزون والمستودعات والمندوبين", "24,900 ريال", "6–8 أسابيع"],
            ["مؤسسات", "مجموعات متعددة الشركات والفروع، مع تكاملات وتطوير مخصص", "60,000 ريال", "حسب النطاق"],
          ],
          caption: "تكامل كل منصة بيع إضافية (سلة أو أمازون أو نون) يبدأ من 4,500 ريال.",
        },
        { type: "link", text: "تفاصيل الباقات وشروط الدفع وضمان المدة", href: "#packages" },
        { type: "h2", text: "الربط مع منصة فاتورة: ما الذي تدفع مقابله؟" },
        {
          type: "p",
          text: "التوطين السعودي في Odoo يدعم المرحلة الثانية من الفوترة الإلكترونية (الربط والتكامل) بشكل أساسي، عبر وحدات جاهزة للفواتير ونقاط البيع. لذلك لا تحتاج برنامجاً وسيطاً مدفوعاً للربط. ما تدفع مقابله فعلاً هو العمل: استكمال بيانات المنشأة والفروع كما تشترطها الهيئة، وتسجيل كل دفتر مبيعات برمز التحقق من بوابة فاتورة، والاختبار في بيئة المحاكاة قبل الإنتاج، وضبط نقاط البيع والفواتير المبسطة.",
        },
        {
          type: "note",
          text: "بعد إرسال أول فاتورة في بيئة الإنتاج لا يمكن الرجوع إلى بيئة الاختبار، لذلك يجب أن ينتهي الاختبار وتصحيح البيانات قبل التشغيل الفعلي.",
        },
        { type: "link", text: "اقرأ: ربط Odoo بمنصة فاتورة، ما الذي تحتاجه منشأتك للمرحلة الثانية؟", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "البند الثالث: الدعم بعد الإطلاق" },
        {
          type: "p",
          text: "اشتراك Odoo يشمل دعماً من Odoo نفسها للخصائص القياسية: الأعطال والأسئلة عن طريقة عمل النظام. لكنه لا يشمل تعديل إجراءاتك، أو إضافة تقرير خاص، أو صيانة الوحدات المخصصة والتكاملات، أو تدريب موظف جديد. هذا دور الشريك، ويُقدَّم عادة بباقة شهرية بعدد ساعات وزمن استجابة محددين. لدينا مثلاً باقة أساسية بـ 2,900 ريال شهرياً (8 ساعات ورد خلال يوم عمل)، وباقة متقدمة بـ 5,900 ريال شهرياً (20 ساعة ورد خلال 4 ساعات عمل).",
        },
        {
          type: "p",
          text: "شركة تعمل بلا دعم بعد الإطلاق تعود غالباً إلى ملفات Excel خلال أشهر، فيضيع الاستثمار في التطبيق كله.",
        },
        { type: "h2", text: "تكاليف لا تظهر في العروض عادة" },
        {
          type: "ul",
          items: [
            "ضريبة القيمة المضافة 15٪ على الاشتراك وعلى خدمات الشريك.",
            "ارتفاع سعر الاشتراك عند التجديد بعد انتهاء خصم السنة الأولى.",
            "المستخدمون الذين تضيفهم خلال السنة، وسجلات الموظفين دون حسابات.",
            "تنظيف البيانات قبل الترحيل إذا كانت الأصناف أو أرصدة العملاء غير دقيقة.",
            "تكلفة Odoo.sh أو الخادم الخاص إذا احتجت وحدات مخصصة.",
            "ترقية الوحدات المخصصة عند الانتقال إلى إصدار أحدث من Odoo.",
          ],
        },
        { type: "link", text: "اقرأ: ترقية Odoo، الخطوات والمدة وما تحتاج معرفته قبل البدء", href: "/blog/odoo-upgrade-guide" },
        { type: "h2", text: "كيف تقدّر ميزانيتك قبل التعاقد" },
        {
          type: "ol",
          items: [
            "عدّ المستخدمين الفعليين الذين سيدخلون النظام، لا كل موظفي الشركة، وحدد من يكفيه مستخدم محدود.",
            "حدد التطبيقات التي تحتاجها في السنة الأولى، وأجّل الباقي إلى مرحلة ثانية.",
            "اكتب قائمة بالتكاملات: منصات البيع، والشحن، والدفع، والبصمة. وجودها يحسم غالباً اختيار Custom.",
            "احسب الاشتراك على سعر التجديد، وأضف هامشاً للمستخدمين الذين ستضيفهم خلال السنة.",
            "اطلب من الشريك عرضاً يفصل البنود الثلاثة: الاشتراك، والتطبيق، والدعم، بنطاق مكتوب ومدة محددة.",
          ],
        },
        { type: "link", text: "احسب تكلفة اشتراك Odoo لشركتك بالحاسبة", href: "/odoo-cost-calculator" },
        {
          type: "note",
          text: "في وردلي تيكنولوجيز نعطيك في الاستشارة المجانية تقديراً أولياً يفصل الاشتراك والتطبيق والدعم، بناءً على عدد مستخدميك وتطبيقاتك وتكاملاتك الفعلية، قبل أي التزام.",
        },
      ],
    },
    en: {
      title: "How much does Odoo cost in Saudi Arabia? A complete guide to subscription, implementation and support budgets",
      seoTitle: "Odoo price in Saudi Arabia 2026: official plans and costs",
      description:
        "Official Odoo prices for Saudi Arabia in 2026: Standard from $13.50 and Custom from $25.50 per user per month, with SAR budget examples, implementation, ZATCA integration and support costs.",
      category: "Odoo",
      readMinutes: 9,
      body: [
        {
          type: "p",
          text: "\"How much is Odoo?\" is the first question every manager asks about an ERP, and the honest answer is not one number but three separate items: the Odoo subscription, the implementation you pay a partner for, and support after go-live. Mixing them up is the most common reason budgets overrun, or why an offer that looks cheap doubles after go-live.",
        },
        { type: "h2", text: "Item one: the Odoo subscription" },
        {
          type: "p",
          text: "Odoo sells its subscription per user per month, and the price varies by country. These are the prices shown for Saudi Arabia on Odoo's official pricing page, in US dollars, as checked on 23 November 2026:",
        },
        {
          type: "table",
          head: ["Plan", "Yearly (first year)", "Yearly (renewal)", "Monthly"],
          rows: [
            ["One App Free", "$0", "$0", "$0"],
            ["Standard", "$13.50 ≈ SAR 50.6", "$16.90 ≈ SAR 63.4", "$16.90 ($21.10 after offer)"],
            ["Custom", "$25.50 ≈ SAR 95.6", "$32.00 ≈ SAR 120", "$32.00 ($40.00 after offer)"],
            ["Light User", "$5.90 ≈ SAR 22.1", "Quoted by Odoo", "Quoted by Odoo"],
          ],
          caption: "Per user per month, before VAT. Converted at SAR 3.75 per USD. Source: Odoo's official pricing page, 23 November 2026. Prices may change.",
        },
        { type: "link", text: "Odoo's official pricing page", href: "https://www.odoo.com/pricing" },
        {
          type: "ul",
          items: [
            "One App Free: a single app with unlimited users on Odoo Online; fine for trying Odoo, not for running a company.",
            "Standard: all apps on Odoo Online, including hosting, maintenance and support, without custom modules.",
            "Custom: adds Studio and AI, multi-company, the external API, hosting on Odoo.sh or your own servers, and custom modules.",
            "Light User: limited access such as time off, expenses, attendance, the inventory barcode app, and the POS and manufacturing shop-floor screens. Odoo offers it through its business advisors on a custom quote.",
          ],
        },
        {
          type: "note",
          text: "Watch the first-year discount: it applies only to the users ordered at the start, and the price rises at renewal by roughly a quarter. Budget on the renewal price.",
        },
        { type: "h2", text: "Who counts as a paid user?" },
        {
          type: "p",
          text: "Anyone who uses Odoo's back end to create, view or edit documents, including an external accountant working on your books. Customers and suppliers using the portal, and e-commerce visitors, are free. Note that an active employee record in the HR app without a linked user account is also billed, as a Light User, so review employee records before renewal.",
        },
        { type: "h2", text: "Standard or Custom?" },
        {
          type: "table",
          head: ["You need...", "Standard", "Custom"],
          rows: [
            ["Standard sales, inventory, accounting and POS", "Yes", "Yes"],
            ["Several companies in one database", "No", "Yes"],
            ["Studio customisation", "No", "Yes"],
            ["An external program connected via the API", "No", "Yes"],
            ["Custom modules: Amazon, noon and Salla connectors, a sales-rep app", "No", "Yes"],
            ["Hosting on Odoo.sh or your own servers", "No", "Yes"],
          ],
          caption: "Payment providers, couriers and bank sync built into Odoo don't count as external API use and work on Standard.",
        },
        { type: "h2", text: "Hosting" },
        {
          type: "ul",
          items: [
            "Odoo Online: included in both plans at no extra cost.",
            "Odoo.sh: available with Custom, with its own hosting fee on top of the subscription.",
            "Your own servers: available with Custom; you pay for and manage the server, security and backups.",
          ],
        },
        { type: "link", text: "Read: Odoo Online vs Odoo.sh vs on-premise", href: "/blog/odoo-online-vs-odoo-sh-vs-on-premise" },
        { type: "h2", text: "Subscription budget examples in SAR" },
        {
          type: "table",
          head: ["Company", "Plan", "First year", "Yearly after renewal"],
          rows: [
            ["5 users", "Standard", "≈ SAR 3,040 ($810)", "≈ SAR 3,800 ($1,014)"],
            ["10 users", "Custom", "≈ SAR 11,475 ($3,060)", "≈ SAR 14,400 ($3,840)"],
            ["25 users", "Custom", "≈ SAR 28,690 ($7,650)", "≈ SAR 36,000 ($9,600)"],
          ],
          caption: "Billed yearly, before 15% VAT, excluding Light Users and Odoo.sh. SAR 3.75 per USD.",
        },
        { type: "h2", text: "Item two: implementation" },
        {
          type: "p",
          text: "This is what you pay a partner to turn Odoo into a system that works the way your company does. Odoo itself notes that mid-sized and larger companies usually work with a local partner. The main cost drivers are the number of apps, branches and warehouses, data migration and data quality, integrations, customisation, ZATCA onboarding, and training.",
        },
        {
          type: "table",
          head: ["Package", "Fits", "From", "Duration"],
          rows: [
            ["Starter", "Small business up to 5 users: sales, invoicing, accounting, Fatoora", "SAR 9,900", "3–4 weeks"],
            ["Growth", "Distribution, wholesale, beauty and retail up to 20 users", "SAR 24,900", "6–8 weeks"],
            ["Enterprise", "Multi-company groups with integrations and custom development", "SAR 60,000", "By scope"],
          ],
          caption: "Our published fixed-price packages, before VAT and excluding the Odoo subscription. Each extra sales-channel integration starts at SAR 4,500.",
        },
        { type: "link", text: "Package details, payment terms and timeline guarantee", href: "#packages" },
        { type: "h2", text: "ZATCA Fatoora integration" },
        {
          type: "p",
          text: "Odoo's Saudi localization supports Phase 2 e-invoicing natively, for invoices and point of sale, so no paid middleware is needed. What you pay for is the work: completing company and branch data, onboarding each sales journal with an OTP from the Fatoora portal, testing in simulation, and configuring POS. Once a production invoice is sent, you can't switch back to testing.",
        },
        { type: "link", text: "Read: connecting Odoo to Fatoora", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "Item three: support after go-live" },
        {
          type: "p",
          text: "The Odoo subscription includes Odoo's own support for standard features. Changing your processes, adding reports, maintaining custom modules and integrations, and training new staff is the partner's job, usually through a monthly package. Ours start at SAR 2,900 a month (8 hours, next-business-day response) and SAR 5,900 a month (20 hours, 4-business-hour response).",
        },
        { type: "h2", text: "Costs that rarely appear in quotes" },
        {
          type: "ul",
          items: [
            "15% VAT on the subscription and on partner services.",
            "The renewal price after the first-year discount ends.",
            "Users added during the year, and employee records without accounts.",
            "Data cleanup before migration.",
            "Odoo.sh or server costs if you need custom modules.",
            "Upgrading custom modules when moving to a newer Odoo version.",
          ],
        },
        { type: "h2", text: "How to estimate your budget before signing" },
        {
          type: "ol",
          items: [
            "Count the people who will actually log in, and who only needs a Light User.",
            "Pick the apps you need in year one and leave the rest for phase two.",
            "List your integrations; they usually decide whether you need Custom.",
            "Calculate the subscription at the renewal price, with room for new users.",
            "Ask for a quote that separates subscription, implementation and support, with a written scope and timeline.",
          ],
        },
        { type: "link", text: "Calculate your Odoo subscription with our calculator", href: "/odoo-cost-calculator" },
        {
          type: "note",
          text: "At Warrdly Technologies, the free consultation gives you an initial estimate that separates subscription, implementation and support, based on your actual users, apps and integrations, before any commitment.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "salla-odoo-integration",
    date: "2026-11-05",
    updated: "2026-11-24",
    related: { label: { ar: "صفحة التكاملات", en: "Integrations page" }, href: "/integrations" },
    ar: {
      title: "ربط متجر سلة مع أودو Odoo: المنتجات والطلبات والمخزون والفواتير في نظام واحد",
      seoTitle: "ربط سلة مع أودو Odoo: دليل عملي للتجار",
      description:
        "كيف يعمل ربط متجر سلة مع نظام أودو (Odoo): مزامنة المنتجات والمخزون، واستيراد الطلبات وتحديث حالتها، والمرتجعات والمدفوعات، والفوترة المتوافقة مع فاتورة، مع المقارنة بين التطبيق الجاهز والتكامل المنفّذ وخطوات التطبيق.",
      category: "التجارة الإلكترونية",
      readMinutes: 9,
      body: [
        {
          type: "p",
          text: "سلة منصة ممتازة لعرض منتجاتك واستقبال الطلبات، لكنها ليست نظاماً لإدارة المستودع والمشتريات والمحاسبة. عندما يكبر متجرك تظهر الفجوة: طلبات تُنقل يدوياً إلى البرنامج المحاسبي، ومخزون في سلة لا يطابق المستودع، وفواتير تُصدر من مكانين، وتسويات مدفوعات لا يعرف أحد مصدر فروقاتها. ربط سلة مع Odoo يغلق هذه الفجوة.",
        },
        {
          type: "p",
          text: "في هذا الدليل نشرح ما الذي يُزامَن، وكيف يعمل الربط بأمان، وكيف تُعالج المرتجعات والمدفوعات والفوترة، وما الفرق بين تطبيق جاهز من متجر تطبيقات سلة وتكامل يُنفَّذ لشركتك.",
        },
        { type: "h2", text: "ماذا يُزامَن بين سلة وOdoo؟" },
        {
          type: "table",
          head: ["البيانات", "الاتجاه", "ملاحظة"],
          rows: [
            ["التصنيفات والعلامات التجارية", "من مصدر واحد إلى الآخر", "تُدار من مكان واحد وتنعكس على الطرف الآخر"],
            ["المنتجات", "من سلة إلى Odoo عند البداية، ثم من Odoo إلى سلة", "يصبح Odoo المرجع للأصناف والأسعار"],
            ["المخزون", "من Odoo إلى سلة", "الكمية المتاحة في المستودع هي ما يراه العميل"],
            ["العملاء", "من سلة إلى Odoo", "يُنشأ مع أول طلب، فيجتمع تاريخه في ملف واحد"],
            ["الطلبات", "من سلة إلى Odoo", "تدخل كأوامر بيع، فيبدأ المستودع التجهيز مباشرة"],
            ["حالة الطلب", "من Odoo إلى سلة", "عند الشحن في Odoo تتحدث الحالة في سلة ويراها العميل"],
          ],
        },
        {
          type: "note",
          text: "القاعدة الذهبية: لكل معلومة مصدر واحد. الأسعار والمخزون تُدار من Odoo، والطلبات تبدأ من سلة. إدارة المعلومة نفسها من الطرفين هي أكثر سبب لتضارب البيانات.",
        },
        { type: "h2", text: "تطبيق جاهز من متجر سلة أم تكامل منفّذ لشركتك؟" },
        {
          type: "p",
          text: "في متجر تطبيقات سلة أكثر من تطبيق للربط مع Odoo، باشتراك شهري ومزايا محددة مسبقاً. وبعضها يشترط إصداراً معيناً من Odoo، فأحدها مثلاً يتطلب Odoo Enterprise من الإصدار 16 أو أعلى. الخيار الآخر تكامل يُنفَّذ ويُهيّأ على إجراءات شركتك ويُدعم بعد التشغيل.",
        },
        {
          type: "table",
          head: ["", "تطبيق جاهز", "تكامل منفّذ لشركتك"],
          rows: [
            ["التكلفة", "اشتراك شهري", "تكلفة تنفيذ لمرة واحدة، ثم دعم حسب الحاجة"],
            ["سرعة البدء", "سريع للحالات البسيطة", "أسابيع قليلة تشمل التهيئة والاختبار"],
            ["المرونة", "مزايا ثابتة يحددها المطور", "يُهيّأ على مستودعاتك وطرق دفعك وشحنك"],
            ["تعدد المستودعات والفروع", "حسب التطبيق", "يُصمم من البداية"],
            ["الفوترة وفاتورة", "حسب إعداداتك في Odoo", "تُهيأ ضمن نفس المشروع"],
            ["الدعم", "دعم المطور", "دعم الشريك الذي يدير نظامك كاملاً"],
          ],
        },
        {
          type: "p",
          text: "التطبيق الجاهز يناسب متجراً صغيراً بمستودع واحد وإجراءات بسيطة. أما إذا كان لديك أكثر من مستودع، أو تبيع بالجملة والتجزئة معاً، أو تبيع أيضاً على أمازون ونون، فالتكامل المنفّذ يوفر عليك ترقيعاً متواصلاً لاحقاً.",
        },
        { type: "h2", text: "كيف يعمل الربط تقنياً وبأمان" },
        {
          type: "ul",
          items: [
            "الصلاحية: يتم الربط عبر واجهات سلة الرسمية للتجار بنظام OAuth. تمنح الصلاحية من لوحة سلة دون مشاركة كلمة مرورك، وتستطيع إلغاءها في أي وقت.",
            "تجديد الصلاحية: رمز الوصول في سلة صالح 14 يوماً، ورمز التجديد صالح شهراً ويُستخدم مرة واحدة فقط. لذلك يجب أن يجدد التكامل الرموز تلقائياً وبشكل منظم، وإلا توقف الربط واحتجت إعادة تثبيته.",
            "الإشعارات الفورية: عند حدوث شيء في متجرك، كطلب جديد أو تغيّر حالته أو إلغائه أو استرداده، ترسل سلة إشعاراً (Webhook) إلى Odoo.",
            "التحقق من التوقيع: كل إشعار موقّع بخوارزمية HMAC SHA-256، ويتحقق Odoo من التوقيع قبل قبوله، فلا يستطيع أحد إرسال طلبات مزيفة إلى نظامك.",
          ],
        },
        { type: "link", text: "توثيق سلة الرسمي للصلاحيات (OAuth)", href: "https://docs.salla.dev/doc-421118" },
        { type: "h2", text: "المدفوعات والتسويات" },
        {
          type: "p",
          text: "هنا تتعثر معظم عمليات الربط. الطلب المدفوع ببطاقة أو مدى عبر سلة لا يصل مبلغه إلى حسابك فوراً، بل في تحويل مجمّع لاحقاً بعد خصم الرسوم. أما الدفع عند الاستلام فتحصّله شركة الشحن ثم تحوّله. لذلك نربط كل طريقة دفع في سلة بدفتر مستقل في Odoo، ونسجل الرسوم كمصروف، فتظهر التسوية البنكية بلا فروقات غامضة.",
        },
        { type: "h2", text: "الإلغاء والمرتجعات" },
        {
          type: "ul",
          items: [
            "الطلب المُلغى قبل الشحن: يُلغى أمر البيع في Odoo، ويعود المخزون المحجوز متاحاً.",
            "المرتجع بعد الشحن: يُستلم في المستودع بحركة إرجاع، ثم يُصدر إشعار دائن مرتبط بالفاتورة الأصلية، لا تعديل على الفاتورة نفسها.",
            "الاسترداد الجزئي: يُصدر إشعار دائن بالأصناف المستردة فقط، وتُعدّل التسوية مع بوابة الدفع.",
          ],
        },
        { type: "h2", text: "الفوترة والامتثال لفاتورة" },
        {
          type: "p",
          text: "بعد دخول الطلب إلى Odoo تصدر الفاتورة من النظام نفسه، بالرقم الضريبي ورمز QR، وتُرسل إلى منصة فاتورة. طلبات المتجر للأفراد فواتير مبسطة تُبلَّغ بها المنصة خلال 24 ساعة، وطلبات المنشآت فواتير قياسية تُعتمد قبل مشاركتها. بذلك تصبح كل مبيعات متجرك في السجلات نفسها التي تضم مبيعات الفروع والجملة، ويُستخرج إقرار ضريبة القيمة المضافة من مكان واحد.",
        },
        { type: "link", text: "اقرأ: ربط أودو Odoo بمنصة فاتورة، دليل المرحلة الثانية والموجة 25", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "خطوات التطبيق" },
        {
          type: "ol",
          items: [
            "مراجعة المتجر: عدد المنتجات، والخيارات (المقاسات والألوان)، وطرق الدفع والشحن المستخدمة.",
            "توحيد رموز الأصناف (SKU) بين سلة وOdoo، وهي الخطوة الأهم.",
            "تحديد مصدر كل معلومة: الأسعار والمخزون من Odoo، والطلبات من سلة.",
            "ربط طرق الدفع والشحن بدفاتر Odoo ومستودعاته.",
            "تثبيت الربط ومنح الصلاحية من لوحة سلة.",
            "الاستيراد الأولي للتصنيفات والمنتجات والعملاء.",
            "تجربة دورة كاملة: طلب تجريبي، ثم تجهيز وشحن وفاتورة، ثم إلغاء ومرتجع، ومراجعة الحالة في سلة.",
            "التشغيل الفعلي ومراجعة سجل المزامنة يومياً في الأسبوعين الأولين.",
          ],
        },
        { type: "h2", text: "أخطاء شائعة تجنّبها" },
        {
          type: "ul",
          items: [
            "منتجات بلا رموز أصناف، أو برموز مكررة، فتفشل المطابقة.",
            "إدارة الأسعار والمخزون من سلة وOdoo معاً.",
            "تجاهل المنتجات ذات الخيارات، فكل خيار صنف مستقل في المخزون.",
            "تسجيل كل المدفوعات في دفتر واحد، فتضيع التسويات ورسوم البوابات.",
            "تعديل الفاتورة عند المرتجع بدلاً من إشعار دائن.",
            "عدم مراقبة سجل المزامنة، فيتوقف الربط بصمت عند انتهاء صلاحية لم تُجدَّد.",
          ],
        },
        { type: "h2", text: "كم يكلف الربط؟" },
        {
          type: "p",
          text: "تكامل منصة بيع إضافية، كسلة، يبدأ لدينا من 4,500 ريال قبل ضريبة القيمة المضافة، إضافة إلى اشتراك Odoo. والتكامل بوحدات مخصصة يحتاج عادة باقة Custom من Odoo، وفصّلنا ذلك في دليل التكلفة.",
        },
        { type: "link", text: "اقرأ: كم تكلفة أودو Odoo في السعودية؟", href: "/blog/odoo-cost-saudi-arabia" },
        {
          type: "note",
          text: "تكامل سلة الذي نقدمه يعمل عبر واجهات سلة الرسمية، ويُنفّذ على حساب متجرك أنت وبصلاحيات تستطيع إلغاءها في أي وقت من لوحة سلة.",
        },
      ],
    },
    en: {
      title: "Connecting your Salla store to Odoo: products, orders, stock and invoices in one system",
      seoTitle: "Salla and Odoo integration: a practical guide",
      description:
        "How a Salla store connects to Odoo: product and stock sync, order import and status, cancellations, refunds and payments, ZATCA-compliant invoicing, ready-made apps vs an implemented integration, and setup steps.",
      category: "E-commerce",
      readMinutes: 8,
      body: [
        {
          type: "p",
          text: "Salla is an excellent platform for showcasing products and taking orders, but it isn't a system for running your warehouse, purchasing and accounting. As your store grows the gap shows: orders retyped into accounting, Salla stock that doesn't match the warehouse, invoices from two places, and payment settlements nobody can reconcile. Connecting Salla to Odoo closes that gap.",
        },
        { type: "h2", text: "What syncs between Salla and Odoo?" },
        {
          type: "table",
          head: ["Data", "Direction", "Note"],
          rows: [
            ["Categories and brands", "One source to the other", "Managed in one place"],
            ["Products", "Salla to Odoo at the start, then Odoo to Salla", "Odoo becomes the master for items and prices"],
            ["Stock", "Odoo to Salla", "Customers see warehouse availability"],
            ["Customers", "Salla to Odoo", "Created with the first order"],
            ["Orders", "Salla to Odoo", "Arrive as sales orders, ready to pick"],
            ["Order status", "Odoo to Salla", "Shipping in Odoo updates Salla for the customer"],
          ],
        },
        {
          type: "note",
          text: "Golden rule: one source per piece of data. Prices and stock live in Odoo; orders start in Salla.",
        },
        { type: "h2", text: "A ready-made Salla app or an implemented integration?" },
        {
          type: "p",
          text: "Salla's app store has several Odoo connector apps on monthly subscriptions with fixed features; some require a specific Odoo version, for example Odoo Enterprise 16 or later. The alternative is an integration configured around your processes and supported after go-live. Ready-made apps suit a small store with one warehouse; with several warehouses, wholesale plus retail, or sales on Amazon and noon too, an implemented integration avoids constant patching later.",
        },
        { type: "h2", text: "How it works, securely" },
        {
          type: "ul",
          items: [
            "Access uses Salla's official merchant APIs with OAuth: you grant it from the Salla dashboard without sharing your password, and can revoke it anytime.",
            "Salla access tokens last 14 days; refresh tokens last a month and are single-use, so the integration must refresh tokens automatically and safely or the connection stops and needs reinstalling.",
            "Salla sends webhooks to Odoo when orders are created, change status, are cancelled or refunded.",
            "Each webhook is signed with HMAC SHA-256, and Odoo verifies the signature before accepting it.",
          ],
        },
        { type: "link", text: "Salla's official OAuth documentation", href: "https://docs.salla.dev/doc-421118" },
        { type: "h2", text: "Payments and settlements" },
        {
          type: "p",
          text: "Card and mada payments through Salla arrive later in a batched payout net of fees, and cash on delivery comes via the courier. Mapping each Salla payment method to its own Odoo journal, with fees booked as expenses, keeps bank reconciliation clean.",
        },
        { type: "h2", text: "Cancellations and returns" },
        {
          type: "ul",
          items: [
            "Cancelled before shipping: the sales order is cancelled and reserved stock is released.",
            "Returned after shipping: received back into the warehouse, then a credit note linked to the original invoice.",
            "Partial refund: a credit note for the refunded items only.",
          ],
        },
        { type: "h2", text: "Invoicing and Fatoora compliance" },
        {
          type: "p",
          text: "Invoices are issued from Odoo with the VAT number and QR code and sent to Fatoora: simplified invoices for consumers are reported within 24 hours, standard invoices for businesses are cleared before sharing. All store sales sit in the same books as branch and wholesale sales.",
        },
        { type: "link", text: "Read: connecting Odoo to Fatoora", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "Implementation steps" },
        {
          type: "ol",
          items: [
            "Review the store: products, variants, payment and shipping methods.",
            "Align SKUs between Salla and Odoo; this matters most.",
            "Decide the source of each piece of data.",
            "Map payment and shipping methods to Odoo journals and warehouses.",
            "Install the connection and grant access from Salla.",
            "Import categories, products and customers.",
            "Test a full cycle including a cancellation and a return.",
            "Go live and review the sync log daily for the first two weeks.",
          ],
        },
        { type: "h2", text: "Common mistakes" },
        {
          type: "ul",
          items: [
            "Products without SKUs, or duplicate SKUs.",
            "Managing prices and stock in both systems.",
            "Ignoring variants; each variant is its own stock item.",
            "Booking all payments to one journal.",
            "Editing invoices for returns instead of issuing credit notes.",
            "Not monitoring the sync log, so an expired token stops the sync silently.",
          ],
        },
        { type: "h2", text: "What does it cost?" },
        {
          type: "p",
          text: "Each additional sales-channel integration such as Salla starts at SAR 4,500 before VAT, plus the Odoo subscription. Custom-module integrations usually need Odoo's Custom plan; see our cost guide.",
        },
        { type: "link", text: "Read: how much does Odoo cost in Saudi Arabia?", href: "/blog/odoo-cost-saudi-arabia" },
        {
          type: "note",
          text: "Our Salla integration uses Salla's official APIs, runs on your own store account, and uses permissions you can revoke anytime from the Salla dashboard.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "change-odoo-partner",
    date: "2026-11-07",
    updated: "2026-11-24",
    related: { label: { ar: "دعم أنظمة Odoo القائمة", en: "Support for existing Odoo systems" }, href: "/odoo-support" },
    ar: {
      title: "كيف تغيّر شريك Odoo دون أن تخسر بياناتك أو تتوقف أعمالك",
      seoTitle: "تغيير شريك أودو Odoo: الخطوات وقائمة الاستلام",
      description:
        "دليل عملي لتغيير شريك أودو (Odoo): ما تقوله اتفاقية Odoo الرسمية، وقائمة الاستلام من الشريك الحالي، وخطوات الانتقال وجدولها الزمني حسب نوع الاستضافة، وكيف تختار الشريك الجديد، وأسئلة شائعة.",
      category: "إدارة النظام",
      readMinutes: 11,
      body: [
        {
          type: "p",
          text: "تطبيق Odoo علاقة طويلة مع الشريك الذي نفّذه. وأحياناً لا تسير هذه العلاقة كما يجب: طلبات إصلاح مفتوحة منذ أسابيع، أو تطوير متوقف، أو تواصل انقطع. في هذه الحالة يتردد كثير من الشركات في تغيير الشريك خوفاً على بياناتهم وتعديلاتهم. والخبر الجيد أن التغيير ممكن ومنظّم، إذا تم بالترتيب الصحيح.",
        },
        { type: "h2", text: "هل يحق لك تغيير شريك Odoo؟" },
        {
          type: "p",
          text: "نعم. تعرّف اتفاقية اشتراك Odoo Enterprise الشريك بأنه طرف ثالث يختاره العميل، وتنص على أن للعميل أن يغيّر شريكه أو يتعامل مع Odoo مباشرة، بشرط إشعار مسبق. ويحدد البند 6.1 هذا الإشعار: إشعار مكتوب إلى Odoo قبل 30 يوماً من تغيير جهة التواصل الرئيسية إلى شريك آخر.",
        },
        {
          type: "p",
          text: "بمعنى آخر: اشتراك Odoo عقد بين شركتك وOdoo مباشرة، والشريك مقدّم خدمة لك. لكن عقدك مع الشريك نفسه، إن وُجد، عقد منفصل له شروطه، ويجب مراجعته قبل أي خطوة.",
        },
        {
          type: "p",
          text: "وتوضح الاتفاقية في البند 4.6 دور الشريك: إن اخترت العمل مع شريك، يصبح هو جهة التواصل الرئيسية لك في الإصلاحات والدعم والترقيات، ويتولى خدمات الوحدات المخصصة، ويمكنه الرجوع إلى Odoo نيابة عنك في الخصائص القياسية. أما إن قررت التعامل مع Odoo مباشرة، فخدمات الوحدات المخصصة لا تُقدَّم إلا إذا كان نظامك مستضافاً على Odoo Online.",
        },
        { type: "link", text: "اتفاقية اشتراك Odoo Enterprise (الإصدار 13، 24 سبتمبر 2026)", href: "https://www.odoo.com/documentation/19.0/legal/terms/enterprise.html" },
        { type: "h2", text: "متى يكون التغيير هو القرار الصحيح؟" },
        {
          type: "ul",
          items: [
            "مشكلات تؤثر على العمل اليومي بقيت دون حل لفترة طويلة رغم المتابعة.",
            "لا توجد قناة دعم واضحة، أو لا يوجد زمن استجابة متفق عليه.",
            "تطوير أو إضافات متفق عليها لم تُسلَّم، دون جدول زمني مقنع.",
            "الشريك لا يملك خبرة في قطاعك أو في متطلبات الفوترة الإلكترونية السعودية.",
            "تحتاج ترقية الإصدار، والشريك الحالي لا يستطيع تنفيذها أو يؤجلها باستمرار.",
          ],
        },
        {
          type: "note",
          text: "قبل التغيير، جرّب محادثة صريحة مع الشريك الحالي بقائمة مكتوبة بالمشكلات ومواعيد متوقعة. كثير من العلاقات تتحسن بعد هذه المحادثة، وإن لم تتحسن فستكون قد وثّقت الأسباب.",
        },
        { type: "h2", text: "قبل أي إشعار: ما يجب أن تستلمه" },
        {
          type: "p",
          text: "هذه أهم مرحلة في الانتقال كله. استلم هذه العناصر وتحقق منها وأنت ما زلت على علاقة جيدة بالشريك الحالي، وليس بعد إرسال الإشعار.",
        },
        {
          type: "table",
          head: ["العنصر", "لماذا يهم", "كيف تتحقق"],
          rows: [
            ["نسخة احتياطية كاملة لقاعدة البيانات مع الملفات المرفقة", "هي بياناتك كلها: العملاء والفواتير والمخزون والمستندات", "استعدها على بيئة تجريبية وافتحها، ولا تكتفِ بوجود الملف"],
            ["الشيفرة المصدرية لكل الوحدات المخصصة", "بدونها لا يستطيع أي شريك جديد صيانة التعديلات أو ترقيتها", "مستودع يملكه حساب شركتك، وليس حساب الشريك"],
            ["صلاحيات المدير", "لإدارة المستخدمين والإعدادات بنفسك", "سجّل الدخول بحساب مدير باسم شركتك"],
            ["الوصول إلى الاستضافة", "Odoo.sh أو الخادم الخاص هو مكان تشغيل نظامك", "مالك المشروع أو الخادم حساب تابع لشركتك"],
            ["مفاتيح التكاملات", "منصات البيع والدفع والشحن والبريد ومنصة فاتورة", "قائمة بكل تكامل وأين تُدار مفاتيحه"],
            ["الإضافات المدفوعة", "إضافات متجر Odoo مرتبطة بالحساب الذي اشتراها", "اعرف الحساب، واطلب نقلها أو إعادة شرائها"],
            ["التوثيق والطلبات المفتوحة", "لكي لا يبدأ الشريك الجديد من الصفر", "قائمة التخصيصات وسبب كل منها، والمهام غير المكتملة"],
          ],
          caption: "قائمة الاستلام قبل تغيير شريك Odoo",
        },
        { type: "h2", text: "راجع عقدك مع الشريك الحالي" },
        {
          type: "ul",
          items: [
            "مدة الإشعار المطلوبة لإنهاء عقد الخدمة أو الدعم.",
            "الفواتير المستحقة أو الساعات المدفوعة مقدماً وغير المستخدمة.",
            "ملكية الشيفرة المخصصة: هل نص العقد على انتقالها إليك بعد السداد؟",
            "الأعمال الجارية: ما الذي سيُسلَّم قبل الانتقال وما الذي سيتوقف.",
          ],
        },
        {
          type: "p",
          text: "إن كان العقد غامضاً في ملكية الشيفرة، فاتفق على ذلك كتابياً مع الشريك قبل الانتقال. وللمسائل التعاقدية المعقدة، استشر مستشاراً قانونياً.",
        },
        { type: "h2", text: "خطوات الانتقال بالترتيب" },
        {
          type: "ol",
          items: [
            "اجمع العناصر في الجدول أعلاه، واستعد النسخة الاحتياطية على بيئة تجريبية للتأكد من سلامتها.",
            "امنح الشريك الجديد صلاحية مؤقتة محدودة، بعد توقيع اتفاقية سرية، ليراجع النظام ويقدّر حالته.",
            "اتفق مع الشريك الحالي على خطة تسليم ومدة انتقال واضحة.",
            "أرسل إشعاراً مكتوباً إلى Odoo بتغيير الشريك، عبر مدير حسابك في Odoo، قبل 30 يوماً على الأقل.",
            "بعد اكتمال التسليم، غيّر كلمات مرور حسابات المدير، وألغِ صلاحيات الشريك السابق على النظام والاستضافة والمستودع.",
            "جدّد مفاتيح التكاملات الحساسة، مثل الدفع والبريد، إن كان الشريك السابق يملك نسخة منها.",
            "راجع الطلبات المفتوحة مع الشريك الجديد، ورتّبها حسب أثرها على العمل.",
            "خصص الشهر الأول للاستقرار والإصلاحات، قبل البدء في تطوير جديد أو ترقية.",
          ],
        },
        { type: "h2", text: "جدول زمني نموذجي للانتقال" },
        {
          type: "table",
          head: ["المرحلة", "المدة التقريبية", "ما يحدث"],
          rows: [
            ["الاستلام والتحقق", "أسبوع إلى أسبوعين", "جمع عناصر قائمة الاستلام واستعادة النسخة الاحتياطية على بيئة تجريبية"],
            ["مراجعة الشريك الجديد", "أسبوع", "فحص النظام بصلاحية مؤقتة وتقرير بحالته وأولويات الإصلاح"],
            ["الإشعار والتسليم", "30 يوماً على الأقل", "إشعار Odoo كتابياً، واستكمال التسليم مع الشريك الحالي"],
            ["الاستقرار", "الشهر الأول بعد الانتقال", "إغلاق الصلاحيات القديمة، وحل المشكلات العاجلة قبل أي تطوير جديد"],
          ],
          caption: "المدد تقريبية وتختلف حسب حجم النظام وتعاون الشريك الحالي. يمكن أن تتداخل مرحلة المراجعة مع فترة الإشعار.",
        },
        { type: "h2", text: "ما يختلف حسب نوع الاستضافة" },
        {
          type: "table",
          head: ["الاستضافة", "النسخة الاحتياطية", "الشيفرة المخصصة", "انتبه إلى"],
          rows: [
            ["Odoo Online", "من صفحة إدارة قواعد البيانات في حسابك على odoo.com", "لا توجد وحدات برمجية مخصصة، فالتخصيص عبر الإعدادات وStudio", "أن يكون الحساب المالك للاشتراك باسم شركتك"],
            ["Odoo.sh", "من تبويب النسخ الاحتياطية في المشروع", "في مستودع GitHub مرتبط بالمشروع", "أن يكون مالك المستودع ومالك المشروع حسابين تابعين لشركتك"],
            ["خادم خاص", "نسخة من قاعدة البيانات ومجلد الملفات المرفقة", "على الخادم أو في مستودع منفصل", "صلاحيات الخادم، والنطاق، وشهادات الأمان، وجدولة النسخ الاحتياطي"],
          ],
        },
        { type: "h2", text: "أخطاء تكلّف الشركات بياناتها" },
        {
          type: "ul",
          items: [
            "إلغاء صلاحيات الشريك السابق قبل استلام النسخة الاحتياطية والشيفرة.",
            "قبول الشيفرة في مستودع يملكه الشريك، بدل نقل الملكية إلى شركتك.",
            "الاكتفاء بوجود ملف النسخة الاحتياطية دون تجربة استعادته.",
            "تنفيذ الانتقال في فترة إقفال الشهر أو قرب موعد موجة الفوترة الإلكترونية.",
            "الجمع بين تغيير الشريك وترقية الإصدار في الوقت نفسه، فإذا ظهرت مشكلة صعب تحديد سببها.",
          ],
        },
        { type: "h2", text: "كيف تختار الشريك الجديد؟" },
        {
          type: "p",
          text: "لا تكرر التجربة نفسها. قبل التعاقد، اطلب إجابات مكتوبة عن هذه الأسئلة:",
        },
        {
          type: "ul",
          items: [
            "هل لديكم خبرة موثقة في قطاعنا وفي متطلبات الفوترة الإلكترونية السعودية؟",
            "ما قناة الدعم، وما زمن الاستجابة المتفق عليه كتابياً؟",
            "من يملك الشيفرة المخصصة التي ستطورونها، وأين تُحفظ؟",
            "كيف تبدأون مع نظام نفّذه غيركم: مراجعة أولاً، أم تعديلات مباشرة؟",
            "ما خطتكم للإصدارات القادمة وترقية الوحدات المخصصة؟",
            "هل توقعون اتفاقية سرية قبل الاطلاع على بياناتنا؟",
          ],
        },
        { type: "h2", text: "ماذا يفحص الشريك الجديد في المراجعة؟" },
        {
          type: "p",
          text: "المراجعة الجيدة تنتهي بتقرير مكتوب لا بانطباع شفهي. هذه البنود التي نفحصها في أي نظام نستلمه:",
        },
        {
          type: "ul",
          items: [
            "إصدار Odoo وهل ما زال مدعوماً، وخطة الترقية إن لزم.",
            "الوحدات المخصصة: هل شيفرتها كاملة في مستودع، وهل تعمل مع الإصدار الحالي، وأيها يمكن استبداله بخصائص قياسية.",
            "حالة الربط مع منصة فاتورة: الدفاتر المسجلة، والفواتير المرفوضة أو العالقة.",
            "التكاملات: سجلات المزامنة مع منصات البيع والشحن والدفع، والأخطاء المتكررة.",
            "المحاسبة والمخزون: الفروقات بين الأرصدة، والحركات العالقة، وإعدادات التقييم.",
            "المستخدمون والصلاحيات: حسابات غير مستخدمة، وصلاحيات أوسع من اللازم.",
            "النسخ الاحتياطي: هل يعمل، وهل جُربت الاستعادة.",
          ],
        },
        { type: "link", text: "اقرأ: مشكلات أودو Odoo الشائعة بعد التطبيق وحلولها", href: "/blog/common-odoo-problems" },
        { type: "h2", text: "أسئلة شائعة" },
        { type: "h3", text: "هل يتغير سعر اشتراك Odoo عند تغيير الشريك؟" },
        {
          type: "p",
          text: "لا. الاشتراك عقد بينك وبين Odoo، وسعره يعتمد على عدد المستخدمين والباقة، لا على الشريك. ما يتغير هو عقد الخدمة مع الشريك الجديد.",
        },
        { type: "h3", text: "هل يمكنني التعامل مع Odoo مباشرة دون شريك؟" },
        {
          type: "p",
          text: "نعم، بإشعار مسبق. لكن إن كان لديك وحدات مخصصة مستضافة على Odoo.sh أو خادم خاص، فلن تشملها خدمات Odoo المباشرة حسب البند 4.6، وستحتاج من يصونها.",
        },
        { type: "h3", text: "هل يتوقف النظام أثناء الانتقال؟" },
        {
          type: "p",
          text: "لا يُفترض ذلك. تغيير الشريك تغيير في من يخدم النظام، لا في النظام نفسه. التوقف يحدث فقط إذا تزامن الانتقال مع نقل الاستضافة أو الترقية، ولهذا ننصح بفصلها.",
        },
        { type: "h3", text: "ماذا لو رفض الشريك الحالي تسليم الشيفرة؟" },
        {
          type: "p",
          text: "ارجع إلى عقدك معه في ملكية الشيفرة. وإن كان نظامك على Odoo.sh أو خادم تملكه شركتك، فالشيفرة المنشورة موجودة فيه أصلاً. وللخلافات التعاقدية، استشر مستشاراً قانونياً.",
        },
        { type: "link", text: "اقرأ: ترقية أودو Odoo، الخطوات والمخاطر", href: "/blog/odoo-upgrade-guide" },
        {
          type: "note",
          text: "نساعد الشركات التي تستخدم Odoo في مراجعة أنظمتها وحل مشكلاتها، وفي تنظيم الانتقال عندما تقرر تغيير الشريك. نبدأ بجلسة مراجعة مجانية، ونتعامل مع الشريك السابق باحترام، فهدفنا استقرار نظامك.",
        },
      ],
    },
    en: {
      title: "How to change your Odoo partner without losing data or disrupting operations",
      seoTitle: "Changing your Odoo partner: steps and handover checklist",
      description:
        "A practical guide to changing your Odoo partner: what Odoo's official agreement says, what to receive from your current partner, the switch steps by hosting type, and the mistakes that cost companies their data.",
      category: "System management",
      readMinutes: 10,
      body: [
        {
          type: "p",
          text: "An Odoo implementation is a long relationship with the partner who delivered it. Sometimes that relationship doesn't work: fix requests open for weeks, stalled development or lost contact. Many companies hesitate to change partner for fear of losing their data and customisations. The good news is that switching is possible and orderly, if it is done in the right order.",
        },
        { type: "h2", text: "Are you allowed to change your Odoo partner?" },
        {
          type: "p",
          text: "Yes. The Odoo Enterprise Subscription Agreement defines a partner as a third party chosen by the customer, and states that the customer may switch partners or work with Odoo directly, subject to prior notice. Clause 6.1 sets that notice: written notice to Odoo 30 days before changing the main point of contact to another Odoo partner.",
        },
        {
          type: "p",
          text: "In other words, your Odoo subscription is a contract between your company and Odoo, and the partner is your service provider. Your contract with the partner, if any, is separate and has its own terms, so review it before taking any step.",
        },
        {
          type: "p",
          text: "Clause 4.6 explains the partner's role: if you work with a partner, it becomes your main point of contact for bug fixes, support and upgrades, handles services for your custom modules, and may contact Odoo on your behalf about standard features. If you work with Odoo directly, services for custom modules are only provided when you are hosted on Odoo Online.",
        },
        { type: "link", text: "Odoo Enterprise Subscription Agreement (version 13, 24 September 2026)", href: "https://www.odoo.com/documentation/19.0/legal/terms/enterprise.html" },
        { type: "h2", text: "When is switching the right call?" },
        {
          type: "ul",
          items: [
            "Issues affecting daily operations have stayed unresolved for a long time despite follow-up.",
            "There is no clear support channel or agreed response time.",
            "Agreed development or add-ons were not delivered, with no credible timeline.",
            "The partner lacks experience in your sector or in Saudi e-invoicing requirements.",
            "You need a version upgrade that the current partner cannot deliver or keeps postponing.",
          ],
        },
        {
          type: "note",
          text: "Before switching, have a frank conversation with your current partner, with a written list of issues and expected dates. Many relationships improve after that conversation; if not, you will have documented the reasons.",
        },
        { type: "h2", text: "Before any notice: what you must receive" },
        {
          type: "p",
          text: "This is the most important stage of the whole switch. Receive and verify these items while you are still on good terms with the current partner, not after sending notice.",
        },
        {
          type: "table",
          head: ["Item", "Why it matters", "How to verify"],
          rows: [
            ["A full database backup including attachments", "It is all your data: customers, invoices, stock and documents", "Restore it on a test environment and open it; a file alone proves nothing"],
            ["Source code for every custom module", "Without it no new partner can maintain or upgrade your customisations", "A repository owned by your company's account, not the partner's"],
            ["Administrator access", "To manage users and settings yourself", "Log in with an admin account in your company's name"],
            ["Hosting access", "Odoo.sh or your own server is where your system runs", "The project or server owner is an account your company controls"],
            ["Integration keys", "Marketplaces, payments, couriers, email and the Fatoora platform", "A list of every integration and where its keys are managed"],
            ["Paid add-ons", "Odoo Apps purchases are tied to the account that bought them", "Know the account; ask for a transfer or repurchase"],
            ["Documentation and open requests", "So the new partner doesn't start from zero", "A list of customisations and why each exists, plus unfinished tasks"],
          ],
          caption: "Handover checklist before changing your Odoo partner",
        },
        { type: "h2", text: "Review your contract with the current partner" },
        {
          type: "ul",
          items: [
            "The notice period required to end the service or support contract.",
            "Outstanding invoices, or prepaid hours not yet used.",
            "Ownership of custom code: does the contract transfer it to you once paid?",
            "Work in progress: what will be delivered before the switch and what will stop.",
          ],
        },
        {
          type: "p",
          text: "If the contract is unclear about code ownership, agree on it in writing with the partner before switching. For complex contractual questions, consult a legal adviser.",
        },
        { type: "h2", text: "The switch, step by step" },
        {
          type: "ol",
          items: [
            "Collect the items in the table above, and restore the backup on a test environment to confirm it is sound.",
            "Give the new partner limited, temporary access, after signing an NDA, to review the system and assess its state.",
            "Agree a handover plan and a clear transition period with the current partner.",
            "Send written notice of the partner change to Odoo, through your Odoo account manager, at least 30 days ahead.",
            "Once the handover is complete, change admin passwords and remove the previous partner's access to the system, hosting and repository.",
            "Rotate sensitive integration keys, such as payments and email, if the previous partner holds a copy.",
            "Review open requests with the new partner and rank them by business impact.",
            "Reserve the first month for stabilisation and fixes before new development or an upgrade.",
          ],
        },
        { type: "h2", text: "A typical timeline" },
        {
          type: "table",
          head: ["Stage", "Approx. duration", "What happens"],
          rows: [
            ["Handover and checks", "1–2 weeks", "Collect the handover items and restore the backup in a test environment"],
            ["New partner review", "1 week", "System audit with temporary access and a written report"],
            ["Notice and handover", "At least 30 days", "Written notice to Odoo and completing handover"],
            ["Stabilisation", "First month after the switch", "Revoke old access and fix urgent issues before new development"],
          ],
          caption: "Durations vary with system size and the current partner's cooperation; the review can overlap the notice period.",
        },
        { type: "h2", text: "What differs by hosting type" },
        {
          type: "table",
          head: ["Hosting", "Backup", "Custom code", "Watch out for"],
          rows: [
            ["Odoo Online", "From the database management page of your odoo.com account", "No custom code modules; customisation is through settings and Studio", "The account that owns the subscription is in your company's name"],
            ["Odoo.sh", "From the project's Backups tab", "In the GitHub repository linked to the project", "Both the repository owner and the project owner are your company's accounts"],
            ["Own server", "A database dump plus the filestore folder", "On the server or in a separate repository", "Server access, domain, SSL certificates and backup scheduling"],
          ],
        },
        { type: "h2", text: "Mistakes that cost companies their data" },
        {
          type: "ul",
          items: [
            "Removing the previous partner's access before receiving the backup and code.",
            "Accepting code in a repository the partner owns instead of transferring ownership to your company.",
            "Relying on a backup file without testing a restore.",
            "Switching during month-end close or near your e-invoicing wave deadline.",
            "Changing partner and upgrading the version at the same time, so any problem is hard to trace.",
          ],
        },
        { type: "h2", text: "How to choose the new partner" },
        {
          type: "ul",
          items: [
            "Documented experience in your sector and in Saudi e-invoicing.",
            "A clear support channel with a written response time.",
            "Who owns the custom code they write, and where it is stored.",
            "Whether they start with a review before changing anything.",
            "Their plan for future versions and upgrading custom modules.",
            "Willingness to sign an NDA before seeing your data.",
          ],
        },
        { type: "h2", text: "What the new partner should audit" },
        {
          type: "ul",
          items: [
            "Odoo version, support status and upgrade path.",
            "Custom modules: complete code in a repository, compatibility, and which can be replaced by standard features.",
            "Fatoora status: onboarded journals and rejected or stuck invoices.",
            "Integration sync logs and recurring errors.",
            "Accounting and stock discrepancies and stuck moves.",
            "Users and access rights.",
            "Backups, including a tested restore.",
          ],
        },
        { type: "h2", text: "FAQ" },
        { type: "h3", text: "Does the Odoo subscription price change?" },
        { type: "p", text: "No. The subscription is between you and Odoo and is priced by users and plan, not by partner." },
        { type: "h3", text: "Can I work with Odoo directly?" },
        { type: "p", text: "Yes, with prior notice. But custom modules hosted on Odoo.sh or your own server are not covered by Odoo's direct services under clause 4.6, so someone still needs to maintain them." },
        { type: "h3", text: "Will the system stop during the switch?" },
        { type: "p", text: "It shouldn't. Changing partner changes who serves the system, not the system itself. Keep hosting moves and upgrades separate." },
        { type: "link", text: "Read: common Odoo problems after implementation", href: "/blog/common-odoo-problems" },
        {
          type: "note",
          text: "We help companies already running Odoo review their systems and fix their issues, and organise the switch when they decide to change partner. We start with a free review session and treat the previous partner with respect; our goal is a stable system.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "common-odoo-problems",
    date: "2026-11-07",
    updated: "2026-11-24",
    related: { label: { ar: "دعم أنظمة Odoo القائمة", en: "Support for existing Odoo systems" }, href: "/odoo-support" },
    ar: {
      title: "أشهر 10 مشكلات في أودو Odoo بعد التطبيق وكيف تُحل",
      seoTitle: "مشاكل أودو Odoo الشائعة بعد التطبيق وحلولها",
      description:
        "المخزون لا يطابق، والتكلفة غير دقيقة، والفواتير ترفضها منصة فاتورة، والنظام بطيء، والفريق عاد إلى Excel. أسباب أشهر 10 مشكلات في أودو (Odoo) بعد التطبيق، وطريقة حل كل منها، وبأيها تبدأ.",
      category: "إدارة النظام",
      readMinutes: 11,
      body: [
        {
          type: "p",
          text: "أغلب مشكلات Odoo التي نراها عند الشركات بعد التطبيق ليست عيوباً في النظام نفسه. هي في الغالب إعداد لم يكتمل، أو إجراء لا يتبعه الفريق، أو تخصيص بُني على عجل. والخبر الجيد أن معظمها يُحل دون إعادة التطبيق من الصفر. هذا ملخص لأشهرها، ثم تفصيل لكل منها.",
        },
        {
          type: "table",
          head: ["المشكلة", "السبب الأكثر شيوعاً", "اتجاه الحل"],
          rows: [
            ["المخزون في النظام لا يطابق المستودع", "عمليات تُنفّذ خارج النظام أو تحويلات غير مؤكدة", "جرد شامل، ثم ضبط الإجراءات والصلاحيات"],
            ["تكلفة المنتج والربحية غير دقيقة", "طريقة تقييم غير مناسبة أو تكاليف شحن وجمارك غير محمّلة", "مراجعة طريقة التقييم وتفعيل التكاليف المحمّلة"],
            ["فواتير ترفضها منصة فاتورة", "بيانات عملاء ناقصة أو إعداد ضريبي غير مكتمل", "تنظيف بيانات العملاء ومراجعة إعداد الضرائب"],
            ["النظام بطيء", "تخصيصات ثقيلة أو بيانات متراكمة أو موارد خادم غير كافية", "قياس مصدر البطء قبل أي تعديل"],
            ["الفريق عاد إلى Excel", "تقارير لا تجيب عن أسئلة الإدارة أو تدريب غير كافٍ", "بناء التقارير المطلوبة وإعادة التدريب"],
            ["التكاملات تتوقف", "مفاتيح منتهية أو أخطاء لا يراقبها أحد", "مراقبة التكاملات وتنبيهات عند الفشل"],
            ["بيانات مكررة", "إدخال يدوي متكرر واستيراد دون تدقيق", "دمج المكرر وضوابط عند الإدخال"],
            ["الترقية مؤجلة", "وحدات مخصصة يخشى الجميع أن تتعطل", "ترقية على نسخة تجريبية أولاً"],
            ["أخطاء صلاحيات أو موظفون يرون ما لا يخصهم", "مجموعات صلاحيات أُعطيت على عجل عند التطبيق", "مراجعة المستخدمين والمجموعات حسب الأدوار"],
            ["أرقام شهر مُقفل تتغير", "لا توجد تواريخ إقفال للفترات المحاسبية", "تفعيل تواريخ الإقفال وإجراء إقفال شهري"],
          ],
          caption: "ملخص أشهر مشكلات Odoo بعد التطبيق",
        },
        { type: "h2", text: "1. المخزون في النظام لا يطابق المستودع" },
        {
          type: "p",
          text: "هذه أكثر مشكلة تُفقد الإدارة ثقتها بالنظام. السبب نادراً ما يكون في Odoo نفسه، بل في عمليات تتم خارجه: صرف من المستودع دون تسجيل، أو استلام لم يُؤكَّد، أو مرتجعات تُعاد إلى الرف دون إذن إرجاع.",
        },
        {
          type: "ul",
          items: [
            "ابدأ بجرد شامل وسجّله في النظام، ليكون نقطة بداية صحيحة.",
            "راجع التحويلات المعلقة بحالة «جاهز» أو «بانتظار»، فكثير منها حركات حدثت فعلاً ولم تُؤكَّد.",
            "اجعل تعديل الكميات اليدوي بصلاحية محدودة، وراجع سجل التعديلات أسبوعياً.",
            "فعّل الجرد الدوري لأصناف محددة بدل انتظار الجرد السنوي.",
          ],
        },
        { type: "h2", text: "2. تكلفة المنتج والربحية غير دقيقة" },
        {
          type: "p",
          text: "إذا كانت تقارير الربحية لا تقنع المحاسب، فالسبب غالباً في طريقة تقييم المخزون أو في تكاليف لا تصل إلى المنتج. شركات الاستيراد تحديداً تخسر دقة كبيرة عندما لا تُحمَّل تكاليف الشحن والجمارك على الأصناف.",
        },
        {
          type: "ul",
          items: [
            "راجع طريقة التقييم لكل فئة منتجات: التكلفة القياسية، أو المتوسط المرجّح، أو الوارد أولاً صادر أولاً، واختر ما يناسب نشاطك.",
            "فعّل التكاليف المحمّلة، ووزّع تكاليف الشحن والجمارك والتأمين على الأصناف المستلمة.",
            "تأكد أن التقييم الآلي للمخزون مربوط بالحسابات الصحيحة في دليل الحسابات.",
            "راجع الأصناف التي تكلفتها صفر أو سالبة، فهي تشوّه تقارير الربحية كلها.",
          ],
        },
        { type: "h2", text: "3. فواتير ترفضها منصة فاتورة" },
        {
          type: "p",
          text: "الرفض المتكرر يأتي في الغالب من بيانات ناقصة لا من الربط نفسه. فاتورة الشركات الضريبية تتطلب بيانات كاملة للمشتري، وأي حقل ناقص يكفي للرفض.",
        },
        {
          type: "ul",
          items: [
            "راجع بيانات عملاء الشركات: الرقم الضريبي، والسجل التجاري، والعنوان الوطني كاملاً.",
            "تأكد من إعداد الضرائب ومواقعها الضريبية، خاصة للعملاء المعفيين أو خارج المملكة.",
            "اقرأ رسالة الرفض في سجل الفاتورة، فهي تحدد الحقل المسبب غالباً.",
            "تأكد أن الإشعارات الدائنة مرتبطة بالفاتورة الأصلية.",
          ],
        },
        { type: "link", text: "اقرأ: ربط أودو Odoo بمنصة فاتورة، دليل المرحلة الثانية والموجة 25", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "4. النظام بطيء" },
        {
          type: "p",
          text: "البطء له أسباب متعددة، والخطأ الأشهر هو معالجته قبل معرفة مصدره. قد يكون في تخصيص يحسب بيانات كثيرة عند كل فتح شاشة، أو في تقرير يُشغَّل على سنوات من البيانات، أو في خادم موارده غير كافية لعدد المستخدمين.",
        },
        {
          type: "ul",
          items: [
            "حدّد الشاشات أو العمليات البطيئة بالتحديد، ومتى يحدث البطء.",
            "افحص التخصيصات أولاً، فالحقول المحسوبة دون تخزين والحلقات الثقيلة سبب شائع.",
            "على الخوادم الخاصة، راجع الموارد وإعدادات قاعدة البيانات وعدد العمليات.",
            "أرشف البيانات القديمة غير المستخدمة، واجعل التقارير الثقيلة تُفلتر بفترة زمنية.",
          ],
        },
        { type: "h2", text: "5. الفريق عاد إلى Excel" },
        {
          type: "p",
          text: "عندما يعود الفريق إلى الملفات الجانبية فهذه رسالة: النظام لا يعطيهم ما يحتاجونه بالسرعة المطلوبة. الحل ليس منع Excel، بل معرفة لماذا يُستخدم.",
        },
        {
          type: "ul",
          items: [
            "اجمع ملفات Excel المستخدمة فعلاً، واسأل: ما السؤال الذي يجيب عنه كل ملف؟",
            "ابنِ هذه التقارير داخل Odoo، كلوحات متابعة أو تقارير محفوظة.",
            "أعد تدريب الفريق على الإجراءات الصحيحة، بأمثلة من عملهم اليومي.",
            "اعتمد أرقام النظام في اجتماعات الإدارة، فهذا وحده يغيّر السلوك.",
          ],
        },
        { type: "h2", text: "6. التكاملات تتوقف دون أن يلاحظ أحد" },
        {
          type: "p",
          text: "تكامل متوقف مع منصة بيع يعني طلبات لا تصل ومخزوناً لا يتحدث، وقد يُكتشف بعد أيام. السبب غالباً مفتاح ربط انتهت صلاحيته، أو تغيير في واجهة المنصة، أو خطأ يتكرر في السجلات دون تنبيه.",
        },
        {
          type: "ul",
          items: [
            "وثّق كل تكامل: ما يفعله، وأين تُدار مفاتيحه، ومتى تنتهي صلاحيتها.",
            "فعّل تنبيهات بالبريد أو داخل Odoo عند فشل المزامنة.",
            "راجع سجلات الأخطاء أسبوعياً، ولا تنتظر شكوى العميل.",
          ],
        },
        { type: "link", text: "اقرأ: ربط متجر سلة مع أودو Odoo، وكيف تُراقب المزامنة", href: "/blog/salla-odoo-integration" },
        { type: "h2", text: "7. بيانات مكررة" },
        {
          type: "p",
          text: "عميل مسجل ثلاث مرات أو منتج بأكثر من رمز يعني تقارير غير صحيحة وأرصدة موزعة. يحدث هذا عادة من الإدخال اليدوي المتكرر أو من استيراد دون تدقيق.",
        },
        {
          type: "ul",
          items: [
            "استخدم أدوات الدمج في Odoo لدمج السجلات المكررة مع الحفاظ على حركاتها.",
            "اجعل الرقم الضريبي ورمز المنتج حقولاً إلزامية وفريدة حيث يناسب.",
            "حدّد من يملك صلاحية إنشاء العملاء والمنتجات.",
          ],
        },
        { type: "h2", text: "8. الترقية مؤجلة منذ فترة" },
        {
          type: "p",
          text: "كل إصدار جديد يحمل تحسينات وإصلاحات، وتأجيل الترقية طويلاً يجعلها أصعب وأكثر تكلفة. والخوف الأكبر عادة من الوحدات المخصصة.",
        },
        {
          type: "ul",
          items: [
            "ابدأ بقائمة الوحدات المخصصة والإضافات، وتحقق من توفر كل منها للإصدار المستهدف.",
            "نفّذ الترقية على نسخة تجريبية واختبر الإجراءات اليومية عليها مع المستخدمين الأساسيين.",
            "لا تجمع الترقية مع تغييرات كبيرة أخرى في الوقت نفسه.",
          ],
        },
        { type: "link", text: "اقرأ: ترقية أودو Odoo، الخطوات والمخاطر", href: "/blog/odoo-upgrade-guide" },
        { type: "h2", text: "9. أخطاء صلاحيات، أو موظفون يرون ما لا يخصهم" },
        {
          type: "p",
          text: "مشكلتان من مصدر واحد: موظف يظهر له خطأ صلاحية عند فتح شاشة يحتاجها، وآخر يرى أسعار الشراء أو أرقام الرواتب وهو لا يحتاجها. السبب غالباً أن الصلاحيات أُعطيت على عجل أثناء التطبيق، بنسخ مستخدم إلى آخر أو بمنح صلاحية المدير لحل مشكلة مؤقتة.",
        },
        {
          type: "ul",
          items: [
            "اكتب الأدوار الفعلية في شركتك (مندوب، أمين مستودع، محاسب، مدير فرع) وما يحتاجه كل دور.",
            "اربط كل مستخدم بمجموعات دوره فقط، وقلّل عدد حسابات المدير إلى أدنى حد.",
            "في الشركات متعددة الفروع، تأكد أن كل مستخدم مسموح له بالشركات أو الفروع التي يعمل فيها فقط.",
            "عطّل حسابات الموظفين الذين غادروا، فالحساب النشط يُحتسب في الاشتراك أيضاً.",
          ],
        },
        { type: "h2", text: "10. أرقام شهر مُقفل تتغير بعد إعداد التقارير" },
        {
          type: "p",
          text: "ترسل الإدارة تقرير الشهر، ثم يتغير الرقم بعد أسبوع لأن أحدهم سجّل أو عدّل قيداً بتاريخ قديم. وهذا يضر بالإقرارات الضريبية أيضاً، إذ قد تختلف أرقام النظام عن الإقرار المقدَّم.",
        },
        {
          type: "ul",
          items: [
            "فعّل تواريخ الإقفال في إعدادات المحاسبة، لمنع تسجيل قيود أو تعديلها قبل تاريخ محدد.",
            "اعتمد إجراء إقفال شهرياً: مطابقة البنوك، ومراجعة المخزون، ثم الإقفال.",
            "أي تصحيح لفترة مقفلة يتم بقيد في الفترة الحالية، لا بفتح الفترة القديمة.",
          ],
        },
        { type: "h2", text: "متى تحتاج مراجعة شاملة للنظام؟" },
        {
          type: "p",
          text: "إذا كانت لديك ثلاث مشكلات أو أكثر من هذه القائمة، فالأفضل مراجعة شاملة بدل إصلاح كل مشكلة منفردة. كثير من هذه المشكلات مترابط: مخزون غير دقيق يعني تكلفة غير دقيقة، وتكلفة غير دقيقة تعني أن الإدارة تعود إلى Excel.",
        },
        { type: "h2", text: "بأيها تبدأ؟ ترتيب الأولويات" },
        {
          type: "table",
          head: ["الأولوية", "المشكلات", "السبب"],
          rows: [
            ["عاجلة", "رفض الفواتير من منصة فاتورة، وتوقف التكاملات", "تمس الامتثال والإيرادات مباشرة، وأثرها يتراكم يومياً"],
            ["عالية", "المخزون غير المطابق، والتكلفة غير الدقيقة، والصلاحيات", "كل قرار شراء وتسعير يُبنى عليها، والصلاحيات تمس سرية البيانات"],
            ["متوسطة", "الإقفال المحاسبي، والبيانات المكررة، والتقارير", "تصلح التقارير وتعيد ثقة الإدارة بالأرقام"],
            ["مخططة", "البطء والترقية", "تحتاج قياساً وتجربة على نسخة تجريبية، فتُخطط ولا تُرتجل"],
          ],
          caption: "ترتيب عام؛ في المراجعة نرتّبها حسب أثرها الفعلي على عملك.",
        },
        { type: "link", text: "اقرأ: كيف تغيّر شريك أودو Odoo دون أن تخسر بياناتك", href: "/blog/change-odoo-partner" },
        {
          type: "note",
          text: "نراجع أنظمة Odoo القائمة ونرتّب مشكلاتها حسب أثرها على العمل، ثم نبدأ بما يؤثر عليك اليوم، سواء كنت تعمل معنا أو مع شريك آخر. ابدأ بجلسة مراجعة مجانية مدتها 30 دقيقة.",
        },
      ],
    },
    en: {
      title: "The most common Odoo problems after implementation, and how to fix them",
      seoTitle: "Common Odoo problems after go-live and how to fix them",
      description:
        "Stock doesn't match, costs are off, Fatoora rejects invoices, the system is slow and the team is back on Excel. The causes of the most common post-implementation Odoo problems and how to fix each one.",
      category: "System management",
      readMinutes: 10,
      body: [
        {
          type: "p",
          text: "Most Odoo problems we see after implementation are not flaws in the system itself. They are usually incomplete configuration, a process the team doesn't follow, or a customisation built in a hurry. The good news is that most can be fixed without re-implementing from scratch. Here is a summary of the most common ones, followed by detail on each.",
        },
        {
          type: "table",
          head: ["Problem", "Most common cause", "Direction of the fix"],
          rows: [
            ["System stock doesn't match the warehouse", "Operations done outside the system, or unconfirmed transfers", "A full count, then tightened processes and access"],
            ["Product cost and margins are off", "Unsuitable valuation method, or freight and customs not allocated", "Review valuation and use landed costs"],
            ["Fatoora rejects invoices", "Incomplete customer data or tax setup", "Clean customer data and review tax setup"],
            ["The system is slow", "Heavy customisations, accumulated data or under-sized server", "Measure the source before changing anything"],
            ["The team is back on Excel", "Reports that don't answer management's questions, or too little training", "Build the needed reports and retrain"],
            ["Integrations stop", "Expired keys or errors nobody monitors", "Integration monitoring and failure alerts"],
            ["Duplicate data", "Repeated manual entry and unchecked imports", "Merge duplicates and add entry controls"],
            ["The upgrade keeps slipping", "Custom modules everyone fears will break", "Upgrade a staging copy first"],
          ],
          caption: "Summary of common Odoo problems after implementation",
        },
        { type: "h2", text: "1. System stock doesn't match the warehouse" },
        {
          type: "p",
          text: "This is the problem that most damages management's trust in the system. The cause is rarely Odoo itself; it is operations happening outside it: goods issued without being recorded, receipts never confirmed, or returns put back on the shelf without a return order.",
        },
        {
          type: "ul",
          items: [
            "Start with a full stock count recorded in the system, to give you a correct baseline.",
            "Review transfers stuck in Ready or Waiting; many are movements that already happened and were never confirmed.",
            "Restrict manual quantity adjustments and review the adjustment log weekly.",
            "Use cycle counts for selected items instead of waiting for the annual count.",
          ],
        },
        { type: "h2", text: "2. Product cost and margins are off" },
        {
          type: "p",
          text: "If the margin reports don't convince your accountant, the cause is usually the stock valuation method or costs that never reach the product. Importers in particular lose a lot of accuracy when freight and customs are not allocated to items.",
        },
        {
          type: "ul",
          items: [
            "Review the costing method for each product category: standard, average or FIFO, and choose what fits your business.",
            "Use landed costs to spread freight, customs and insurance over received items.",
            "Make sure automated stock valuation posts to the right accounts in your chart of accounts.",
            "Check items with zero or negative cost; they distort every margin report.",
          ],
        },
        { type: "h2", text: "3. Fatoora rejects invoices" },
        {
          type: "p",
          text: "Repeated rejections usually come from incomplete data, not from the integration itself. B2B tax invoices need complete buyer details, and a single missing field is enough for a rejection.",
        },
        {
          type: "ul",
          items: [
            "Review B2B customer data: VAT number, commercial registration and the full national address.",
            "Check taxes and fiscal positions, especially for exempt customers or customers outside Saudi Arabia.",
            "Read the rejection message in the invoice log; it usually names the field at fault.",
            "Make sure credit notes are linked to the original invoice.",
          ],
        },
        { type: "link", text: "Read: connecting Odoo to Fatoora (Phase 2 and Wave 25)", href: "/blog/odoo-zatca-fatoora-integration" },
        { type: "h2", text: "4. The system is slow" },
        {
          type: "p",
          text: "Slowness has many causes, and the classic mistake is treating it before knowing where it comes from. It may be a customisation that computes a lot of data whenever a screen opens, a report run over years of data, or a server too small for the number of users.",
        },
        {
          type: "ul",
          items: [
            "Pin down exactly which screens or operations are slow, and when.",
            "Check customisations first; non-stored computed fields and heavy loops are a common cause.",
            "On your own servers, review resources, database settings and worker configuration.",
            "Archive old unused data and make heavy reports filter by period.",
          ],
        },
        { type: "h2", text: "5. The team is back on Excel" },
        {
          type: "p",
          text: "When the team goes back to side files, it is a message: the system isn't giving them what they need quickly enough. The fix is not banning Excel but understanding why it is used.",
        },
        {
          type: "ul",
          items: [
            "Collect the Excel files actually in use and ask what question each one answers.",
            "Build those reports inside Odoo as dashboards or saved reports.",
            "Retrain the team on the right processes, using examples from their daily work.",
            "Use system figures in management meetings; that alone changes behaviour.",
          ],
        },
        { type: "h2", text: "6. Integrations stop without anyone noticing" },
        {
          type: "p",
          text: "A stopped marketplace integration means orders that don't arrive and stock that doesn't update, sometimes discovered days later. The cause is usually an expired key, a change on the platform's side, or an error repeating in the logs with no alert.",
        },
        {
          type: "ul",
          items: [
            "Document every integration: what it does, where its keys are managed and when they expire.",
            "Set up email or in-app alerts when a sync fails.",
            "Review error logs weekly instead of waiting for a customer complaint.",
          ],
        },
        { type: "link", text: "Read: connecting Salla to Odoo and monitoring the sync", href: "/blog/salla-odoo-integration" },
        { type: "h2", text: "7. Duplicate data" },
        {
          type: "p",
          text: "A customer recorded three times or a product with several codes means wrong reports and split balances. It usually comes from repeated manual entry or unchecked imports.",
        },
        {
          type: "ul",
          items: [
            "Use Odoo's merge tools to combine duplicates while keeping their transactions.",
            "Make VAT number and product code mandatory and unique where appropriate.",
            "Limit who can create customers and products.",
          ],
        },
        { type: "h2", text: "8. The upgrade keeps slipping" },
        {
          type: "p",
          text: "Every new version brings improvements and fixes, and postponing the upgrade for long makes it harder and more expensive. The biggest fear is usually the custom modules.",
        },
        {
          type: "ul",
          items: [
            "Start with a list of custom modules and add-ons, and check each is available for the target version.",
            "Upgrade a staging copy first and test daily processes on it with key users.",
            "Don't combine the upgrade with other major changes at the same time.",
          ],
        },
        { type: "link", text: "Read: upgrading Odoo, steps and risks", href: "/blog/odoo-upgrade-guide" },
        { type: "h2", text: "9. Access errors, or staff seeing what they shouldn't" },
        {
          type: "p",
          text: "Both come from rights granted in a hurry during implementation: copying one user to another, or giving admin rights to fix a one-off issue.",
        },
        {
          type: "ul",
          items: [
            "Define real roles (sales rep, storekeeper, accountant, branch manager) and what each needs.",
            "Give each user only their role's groups, and keep admin accounts to a minimum.",
            "In multi-company setups, allow each user only the companies they work in.",
            "Archive users who have left; active accounts are billed.",
          ],
        },
        { type: "h2", text: "10. Closed-month figures keep changing" },
        {
          type: "p",
          text: "Management sends the month's report, then a back-dated entry changes it, which can also leave the books out of line with filed VAT returns.",
        },
        {
          type: "ul",
          items: [
            "Set lock dates in the accounting settings to block entries before a given date.",
            "Adopt a monthly close: bank reconciliation, stock review, then lock.",
            "Correct closed periods with an entry in the current period, not by reopening.",
          ],
        },
        { type: "h2", text: "Where to start" },
        {
          type: "table",
          head: ["Priority", "Problems", "Why"],
          rows: [
            ["Urgent", "Fatoora rejections, stopped integrations", "Hit compliance and revenue directly, every day"],
            ["High", "Stock mismatch, costing, access rights", "Purchasing and pricing depend on them; rights affect confidentiality"],
            ["Medium", "Period close, duplicates, reports", "Restore management's trust in the numbers"],
            ["Planned", "Performance, upgrade", "Need measurement and a test copy"],
          ],
        },
        { type: "link", text: "Read: changing your Odoo partner without losing data", href: "/blog/change-odoo-partner" },
        { type: "h2", text: "When do you need a full system review?" },
        {
          type: "p",
          text: "If you have three or more problems from this list, a full review beats fixing each one separately. Many of them are linked: inaccurate stock means inaccurate cost, and inaccurate cost sends management back to Excel.",
        },
        {
          type: "note",
          text: "We review existing Odoo systems, rank their issues by business impact and start with what affects you today, whether you work with us or another partner. Start with a free 30-minute review session.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "odoo-online-vs-odoo-sh-vs-on-premise",
    date: "2026-11-07",
    related: { label: { ar: "احسب تكلفة اشتراك Odoo لشركتك", en: "Calculate your Odoo subscription cost" }, href: "/odoo-cost-calculator" },
    ar: {
      title: "Odoo Online أم Odoo.sh أم خادم خاص: أي استضافة تناسب شركتك؟",
      seoTitle: "Odoo Online أم Odoo.sh أم خادم خاص؟ دليل الاختيار",
      description:
        "الفرق بين خيارات استضافة Odoo الثلاثة: Odoo Online و Odoo.sh والخادم الخاص، من حيث التخصيص والتكلفة والترقيات والنسخ الاحتياطي، ومتى يناسب كل خيار شركتك.",
      category: "دليل الاختيار",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "قبل التعاقد على Odoo، هناك قرار يغفل عنه كثيرون: أين سيعمل النظام؟ يوفّر Odoo ثلاثة خيارات للاستضافة، والاختيار بينها يحدد ما يمكنك تخصيصه، ومن يتولى الترقيات والنسخ الاحتياطي، والباقة التي تحتاجها. الخبر الجيد أن القرار ليس نهائياً، فالانتقال بين الخيارات ممكن لاحقاً.",
        },
        {
          type: "table",
          head: ["", "Odoo Online", "Odoo.sh", "خادم خاص"],
          rows: [
            ["من يدير الخوادم؟", "Odoo", "Odoo", "شركتك أو شريكك"],
            ["الوحدات البرمجية المخصصة", "غير متاحة", "متاحة", "متاحة"],
            ["الباقة المطلوبة", "Standard أو Custom", "Custom", "Custom"],
            ["تكلفة استضافة إضافية", "لا", "نعم، حسب الموارد", "تكلفة الخادم وإدارته"],
            ["النسخ الاحتياطي", "تلقائي من Odoo", "تلقائي من Odoo", "مسؤوليتك"],
            ["الترقيات", "الأسهل، وتُتاح أولاً", "بإشرافك أو إشراف شريكك", "بإشرافك أو إشراف شريكك"],
            ["الأنسب لـ", "أغلب الشركات الصغيرة والمتوسطة", "من يحتاج تطويراً مخصصاً دون إدارة خوادم", "متطلبات خاصة بمكان البيانات أو البنية"],
          ],
          caption: "مقارنة خيارات استضافة Odoo الثلاثة",
        },
        { type: "h2", text: "Odoo Online: الأبسط والأسرع" },
        {
          type: "p",
          text: "النظام يعمل على سحابة Odoo مباشرة، ولا تحتاج أي خادم أو فريق تقني لإدارته. تتولى Odoo التشغيل والنسخ الاحتياطي والأمان، وتصل إليه إصدارات وسيطة جديدة كل شهرين تقريباً لا تصل إلى الخيارين الآخرين.",
        },
        {
          type: "ul",
          items: [
            "يناسبك إن كانت تطبيقات Odoo القياسية تغطي احتياجك، مع تعديلات عبر الإعدادات و Studio.",
            "يعمل على باقة Standard، وهي الأقل تكلفة، أو على باقة Custom إذا احتجت Studio أو تعدد الشركات.",
            "القيد الأساسي: لا يمكن تثبيت وحدات برمجية مخصصة أو إضافات من أطراف أخرى.",
          ],
        },
        { type: "h2", text: "Odoo.sh: سحابة Odoo مع حرية التطوير" },
        {
          type: "p",
          text: "منصة سحابية تديرها Odoo أيضاً، لكنها مصممة للتطوير المخصص. الشيفرة في مستودع GitHub، ولكل تعديل بيئة اختبار قبل نقله إلى النظام الفعلي، والنسخ الاحتياطي تلقائي.",
        },
        {
          type: "ul",
          items: [
            "يناسبك إن كنت تحتاج وحدات مخصصة أو تكاملات غير موجودة في Odoo القياسي، دون أن تدير خوادم بنفسك.",
            "يتطلب باقة Custom، ورسوم استضافة إضافية تعتمد على الموارد المطلوبة.",
            "تأكد أن مستودع GitHub ومشروع Odoo.sh مسجلان بحسابات تملكها شركتك.",
          ],
        },
        { type: "h2", text: "الخادم الخاص: تحكم كامل ومسؤولية كاملة" },
        {
          type: "p",
          text: "تشغّل Odoo على خوادمك أو خوادم مزود تختاره. تملك التحكم الكامل في البيئة ومكان البيانات، لكنك تتحمل مسؤولية كل شيء: التشغيل، والنسخ الاحتياطي، والأمان، والأداء، والترقيات.",
        },
        {
          type: "ul",
          items: [
            "يناسبك إن كانت لديك متطلبات نظامية أو تعاقدية بإبقاء البيانات في مكان محدد، كخوادم داخل المملكة.",
            "يتطلب باقة Custom لاستخدام Odoo Enterprise، وفريقاً أو شريكاً يدير الخادم.",
            "احسب تكلفة الخادم وإدارته ضمن الميزانية، فهي ليست ضمن اشتراك Odoo.",
          ],
        },
        { type: "h2", text: "كيف تختار؟ ثلاثة أسئلة" },
        {
          type: "ol",
          items: [
            "هل تحتاج تطويراً برمجياً مخصصاً أو تكاملاً غير موجود في Odoo القياسي؟ إن كان الجواب لا، فـ Odoo Online هو الخيار الأبسط والأقل تكلفة.",
            "إن احتجت تطويراً مخصصاً: هل لديك متطلبات تفرض مكان البيانات أو بنية خاصة؟ إن كان الجواب لا، فـ Odoo.sh.",
            "إن كانت لديك هذه المتطلبات، فالخادم الخاص، مع خطة واضحة لإدارته ونسخه الاحتياطي.",
          ],
        },
        {
          type: "note",
          text: "ابدأ بأبسط خيار يغطي احتياجك الفعلي اليوم. الانتقال من Odoo Online إلى Odoo.sh ممكن لاحقاً عندما يظهر احتياج حقيقي للتطوير المخصص، وفي جلسة الاستشارة المجانية نحدد معك الخيار المناسب قبل التعاقد.",
        },
      ],
    },
    en: {
      title: "Odoo Online, Odoo.sh or your own server: which hosting suits your company?",
      seoTitle: "Odoo Online vs Odoo.sh vs on-premise: how to choose",
      description:
        "The differences between Odoo's three hosting options, Odoo Online, Odoo.sh and on-premise, in customisation, cost, upgrades and backups, and when each one fits your company.",
      category: "Buyer's guide",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "Before signing up for Odoo, there is a decision many people overlook: where will the system run? Odoo offers three hosting options, and the choice decides what you can customise, who handles upgrades and backups, and which plan you need. The good news is that the decision isn't final; you can move between options later.",
        },
        {
          type: "table",
          head: ["", "Odoo Online", "Odoo.sh", "Own server"],
          rows: [
            ["Who runs the servers?", "Odoo", "Odoo", "Your company or partner"],
            ["Custom code modules", "Not available", "Available", "Available"],
            ["Plan required", "Standard or Custom", "Custom", "Custom"],
            ["Extra hosting cost", "No", "Yes, based on resources", "Server and its management"],
            ["Backups", "Automatic, by Odoo", "Automatic, by Odoo", "Your responsibility"],
            ["Upgrades", "Easiest, available first", "Managed by you or your partner", "Managed by you or your partner"],
            ["Best for", "Most small and mid-sized companies", "Custom development without running servers", "Specific data-location or infrastructure needs"],
          ],
          caption: "Comparing Odoo's three hosting options",
        },
        { type: "h2", text: "Odoo Online: the simplest and fastest" },
        {
          type: "p",
          text: "The system runs directly on Odoo's cloud, with no server or technical team to manage it. Odoo handles operations, backups and security, and Odoo Online receives intermediate versions roughly every two months that the other two options don't get.",
        },
        {
          type: "ul",
          items: [
            "It suits you if standard Odoo apps cover your needs, with adjustments through settings and Studio.",
            "It runs on the Standard plan, the lowest cost, or on Custom if you need Studio or multi-company.",
            "The main limit: you can't install custom code modules or third-party add-ons.",
          ],
        },
        { type: "h2", text: "Odoo.sh: Odoo's cloud with freedom to develop" },
        {
          type: "p",
          text: "A cloud platform also run by Odoo, but built for custom development. Code lives in a GitHub repository, every change gets a test environment before reaching production, and backups are automatic.",
        },
        {
          type: "ul",
          items: [
            "It suits you if you need custom modules or integrations not in standard Odoo, without managing servers yourself.",
            "It requires the Custom plan, plus hosting fees based on the resources you need.",
            "Make sure the GitHub repository and the Odoo.sh project are registered to accounts your company owns.",
          ],
        },
        { type: "h2", text: "Own server: full control, full responsibility" },
        {
          type: "p",
          text: "You run Odoo on your own servers or a provider you choose. You control the environment and where data lives, but you are responsible for everything: operations, backups, security, performance and upgrades.",
        },
        {
          type: "ul",
          items: [
            "It suits you if you have legal or contractual requirements to keep data in a specific place, such as servers inside Saudi Arabia.",
            "It requires the Custom plan to use Odoo Enterprise, and a team or partner to manage the server.",
            "Budget for the server and its management; they are not part of the Odoo subscription.",
          ],
        },
        { type: "h2", text: "How to choose: three questions" },
        {
          type: "ol",
          items: [
            "Do you need custom development or an integration not in standard Odoo? If not, Odoo Online is the simplest and lowest-cost choice.",
            "If you do need custom development: do you have requirements that dictate where data lives or a specific infrastructure? If not, choose Odoo.sh.",
            "If you do have those requirements, choose your own server, with a clear plan for running and backing it up.",
          ],
        },
        {
          type: "note",
          text: "Start with the simplest option that covers what you actually need today. Moving from Odoo Online to Odoo.sh later is possible when a real need for custom development appears, and in the free consultation we help you pick the right option before you sign.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "odoo-upgrade-guide",
    date: "2026-11-07",
    related: { label: { ar: "دعم أنظمة Odoo القائمة", en: "Support for existing Odoo systems" }, href: "/odoo-support" },
    ar: {
      title: "ترقية Odoo: الخطوات والمدة وما تحتاج معرفته قبل البدء",
      seoTitle: "ترقية أودو Odoo إلى إصدار أحدث: الخطوات والمخاطر",
      description:
        "متى تحتاج ترقية Odoo، وما الذي يشمله الاشتراك، وخطوات الترقية الآمنة من النسخة التجريبية حتى التشغيل، وكيف تتعامل مع الوحدات المخصصة.",
      category: "إدارة النظام",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "يصدر Odoo إصداراً رئيسياً جديداً كل عام تقريباً، ويقدم الدعم وإصلاح الأخطاء لآخر ثلاثة إصدارات رئيسية فقط. أي أن كل إصدار يبقى مدعوماً نحو ثلاث سنوات. وفق جدول Odoo المنشور، انتهى دعم Odoo 17 في أكتوبر 2026، ويستمر دعم Odoo 18 حتى أكتوبر 2027.",
        },
        {
          type: "p",
          text: "إذا كان نظامك على إصدار قديم، فالترقية ليست رفاهية: الإصدارات غير المدعومة لا تصلها إصلاحات، وتصبح الترقية منها أصعب كلما طال التأجيل. والخبر الجيد أن Odoo تتيح الترقية من أي إصدار.",
        },
        { type: "h2", text: "ما الذي يشمله اشتراك Odoo؟" },
        {
          type: "p",
          text: "خدمة الترقية للتطبيقات القياسية مشمولة في اشتراك Odoo Enterprise: تُرقّى بياناتك وإعداداتك إلى الإصدار الجديد. أما الوحدات المخصصة والإضافات من أطراف أخرى فلا تشملها هذه الخدمة، وتحتاج تحديثاً من الشريك أو المطور ليتوافق كل منها مع الإصدار الجديد.",
        },
        { type: "h2", text: "حسب نوع الاستضافة" },
        {
          type: "table",
          head: ["الاستضافة", "كيف تتم الترقية"],
          rows: [
            ["Odoo Online", "الأبسط. تدعو Odoo مديري قواعد البيانات إلى الترقية بانتظام، ويمكن تجربة الترقية على نسخة اختبار أولاً من صفحة إدارة قواعد البيانات"],
            ["Odoo.sh", "تُجرّب الترقية على فرع اختبار، وتُحدَّث الوحدات المخصصة في المستودع، ثم تُنقل إلى الفرع الفعلي"],
            ["خادم خاص", "تُطلب نسخة مرقّاة من قاعدة البيانات عبر خدمة الترقية في Odoo، وتُثبّت على الخادم مع الوحدات المخصصة المحدّثة"],
          ],
        },
        { type: "h2", text: "خطوات الترقية الآمنة" },
        {
          type: "ol",
          items: [
            "حدد إصدارك الحالي وتاريخ انتهاء دعمه، والإصدار المستهدف.",
            "اجرد الوحدات المخصصة والإضافات المثبتة، وتحقق من توفر كل إضافة للإصدار المستهدف.",
            "خذ نسخة احتياطية كاملة، واطلب ترقية تجريبية لقاعدة البيانات.",
            "حدّث الوحدات المخصصة لتتوافق مع الإصدار الجديد، واختبرها على النسخة التجريبية.",
            "اطلب من المستخدمين الأساسيين في كل قسم اختبار عملياتهم اليومية: البيع، والشراء، والمخزون، والفوترة، والتقارير.",
            "اختبر الفوترة الإلكترونية والتكاملات تحديداً، فهي الأكثر حساسية لأي تغيير.",
            "حدد موعد التشغيل في فترة هادئة، بعيداً عن إقفال الشهر ومواسم الذروة، وأبلغ الفريق مسبقاً.",
            "بعد التشغيل، تابع الأيام الأولى عن قرب وجهّز قناة سريعة لاستقبال الملاحظات.",
          ],
        },
        { type: "h2", text: "كم تستغرق الترقية؟" },
        {
          type: "p",
          text: "لا توجد مدة ثابتة. ترقية نظام على Odoo Online دون تخصيصات قد تتم بسرعة، أما نظام فيه وحدات مخصصة كثيرة وتكاملات متعددة فيحتاج أسابيع للتحديث والاختبار. أهم ما يحدد المدة:",
        },
        {
          type: "ul",
          items: [
            "عدد الوحدات المخصصة وحجمها، وجودة كتابتها وتوثيقها.",
            "عدد الإصدارات بين إصدارك الحالي والمستهدف.",
            "عدد التكاملات مع المنصات والأنظمة الخارجية.",
            "حجم البيانات، ومدى توفر المستخدمين للاختبار.",
          ],
        },
        { type: "h2", text: "أخطاء تجعل الترقية مؤلمة" },
        {
          type: "ul",
          items: [
            "التشغيل مباشرة دون ترقية تجريبية واختبار من المستخدمين.",
            "نسيان الإضافات المشتراة من متجر Odoo، ثم اكتشاف أنها غير متوفرة للإصدار الجديد.",
            "الجمع بين الترقية وتغييرات كبيرة أخرى، كتغيير الشريك أو إعادة تصميم الإجراءات.",
            "تأجيل الترقية سنوات، فتصبح قفزة عبر عدة إصدارات بدل خطوة واحدة.",
          ],
        },
        {
          type: "note",
          text: "نرقّي أنظمة Odoo القائمة، بما فيها الوحدات المخصصة، على نسخة تجريبية أولاً حتى يطمئن فريقك قبل التشغيل. ابدأ بجلسة مراجعة مجانية نحدد فيها حجم الترقية ومدتها المتوقعة.",
        },
      ],
    },
    en: {
      title: "Upgrading Odoo: the steps, timing and what to know before you start",
      seoTitle: "Upgrading Odoo to a newer version: steps and risks",
      description:
        "When you need to upgrade Odoo, what the subscription covers, the safe upgrade steps from test copy to go-live, and how to handle custom modules.",
      category: "System management",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "Odoo releases a new major version roughly every year and provides support and bug fixes for the last three major versions only, so each version stays supported for about three years. According to Odoo's published schedule, support for Odoo 17 ended in October 2026, and Odoo 18 is supported until October 2027.",
        },
        {
          type: "p",
          text: "If your system is on an old version, upgrading isn't a luxury: unsupported versions get no fixes, and the upgrade gets harder the longer you wait. The good news is that Odoo lets you upgrade from any version.",
        },
        { type: "h2", text: "What does the Odoo subscription cover?" },
        {
          type: "p",
          text: "The upgrade service for standard apps is included in the Odoo Enterprise subscription: your data and settings are upgraded to the new version. Custom modules and third-party add-ons are not covered by this service; each one needs updating by your partner or developer to work with the new version.",
        },
        { type: "h2", text: "By hosting type" },
        {
          type: "table",
          head: ["Hosting", "How the upgrade works"],
          rows: [
            ["Odoo Online", "The simplest. Odoo invites database admins to upgrade regularly, and you can test the upgrade on a test copy first from the database management page"],
            ["Odoo.sh", "The upgrade is tested on a staging branch, custom modules are updated in the repository, then it moves to production"],
            ["Own server", "You request an upgraded copy of the database through Odoo's upgrade service and install it on the server with the updated custom modules"],
          ],
        },
        { type: "h2", text: "The safe upgrade steps" },
        {
          type: "ol",
          items: [
            "Identify your current version, its end-of-support date and the target version.",
            "List the custom modules and add-ons installed, and check each add-on is available for the target version.",
            "Take a full backup and request a test upgrade of the database.",
            "Update custom modules for the new version and test them on the test copy.",
            "Ask key users in each department to test their daily processes: sales, purchasing, stock, invoicing and reports.",
            "Test e-invoicing and integrations specifically; they are the most sensitive to change.",
            "Schedule go-live in a quiet period, away from month-end close and peak seasons, and tell the team in advance.",
            "After go-live, watch the first days closely and set up a fast channel for feedback.",
          ],
        },
        { type: "h2", text: "How long does an upgrade take?" },
        {
          type: "p",
          text: "There is no fixed duration. An Odoo Online system with no customisations can be upgraded quickly, while a system with many custom modules and integrations needs weeks of updating and testing. The main factors are:",
        },
        {
          type: "ul",
          items: [
            "The number and size of custom modules, and how well they are written and documented.",
            "How many versions lie between your current and target versions.",
            "The number of integrations with marketplaces and external systems.",
            "Data volume, and how available users are for testing.",
          ],
        },
        { type: "h2", text: "Mistakes that make upgrades painful" },
        {
          type: "ul",
          items: [
            "Going live without a test upgrade and user testing.",
            "Forgetting add-ons bought on the Odoo Apps store, then finding they aren't available for the new version.",
            "Combining the upgrade with other big changes, such as changing partner or redesigning processes.",
            "Postponing for years, so the upgrade becomes a jump across several versions instead of one step.",
          ],
        },
        {
          type: "note",
          text: "We upgrade existing Odoo systems, custom modules included, on a test copy first so your team is confident before go-live. Start with a free review session where we size the upgrade and its expected timeline.",
        },
      ],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
