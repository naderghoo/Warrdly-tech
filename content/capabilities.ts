// =====================================================================
// التكاملات والحلول الجاهزة — مبنية على المديولات المطوّرة داخلياً
// Integrations & ready-built solutions — based on in-house Odoo modules
// =====================================================================

type Item = { key: string; name: string; tag: string; text: string; features: string[] };
type Group = { id: string; icon: string; title: string; text: string; items: Item[] };

export type Capabilities = {
  integrations: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    stats: { value: string; label: string }[];
    groups: Group[];
    howTitle: string;
    how: { title: string; text: string }[];
    ctaTitle: string;
    ctaText: string;
  };
  addons: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    groups: Group[];
    ctaTitle: string;
    ctaText: string;
  };
  home: {
    eyebrow: string;
    title: string;
    text: string;
    channels: string[];
    cta: string;
    addonsEyebrow: string;
    addonsTitle: string;
    addonsText: string;
    addonsCta: string;
  };
  nav: { integrations: string; addons: string };
};

export const capAr: Capabilities = {
  nav: { integrations: "التكاملات", addons: "حلولنا الجاهزة" },
  home: {
    eyebrow: "المنصات والتكاملات",
    title: "كل قنوات بيعك في مخزون واحد",
    text: "نربط Odoo بمنصات البيع الكبرى في السعودية والخليج، فتصل الطلبات تلقائياً، ويتحدّث المخزون والأسعار على كل منصة من مكان واحد. هذه التكاملات طوّرناها ونشغّلها يومياً في أعمالنا.",
    channels: ["أمازون", "نون", "ترينديول", "سلة", "زد", "وردلي B2B", "Google Shopping", "أرامكس", "J&T Express"],
    cta: "تفاصيل التكاملات",
    addonsEyebrow: "حلول طوّرناها",
    addonsTitle: "أدوات جاهزة تضيفها إلى Odoo",
    addonsText: "مديولات بنيناها لاحتياجات شركات التوزيع في السعودية، ونستخدمها في عملياتنا اليومية قبل أن نقدمها لعملائنا.",
    addonsCta: "استعرض الحلول الجاهزة",
  },
  integrations: {
    metaTitle: "تكاملات Odoo مع أمازون ونون وترينديول وسلة وزد",
    metaDescription:
      "نربط Odoo بأمازون ونون وترينديول وسلة وزد ووردلي، وبشركات الشحن أرامكس وJ&T: مزامنة المخزون والأسعار واستيراد الطلبات والمرتجعات تلقائياً.",
    eyebrow: "التكاملات",
    title: "اربط Odoo بكل منصة تبيع عليها",
    intro:
      "طوّرنا تكاملات Odoo مع أهم منصات التجارة الإلكترونية وشركات الشحن في السعودية، ونشغّلها يومياً في أعمالنا. النتيجة: مخزون واحد، وأسعار موحّدة، وطلبات تدخل النظام دون إدخال يدوي.",
    stats: [
      { value: "٧", label: "منصات بيع ومتاجر" },
      { value: "٢", label: "شركات شحن" },
      { value: "١", label: "مخزون موحّد لكل القنوات" },
    ],
    groups: [
      {
        id: "marketplaces",
        icon: "store",
        title: "الأسواق الإلكترونية",
        text: "أمازون ونون وترينديول في نظام واحد، مع مخزون وأسعار متزامنة.",
        items: [
          {
            key: "amazon",
            name: "أمازون",
            tag: "Amazon",
            text: "تكامل مخصص يغطي البيع عبر مستودعات أمازون (FBA) والشحن من مستودعك (FBM).",
            features: [
              "فصل مستودعات FBA وFBM في Odoo",
              "مزامنة المخزون مع حد أدنى قابل للضبط لخدمة Flex",
              "تتبّع التشغيلات والأرقام التسلسلية لشحنات FBA",
              "إنشاء المرتجعات تلقائياً عند إلغاء الطلب في أمازون",
              "تحويل طلبات السحب من أمازون إلى إيصالات استلام في المستودع",
            ],
          },
          {
            key: "noon",
            name: "نون",
            tag: "noon",
            text: "تكامل حديث مع واجهات بائعي نون يشمل المنتجات والأسعار والطلبات والشحنات.",
            features: [
              "مطابقة منتجات نون مع أصناف Odoo وربطها",
              "مزامنة المخزون والأسعار عبر قوائم أسعار مخصصة",
              "إعادة التسعير ومتابعة سجل صندوق الشراء (Buy Box)",
              "استيراد الطلبات وإدارة الشحنات ومرتجعات نون",
              "شحنات التخزين لدى نون (FBN) وربط المستودعات",
              "لوحة متابعة وسجل كامل لعمليات المزامنة",
            ],
          },
          {
            key: "trendyol",
            name: "ترينديول",
            tag: "Trendyol",
            text: "ربط متكامل مع منصة ترينديول مع لوحة بائع تفاعلية داخل Odoo.",
            features: [
              "مزامنة المنتجات في الاتجاهين",
              "إدارة الطلبات مباشرة عبر واجهة ترينديول",
              "لوحة بائع تفاعلية لحظية",
              "سجل كامل للطلبات والردود لتتبّع أي خطأ",
            ],
          },
        ],
      },
      {
        id: "stores",
        icon: "globe",
        title: "المتاجر الإلكترونية والقنوات الرقمية",
        text: "متجرك على سلة أو زد، ومنصة الجملة وردلي، ومنتجاتك على Google.",
        items: [
          {
            key: "salla",
            name: "سلة",
            tag: "Salla",
            text: "تطبيق ربط رسمي عبر واجهات سلة للتجار، مع مزامنة في الاتجاهين.",
            features: [
              "ربط آمن عبر OAuth مع تجديد تلقائي للصلاحيات",
              "استيراد التصنيفات والعملاء والمنتجات والطلبات",
              "تصدير المنتجات والتصنيفات من Odoo إلى سلة",
              "تحديث حالة الطلب في سلة من Odoo تلقائياً",
              "مزامنة العلامات التجارية والتحقق من توقيع الإشعارات",
            ],
          },
          {
            key: "zid",
            name: "زد",
            tag: "Zid",
            text: "ربط متجرك على زد بـ Odoo ليعمل على مخزون واحد مع بقية قنواتك.",
            features: [
              "استيراد الطلبات تلقائياً إلى Odoo",
              "مزامنة المخزون والأسعار مع المتجر",
              "فوترة متوافقة مع فاتورة لكل طلب",
            ],
          },
          {
            key: "warrdly",
            name: "وردلي B2B",
            tag: "Warrdly",
            text: "ربط مباشر مع منصة الجملة وردلي لبيع منتجات الصحة والجمال للمحلات والصيدليات.",
            features: [
              "مزامنة لحظية للمخزون والأسعار",
              "استيراد الطلبات تلقائياً عبر إشعارات موقّعة",
              "مزامنة احتياطية مجدولة للطلبات",
              "تحديث حالة الشحن مع رقم التتبّع",
            ],
          },
          {
            key: "google",
            name: "Google Merchant Center",
            tag: "Google Shopping",
            text: "اعرض منتجاتك في Google Shopping مباشرة من Odoo.",
            features: [
              "ربط آمن بحساب Google عبر OAuth",
              "مطابقة حقول المنتج مع متطلبات Google",
              "رفع المنتجات دفعة واحدة ومزامنتها لحظياً",
            ],
          },
        ],
      },
      {
        id: "shipping",
        icon: "truck",
        title: "شركات الشحن",
        text: "أسعار الشحن والبوالص والتتبّع من داخل أمر التسليم.",
        items: [
          {
            key: "aramex",
            name: "أرامكس",
            tag: "Aramex",
            text: "أرامكس كطريقة شحن داخل Odoo.",
            features: [
              "سعر شحن مباشر حسب الوزن ومدينة الوجهة",
              "إنشاء البوليصة والملصق من أمر التسليم",
              "رابط التتبّع في أمر التسليم وفي تطبيق العميل",
            ],
          },
          {
            key: "jt",
            name: "J&T Express",
            tag: "J&T",
            text: "J&T Express السعودية كطريقة شحن داخل Odoo.",
            features: [
              "تسعير تعاقدي حسب الوزن في عروض الأسعار",
              "إنشاء البوليصة تلقائياً عند تأكيد التسليم مع ملف PDF",
              "شحن عشرات الطلبات وطباعة بوالصها في ملف واحد",
              "إلغاء الشحنة من Odoo ورابط التتبّع",
            ],
          },
        ],
      },
      {
        id: "tools",
        icon: "gear",
        title: "التواصل والأدوات",
        text: "تكاملات تكمل يوم العمل داخل Odoo.",
        items: [
          {
            key: "whatsapp",
            name: "واتساب",
            tag: "WhatsApp",
            text: "تواصل مع العملاء من داخل Odoo.",
            features: [
              "إرسال الفواتير وعروض الأسعار وإشعارات الطلبات",
              "رسائل آلية مرتبطة بأحداث النظام",
              "حملات تسويقية للعملاء",
            ],
          },
          {
            key: "onedrive",
            name: "Microsoft OneDrive",
            tag: "OneDrive",
            text: "حفظ مرفقات Odoo في OneDrive تلقائياً.",
            features: [
              "ربط بنقرة واحدة مع حساب Microsoft",
              "مزامنة في الخلفية دون إبطاء النظام",
              "لوحة متابعة للمزامنة وإعادة المحاولة",
            ],
          },
          {
            key: "zk",
            name: "أجهزة البصمة",
            tag: "ZKTeco",
            text: "ربط أجهزة الحضور بالبصمة والوجه مع Odoo.",
            features: ["سحب الحضور والانصراف تلقائياً", "ربط مباشر بالرواتب والإجازات"],
          },
        ],
      },
    ],
    howTitle: "كيف ننفذ التكامل",
    how: [
      { title: "مراجعة الحسابات", text: "نراجع حساباتك على المنصات وطريقة شحنك ومستودعاتك." },
      { title: "ربط المنتجات", text: "نطابق منتجات كل منصة مع أصناف Odoo مرة واحدة." },
      { title: "تشغيل تجريبي", text: "نختبر الطلبات والمخزون والأسعار على بيئة تجريبية." },
      { title: "التشغيل والمتابعة", text: "نطلق التكامل ونتابع سجل المزامنة حتى يستقر." },
    ],
    ctaTitle: "تبيع على أكثر من منصة؟",
    ctaText: "أخبرنا بالمنصات التي تبيع عليها، ونقترح عليك خطة الربط المناسبة.",
  },
  addons: {
    metaTitle: "حلول Odoo جاهزة لشركات التوزيع",
    metaDescription:
      "مديولات Odoo طوّرناها لشركات التوزيع في السعودية: اعتماد البيع حسب هامش الربح، توقّع المشتريات، الجرد الآمن، تقييم الأداء، وتطبيقات الجوال.",
    eyebrow: "حلولنا الجاهزة",
    title: "أدوات طوّرناها لأننا احتجناها",
    intro:
      "كل حل في هذه الصفحة بدأ بمشكلة واجهناها في شركة توزيع حقيقية. بنيناه على Odoo، وشغّلناه في عملياتنا اليومية، ثم أصبح جاهزاً لعملائنا.",
    note: "نهيّئ كل حل على طريقة عمل شركتك، ويمكن تطويره حسب احتياجك.",
    groups: [
      {
        id: "sales",
        icon: "shield",
        title: "المبيعات والتحكم في الائتمان",
        text: "حماية هامش الربح والتحصيل قبل أن تحدث المشكلة.",
        items: [
          {
            key: "margin",
            name: "اعتماد البيع حسب هامش الربح",
            tag: "Sale Price Restriction",
            text: "يمنع البيع بأقل من الهامش المسموح دون موافقة.",
            features: [
              "مستويات اعتماد حسب نسبة الربح في عرض السعر",
              "موافقة المشرف أو الإدارة حسب الهامش",
              "منع البيع بأقل من التكلفة دون اعتماد الإدارة",
            ],
          },
          {
            key: "commitment",
            name: "تعهّد المندوب بالتحصيل",
            tag: "Payment Commitment",
            text: "المندوب يوقّع تعهّد التحصيل قبل تأكيد الطلب الآجل.",
            features: ["توقيع إلكتروني داخل الطلب", "ربط المسؤولية بالمندوب", "متابعة الالتزام بالتحصيل"],
          },
          {
            key: "credit",
            name: "التحليل المالي للعملاء",
            tag: "Customer Financial Analysis",
            text: "صورة كاملة عن كل عميل قبل أن تمنحه ائتماناً.",
            features: [
              "ربحية كل عميل ومبيعاته",
              "أعمار الديون وسلوك السداد",
              "تقييم مخاطر الائتمان",
              "تنبيهات وتقارير آلية",
            ],
          },
          {
            key: "salesreports",
            name: "تقارير المبيعات والتحصيل",
            tag: "Sales Reports",
            text: "تقارير احترافية لكل مندوب ولكل علامة تجارية.",
            features: [
              "تقرير شخصي لكل مندوب مبني على الفواتير المعتمدة",
              "متابعة المستهدف والإنجاز والتحصيل",
              "تصدير PDF وExcel مع رسوم بيانية",
            ],
          },
        ],
      },
      {
        id: "inventory",
        icon: "box",
        title: "المخزون والمشتريات",
        text: "مخزون دقيق ومشتريات مبنية على البيانات، لا على التخمين.",
        items: [
          {
            key: "count",
            name: "الجرد الآمن",
            tag: "Inventory Count",
            text: "جرد المستودعات بطريقة تمنع التلاعب وتكشف الفروقات.",
            features: [
              "جرد أعمى لا يرى فيه العامل الكمية المسجّلة",
              "جرد مع تجميد الحركة، أو جرد أثناء التشغيل",
              "قراءة بالباركود مع التشغيلات وتواريخ الصلاحية",
              "تقارير فروقات حسب العلامة التجارية",
            ],
          },
          {
            key: "forecast",
            name: "توقّع المشتريات",
            tag: "Purchase Forecast",
            text: "يحسب ما تحتاج شراءه ومتى، ثم يجهّز طلبات الشراء.",
            features: [
              "مبني على متوسط المبيعات اليومية والمخزون الحالي",
              "يراعي مدة توريد المورد ومخزون الأمان",
              "تحليل تفصيلي لكل صنف",
              "إنشاء طلبات عروض أسعار للموردين بنقرة",
            ],
          },
        ],
      },
      {
        id: "teams",
        icon: "cap",
        title: "الموظفون والفرق الميدانية",
        text: "حضور ومهام وأداء يُقاس من البيانات الفعلية في Odoo.",
        items: [
          {
            key: "portal",
            name: "تطبيق الموظف",
            tag: "Employee Portal",
            text: "تطبيق جوال للموظفين والمناديب مرتبط بـ Odoo.",
            features: [
              "حضور من الجوال مع التحقق برمز QR لموقع العمل",
              "تتبّع مسار المندوبين الميدانيين",
              "المهام والطلبات والموافقات من الجوال",
              "مؤشرات أداء المبيعات لكل مندوب",
            ],
          },
          {
            key: "kpi",
            name: "تقييم الأداء بالمؤشرات",
            tag: "KPI",
            text: "نظام تقييم أداء مبني على مؤشرات تُحسب تلقائياً من Odoo.",
            features: [
              "قوالب جاهزة لسبعة أقسام",
              "أكثر من ٧٠ مؤشراً تُحسب تلقائياً",
              "تقييم ذاتي ثم مراجعة المدير واعتماد الموارد البشرية",
              "سلّم حوافز مرتبط بالرواتب",
            ],
          },
          {
            key: "tasks",
            name: "إدارة المهام اليومية",
            tag: "Task Management",
            text: "مهام روتينية تُنشأ تلقائياً ومتابعة حتى الإنجاز.",
            features: [
              "توليد المهام اليومية من قوالب معتمدة",
              "مسار عمل من ثماني مراحل مع اعتماد المراجع",
              "تذكيرات وتصعيد تلقائي",
            ],
          },
        ],
      },
      {
        id: "b2b",
        icon: "chat",
        title: "تطبيقات الجوال والبيع لقطاع الأعمال",
        text: "اجعل عملاءك من المحلات والصيدليات يطلبون مباشرة.",
        items: [
          {
            key: "b2bapp",
            name: "تطبيق B2B لعملاء الجملة",
            tag: "B2B Mobile App",
            text: "تطبيق جوال لعملائك مرتبط مباشرة بـ Odoo.",
            features: [
              "كتالوج وسلة وطلبات بأسعار العميل",
              "المرتجعات وكشف الحساب",
              "الإشعارات والعروض",
              "الدفع الإلكتروني وتتبّع الشحنة",
            ],
          },
          {
            key: "signup",
            name: "تسجيل عملاء الجملة",
            tag: "B2B Signup (KSA)",
            text: "تسجيل الأفراد والمنشآت في موقعك بحقول سعودية.",
            features: ["السجل التجاري والرقم الضريبي", "تحقق من صحة البيانات", "اعتماد العميل قبل تفعيل الأسعار"],
          },
        ],
      },
    ],
    ctaTitle: "تحتاج أداة غير موجودة هنا؟",
    ctaText: "أخبرنا بالمشكلة، ونخبرك كيف نحلها في Odoo.",
  },
};

