// =====================================================================
// المدونة — لإضافة مقال: انسخ عنصراً من المصفوفة وعدّل محتواه
// Blog — to add a post, copy an entry in the array and edit it
// =====================================================================

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
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
    related: { label: { ar: "صفحة الامتثال لفاتورة", en: "ZATCA compliance page" }, href: "/zatca" },
    ar: {
      title: "ربط Odoo بمنصة فاتورة: ما الذي تحتاجه منشأتك للمرحلة الثانية؟",
      description:
        "دليل عملي لتهيئة Odoo للربط مع منصة فاتورة: الفرق بين الفاتورة القياسية والمبسطة، خطوات الربط، والأخطاء الشائعة التي تؤدي إلى رفض الفواتير.",
      category: "الامتثال",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "تطبّق هيئة الزكاة والضريبة والجمارك الفوترة الإلكترونية على مرحلتين. الأولى هي إصدار الفواتير وحفظها إلكترونياً، والثانية هي الربط والتكامل: أن يرسل نظامك الفواتير إلى منصة فاتورة مباشرة. المرحلة الثانية تُطبّق على موجات، وتُبلَّغ كل منشأة بموعد موجتها مسبقاً.",
        },
        {
          type: "p",
          text: "إذا كنت تستخدم Odoo، فالخبر الجيد أن النظام يتضمن توطيناً سعودياً يدعم متطلبات الربط. لكن الربط لا ينجح بمجرد تفعيل الإعداد؛ نجاحه يعتمد على جودة بياناتك وطريقة التهيئة.",
        },
        { type: "h2", text: "الفاتورة القياسية والفاتورة المبسطة: ما الفرق؟" },
        {
          type: "ul",
          items: [
            "الفاتورة الضريبية القياسية تصدر للمنشآت (B2B). تُرسل إلى المنصة لاعتمادها قبل مشاركتها مع المشتري.",
            "الفاتورة الضريبية المبسطة تصدر للأفراد (B2C)، مثل فواتير نقاط البيع. تُبلَّغ بها المنصة بعد إصدارها خلال المهلة النظامية.",
            "الإشعارات الدائنة والمدينة تتبع نوع الفاتورة الأصلية، ويجب أن ترتبط بها.",
          ],
        },
        { type: "h2", text: "خطوات تهيئة Odoo للربط" },
        {
          type: "ol",
          items: [
            "بيانات الشركة: الاسم القانوني بالعربية والإنجليزية، والرقم الضريبي، ورقم السجل التجاري، والعنوان الوطني كاملاً (رقم المبنى، والرقم الإضافي، والحي، والرمز البريدي).",
            "بيانات العملاء من المنشآت: الرقم الضريبي والعنوان الوطني لكل عميل تصدر له فواتير قياسية.",
            "ربط دفاتر المبيعات بالمنصة: يُنشأ رمز تحقق لمرة واحدة (OTP) من بوابة فاتورة، ويُدخل في Odoo لتسجيل النظام لدى الهيئة.",
            "الاختبار في بيئة المحاكاة: إصدار فواتير قياسية ومبسطة وإشعارات دائنة، والتأكد من قبولها.",
            "الانتقال إلى بيئة الإنتاج ومتابعة الفواتير المرسلة يومياً في الأسابيع الأولى.",
            "نقاط البيع: تهيئة كل نقطة بيع لإصدار فواتير مبسطة متوافقة مع رمز QR.",
          ],
        },
        { type: "h2", text: "أخطاء شائعة تؤدي إلى رفض الفواتير" },
        {
          type: "ul",
          items: [
            "عنوان وطني ناقص للشركة أو للعميل، خاصة الرقم الإضافي أو الرمز البريدي.",
            "رقم ضريبي غير صحيح للعميل؛ الرقم الضريبي في المملكة مكوّن من 15 رقماً.",
            "تعديل فاتورة بعد إرسالها بدلاً من إصدار إشعار دائن مرتبط بها.",
            "تجاهل الفواتير المرفوضة أو التي تحمل تحذيرات، فتتراكم دون معالجة.",
            "إصدار فواتير يدوية من نظام آخر بجانب Odoo، فتتشتت الأرقام التسلسلية.",
          ],
        },
        {
          type: "note",
          text: "نصيحة من تجربتنا: نظّف بيانات العملاء قبل الربط، لا بعده. معظم الفواتير المرفوضة سببها بيانات عميل ناقصة، وليس النظام.",
        },
        { type: "h2", text: "قائمة تحقق سريعة قبل موعد موجتك" },
        {
          type: "ul",
          items: [
            "هل بيانات الشركة والعنوان الوطني مكتملة في Odoo؟",
            "هل لكل عميل من المنشآت رقم ضريبي وعنوان صحيحان؟",
            "هل اختبرت الربط في بيئة المحاكاة؟",
            "هل يعرف فريق المحاسبة كيف يعالج فاتورة مرفوضة؟",
            "هل نقاط البيع جاهزة لإصدار فواتير مبسطة متوافقة؟",
          ],
        },
        {
          type: "p",
          text: "إذا كانت إجابتك «لا» على أي سؤال، فابدأ الآن ولا تنتظر موعد الموجة. الربط نفسه قصير، لكن تجهيز البيانات هو ما يأخذ الوقت.",
        },
      ],
    },
    en: {
      title: "Connecting Odoo to Fatoora: what your business needs for Phase 2",
      description:
        "A practical guide to preparing Odoo for Fatoora integration: standard vs simplified invoices, setup steps, and mistakes that get invoices rejected.",
      category: "Compliance",
      readMinutes: 5,
      body: [
        {
          type: "p",
          text: "ZATCA rolls out e-invoicing in two phases. Phase 1 is generating and storing invoices electronically; Phase 2 is integration — your system submits invoices to the Fatoora platform directly. Phase 2 is applied in waves, and each business is notified of its wave in advance.",
        },
        {
          type: "p",
          text: "If you run Odoo, the good news is that it ships with a Saudi localization that supports integration. But switching on a setting isn't enough; success depends on the quality of your data and how the system is configured.",
        },
        { type: "h2", text: "Standard vs simplified invoices" },
        {
          type: "ul",
          items: [
            "Standard tax invoices are issued to businesses (B2B) and are submitted to the platform for clearance before being shared with the buyer.",
            "Simplified tax invoices are issued to consumers (B2C), such as POS receipts, and are reported to the platform after issue within the required window.",
            "Credit and debit notes follow the type of the original invoice and must be linked to it.",
          ],
        },
        { type: "h2", text: "Steps to configure Odoo" },
        {
          type: "ol",
          items: [
            "Company data: legal name in Arabic and English, VAT number, CR number and the full national address (building number, additional number, district, postal code).",
            "Business customer data: VAT number and national address for every customer you issue standard invoices to.",
            "Onboard your sales journals: generate a one-time password (OTP) in the Fatoora portal and enter it in Odoo to register the system with ZATCA.",
            "Test in the simulation environment: issue standard and simplified invoices and credit notes, and confirm they are accepted.",
            "Move to production and review submitted invoices daily for the first few weeks.",
            "Point of sale: configure every POS to issue compliant simplified invoices with a QR code.",
          ],
        },
        { type: "h2", text: "Common mistakes that get invoices rejected" },
        {
          type: "ul",
          items: [
            "Incomplete national address for the company or customer, especially the additional number or postal code.",
            "Invalid customer VAT number — Saudi VAT numbers are 15 digits.",
            "Editing an invoice after submission instead of issuing a linked credit note.",
            "Ignoring rejected invoices or warnings until they pile up.",
            "Issuing manual invoices from another system alongside Odoo, breaking the invoice sequence.",
          ],
        },
        {
          type: "note",
          text: "From our experience: clean your customer data before integration, not after. Most rejected invoices come from incomplete customer data, not the system.",
        },
        { type: "h2", text: "Quick checklist before your wave" },
        {
          type: "ul",
          items: [
            "Is company data and the national address complete in Odoo?",
            "Does every business customer have a valid VAT number and address?",
            "Have you tested in the simulation environment?",
            "Does your accounting team know how to handle a rejected invoice?",
            "Are your POS terminals ready to issue compliant simplified invoices?",
          ],
        },
        {
          type: "p",
          text: "If you answered “no” to any of these, start now rather than waiting for your wave date. The integration itself is quick — preparing the data is what takes time.",
        },
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
    related: { label: { ar: "احسب تكلفة اشتراك Odoo لشركتك", en: "Calculate your Odoo subscription cost" }, href: "/odoo-cost-calculator" },
    ar: {
      title: "كم تكلفة Odoo في السعودية؟ دليل واضح لميزانية الاشتراك والتطبيق",
      seoTitle: "سعر Odoo في السعودية 2026: الأسعار الرسمية وما يحدد التكلفة",
      description:
        "أسعار Odoo الرسمية في السعودية 2026: باقة Standard من 13.50 دولاراً وCustom من 25.50 دولاراً للمستخدم شهرياً، مع تكلفة التطبيق والدعم وكيف تقدّر ميزانيتك.",
      category: "Odoo",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "«كم سعر Odoo؟» هو أول سؤال يطرحه كل مدير يفكر في نظام ERP، والجواب الدقيق يعتمد على ثلاثة بنود منفصلة: اشتراك Odoo نفسه، وتكلفة التطبيق والتهيئة، والدعم بعد الإطلاق. الخلط بين هذه البنود هو السبب الأكثر شيوعاً لتجاوز الميزانية.",
        },
        { type: "h2", text: "البند الأول: اشتراك Odoo" },
        {
          type: "p",
          text: "تبيع Odoo اشتراكها بالمستخدم شهرياً، والسعر يختلف حسب الدولة. هذه الأسعار الرسمية المعروضة للسعودية على صفحة أسعار Odoo بالدولار الأمريكي، في نوفمبر 2026:",
        },
        {
          type: "table",
          head: ["الباقة", "الدفع السنوي (السنة الأولى)", "الدفع السنوي (بعد التجديد)", "الدفع الشهري"],
          rows: [
            ["تطبيق واحد مجاني", "0 دولار", "0 دولار", "0 دولار"],
            ["قياسي (Standard)", "13.50 دولار ≈ 50.6 ريال", "16.90 دولار ≈ 63.4 ريال", "16.90 دولار (21.10 بعد العرض)"],
            ["مخصص (Custom)", "25.50 دولار ≈ 95.6 ريال", "32.00 دولار ≈ 120 ريال", "32.00 دولار (40.00 بعد العرض)"],
          ],
          caption: "السعر للمستخدم الواحد شهرياً. التحويل إلى الريال بسعر 3.75. المصدر: odoo.com/ar/pricing، نوفمبر 2026. الأسعار قابلة للتغيير، وتأكد من ضريبة القيمة المضافة عند الطلب.",
        },
        {
          type: "p",
          text: "مثال: شركة بعشرة مستخدمين على باقة Custom بالدفع السنوي تدفع نحو 3,060 دولاراً (≈ 11,475 ريالاً) في السنة الأولى، ونحو 3,840 دولاراً (≈ 14,400 ريال) سنوياً بعد التجديد. وعلى باقة Standard: نحو 1,620 دولاراً (≈ 6,075 ريالاً) ثم 2,028 دولاراً (≈ 7,605 ريالات).",
        },
        {
          type: "ul",
          items: [
            "تطبيق واحد مجاناً: تطبيق واحد فقط بعدد مستخدمين غير محدود على Odoo Online، ويناسب التجربة لا التشغيل الكامل.",
            "باقة Standard: كل تطبيقات Odoo على السحابة (Odoo Online)، ولا تسمح بتثبيت وحدات برمجية مخصصة.",
            "باقة Custom: تضيف الاستوديو والذكاء الاصطناعي، وتعدد الشركات، والواجهة البرمجية الخارجية (API)، والاستضافة على Odoo.sh أو على خوادمك، وتثبيت وحدات مخصصة وتكاملات خاصة.",
            "المستخدم هو من يدخل النظام فعلياً؛ أما العملاء والموردون الذين يستخدمون بوابة العملاء فلا يُحتسبون مستخدمين.",
          ],
        },
        {
          type: "note",
          text: "انتبه لخصم السنة الأولى: سعر الاشتراك في السنة الأولى مخفّض للمستخدمين المطلوبين في البداية، ويرتفع عند التجديد بنحو الربع. ابنِ ميزانيتك على سعر التجديد لا على سعر العرض.",
        },
        { type: "h2", text: "Standard أم Custom؟ القرار الذي يغيّر التكلفة" },
        {
          type: "p",
          text: "أهم سؤال هنا: هل تحتاج وحدات مخصصة أو تكاملات غير موجودة في Odoo القياسي؟ ربط أمازون ونون وسلة، أو اعتماد البيع حسب هامش الربح، أو تطبيق خاص للمندوبين، كلها تتطلب وحدات إضافية، وهذه لا تعمل على باقة Standard. شركات التوزيع والتجارة الإلكترونية تحتاج غالباً باقة Custom، والشركات الصغيرة التي تكفيها المبيعات والمخزون والمحاسبة القياسية تكفيها Standard.",
        },
        { type: "h2", text: "البند الثاني: تكلفة التطبيق والتهيئة" },
        {
          type: "p",
          text: "هذا البند يدفعه العميل لشريك Odoo مقابل تحويل النظام من برنامج عام إلى نظام يعمل على طريقة شركتك. لا يوجد سعر ثابت له، لأنه يعتمد على النطاق، وأهم ما يحدده:",
        },
        {
          type: "ol",
          items: [
            "عدد التطبيقات المطلوبة: المبيعات والمخزون والمحاسبة أبسط بكثير من إضافة التصنيع والموارد البشرية ونقاط البيع.",
            "عدد الفروع والمستودعات والشركات، فكل مستودع وفرع يضيف إعدادات ومسارات.",
            "ترحيل البيانات: نقل الأصناف والعملاء والأرصدة الافتتاحية من نظامك الحالي، وحالة هذه البيانات ونظافتها.",
            "التكاملات: كل منصة بيع أو شركة شحن أو جهاز بصمة يُربط بالنظام.",
            "التخصيص: تقارير خاصة، ونماذج فواتير وعروض أسعار مطبوعة، وسير اعتماد خاص بشركتك.",
            "الربط مع منصة فاتورة (هيئة الزكاة والضريبة والجمارك)، وعدد نقاط البيع التي تصدر فواتير مبسطة.",
            "التدريب: عدد الأقسام والموظفين ومدة التدريب.",
          ],
        },
        { type: "h2", text: "البند الثالث: الدعم بعد الإطلاق" },
        {
          type: "p",
          text: "بعد التشغيل ستحتاج من يجيب عن أسئلة الموظفين، ويعالج الفواتير المرفوضة من منصة فاتورة، ويضيف تقريراً أو يعدّل إجراءً. يُقدَّم الدعم عادة بباقة شهرية بعدد ساعات وزمن استجابة محددين. شركة تعمل بلا دعم بعد الإطلاق تعود غالباً إلى ملفات Excel خلال أشهر.",
        },
        { type: "h2", text: "كيف تقدّر ميزانيتك قبل التعاقد" },
        {
          type: "ul",
          items: [
            "عدّ المستخدمين الفعليين الذين سيدخلون النظام، لا كل موظفي الشركة.",
            "حدد التطبيقات التي تحتاجها في السنة الأولى، وأجّل الباقي إلى مرحلة ثانية.",
            "اكتب قائمة بالتكاملات: منصات البيع، والشحن، والدفع، والبصمة.",
            "اطلب من الشريك عرضاً يفصل البنود الثلاثة: الاشتراك، والتطبيق، والدعم.",
            "احسب الاشتراك على سعر التجديد، وأضف هامشاً للمستخدمين الذين ستضيفهم خلال السنة.",
          ],
        },
        {
          type: "note",
          text: "في وردلي تيكنولوجيز نعطيك في الاستشارة المجانية تقديراً أولياً يفصل الاشتراك والتطبيق والدعم، بناءً على عدد مستخدميك وتطبيقاتك وتكاملاتك الفعلية، قبل أي التزام.",
        },
      ],
    },
    en: {
      title: "How much does Odoo cost in Saudi Arabia? A clear guide to subscription and implementation budgets",
      seoTitle: "Odoo price in Saudi Arabia 2026: official plans and costs",
      description:
        "Official Odoo prices for Saudi Arabia in 2026: Standard from $13.50 and Custom from $25.50 per user per month, plus implementation and support costs.",
      category: "Odoo",
      readMinutes: 6,
      body: [
        {
          type: "p",
          text: "\"How much is Odoo?\" is the first question every manager asks about an ERP, and the honest answer depends on three separate items: the Odoo subscription itself, implementation and configuration, and support after go-live. Mixing them up is the most common reason budgets overrun.",
        },
        { type: "h2", text: "Item one: the Odoo subscription" },
        {
          type: "p",
          text: "Odoo sells its subscription per user per month, and the price varies by country. These are the official prices shown for Saudi Arabia on Odoo's pricing page, in US dollars, in November 2026:",
        },
        {
          type: "table",
          head: ["Plan", "Yearly (first year)", "Yearly (renewal)", "Monthly"],
          rows: [
            ["One App Free", "$0", "$0", "$0"],
            ["Standard", "$13.50 ≈ SAR 50.6", "$16.90 ≈ SAR 63.4", "$16.90 ($21.10 after offer)"],
            ["Custom", "$25.50 ≈ SAR 95.6", "$32.00 ≈ SAR 120", "$32.00 ($40.00 after offer)"],
          ],
          caption: "Per user per month. Converted at SAR 3.75 per USD. Source: odoo.com/ar/pricing, November 2026. Prices may change; confirm VAT when ordering.",
        },
        {
          type: "p",
          text: "Example: a company with ten users on Custom, billed yearly, pays about $3,060 (≈ SAR 11,475) in year one and about $3,840 (≈ SAR 14,400) a year after renewal. On Standard: about $1,620 (≈ SAR 6,075), then $2,028 (≈ SAR 7,605).",
        },
        {
          type: "ul",
          items: [
            "One App Free: a single app with unlimited users on Odoo Online, suitable for trying Odoo rather than running the business.",
            "Standard: all Odoo apps on Odoo Online, without custom modules.",
            "Custom: adds Studio and AI, multi-company, the external API, hosting on Odoo.sh or your own servers, and custom modules and integrations.",
            "A user is someone who logs into the system; customers and suppliers using the portal are not counted as users.",
          ],
        },
        {
          type: "note",
          text: "Watch the first-year discount: the first-year price applies to the users ordered at the start and rises at renewal by roughly a quarter. Budget on the renewal price, not the promotional one.",
        },
        { type: "h2", text: "Standard or Custom? The decision that changes the cost" },
        {
          type: "p",
          text: "The key question is whether you need custom modules or integrations that standard Odoo doesn't include. Connecting Amazon, noon and Salla, margin-based sales approval, or a dedicated sales-rep app all require extra modules, and these don't run on Standard. Distributors and e-commerce businesses usually need Custom; small companies that only need standard sales, inventory and accounting can stay on Standard.",
        },
        { type: "h2", text: "Item two: implementation and configuration" },
        {
          type: "p",
          text: "This is what you pay an Odoo partner to turn a general product into a system that works the way your company does. There's no fixed price, because it depends on scope. The main drivers are:",
        },
        {
          type: "ol",
          items: [
            "Number of apps: sales, inventory and accounting are far simpler than adding manufacturing, HR and point of sale.",
            "Number of branches, warehouses and companies; each adds settings and routes.",
            "Data migration: moving items, customers and opening balances from your current system, and how clean that data is.",
            "Integrations: every sales channel, courier or attendance device connected to the system.",
            "Customisation: special reports, printed invoice and quotation layouts, and approval flows specific to your company.",
            "Connecting to ZATCA's Fatoora platform, and the number of points of sale issuing simplified invoices.",
            "Training: number of departments and staff, and training duration.",
          ],
        },
        { type: "h2", text: "Item three: support after go-live" },
        {
          type: "p",
          text: "After go-live you'll need someone to answer staff questions, handle invoices rejected by Fatoora, and add a report or adjust a process. Support is usually a monthly package with set hours and response times. Companies that run without support often drift back to Excel within months.",
        },
        { type: "h2", text: "How to estimate your budget before signing" },
        {
          type: "ul",
          items: [
            "Count the people who will actually log in, not every employee.",
            "Pick the apps you need in year one and leave the rest for a second phase.",
            "List your integrations: sales channels, couriers, payments and attendance.",
            "Ask your partner for a quote that separates subscription, implementation and support.",
            "Calculate the subscription at the renewal price and allow for users you'll add during the year.",
          ],
        },
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
    related: { label: { ar: "صفحة التكاملات", en: "Integrations page" }, href: "/integrations" },
    ar: {
      title: "ربط متجر سلة مع Odoo: المنتجات والطلبات والمخزون والفواتير في نظام واحد",
      seoTitle: "ربط سلة مع Odoo: دليل عملي للتجار",
      description:
        "كيف يعمل ربط متجر سلة مع نظام Odoo: مزامنة المنتجات والمخزون، واستيراد الطلبات، وتحديث حالتها، والفوترة المتوافقة مع فاتورة، مع خطوات التطبيق والأخطاء الشائعة.",
      category: "التجارة الإلكترونية",
      readMinutes: 5,
      body: [
        {
          type: "p",
          text: "سلة منصة ممتازة لعرض منتجاتك واستقبال الطلبات، لكنها ليست نظاماً لإدارة المستودع والمشتريات والمحاسبة. عندما يكبر متجرك تظهر الفجوة: طلبات تُنقل يدوياً إلى البرنامج المحاسبي، ومخزون في سلة لا يطابق المستودع، وفواتير تُصدر من مكانين. ربط سلة مع Odoo يغلق هذه الفجوة.",
        },
        { type: "h2", text: "ماذا يُزامَن بين سلة وOdoo؟" },
        {
          type: "ul",
          items: [
            "التصنيفات والعلامات التجارية: تُدار من مكان واحد وتنعكس على الطرف الآخر.",
            "المنتجات: تُستورد من سلة إلى Odoo عند البداية، ثم يمكن إدارتها من Odoo وتصديرها إلى سلة.",
            "العملاء: يُنشأ عميل سلة في Odoo مع أول طلب، فتجتمع مشترياته وتاريخه في ملف واحد.",
            "الطلبات: تدخل Odoo كأوامر بيع، فيبدأ المستودع التجهيز مباشرة.",
            "حالة الطلب: عندما يُشحن الطلب في Odoo تتحدث حالته في سلة تلقائياً، فيرى العميل التحديث.",
          ],
        },
        { type: "h2", text: "كيف يعمل الربط تقنياً، بلغة بسيطة" },
        {
          type: "p",
          text: "يتم الربط عبر واجهات سلة الرسمية للتجار. تمنح Odoo صلاحية الوصول لمتجرك بموافقتك من لوحة سلة، وتتجدد هذه الصلاحية تلقائياً دون أن تشارك كلمة مرورك. وعندما يحدث شيء في متجرك، كطلب جديد، ترسل سلة إشعاراً يتحقق Odoo من توقيعه قبل قبوله، فلا يستطيع أحد إرسال طلبات مزيفة إلى نظامك.",
        },
        { type: "h2", text: "الفوترة والامتثال لفاتورة" },
        {
          type: "p",
          text: "بعد دخول الطلب إلى Odoo تصدر الفاتورة من النظام نفسه، بالرقم الضريبي ورمز QR، وتُرسل إلى منصة فاتورة عند الحاجة. بذلك تصبح كل مبيعات متجرك الإلكتروني في السجلات المحاسبية نفسها التي تضم مبيعات الفروع والجملة، ويُستخرج إقرار ضريبة القيمة المضافة من مكان واحد.",
        },
        { type: "h2", text: "خطوات التطبيق" },
        {
          type: "ol",
          items: [
            "مراجعة المتجر: عدد المنتجات، والخيارات (المقاسات والألوان)، وطرق الدفع والشحن المستخدمة.",
            "توحيد رموز الأصناف (SKU) بين سلة وOdoo، وهي الخطوة الأهم.",
            "تثبيت الربط ومنح الصلاحية من لوحة سلة.",
            "الاستيراد الأولي للتصنيفات والمنتجات والعملاء.",
            "تجربة دورة كاملة: طلب تجريبي، ثم تجهيز وشحن وفاتورة، ثم مراجعة حالة الطلب في سلة.",
            "التشغيل الفعلي ومراجعة سجل المزامنة يومياً في الأسبوعين الأولين.",
          ],
        },
        { type: "h2", text: "أخطاء شائعة تجنّبها" },
        {
          type: "ul",
          items: [
            "منتجات بلا رموز أصناف، أو برموز مكررة، فتفشل المطابقة.",
            "إدارة الأسعار والمخزون من سلة وOdoo معاً؛ حدّد مصدراً واحداً لكل معلومة.",
            "تجاهل المنتجات ذات الخيارات، فكل خيار صنف مستقل في المخزون.",
            "نسيان طرق الدفع عند الاستلام، فتحتاج معالجة محاسبية مختلفة عن الدفع المسبق.",
          ],
        },
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
        "How a Salla store connects to Odoo: product and stock sync, order import, status updates and ZATCA-compliant invoicing, plus implementation steps.",
      category: "E-commerce",
      readMinutes: 5,
      body: [
        {
          type: "p",
          text: "Salla is an excellent platform for showcasing products and taking orders, but it isn't a system for running your warehouse, purchasing and accounting. As your store grows the gap shows: orders retyped into the accounting software, Salla stock that doesn't match the warehouse, and invoices issued from two places. Connecting Salla to Odoo closes that gap.",
        },
        { type: "h2", text: "What syncs between Salla and Odoo?" },
        {
          type: "ul",
          items: [
            "Categories and brands: managed in one place and reflected on the other side.",
            "Products: imported from Salla into Odoo at the start, then managed in Odoo and exported to Salla.",
            "Customers: a Salla customer is created in Odoo with their first order, so their history sits in one record.",
            "Orders: arrive in Odoo as sales orders, so the warehouse can start picking immediately.",
            "Order status: when an order ships in Odoo, its status updates in Salla automatically and the customer sees it.",
          ],
        },
        { type: "h2", text: "How the connection works, in plain terms" },
        {
          type: "p",
          text: "The connection uses Salla's official merchant APIs. You grant Odoo access to your store from the Salla dashboard, and that access renews automatically without sharing your password. When something happens in your store, such as a new order, Salla sends a notification whose signature Odoo verifies before accepting it, so nobody can push fake orders into your system.",
        },
        { type: "h2", text: "Invoicing and Fatoora compliance" },
        {
          type: "p",
          text: "Once the order is in Odoo, the invoice is issued from the same system with your VAT number and QR code, and sent to the Fatoora platform when required. All your online sales sit in the same accounting records as your branch and wholesale sales, and your VAT return comes from one place.",
        },
        { type: "h2", text: "Implementation steps" },
        {
          type: "ol",
          items: [
            "Review the store: number of products, variants (sizes and colours), and the payment and shipping methods used.",
            "Align item codes (SKUs) between Salla and Odoo; this is the most important step.",
            "Install the connector and grant access from the Salla dashboard.",
            "Initial import of categories, products and customers.",
            "Test a full cycle: a test order, then picking, shipping and invoicing, then check the order status in Salla.",
            "Go live and review the sync log daily for the first two weeks.",
          ],
        },
        { type: "h2", text: "Common mistakes to avoid" },
        {
          type: "ul",
          items: [
            "Products without item codes, or with duplicates, so matching fails.",
            "Managing prices and stock in both Salla and Odoo; pick one source for each piece of data.",
            "Ignoring variants: every variant is its own stock item.",
            "Forgetting cash on delivery, which needs different accounting treatment from prepaid orders.",
          ],
        },
        {
          type: "note",
          text: "Our Salla integration uses Salla's official APIs and runs on your own store account, with access you can revoke at any time from the Salla dashboard.",
        },
      ],
    },
  },
  // -------------------------------------------------------------------
  {
    slug: "change-odoo-partner",
    date: "2026-11-07",
    related: { label: { ar: "دعم أنظمة Odoo القائمة", en: "Support for existing Odoo systems" }, href: "/odoo-support" },
    ar: {
      title: "كيف تغيّر شريك Odoo دون أن تخسر بياناتك أو تتوقف أعمالك",
      seoTitle: "تغيير شريك Odoo: الخطوات وقائمة الاستلام الكاملة",
      description:
        "دليل عملي لتغيير شريك Odoo: ما تقوله اتفاقية Odoo الرسمية، وما يجب أن تستلمه من الشريك الحالي، وخطوات الانتقال بالترتيب حسب نوع الاستضافة، والأخطاء التي تكلّف الشركات بياناتها.",
      category: "إدارة النظام",
      readMinutes: 7,
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
      readMinutes: 7,
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
        {
          type: "note",
          text: "We help companies already running Odoo review their systems and fix their issues, and organise the switch when they decide to change partner. We start with a free review session and treat the previous partner with respect; our goal is a stable system.",
        },
      ],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
