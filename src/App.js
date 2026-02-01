import React, { useState, useEffect } from "react";
import {
  Wrench,
  Smartphone,
  Laptop,
  Newspaper,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Send,
  Settings,
  LogIn,
  LogOut,
  Heart,
  Bookmark,
  Eye,
  MousePointerClick,
  Share2,
  X,
  Lock,
  User,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Save,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Search,
  LayoutGrid,
  FileText,
  ArrowLeft,
  PlayCircle,
  Link as LinkIcon,
  Unlock,
  Cpu,
  ShieldCheck,
  Bell,
  Sliders,
} from "lucide-react";

// ==============================================================================
// 🔽 البيانات الأولية والإعدادات (التي تظهر للجمهور) 🔽
// ==============================================================================

const INITIAL_SETTINGS = {
  heroImage:
    "https://images.unsplash.com/photo-1746005718004-1f992c399428?fit=max&w=1080&q=80", // صورة الخلفية الرئيسية
  showTicker: true, // هل يظهر الشريط الإخباري؟
  tickerText:
    "🔥 عروض خاصة: خصم 20% على صيانة الشاشات لفترة محدودة! • 🆕 وصلنا حديثاً: خدمة تخطي الآيكلاود لجميع الأجهزة.", // نص الشريط
};

const INITIAL_ARTICLES = [
  {
    id: 1,
    date: "30 يناير 2025",
    title: "نصائح للحفاظ على البطارية",
    excerpt: "تعرف على أفضل الطرق لإطالة عمر بطارية هاتفك...",
    content: `إليك أهم النصائح للحفاظ على بطارية هاتفك:
    (img: https://images.unsplash.com/photo-1592425654303-87f3d95ed0d5?w=800&q=80)
    1. تجنب الشحن حتى 100% دائماً.
    2. لا تترك الهاتف في الشاحن طوال الليل.`,
  },
  {
    id: 2,
    date: "28 يناير 2025",
    title: "كيف تختار اللابتوب؟",
    excerpt: "دليل شامل لاختيار الحاسوب...",
    content: `شاهد هذا الفيديو لتعرف كيف تختار اللابتوب:
    (vid: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
    نصيحة ذهبية: تأكد دائماً أن الهارد من نوع SSD.`,
  },
];

const INITIAL_WORKS = [
  {
    id: 1,
    title: "إصلاح الشاشات",
    description: "شاشات أصلية بضمان شامل",
    imageUrl:
      "https://images.unsplash.com/photo-1746005718004-1f992c399428?fit=max&w=1080&q=80",
  },
  {
    id: 2,
    title: "صيانة اللابتوب",
    description: "حل مشاكل الحرارة والبطء",
    imageUrl:
      "https://images.unsplash.com/photo-1769085794153-54fd3d57efaf?fit=max&w=1080&q=80",
  },
  {
    id: 3,
    title: "تخطي الآيكلاود (Bypass)",
    description: "فتح قفل التنشيط وتخطي الحماية للأجهزة المدعومة",
    imageUrl:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?fit=max&w=1080&q=80",
  },
  {
    id: 4,
    title: "فتح الشبكات",
    description: "فك تشفير جميع الشبكات الدولية",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?fit=max&w=1080&q=80",
  },
];

// ==============================================================================

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error" {...rest} />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

const ContentRenderer = ({ content }) => {
  if (!content) return null;
  return content.split("\n").map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("(img:") && trimmed.endsWith(")")) {
      const url = trimmed.slice(5, -1).trim();
      return (
        <div
          key={idx}
          className="my-6 rounded-xl overflow-hidden shadow-lg border border-white/10"
        >
          <img src={url} alt="Content" className="w-full h-auto object-cover" />
        </div>
      );
    }
    if (trimmed.startsWith("(vid:") && trimmed.endsWith(")")) {
      const url = trimmed.slice(5, -1).trim();
      let videoId = "";
      if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
      else if (url.includes("youtu.be")) videoId = url.split("/").pop();
      if (videoId)
        return (
          <div
            key={idx}
            className="my-6 aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full"
              allowFullScreen
              title="Youtube Video"
              frameBorder="0"
            ></iframe>
          </div>
        );
    }
    const words = line.split(" ");
    const lineWithLinks = words.map((word, wordIdx) => {
      if (word.startsWith("http://") || word.startsWith("https://")) {
        return (
          <a
            key={wordIdx}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 mx-1"
          >
            <LinkIcon size={14} /> الرابط
          </a>
        );
      }
      return word + " ";
    });
    if (trimmed === "") return <br key={idx} />;
    return (
      <p key={idx} className="mb-3 text-slate-300 leading-relaxed text-lg">
        {lineWithLinks}
      </p>
    );
  });
};