export const capEn: Capabilities = {
  nav: { integrations: "Integrations", addons: "Ready-built solutions" },
  home: {
    eyebrow: "Platforms & integrations",
    title: "Every sales channel on one inventory",
    text: "We connect Odoo to the major marketplaces in Saudi Arabia and the Gulf, so orders flow in automatically and stock and prices update on every platform from one place. We built these integrations and run them every day in our own business.",
    channels: ["Amazon", "noon", "Trendyol", "Salla", "Zid", "Warrdly B2B", "Google Shopping", "Aramex", "J&T Express"],
    cta: "Integration details",
    addonsEyebrow: "Built by us",
    addonsTitle: "Ready-made tools you can add to Odoo",
    addonsText: "Modules we built for Saudi distribution companies and use in our own daily operations before offering them to clients.",
    addonsCta: "Browse ready-built solutions",
  },
  integrations: {
    metaTitle: "Odoo integrations with Amazon, noon, Trendyol, Salla and Zid",
    metaDescription:
      "We connect Odoo to Amazon, noon, Trendyol, Salla, Zid and Warrdly, plus Aramex and J&T shipping: automatic stock and price sync, order and return import.",
    eyebrow: "Integrations",
    title: "Connect Odoo to every platform you sell on",
    intro:
      "We built Odoo integrations with the leading e-commerce platforms and couriers in Saudi Arabia, and we run them every day in our own business. The result: one inventory, consistent prices, and orders that reach the system with no manual entry.",
    stats: [
      { value: "7", label: "Marketplaces & stores" },
      { value: "2", label: "Couriers" },
      { value: "1", label: "Inventory for every channel" },
    ],
    groups: [
      {
        id: "marketplaces",
        icon: "store",
        title: "Marketplaces",
        text: "Amazon, noon and Trendyol in one system, with stock and prices in sync.",
        items: [
          {
            key: "amazon",
            name: "Amazon",
            tag: "Amazon",
            text: "A custom integration covering Fulfilled by Amazon (FBA) and merchant-fulfilled (FBM) sales.",
            features: [
              "Separate FBA and FBM warehouses in Odoo",
              "Inventory sync with a configurable Flex minimum",
              "Lot and serial number handling for FBA shipments",
              "Automatic returns when an order is cancelled on Amazon",
              "Amazon removal orders converted to warehouse receipts",
            ],
          },
          {
            key: "noon",
            name: "noon",
            tag: "noon",
            text: "A modern integration with the noon seller APIs covering products, prices, orders and shipments.",
            features: [
              "Match and link noon listings to Odoo products",
              "Stock and price sync through dedicated price lists",
              "Repricing and Buy Box history tracking",
              "Order import, shipments and noon returns",
              "Fulfilled by noon (FBN) shipments and warehouse mapping",
              "Sync dashboard with a full activity log",
            ],
          },
          {
            key: "trendyol",
            name: "Trendyol",
            tag: "Trendyol",
            text: "A full Trendyol integration with an interactive seller dashboard inside Odoo.",
            features: [
              "Two-way product sync",
              "Order management through the Trendyol API",
              "Real-time interactive seller dashboard",
              "Full request/response log for troubleshooting",
            ],
          },
        ],
      },
      {
        id: "stores",
        icon: "globe",
        title: "Online stores & digital channels",
        text: "Your Salla or Zid store, the Warrdly wholesale platform, and your products on Google.",
        items: [
          {
            key: "salla",
            name: "Salla",
            tag: "Salla",
            text: "A connector app built on the Salla merchant APIs, with two-way sync.",
            features: [
              "Secure OAuth connection with automatic token refresh",
              "Import categories, customers, products and orders",
              "Export products and categories from Odoo to Salla",
              "Order status pushed from Odoo to Salla automatically",
              "Brand sync and signed webhook verification",
            ],
          },
          {
            key: "zid",
            name: "Zid",
            tag: "Zid",
            text: "Connect your Zid store to Odoo so it runs on one inventory with your other channels.",
            features: ["Automatic order import into Odoo", "Stock and price sync with the store", "Fatoora-compliant invoicing for every order"],
          },
          {
            key: "warrdly",
            name: "Warrdly B2B",
            tag: "Warrdly",
            text: "A direct connection to the Warrdly wholesale platform for selling health and beauty products to shops and pharmacies.",
            features: [
              "Real-time stock and price sync",
              "Automatic order import through signed webhooks",
              "Scheduled backup order sync",
              "Shipment status updates with tracking numbers",
            ],
          },
          {
            key: "google",
            name: "Google Merchant Center",
            tag: "Google Shopping",
            text: "Show your products on Google Shopping straight from Odoo.",
            features: ["Secure OAuth connection to Google", "Product field mapping to Google requirements", "Batch upload and real-time sync"],
          },
        ],
      },
      {
        id: "shipping",
        icon: "truck",
        title: "Couriers",
        text: "Shipping rates, waybills and tracking from the delivery order.",
        items: [
          {
            key: "aramex",
            name: "Aramex",
            tag: "Aramex",
            text: "Aramex as a shipping method in Odoo.",
            features: [
              "Live shipping rates by weight and destination city",
              "Shipment (AWB) and label created from the delivery order",
              "Tracking link on the delivery order and in the customer app",
            ],
          },
          {
            key: "jt",
            name: "J&T Express",
            tag: "J&T",
            text: "J&T Express Saudi Arabia as a shipping method in Odoo.",
            features: [
              "Contract pricing by weight on quotations",
              "Waybill created automatically on delivery, with PDF attached",
              "Ship dozens of orders and print all waybills in one PDF",
              "Cancellation from Odoo and tracking link",
            ],
          },
        ],
      },
      {
        id: "tools",
        icon: "gear",
        title: "Communication & tools",
        text: "Integrations that round out the working day in Odoo.",
        items: [
          {
            key: "whatsapp",
            name: "WhatsApp",
            tag: "WhatsApp",
            text: "Talk to customers from inside Odoo.",
            features: ["Send invoices, quotations and order notifications", "Automated messages triggered by system events", "Marketing campaigns to customers"],
          },
          {
            key: "onedrive",
            name: "Microsoft OneDrive",
            tag: "OneDrive",
            text: "Store Odoo attachments in OneDrive automatically.",
            features: ["One-click connection to your Microsoft account", "Background sync that doesn't slow the system", "Sync dashboard with retry controls"],
          },
          {
            key: "zk",
            name: "Biometric devices",
            tag: "ZKTeco",
            text: "Connect fingerprint and face attendance devices to Odoo.",
            features: ["Automatic check-in/check-out import", "Linked to payroll and leave"],
          },
        ],
      },
    ],
    howTitle: "How we deliver an integration",
    how: [
      { title: "Account review", text: "We review your platform accounts, fulfilment and warehouses." },
      { title: "Product linking", text: "We match each platform's listings to Odoo products, once." },
      { title: "Test run", text: "We test orders, stock and prices in a sandbox." },
      { title: "Go-live & monitoring", text: "We launch and watch the sync log until it's stable." },
    ],
    ctaTitle: "Selling on more than one platform?",
    ctaText: "Tell us where you sell and we'll recommend the right integration plan.",
  },
  addons: {
    metaTitle: "Ready-built Odoo solutions for distributors",
    metaDescription:
      "Odoo modules we built for Saudi distributors: margin-based sales approval, purchase forecasting, secure stock counts, KPI evaluation and mobile apps.",
    eyebrow: "Ready-built solutions",
    title: "Tools we built because we needed them",
    intro:
      "Every solution on this page started with a problem we faced in a real distribution company. We built it on Odoo, ran it in our own daily operations, and now it's ready for our clients.",
    note: "We configure each solution to how your company works, and can extend it to your needs.",
    groups: [
      {
        id: "sales",
        icon: "shield",
        title: "Sales & credit control",
        text: "Protect margin and collections before problems happen.",
        items: [
          {
            key: "margin",
            name: "Margin-based sales approval",
            tag: "Sale Price Restriction",
            text: "Stops selling below the allowed margin without approval.",
            features: ["Approval levels by quotation margin", "Supervisor or management approval by margin band", "No selling below cost without management approval"],
          },
          {
            key: "commitment",
            name: "Sales rep payment commitment",
            tag: "Payment Commitment",
            text: "Reps sign a collection commitment before confirming a credit order.",
            features: ["Electronic signature on the order", "Clear accountability per rep", "Follow-up on collection commitments"],
          },
          {
            key: "credit",
            name: "Customer financial analysis",
            tag: "Customer Financial Analysis",
            text: "A full picture of every customer before you extend credit.",
            features: ["Profitability and sales per customer", "Aged receivables and payment behaviour", "Credit risk assessment", "Automated reports and alerts"],
          },
          {
            key: "salesreports",
            name: "Sales & collection reports",
            tag: "Sales Reports",
            text: "Professional reports for every rep and every brand.",
            features: ["Personal report per rep based on posted invoices", "Target, achievement and collection tracking", "PDF and Excel export with charts"],
          },
        ],
      },
      {
        id: "inventory",
        icon: "box",
        title: "Inventory & purchasing",
        text: "Accurate stock and data-driven purchasing, not guesswork.",
        items: [
          {
            key: "count",
            name: "Secure stock counts",
            tag: "Inventory Count",
            text: "Warehouse counts that prevent tampering and expose variances.",
            features: ["Blind counts where counters don't see system quantity", "Frozen counts or live counts during operations", "Barcode scanning with lots and expiry dates", "Variance reports by brand"],
          },
          {
            key: "forecast",
            name: "Purchase forecasting",
            tag: "Purchase Forecast",
            text: "Calculates what to buy and when, then prepares the purchase requests.",
            features: ["Based on average daily sales and current stock", "Accounts for vendor lead time and safety stock", "Detailed analysis per product", "One-click RFQs to vendors"],
          },
        ],
      },
      {
        id: "teams",
        icon: "cap",
        title: "Employees & field teams",
        text: "Attendance, tasks and performance measured from real Odoo data.",
        items: [
          {
            key: "portal",
            name: "Employee app",
            tag: "Employee Portal",
            text: "A mobile app for employees and sales reps, connected to Odoo.",
            features: ["Mobile attendance with worksite QR verification", "Route tracking for field reps", "Tasks, requests and approvals from mobile", "Sales KPIs per rep"],
          },
          {
            key: "kpi",
            name: "KPI performance evaluation",
            tag: "KPI",
            text: "Performance reviews built on KPIs computed automatically from Odoo.",
            features: ["Ready templates for seven departments", "70+ KPIs computed automatically", "Self-review, manager review and HR approval", "Incentive ladder linked to payroll"],
          },
          {
            key: "tasks",
            name: "Daily task management",
            tag: "Task Management",
            text: "Routine tasks generated automatically and followed to completion.",
            features: ["Daily tasks generated from approved templates", "Eight-stage workflow with reviewer approval", "Automatic reminders and escalation"],
          },
        ],
      },
      {
        id: "b2b",
        icon: "chat",
        title: "Mobile apps & B2B sales",
        text: "Let your shop and pharmacy customers order directly.",
        items: [
          {
            key: "b2bapp",
            name: "B2B app for wholesale customers",
            tag: "B2B Mobile App",
            text: "A mobile app for your customers, connected directly to Odoo.",
            features: ["Catalog, cart and orders at customer prices", "Returns and account statements", "Notifications and offers", "Online payment and shipment tracking"],
          },
          {
            key: "signup",
            name: "Wholesale customer signup",
            tag: "B2B Signup (KSA)",
            text: "Individual and company signup on your website with Saudi fields.",
            features: ["Commercial registration and VAT number", "Data validation", "Customer approval before prices are unlocked"],
          },
        ],
      },
    ],
    ctaTitle: "Need a tool that isn't listed?",
    ctaText: "Tell us the problem and we'll tell you how we'd solve it in Odoo.",
  },
};

export const getCap = (locale: "ar" | "en") => (locale === "en" ? capEn : capAr);
