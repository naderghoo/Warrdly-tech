// Privacy policy (AR/EN). Review with your legal adviser before relying on it.
export type PrivacySection = { title: string; body?: string[]; items?: string[] };

export const privacyAr = {
  path: "/privacy",
  nav: "سياسة الخصوصية",
  title: "سياسة الخصوصية",
  metaDescription:
    "كيف تجمع شركة وردلي تيكنولوجيز البيانات الشخصية عبر موقع tech.warrdly.com وتستخدمها وتحميها، وحقوقك وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.",
  updated: "آخر تحديث: 7 نوفمبر 2026",
  intro:
    "توضح هذه السياسة كيف تتعامل شركة وردلي تيكنولوجيز («نحن») مع البيانات الشخصية التي نجمعها عبر موقع tech.warrdly.com، ونلتزم فيها بنظام حماية البيانات الشخصية في المملكة العربية السعودية ولوائحه.",
  formNote: "بإرسال النموذج، توافق على استخدام بياناتك للتواصل معك وفق",
  sections: [
    {
      title: "من نحن",
      body: [
        "شركة وردلي تيكنولوجيز، جدة، المملكة العربية السعودية، الرقم الوطني الموحد 7054723023. للتواصل بشأن بياناتك راسلنا على nader@warrdly.com",
      ],
    },
    {
      title: "البيانات التي نجمعها",
      items: [
        "ما تكتبه في نماذج التواصل: الاسم، واسم الشركة، ورقم الجوال، والبريد الإلكتروني، والقطاع، وعدد المستخدمين، ورسالتك.",
        "نتائج اختبار الجاهزية وملخص حاسبة التكلفة، إذا أرسلتها مع طلبك.",
        "محادثات الدردشة المباشرة على الموقع، بما فيها الردود الآلية.",
        "بيانات استخدام مجهولة الهوية: الصفحات التي تزورها، ونوع الجهاز والمتصفح، والدولة التقريبية، وطريقة التصفح داخل الصفحة.",
      ],
    },
    {
      title: "لماذا نستخدمها",
      items: [
        "للرد على طلبك وترتيب الاستشارة وإعداد العروض والتقديرات.",
        "لإرسال رسالة تأكيد استلام طلبك.",
        "لتحسين محتوى الموقع وسهولة استخدامه.",
        "لا نبيع بياناتك، ولا نستخدمها لرسائل تسويقية دون موافقتك.",
      ],
    },
    {
      title: "مقدمو الخدمات الذين نعتمد عليهم",
      body: [
        "نستخدم خدمات موثوقة لتشغيل الموقع ومعالجة الطلبات، وقد تُعالج البيانات على خوادم خارج المملكة لدى هؤلاء المزودين:",
      ],
      items: [
        "Odoo: نظام إدارة العملاء الذي تُحفظ فيه الطلبات، ومنصة الدردشة المباشرة.",
        "Google Workspace: البريد الإلكتروني.",
        "Cloudflare: استضافة الموقع وإحصاءات زيارات لا تستخدم ملفات تعريف الارتباط.",
        "Microsoft Clarity: تحليل طريقة استخدام الصفحات عبر خرائط حرارية وتسجيلات مجهولة الهوية. يُخفى كل ما تكتبه في النماذج ولا يُرسل إلى Microsoft.",
        "WhatsApp: إذا اخترت التواصل معنا عبره.",
      ],
    },
    {
      title: "ملفات تعريف الارتباط",
      body: [
        "يستخدم Microsoft Clarity ونظام الدردشة المباشرة ملفات تعريف ارتباط وتخزيناً محلياً في المتصفح، لربط الزيارات ببعضها ولحفظ المحادثة. يمكنك حذفها أو منعها من إعدادات متصفحك، وسيظل الموقع يعمل.",
      ],
    },
    {
      title: "مدة الاحتفاظ",
      body: [
        "نحتفظ بالبيانات للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله، أو للمدة التي تتطلبها الأنظمة، ثم نحذفها أو نجعلها مجهولة الهوية.",
      ],
    },
    {
      title: "حقوقك",
      items: [
        "أن تعرف البيانات التي نحتفظ بها عنك وتحصل على نسخة منها.",
        "أن تطلب تصحيح بياناتك أو تحديثها.",
        "أن تطلب حذف بياناتك عندما لا تكون هناك حاجة نظامية لبقائها.",
        "أن تسحب موافقتك في أي وقت.",
      ],
    },
    {
      title: "التواصل وتحديث السياسة",
      body: [
        "لممارسة أي من حقوقك أو لأي استفسار، راسلنا على nader@warrdly.com وسنرد خلال المدة النظامية. قد نحدّث هذه السياسة، وسيظهر تاريخ آخر تحديث في أعلى الصفحة.",
      ],
    },
  ] as PrivacySection[],
};

