// src/data.js

// 1. معلومات الاتصال (تتغير في كل الموقع تلقائياً)
export const CONTACT_INFO = {
  phone: "0770281922",
  phoneDisplay: "0770 281 9222",
  whatsappLink: "https://wa.me/9640770281922", // رقمك الدولي بدون +
  telegramLink: "https://t.me/+9640770281922",
  email: "support@cpe-tech.com",
  address: "العراق - واسط - الكوت - شارع المحافظة"
};

// 2. إعدادات الموقع الرئيسية
export const INITIAL_SETTINGS = {
  heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=max&w=1920&q=80",
  showTicker: true,
  tickerText: "🔥 عروض شهر رمضان: خصم 20% على تخطي حسابات شاومي وسامسونج! • 🆕 متوفر الآن: كابلات شحن أصلية بضمان سنة.",
};

// 3. المقالات والشروحات
export const INITIAL_ARTICLES = [
  { id: 1, date: "فبراير 2025", title: "حل مشكلة الحرارة في الآيفون 15", excerpt: "خطوات تقنية لتقليل استهلاك البطارية والحرارة...", content: "..." },
  { id: 2, date: "يناير 2025", title: "طريقة تخطي FRP أندرويد 14", excerpt: "شرح الثغرة الجديدة لجميع أجهزة سامسونج...", content: "..." },
];

// 4. الأعمال المنجزة
export const INITIAL_WORKS = [
  { id: 1, title: "تغيير شاشة iPhone 13 Pro", description: "شاشة أصلية (Original Pull) مع نقل ترو تون.", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?fit=max&w=1080&q=80" },
  { id: 2, title: "تخطي آيكلاود مع شبكة", description: "iPhone X Bypass Signal Done.", imageUrl: "https://images.unsplash.com/photo-1556656793-02715d8dd660?fit=max&w=1080&q=80" },
  { id: 3, title: "تجميعة PC Gaming", description: "RTX 4060, i5 13th Gen, 32GB RAM.", imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?fit=max&w=1080&q=80" },
];

// 5. منتجات المتجر
export const STORE_ITEMS = [
  { id: 1, name: "شاحن Anker 20W الأصلي", category: "شواحن", price: 25000, oldPrice: 30000, badge: "SALE", image: "https://images.unsplash.com/photo-1620023490075-d4c38258e2d4?w=500&q=80" },
  { id: 2, name: "سماعة AirPods Pro Copy", category: "سماعات", price: 35000, oldPrice: 0, badge: "BEST", image: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?w=500&q=80" },
  { id: 3, name: "كابل آيفون Type-C", category: "شواحن", price: 15000, oldPrice: 20000, badge: "SALE", image: "https://images.unsplash.com/photo-1585856407008-011400477209?w=500&q=80" },
  { id: 4, name: "شاشة حماية 11D", category: "حماية", price: 5000, oldPrice: 0, badge: "NEW", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80" },
  { id: 5, name: "سماعة رأس Gaming", category: "سماعات", price: 45000, oldPrice: 60000, badge: "HOT", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80" },
  { id: 6, name: "بور بانك 10000mAh", category: "شواحن", price: 20000, oldPrice: 0, badge: "", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" },
];

// 6. ملفات التحميل
export const DOWNLOADS = [
  { id: 1, name: "Samsung USB Drivers v1.7", size: "35 MB", type: "Driver" },
  { id: 2, name: "UnlockTool Setup 2025", size: "120 MB", type: "Tool" },
  { id: 3, name: "Odin v3.14.4", size: "2 MB", type: "Tool" },
];

// 7. الأسعار
export const SERVICE_PRICES = [
    { category: "سوفت وير موبايل", items: [ { name: "تخطي حساب جوجل (FRP)", price: "من 10,000 د.ع" }, { name: "تفليش كامل", price: "15,000 د.ع" } ]},
    { category: "صيانة حاسوب", items: [ { name: "فورمات + برامج", price: "10,000 د.ع" }, { name: "تنظيف كامل", price: "15,000 د.ع" } ]}
];