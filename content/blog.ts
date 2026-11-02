// =====================================================================
// المدونة — لإضافة مقال: انسخ عنصراً من المصفوفة وعدّل محتواه
// Blog — to add a post, copy an entry in the array and edit it
// =====================================================================

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type PostContent = {
  title: string;
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
            "رقم ضريبي غير صحيح للعميل؛ الرقم الضريبي في المملكة مكوّن من ١٥ رقماً.",
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
        "A practical guide to preparing Odoo for ZATCA Fatoora integration: standard vs simplified invoices, the setup steps, and the common mistakes that get invoices rejected.",
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
        { type: "h2", text: "نصائح من تجربتنا اليومية" },
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
          text: "نحن نبيع على أمازون ونون وترينديول وسلة من Odoo كل يوم، والتكاملات التي نقدمها لعملائنا هي نفسها التي نشغّلها في أعمالنا.",
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
        { type: "h2", text: "Tips from daily operation" },
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
          text: "We sell on Amazon, noon, Trendyol and Salla from Odoo every day. The integrations we offer clients are the same ones we run in our own business.",
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
      title: "كيف تختار نظام ERP لشركة توزيع في السعودية: ١٠ أسئلة قبل أن توقّع",
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
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