export const privacyEn: typeof privacyAr = {
  path: "/privacy",
  nav: "Privacy policy",
  title: "Privacy policy",
  metaDescription:
    "How Warrdly Technologies collects, uses and protects personal data on tech.warrdly.com, and your rights under Saudi Arabia's Personal Data Protection Law.",
  updated: "Last updated: 7 November 2026",
  intro:
    "This policy explains how Warrdly Technologies (\"we\") handles personal data collected through tech.warrdly.com. We comply with Saudi Arabia's Personal Data Protection Law and its regulations.",
  formNote: "By sending this form, you agree to us using your details to contact you, as described in our",
  sections: [
    {
      title: "Who we are",
      body: [
        "Warrdly Technologies Company, Jeddah, Saudi Arabia. Unified number 7054723023. For questions about your data: nader@warrdly.com.",
      ],
    },
    {
      title: "Data we collect",
      items: [
        "What you enter in contact forms: name, company, mobile number, email, sector, number of users and your message.",
        "Readiness test results and the cost calculator summary, if you send them with your request.",
        "Live chat conversations on the site, including automated replies.",
        "Anonymous usage data: pages visited, device and browser type, approximate country and how you move through a page.",
      ],
    },
    {
      title: "Why we use it",
      items: [
        "To answer your request, arrange the consultation and prepare quotes and estimates.",
        "To send a confirmation that we received your request.",
        "To improve the site's content and usability.",
        "We do not sell your data or use it for marketing messages without your consent.",
      ],
    },
    {
      title: "Service providers we rely on",
      body: [
        "We use trusted services to run the site and process requests, and data may be processed on servers outside Saudi Arabia by these providers:",
      ],
      items: [
        "Odoo: the CRM where requests are stored, and the live chat platform.",
        "Google Workspace: email.",
        "Cloudflare: site hosting and cookie-free visit statistics.",
        "Microsoft Clarity: analysis of how pages are used through heatmaps and anonymous recordings. Anything you type in forms is masked and not sent to Microsoft.",
        "WhatsApp: if you choose to contact us through it.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Microsoft Clarity and the live chat use cookies and local browser storage to link visits and keep your conversation. You can delete or block them in your browser settings and the site will still work.",
      ],
    },
    {
      title: "Retention",
      body: [
        "We keep data for as long as needed for the purpose it was collected for, or as required by law, and then delete or anonymise it.",
      ],
    },
    {
      title: "Your rights",
      items: [
        "To know what data we hold about you and receive a copy.",
        "To ask us to correct or update your data.",
        "To ask us to delete your data when there is no legal need to keep it.",
        "To withdraw your consent at any time.",
      ],
    },
    {
      title: "Contact and updates",
      body: [
        "To exercise any of your rights or for any question, email nader@warrdly.com and we will reply within the legal timeframe. We may update this policy; the date of the last update appears at the top of the page.",
      ],
    },
  ],
};

export const getPrivacy = (locale: "ar" | "en") => (locale === "en" ? privacyEn : privacyAr);
