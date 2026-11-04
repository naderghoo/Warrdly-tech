// =====================================================================
// إعدادات الموقع — عدّل هذا الملف فقط لتحديث بيانات التواصل والشركة
// Site settings — edit this file to update contact and company details
// =====================================================================

export const site = {
  /** الدومين النهائي للموقع */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tech.warrdly.com",

  /** مستوى الشراكة مع Odoo: "Ready" | "Silver" | "Gold" | "" (اتركه فارغاً لإخفائه) */
  partnerLevel: "",

  /** رقم واتساب بالصيغة الدولية بدون + أو مسافات، مثال: "9665XXXXXXXX". فارغ = يُخفى الزر */
  whatsapp: "966536663891",

  /** البريد الظاهر في الموقع. فارغ = يُخفى */
  email: "nader@warrdly.com",

  /** رمز إحصاءات Cloudflare (Web Analytics) — ليس سراً، يظهر في كود الصفحة. فارغ = معطّل */
  cfAnalyticsToken: "",

  /** رابط صفحة حجز المواعيد في Odoo (Appointments). فارغ = يُستخدم نموذج التواصل */
  appointmentUrl: "",

  company: {
    legalNameAr: "شركة وردلي تيكنولوجيز",
    legalNameEn: "Warrdly Technologies Company",
    unifiedNumber: "7054723023",
    vatNumber: "314884754400003",
    cityAr: "حي جامعة الملك عبدالعزيز، جدة 22252، المملكة العربية السعودية",
    cityEn: "King Abdulaziz University District, Jeddah 22252, Saudi Arabia",
  },

  marketplaceUrl: "https://warrdly.com",

  /**
   * أرقام الإنجازات في الصفحة الرئيسية.
   * القسم يُخفى تلقائياً ما دامت القائمة فارغة. مثال:
   * { value: "+25", ar: "مشروع Odoo منفّذ", en: "Odoo projects delivered" }
   */
  stats: [] as { value: string; ar: string; en: string }[],

  /** أسعار الباقات بالريال. فارغ = يظهر "اطلب عرض سعر" */
  prices: { starter: "", growth: "" },
};