// --- مكون الشريط الإخباري (الجديد) ---
function NewsTicker({ text, show }) {
  if (!show) return null;
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden py-2 relative z-50 border-b border-white/10">
      {/* CSS Animation defined inline for simplicity */}
      <style>{`
         @keyframes ticker {
           0% { transform: translateX(-100%); }
           100% { transform: translateX(100%); }
         }
         .ticker-content {
           display: inline-block;
           white-space: nowrap;
           animation: ticker 20s linear infinite;
           font-weight: bold;
           padding-left: 100%; /* Start off-screen */
         }
       `}</style>
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-red-900 px-3 py-1 text-xs font-bold rounded mr-2 z-10 flex items-center gap-1 shadow-lg whitespace-nowrap">
          <Bell size={12} className="animate-pulse" /> عاجل
        </div>
        <div className="overflow-hidden w-full relative">
          <div className="ticker-content" style={{ direction: "ltr" }}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogView({ articles, works, onBack, onOpenArticle, onOpenWork }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const allContent = [
    ...articles.map((a) => ({ ...a, type: "article" })),
    ...works.map((w) => ({ ...w, type: "work" })),
  ].sort((a, b) => b.id - a.id);
  const filteredContent = allContent.filter((item) => {
    const matchesSearch =
      item.title.includes(searchTerm) ||
      (item.excerpt || item.description).includes(searchTerm);
    const matchesType = filter === "all" ? true : item.type === filter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-900 animate-in fade-in duration-300 pb-12">
      <div className="bg-slate-800 border-b border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowRight className="w-5 h-5 group-hover:-mr-1 transition-transform" />{" "}
            العودة للرئيسية
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">
            المدونة ومعرض الأعمال
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2 p-1 bg-slate-800 rounded-lg w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter("article")}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                filter === "article"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              المقالات
            </button>
            <button
              onClick={() => setFilter("work")}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                filter === "work"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              الأعمال
            </button>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pr-10 pl-4 text-white focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8">
        {filteredContent.length === 0 ? (
          <div className="text-center py-20 text-slate-500">لا توجد نتائج</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() =>
                  item.type === "work" ? onOpenWork(item) : onOpenArticle(item)
                }
                className="bg-slate-800 rounded-xl overflow-hidden border border-white/5 hover:border-cyan-400/50 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
              >
                {item.type === "work" && (
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10 flex items-center gap-1">
                      <Wrench size={12} /> عمل
                    </div>
                    <ImageWithFallback
                      src={item.imageUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  {item.type === "article" && (
                    <div className="mb-2 text-cyan-400 text-xs font-bold flex items-center gap-1">
                      <FileText size={12} /> مقال • {item.date}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                    {item.type === "work" ? item.description : item.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                    <span className="text-slate-500">
                      {item.type === "work" ? "التفاصيل" : "اقرأ"}
                    </span>
                    <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorkDetailModal({ work, onClose, onOrder }) {
  if (!work) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl w-full max-w-4xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="md:w-1/2 h-64 md:h-auto bg-black relative">
          <ImageWithFallback
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-white mb-4">{work.title}</h2>
          <div className="text-slate-300 text-lg mb-8 leading-relaxed overflow-y-auto max-h-[40vh]">
            <ContentRenderer content={work.description} />
          </div>
          <button
            onClick={() => {
              onClose();
              onOrder();
            }}
            className="mt-auto w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" /> اطلب الخدمة
          </button>
        </div>
      </div>
    </div>
  );
}

function ArticleDetailModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl w-full max-w-3xl border border-white/10 shadow-2xl relative flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-slate-800/50 rounded-t-2xl flex-shrink-0">
          <div>
            <span className="text-cyan-400 text-sm font-bold flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" /> {article.date}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {article.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 p-2 rounded-lg text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          <ContentRenderer content={article.content || article.excerpt} />
        </div>
      </div>
    </div>
  );
}

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          تواصل معنا
        </h2>
        <div className="space-y-3 mt-6">
          <a
            href="tel:0770281922"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 group"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">اتصال</p>
              <p className="text-white font-bold font-mono text-lg">
                0770281922
              </p>
            </div>
          </a>
          <a
            href="https://wa.me/9640770281922"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 group"
          >
            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">واتساب</p>
              <p className="text-white font-bold">WhatsApp</p>
            </div>
          </a>
          <a
            href="https://t.me/+9640770281922"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 group"
          >
            <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">تيليجرام</p>
              <p className="text-white font-bold">Telegram</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function LoginModal({ isOpen, onClose, onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-white/20 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          تسجيل دخول المدير
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (u === "admin" && p === "cpetech2025") onLogin(u, p);
            else setErr("خطأ");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white"
          />
          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white"
          />
          {err && <p className="text-red-400 text-sm text-center">{err}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminPanel({
  isOpen,
  onClose,
  articles,
  setArticles,
  works,
  setWorks,
  analytics,
  settings,
  setSettings,
}) {
  const [activeTab, setActiveTab] = useState("analytics");
  const [editingArticle, setEditingArticle] = useState(null);
  const [artTitle, setArtTitle] = useState("");
  const [artExcerpt, setArtExcerpt] = useState("");
  const [artContent, setArtContent] = useState("");
  const [artDate, setArtDate] = useState("");
  const [showArtForm, setShowArtForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [workTitle, setWorkTitle] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [workImg, setWorkImg] = useState("");
  const [showWorkForm, setShowWorkForm] = useState(false);
  if (!isOpen) return null;

  const saveArticle = () => {
    if (!artTitle) return;
    const newArt = {
      id: editingArticle ? editingArticle.id : Date.now(),
      title: artTitle,
      excerpt: artExcerpt,
      content: artContent,
      date: artDate || new Date().toLocaleDateString("ar-SA"),
    };
    if (editingArticle)
      setArticles(
        articles.map((a) => (a.id === editingArticle.id ? newArt : a))
      );
    else setArticles([newArt, ...articles]);
    setEditingArticle(null);
    setShowArtForm(false);
    setArtTitle("");
    setArtExcerpt("");
    setArtContent("");
    setArtDate("");
  };
  const deleteArticle = (id) => {
    if (window.confirm("حذف؟"))
      setArticles(articles.filter((a) => a.id !== id));
  };
  const saveWork = () => {
    if (!workTitle) return;
    const newWork = {
      id: editingWork ? editingWork.id : Date.now(),
      title: workTitle,
      description: workDesc,
      imageUrl: workImg,
    };
    if (editingWork)
      setWorks(works.map((w) => (w.id === editingWork.id ? newWork : w)));
    else setWorks([...works, newWork]);
    setEditingWork(null);
    setShowWorkForm(false);
    setWorkTitle("");
    setWorkDesc("");
    setWorkImg("");
  };
  const deleteWork = (id) => {
    if (window.confirm("حذف؟")) setWorks(works.filter((w) => w.id !== id));
  };

  // Helper to inject code
  const insertCode = (setter, currentVal, code) => {
    setter(currentVal + "\n" + code);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 w-full max-w-6xl rounded-2xl border border-white/20 shadow-2xl flex flex-col h-[90vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="text-cyan-400" /> لوحة التحكم
          </h2>
          <button
            onClick={onClose}
            className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white"
          >
            <X />
          </button>
        </div>
        <div className="flex bg-slate-800 p-2 gap-2 flex-shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-3 rounded-lg font-bold whitespace-nowrap px-4 ${
              activeTab === "analytics" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            الإحصائيات
          </button>
          <button
            onClick={() => setActiveTab("general")}
            className={`flex-1 py-3 rounded-lg font-bold whitespace-nowrap px-4 ${
              activeTab === "general" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            إعدادات عامة
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex-1 py-3 rounded-lg font-bold whitespace-nowrap px-4 ${
              activeTab === "articles" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            المقالات
          </button>
          <button
            onClick={() => setActiveTab("works")}
            className={`flex-1 py-3 rounded-lg font-bold whitespace-nowrap px-4 ${
              activeTab === "works" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            الأعمال
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "analytics" && (
            <div className="text-white text-center p-10">
              الزوار: {analytics.visitors} • الإعجابات: {analytics.likes}
            </div>
          )}

          {/* تبويب الإعدادات العامة الجديد */}
          {activeTab === "general" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">
                تخصيص الموقع
              </h3>
              <div className="space-y-2">
                <label className="text-slate-400">
                  نص الشريط الإخباري (المتحرك)
                </label>
                <input
                  type="text"
                  value={settings.tickerText}
                  onChange={(e) =>
                    setSettings({ ...settings, tickerText: e.target.value })
                  }
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.showTicker}
                  onChange={(e) =>
                    setSettings({ ...settings, showTicker: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <label className="text-white">إظهار الشريط الإخباري</label>
              </div>
              <div className="space-y-2 pt-4 border-t border-white/10">
                <label className="text-slate-400">
                  رابط صورة الخلفية الرئيسية
                </label>
                <input
                  type="text"
                  value={settings.heroImage}
                  onChange={(e) =>
                    setSettings({ ...settings, heroImage: e.target.value })
                  }
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded text-white"
                />
                <p className="text-xs text-slate-500">
                  ضع رابط أي صورة تريدها لتتغير خلفية الموقع الرئيسية.
                </p>
              </div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-6">
              {!showArtForm && (
                <button
                  onClick={() => setShowArtForm(true)}
                  className="w-full py-4 bg-dashed border-2 border-slate-600 rounded-xl text-slate-400 font-bold"
                >
                  <Plus className="inline mr-2" /> جديد
                </button>
              )}
              {showArtForm && (
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10 space-y-4">
                  <h3 className="text-white font-bold">
                    {editingArticle ? "تعديل" : "جديد"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="العنوان"
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      className="w-full p-3 bg-slate-900 rounded text-white"
                    />
                    <input
                      type="text"
                      placeholder="التاريخ"
                      value={artDate}
                      onChange={(e) => setArtDate(e.target.value)}
                      className="w-full p-3 bg-slate-900 rounded text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="وصف مختصر"
                    value={artExcerpt}
                    onChange={(e) => setArtExcerpt(e.target.value)}
                    className="w-full p-3 bg-slate-900 rounded text-white"
                  />

                  {/* أزرار المساعدة */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        insertCode(
                          setArtContent,
                          artContent,
                          "(img: الرابط_هنا)"
                        )
                      }
                      className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <ImageIcon size={12} /> إضافة صورة
                    </button>
                    <button
                      onClick={() =>
                        insertCode(
                          setArtContent,
                          artContent,
                          "(vid: رابط_يوتيوب)"
                        )
                      }
                      className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <PlayCircle size={12} /> إضافة فيديو
                    </button>
                  </div>
                  <textarea
                    placeholder="المحتوى الكامل"
                    value={artContent}
                    onChange={(e) => setArtContent(e.target.value)}
                    className="w-full p-3 bg-slate-900 rounded text-white h-40"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveArticle}
                      className="flex-1 bg-green-600 text-white p-3 rounded"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => {
                        setShowArtForm(false);
                        setEditingArticle(null);
                      }}
                      className="flex-1 bg-slate-700 text-white p-3 rounded"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-white/5"
                >
                  <div>
                    <h4 className="font-bold text-white">{article.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingArticle(article);
                        setArtTitle(article.title);
                        setArtExcerpt(article.excerpt);
                        setArtContent(article.content || "");
                        setArtDate(article.date);
                        setShowArtForm(true);
                      }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "works" && (
            <div className="space-y-6">
              {!showWorkForm && (
                <button
                  onClick={() => setShowWorkForm(true)}
                  className="w-full py-4 bg-dashed border-2 border-slate-600 rounded-xl text-slate-400 font-bold"
                >
                  <Plus className="inline mr-2" /> جديد
                </button>
              )}
              {showWorkForm && (
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10 space-y-4">
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                    className="w-full p-3 bg-slate-900 rounded text-white"
                  />
                  {/* أزرار المساعدة */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        insertCode(setWorkDesc, workDesc, "(img: الرابط_هنا)")
                      }
                      className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <ImageIcon size={12} /> إضافة صورة
                    </button>
                    <button
                      onClick={() =>
                        insertCode(setWorkDesc, workDesc, "(vid: رابط_يوتيوب)")
                      }
                      className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <PlayCircle size={12} /> إضافة فيديو
                    </button>
                  </div>
                  <textarea
                    placeholder="الوصف"
                    value={workDesc}
                    onChange={(e) => setWorkDesc(e.target.value)}
                    className="w-full p-3 bg-slate-900 rounded text-white h-24"
                  />
                  <input
                    type="text"
                    placeholder="رابط الصورة الرئيسية"
                    value={workImg}
                    onChange={(e) => setWorkImg(e.target.value)}
                    className="w-full p-3 bg-slate-900 rounded text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveWork}
                      className="flex-1 bg-green-600 text-white p-3 rounded"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => {
                        setShowWorkForm(false);
                        setEditingWork(null);
                      }}
                      className="flex-1 bg-slate-700 text-white p-3 rounded"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
              {works.map((work) => (
                <div
                  key={work.id}
                  className="bg-slate-800 p-4 rounded-xl flex gap-4 border border-white/5 items-center"
                >
                  <img
                    src={work.imageUrl}
                    className="w-16 h-16 rounded object-cover bg-black"
                    alt=""
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">
                      {work.title}
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingWork(work);
                        setWorkTitle(work.title);
                        setWorkDesc(work.description);
                        setWorkImg(work.imageUrl);
                        setShowWorkForm(true);
                      }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteWork(work.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = "cpe-tech-analytics";
const VISITOR_KEY = "cpe-tech-visited";
function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    visitors: 0,
    likes: 0,
    saves: 0,
    contactClicks: 0,
    whatsappClicks: 0,
    telegramClicks: 0,
  });
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setAnalytics(JSON.parse(stored));
    if (!localStorage.getItem(VISITOR_KEY)) {
      const current = stored ? JSON.parse(stored) : analytics;
      const newAnalytics = {
        ...current,
        visitors: (current.visitors || 0) + 1,
      };
      setAnalytics(newAnalytics);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnalytics));
      localStorage.setItem(VISITOR_KEY, "true");
    }
  }, []);
  const save = (newVal) => {
    setAnalytics(newVal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  };
  return {
    analytics,
    incrementLikes: () => save({ ...analytics, likes: analytics.likes + 1 }),
    decrementLikes: () =>
      save({ ...analytics, likes: Math.max(0, analytics.likes - 1) }),
    incrementContactClicks: () =>
      save({ ...analytics, contactClicks: analytics.contactClicks + 1 }),
    resetAnalytics: () => {
      const n = {
        visitors: 0,
        likes: 0,
        saves: 0,
        contactClicks: 0,
        whatsappClicks: 0,
        telegramClicks: 0,
      };
      save(n);
      localStorage.removeItem(VISITOR_KEY);
    },
  };
}

// ==========================================
// التطبيق الرئيسي
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { analytics, incrementLikes, decrementLikes } = useAnalytics();

  // الحالات القابلة للتعديل
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [works, setWorks] = useState(INITIAL_WORKS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  useEffect(() => {
    if (localStorage.getItem("cpe-tech-liked") === "true") setIsLiked(true);
  }, []);
  const handleLike = () => {
    if (isLiked) {
      decrementLikes();
      setIsLiked(false);
      localStorage.removeItem("cpe-tech-liked");
    } else {
      incrementLikes();
      setIsLiked(true);
      localStorage.setItem("cpe-tech-liked", "true");
    }
  };

  if (currentView === "blog") {
    return (
      <div className="font-sans text-white">
        <BlogView
          articles={articles}
          works={works}
          onBack={() => setCurrentView("home")}
          onOpenArticle={setSelectedArticle}
          onOpenWork={setSelectedWork}
        />
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
        <WorkDetailModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
          onOrder={() => setShowContactModal(true)}
        />
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans">
      {/* الشريط الإخباري */}
      <NewsTicker text={settings.tickerText} show={settings.showTicker} />

      <header className="px-6 py-6 sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                CPE<span className="text-cyan-400">-TECH</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentView("blog")}
              className="hidden md:flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10 border border-white/10"
            >
              <LayoutGrid className="w-5 h-5 text-cyan-400" />
              <span className="font-bold">المدونة</span>
            </button>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-400" : ""}`} />
              <span className="font-bold">{analytics.likes}</span>
            </button>
            {!isLoggedIn ? (
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg shadow-blue-500/20 shadow"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden md:inline">اتصل بنا</span>
              </button>
            ) : (
              <button
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-slate-600"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline">لوحة التحكم</span>
              </button>
            )}
            <button
              onClick={() =>
                isLoggedIn ? setIsLoggedIn(false) : setShowLoginModal(true)
              }
              className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
            >
              {isLoggedIn ? (
                <LogOut className="w-5 h-5" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden px-6 pt-4 pb-0">
          <button
            onClick={() => setCurrentView("blog")}
            className="w-full flex items-center justify-center gap-2 bg-white/5 text-white px-4 py-3 rounded-lg hover:bg-white/10 border border-white/10"
          >
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            <span className="font-bold">تصفح المدونة</span>
          </button>
        </div>
      </header>

      <section className="px-6 py-12 relative">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative shadow-2xl h-[400px] group">
          {/* هنا نستخدم صورة الخلفية من الإعدادات */}
          <ImageWithFallback
            src={settings.heroImage}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              أهلاً بكم في CPE-TECH
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              أفضل خدمات الصيانة للأجهزة الذكية والحواسيب بأيدي خبراء
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-500/30"
              >
                تواصل معنا الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setShowContactModal(true)}
            className="bg-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group border border-white/5 hover:border-cyan-400/30"
          >
            <Smartphone className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">صيانة هواتف</h3>
            <p className="text-slate-400 mt-2">اضغط للتواصل وحجز موعد</p>
          </div>
          <div
            onClick={() => setShowContactModal(true)}
            className="bg-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group border border-white/5 hover:border-cyan-400/30"
          >
            <Laptop className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">صيانة لابتوب</h3>
            <p className="text-slate-400 mt-2">اضغط لاستشارة فنية</p>
          </div>
          <div
            onClick={() => setCurrentView("blog")}
            className="bg-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group border border-white/5 hover:border-cyan-400/30"
          >
            <Newspaper className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">المدونة</h3>
            <p className="text-slate-400 mt-2">تصفح جميع المقالات والأخبار</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h3 className="text-3xl font-bold text-white border-r-4 border-cyan-400 pr-4">
            أبرز الأعمال
          </h3>
          <button
            onClick={() => setCurrentView("blog")}
            className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 font-bold"
          >
            عرض الكل <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.slice(0, 4).map((work) => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all border border-white/10 h-80"
            >
              <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                  <MousePointerClick size={16} /> التفاصيل
                </span>
              </div>
              <ImageWithFallback
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-10">
                <h4 className="text-white font-bold text-lg">{work.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h3 className="text-3xl font-bold text-white border-r-4 border-blue-500 pr-4">
            آخر المقالات
          </h3>
          <button
            onClick={() => setCurrentView("blog")}
            className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 font-bold"
          >
            عرض الكل <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-slate-800 rounded-xl p-6 border border-white/5 hover:border-cyan-400/50 hover:bg-slate-800/80 cursor-pointer transition-all group"
            >
              <span className="text-cyan-400 text-sm flex items-center gap-1 mb-3">
                <Calendar size={14} /> {article.date}
              </span>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {article.title}
              </h4>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
              <span className="text-white text-sm font-semibold group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                اقرأ المزيد{" "}
                <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* الفوتر الجديد مع خلفيات شفافة وخدمات التخطي */}
      <footer className="relative bg-slate-900 overflow-hidden border-t border-white/10 mt-12">
        <Smartphone className="absolute -bottom-10 -left-10 w-64 h-64 text-white/5 rotate-12" />
        <Laptop className="absolute top-10 -right-10 w-64 h-64 text-white/5 -rotate-12" />

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  CPE<span className="text-cyan-400">-TECH</span>
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                وجهتك الأولى لصيانة الأجهزة الذكية والحواسيب. نقدم حلولاً تقنية
                متكاملة بأيدي خبراء معتمدين.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Unlock className="text-cyan-400 w-5 h-5" /> خدمات السوفتوير
                والتخطي
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">تخطي iCloud & FRP</h4>
                    <p className="text-sm text-slate-400">
                      فك حماية جوجل وآبل للأجهزة المدعومة
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">
                      فتح الشبكات (Unlock)
                    </h4>
                    <p className="text-sm text-slate-400">
                      فك تشفير الشبكات لجميع الدول
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-6">تواصل معنا</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex items-center gap-4 group w-full text-right"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    0770281922
                  </span>
                </button>
                <a
                  href="https://wa.me/9640770281922"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group w-full text-right"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    WhatsApp Chat
                  </span>
                </a>
                <a
                  href="https://t.me/+9640770281922"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group w-full text-right"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Telegram Channel
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2026 CPE-TECH. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(u, p) => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }}
      />
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        articles={articles}
        setArticles={setArticles}
        works={works}
        setWorks={setWorks}
        analytics={analytics}
        settings={settings} // تمرير الإعدادات
        setSettings={setSettings} // تمرير دالة تغيير الإعدادات
      />
      <WorkDetailModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onOrder={() => setShowContactModal(true)}
      />
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
}
