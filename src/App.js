import React, { useState, useEffect, useRef } from "react";
import {
  Wrench,
  Smartphone,
  Laptop,
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
  MousePointerClick,
  X,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  ArrowRight,
  Search,
  LayoutGrid,
  FileText,
  ArrowLeft,
  PlayCircle,
  Unlock,
  Cpu,
  ShieldCheck,
  Bell,
  Youtube,
  Banknote,
  HardDrive,
  Monitor,
  Wifi,
  Database,
  Check,
  AlertTriangle,
  Star,
  Clock,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShoppingBag,
  Download,
  Calculator,
  Map,
  Activity,
  Truck,
  Tag,
  Filter,
  Zap,
  Timer
} from "lucide-react";

// ==============================================================================
// 1. البيانات والإعدادات
// ==============================================================================

const INITIAL_SETTINGS = {
  heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=max&w=1920&q=80",
  showTicker: true,
  tickerText: "🔥 عروض شهر رمضان: خصم 20% على تخطي حسابات شاومي وسامسونج! • 🆕 متوفر الآن: كابلات شحن أصلية بضمان سنة.",
};

const INITIAL_ARTICLES = [
  { id: 1, date: "فبراير 2025", title: "حل مشكلة الحرارة في الآيفون 15", excerpt: "خطوات تقنية لتقليل استهلاك البطارية والحرارة...", content: "..." },
  { id: 2, date: "يناير 2025", title: "طريقة تخطي FRP أندرويد 14", excerpt: "شرح الثغرة الجديدة لجميع أجهزة سامسونج...", content: "..." },
];

const INITIAL_WORKS = [
  { id: 1, title: "تغيير شاشة iPhone 13 Pro", description: "شاشة أصلية (Original Pull) مع نقل ترو تون.", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?fit=max&w=1080&q=80" },
  { id: 2, title: "تخطي آيكلاود مع شبكة", description: "iPhone X Bypass Signal Done.", imageUrl: "https://images.unsplash.com/photo-1556656793-02715d8dd660?fit=max&w=1080&q=80" },
  { id: 3, title: "تجميعة PC Gaming", description: "RTX 4060, i5 13th Gen, 32GB RAM.", imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?fit=max&w=1080&q=80" },
];

const STORE_ITEMS = [
  { id: 1, name: "شاحن Anker 20W الأصلي", category: "شواحن", price: 25000, oldPrice: 30000, badge: "SALE", image: "https://images.unsplash.com/photo-1620023490075-d4c38258e2d4?w=500&q=80" },
  { id: 2, name: "سماعة AirPods Pro Copy", category: "سماعات", price: 35000, oldPrice: 0, badge: "BEST", image: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?w=500&q=80" },
  { id: 3, name: "كابل آيفون Type-C", category: "شواحن", price: 15000, oldPrice: 20000, badge: "SALE", image: "https://images.unsplash.com/photo-1585856407008-011400477209?w=500&q=80" },
  { id: 4, name: "شاشة حماية 11D", category: "حماية", price: 5000, oldPrice: 0, badge: "NEW", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80" },
  { id: 5, name: "سماعة رأس Gaming", category: "سماعات", price: 45000, oldPrice: 60000, badge: "HOT", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80" },
  { id: 6, name: "بور بانك 10000mAh", category: "شواحن", price: 20000, oldPrice: 0, badge: "", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" },
];

const DOWNLOADS = [
  { id: 1, name: "Samsung USB Drivers v1.7", size: "35 MB", type: "Driver" },
  { id: 2, name: "UnlockTool Setup 2025", size: "120 MB", type: "Tool" },
  { id: 3, name: "Odin v3.14.4", size: "2 MB", type: "Tool" },
];

// ==============================================================================
// 2. الدوال المساعدة
// ==============================================================================

function useAnalytics() {
  const [analytics, setAnalytics] = useState({ visitors: 0, likes: 0 });
  useEffect(() => {
    const stored = localStorage.getItem("cpe-tech-analytics");
    if (stored) setAnalytics(JSON.parse(stored));
  }, []);
  const save = (n) => {
    setAnalytics(n);
    localStorage.setItem("cpe-tech-analytics", JSON.stringify(n));
  };
  return {
    analytics,
    incrementLikes: () => save({ ...analytics, likes: analytics.likes + 1 }),
    decrementLikes: () => save({ ...analytics, likes: Math.max(0, analytics.likes - 1) }),
  };
}

const ERROR_IMG_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ImageWithFallback(props){const[didError,setDidError]=useState(false);const{src,alt,style,className,...rest}=props;return didError?(<div className={`inline-block bg-gray-800 text-center align-middle ${className??""}`}style={style}><div className="flex items-center justify-center w-full h-full text-slate-600"><ImageIcon size={24}/></div></div>):(<img src={src}alt={alt}className={className}style={style}{...rest}onError={()=>setDidError(true)}/>);}
const ContentRenderer=({content})=>{if(!content)return null;return content.split("\n").map((line,idx)=>{const trimmed=line.trim();if(trimmed.startsWith("(img:")&&trimmed.endsWith(")")){const url=trimmed.slice(5,-1).trim();return(<div key={idx}className="my-6 rounded-xl overflow-hidden shadow-lg border border-white/10"><img src={url}alt="Content"className="w-full h-full object-cover"/></div>);}if(trimmed.startsWith("(vid:")&&trimmed.endsWith(")")){const url=trimmed.slice(5,-1).trim();let videoId="";if(url.includes("v="))videoId=url.split("v=")[1].split("&")[0];else if(url.includes("youtu.be"))videoId=url.split("/").pop();if(videoId)return(<div key={idx}className="my-6 aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black"><iframe src={`https://www.youtube.com/embed/${videoId}`}className="w-full h-full"allowFullScreen title="Youtube Video"frameBorder="0"></iframe></div>);}return(<p key={idx}className="mb-3 text-slate-300 leading-relaxed text-lg">{trimmed}</p>);});};
function NewsTicker({text,show}){if(!show)return null;return(<div className="bg-gradient-to-r from-red-900 to-slate-900 text-white overflow-hidden py-2 relative z-50 border-b border-white/10 shadow-lg"><style>{`@keyframes ticker {0% { transform: translateX(-100%); }100% { transform: translateX(100%); }}.ticker-content {display: inline-block;white-space: nowrap;animation: ticker 35s linear infinite;font-weight: bold;padding-left: 100%;}`}</style><div className="max-w-7xl mx-auto flex items-center"><div className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded mr-2 z-10 flex items-center gap-1 shadow-md whitespace-nowrap"><Bell size={12}className="animate-pulse"/> تنبيه هام</div><div className="overflow-hidden w-full relative"><div className="ticker-content"style={{direction:"ltr"}}>{text}</div></div></div></div>);}
function BrandsMarquee() {const brands = ["SAMSUNG", "APPLE", "XIAOMI", "HUAWEI", "HONOR", "INFINIX", "REALME", "NOKIA"];return (<div className="py-6 bg-black/40 border-y border-white/5 overflow-hidden"><div className="max-w-7xl mx-auto relative flex overflow-x-hidden group"><div className="animate-marquee whitespace-nowrap flex gap-16 items-center opacity-50 hover:opacity-100 transition-opacity duration-300">{[...brands, ...brands, ...brands].map((brand, i) => (<span key={i} className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 font-mono tracking-widest">{brand}</span>))}</div></div><style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 20s linear infinite; }`}</style></div>);}

// ==============================================================================
// 3. المكونات الجديدة والمحدثة
// ==============================================================================

// أيقونات الشات العائمة (واتساب + تيليجرام)
function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
        href="https://t.me/+9640770281922" 
        target="_blank" 
        rel="noreferrer"
        className="bg-[#0088cc] text-white p-3 rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Send size={24} />
      </a>
      <a 
        href="https://wa.me/9640770281922" 
        target="_blank" 
        rel="noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-16 bg-white text-slate-800 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">تحدث معنا</span>
      </a>
    </div>
  );
}

// مؤشر حالة المحل (مفتوح/مغلق)
function ShopStatus() {
    return (
        <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-400">مفتوح الآن</span>
        </div>
    );
}

// عداد العروض
function OfferCountdown() {
    return (
        <div className="flex gap-2 text-white font-mono text-lg bg-black/40 px-4 py-2 rounded-lg border border-white/10">
            <span>08</span><span className="text-slate-500">:</span><span>45</span><span className="text-slate-500">:</span><span>12</span>
            <span className="text-xs text-red-400 font-sans self-center mr-2 font-bold">ينتهي العرض خلال</span>
        </div>
    );
}

// 5. مودال التتبع (محدث ليشمل حالة لا يصلح)
function TrackingModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const checkOrder = () => {
    // 🟢 الحالة 1: جاهز
    if(code === "1234") setResult({ status: "ready", msg: "✅ الجهاز جاهز للاستلام", device: "iPhone 13 Pro" });
    
    // 🟡 الحالة 2: قيد الصيانة
    else if(code === "5678") setResult({ status: "pending", msg: "🛠️ الجهاز قيد الصيانة والفحص", device: "Samsung S23" });
    
    // 🔴 الحالة 3: لا يصلح / مرفوض (الجديدة)
    else if(code === "2024") setResult({ status: "cancelled", msg: "❌ نعتذر، الجهاز لا يمكن إصلاحه", device: "iPad 7 (مشكلة معالج)" });
    
    // ⚪ الحالة 4: خطأ
    else setResult({ status: "error", msg: "رقم الوصل غير صحيح ❌" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in zoom-in-95">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X/></button>
        <h2 className="text-2xl font-bold text-white mb-2 text-center flex items-center justify-center gap-2"><Activity className="text-blue-400"/> تتبع حالة جهازك</h2>
        <p className="text-slate-400 text-center text-sm mb-6">أدخل رقم الوصل الموجود في كارت الصيانة</p>
        
        <div className="flex gap-2 mb-6">
          <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="رقم الوصل (مثال: 1234)" className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-center font-mono tracking-widest outline-none focus:border-blue-500" />
          <button onClick={checkOrder} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold">فحص</button>
        </div>

        {result && (
          <div className={`p-4 rounded-xl border ${
              result.status === 'ready' ? 'bg-green-500/10 border-green-500/30' : 
              result.status === 'pending' ? 'bg-yellow-500/10 border-yellow-500/30' :
              result.status === 'cancelled' ? 'bg-red-500/10 border-red-500/30' : 
              'bg-slate-800 border-slate-600'
          }`}>
            <p className="text-white font-bold text-center text-lg">{result.msg}</p>
            {result.device && <p className="text-slate-400 text-center text-sm mt-1">الجهاز: {result.device}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ... بقية المكونات (كما هي)
function SalesPopup() {const [show, setShow] = useState(false);const [msg, setMsg] = useState("");const messages = ["قام أحمد من بغداد بطلب تخطي حساب جوجل", "تم تسليم جهاز iPhone 13 Pro للعميل", "علي من البصرة اشترى شاحن Anker", "تم إصلاح لابتوب Dell بنجاح", "حسين من الكوت حجز موعد صيانة"];useEffect(() => {const interval = setInterval(() => { setMsg(messages[Math.floor(Math.random() * messages.length)]); setShow(true); setTimeout(() => setShow(false), 4000); }, 15000);return () => clearInterval(interval);}, []);if (!show) return null;return (<div className="fixed bottom-20 left-4 bg-slate-800 border border-cyan-500/30 p-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-left duration-500 flex items-center gap-3 max-w-xs"><div className="bg-green-500/20 p-2 rounded-full"><Check size={16} className="text-green-400"/></div><div><p className="text-white text-sm font-bold">نشاط حديث</p><p className="text-slate-300 text-xs">{msg}</p><p className="text-slate-500 text-[10px] mt-1">منذ لحظات</p></div></div>);}
function BeforeAfter() {const [sliderPos, setSliderPos] = useState(50);const containerRef = useRef(null);const handleMove = (e) => { if (!containerRef.current) return; const rect = containerRef.current.getBoundingClientRect(); const x = "touches" in e ? e.touches[0].clientX : e.clientX; const pos = ((x - rect.left) / rect.width) * 100; setSliderPos(Math.min(100, Math.max(0, pos))); };return (<div ref={containerRef} className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 group select-none" onMouseMove={handleMove} onTouchMove={handleMove}><img src="https://images.unsplash.com/photo-1596558450255-7c0b8b9d5646?w=800&q=80" className="absolute inset-0 w-full h-full object-cover" alt="After" /><div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none"><span className="bg-green-600/80 text-white px-3 py-1 rounded font-bold text-sm">بعد الصيانة</span></div><div className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white" style={{ width: `${sliderPos}%` }}><img src="https://images.unsplash.com/photo-1604144365730-10906232b724?w=800&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Before" /><div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"><span className="bg-red-600/80 text-white px-3 py-1 rounded font-bold text-sm">قبل (مكسور)</span></div></div><div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none" style={{ left: `calc(${sliderPos}% - 16px)` }}><div className="flex gap-0.5"><div className="w-0.5 h-3 bg-slate-400"></div><div className="w-0.5 h-3 bg-slate-400"></div></div></div></div>);}
function LocationMap() { return (<div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 mt-6 grayscale hover:grayscale-0 transition-all"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.692226993175!2d45.816666!3d32.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDMwJzAwLjAiTiA0NcKwNDknMDAuMCJF!5e0!3m2!1sen!2siq!4v1620000000000!5m2!1sen!2siq" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" title="Map"></iframe></div>); }
function BookingModal({ isOpen, onClose }) { const [formData, setFormData] = useState({ device: "", issue: "", date: "" }); if (!isOpen) return null; const sendWhatsApp = () => { const text = `مرحباً، أرغب بحجز موعد صيانة:%0A📱 الجهاز: ${formData.device}%0A🔧 العطل: ${formData.issue}%0A📅 الموعد: ${formData.date}`; window.open(`https://wa.me/9640770281922?text=${text}`, "_blank"); }; return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in"><div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 p-6 relative"><button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X/></button><h2 className="text-2xl font-bold text-white mb-6 text-center">حجز موعد صيانة</h2><div className="space-y-4"><div><label className="text-slate-400 text-sm mb-1 block">نوع الجهاز والموديل</label><input type="text" onChange={(e)=>setFormData({...formData, device: e.target.value})} placeholder="مثال: iPhone 13 Pro Max" className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white" /></div><div><label className="text-slate-400 text-sm mb-1 block">وصف العطل</label><input type="text" onChange={(e)=>setFormData({...formData, issue: e.target.value})} placeholder="مثال: الشاشة مكسورة" className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white" /></div><div><label className="text-slate-400 text-sm mb-1 block">الموعد المناسب</label><input type="date" onChange={(e)=>setFormData({...formData, date: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white" /></div><button onClick={sendWhatsApp} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold mt-4 flex items-center justify-center gap-2"><Send size={18}/> إرسال الحجز واتساب</button></div></div></div>); }
function CostEstimator() { const [device, setDevice] = useState("iphone"); const [issue, setIssue] = useState("screen"); const getPrice = () => { if(device === "iphone" && issue === "screen") return "50,000 - 150,000 د.ع"; if(device === "iphone" && issue === "battery") return "35,000 - 60,000 د.ع"; if(device === "android" && issue === "screen") return "30,000 - 100,000 د.ع"; if(issue === "software") return "10,000 - 25,000 د.ع"; return "يرجى الفحص"; }; return (<div className="bg-slate-800 p-6 rounded-2xl border border-white/5 mt-8"><h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Calculator className="text-yellow-400"/> حاسبة التكلفة التقديرية</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><select onChange={(e)=>setDevice(e.target.value)} className="bg-slate-900 text-white p-3 rounded-lg border border-white/10"><option value="iphone">آيفون (iPhone)</option><option value="android">أندرويد (Samsung/Huawei)</option><option value="ipad">آيباد / تابلت</option></select><select onChange={(e)=>setIssue(e.target.value)} className="bg-slate-900 text-white p-3 rounded-lg border border-white/10"><option value="screen">كسر شاشة</option><option value="battery">ضعف بطارية</option><option value="charging">مشكلة شحن</option><option value="software">سوفت وير / تخطي</option></select><div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-lg flex items-center justify-center"><span className="text-blue-300 font-bold">{getPrice()}</span></div></div><p className="text-xs text-slate-500 mt-2 text-center">* السعر تقريبي ويعتمد على موديل الجهاز الدقيق.</p></div>); }
function StoreView({ onBack }) {const [filter, setFilter] = useState("all");const categories = ["all", "شواحن", "سماعات", "حماية"];const filteredItems = filter === "all" ? STORE_ITEMS : STORE_ITEMS.filter(item => item.category === filter);return (<div className="min-h-screen bg-[#0a0f1c] pb-20 animate-in fade-in"><div className="bg-slate-900 border-b border-white/10 px-6 py-8 relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div><div className="max-w-7xl mx-auto relative z-10"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 font-bold"><ArrowRight size={18}/> الرئيسية</button><h1 className="text-4xl font-bold text-white flex items-center gap-3"><ShoppingBag className="text-purple-400" size={32}/> متجر الإكسسوارات</h1></div></div><div className="max-w-7xl mx-auto px-6 mt-8"><div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 relative overflow-hidden border border-white/10 flex flex-col md:flex-row items-center justify-between shadow-2xl mb-12"><div className="relative z-10 text-center md:text-right"><span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block backdrop-blur-md">⚡ عرض محدود</span><h2 className="text-3xl font-bold text-white mb-4">بكج الحماية المتكامل</h2><div className="flex gap-4 justify-center md:justify-start"><span className="text-3xl font-bold text-white">15,000 <span className="text-sm text-purple-300">د.ع</span></span><span className="text-xl text-white/50 line-through mt-2">25,000</span></div><button onClick={()=>window.open(`https://wa.me/9640770281922?text=أريد طلب عرض بكج الحماية`, "_blank")} className="mt-6 bg-white text-purple-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">اطلب العرض الآن</button></div><ShieldCheck size={150} className="text-white/20 rotate-12 relative z-10" /></div><div className="flex flex-wrap gap-3 mb-8">{categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${filter === cat ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-800 text-slate-400 border-white/5'}`}>{cat === "all" ? "الكل" : cat}</button>))}</div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredItems.map(item => (<div key={item.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all group hover:-translate-y-2"><div className="h-56 overflow-hidden relative bg-black/20"><img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name}/>{item.badge && <span className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg ${item.badge === 'SALE' ? 'bg-red-600' : 'bg-blue-600'}`}>{item.badge}</span>}</div><div className="p-5"><p className="text-purple-400 text-xs font-bold mb-1">{item.category}</p><h3 className="text-white font-bold text-lg mb-3">{item.name}</h3><div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2"><div>{item.oldPrice > 0 && <span className="text-slate-500 text-xs line-through block">{item.oldPrice.toLocaleString()} د.ع</span>}<span className="text-white font-bold text-xl">{item.price.toLocaleString()} <span className="text-xs text-slate-400">د.ع</span></span></div><button onClick={()=>window.open(`https://wa.me/9640770281922?text=أريد شراء ${item.name}`, "_blank")} className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-colors shadow-lg"><ShoppingBag size={20}/></button></div></div></div>))}</div></div></div>);}
function DownloadsView({ onBack }) { return (<div className="min-h-screen bg-[#0a0f1c] pb-20 animate-in fade-in"><div className="bg-slate-900 border-b border-white/10 px-6 py-8"><div className="max-w-7xl mx-auto"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"><ArrowRight size={18}/> الرئيسية</button><h1 className="text-3xl font-bold text-white flex items-center gap-3"><Download className="text-orange-400"/> منطقة الفنيين (Downloads)</h1></div></div><div className="max-w-4xl mx-auto px-6 mt-8 space-y-4">{DOWNLOADS.map(file => (<div key={file.id} className="bg-slate-800 p-4 rounded-xl border border-white/5 flex justify-between items-center hover:bg-slate-700/50 transition-colors"><div className="flex items-center gap-4"><div className="bg-orange-500/20 p-3 rounded-lg"><FileText className="text-orange-400"/></div><div><h3 className="text-white font-bold">{file.name}</h3><p className="text-slate-400 text-sm">{file.type} • {file.size}</p></div></div><button className="bg-white/10 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">تحميل</button></div>))}</div></div>); }
function SoftwareView({ onBack, onContact }) { return (<div className="min-h-screen bg-[#0a0f1c] animate-in slide-in-from-bottom-5 duration-500 pb-20"><div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-12 border-b border-white/10 relative overflow-hidden"><div className="max-w-7xl mx-auto relative z-10"><button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-white mb-6 font-bold bg-white/5 w-fit px-4 py-2 rounded-lg"><ArrowRight size={18}/> الرئيسية</button><div className="flex items-center gap-4"><div className="p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30"><Unlock size={40} className="text-blue-400" /></div><div><h1 className="text-4xl md:text-5xl font-bold text-white mb-2">قسم السوفت وير</h1><p className="text-slate-400 text-lg">حلول برمجية متقدمة • فك تشفير • سيرفرات</p></div></div></div></div><div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-all group"><div className="flex items-center gap-3 mb-6"><ShieldCheck className="text-green-400 w-8 h-8" /><h2 className="text-2xl font-bold text-white">تخطي جوجل (FRP)</h2></div><ul className="space-y-4 text-slate-300"><li className="flex gap-3"><Check className="text-cyan-400 w-5 h-5 flex-shrink-0"/> <span>دعم جميع أجهزة Samsung</span></li><li className="flex gap-3"><Check className="text-cyan-400 w-5 h-5 flex-shrink-0"/> <span>تخطي Xiaomi & Redmi</span></li></ul><button onClick={onContact} className="mt-8 w-full bg-white/5 hover:bg-green-600 hover:text-white text-slate-300 py-3 rounded-xl transition-all font-bold border border-white/10">طلب الخدمة</button></div><div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all group"><div className="flex items-center gap-3 mb-6"><Database className="text-blue-400 w-8 h-8" /><h2 className="text-2xl font-bold text-white">خدمات الآيكلاود</h2></div><ul className="space-y-4 text-slate-300"><li className="flex gap-3"><Check className="text-blue-400 w-5 h-5 flex-shrink-0"/> <span>iCloud Bypass (Signal) 5s - X</span></li><li className="flex gap-3"><Check className="text-blue-400 w-5 h-5 flex-shrink-0"/> <span>الخدمة الرسمية (Official Removal)</span></li></ul><button onClick={onContact} className="mt-8 w-full bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 py-3 rounded-xl transition-all font-bold border border-white/10">استفسار</button></div><div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:border-yellow-500/30 transition-all group md:col-span-2"><div className="flex items-center gap-3 mb-6"><Smartphone className="text-yellow-400 w-8 h-8" /><h2 className="text-2xl font-bold text-white">تفليش وإصلاح</h2></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><ul className="space-y-4 text-slate-300"><li className="flex gap-3"><ArrowLeft className="text-yellow-400 w-4 h-4 mt-1"/> <span>إحياء الهواتف الميتة (Dead Boot)</span></li><li className="flex gap-3"><ArrowLeft className="text-yellow-400 w-4 h-4 mt-1"/> <span>حل مشاكل التعليق (Bootloop)</span></li></ul><div className="bg-black/30 p-4 rounded-xl border border-white/5 text-sm text-slate-400"><p className="mb-2 text-white font-bold"><AlertTriangle size={16} className="inline ml-1 text-yellow-500"/> ملاحظة:</p>نستخدم بوكسات مدفوعة (UnlockTool, Chimera) لضمان الأمان.</div></div></div></div></div>); }
function HardwareView({ onBack, onContact }) { return (<div className="min-h-screen bg-[#0f0f10] animate-in slide-in-from-bottom-5 duration-500 pb-20"><div className="bg-gradient-to-r from-slate-900 to-emerald-950 px-6 py-12 border-b border-white/10 relative overflow-hidden"><div className="max-w-7xl mx-auto relative z-10"><button onClick={onBack} className="flex items-center gap-2 text-emerald-400 hover:text-white mb-6 font-bold bg-white/5 w-fit px-4 py-2 rounded-lg"><ArrowRight size={18}/> الرئيسية</button><div className="flex items-center gap-4"><div className="p-4 bg-emerald-600/20 rounded-2xl border border-emerald-500/30"><Cpu size={40} className="text-emerald-400" /></div><div><h1 className="text-4xl md:text-5xl font-bold text-white mb-2">صيانة الهاردوير</h1><p className="text-slate-400 text-lg">ورشة متكاملة • قطع غيار أصلية</p></div></div></div></div><div className="max-w-7xl mx-auto px-6 mt-12 space-y-12"><div className="bg-slate-900 rounded-2xl p-6 border border-white/5 text-center"><h3 className="text-2xl font-bold text-white mb-6">شاهد الفرق في جودة الصيانة</h3><BeforeAfter /></div><div className="flex flex-col md:flex-row gap-8 bg-slate-900 rounded-3xl overflow-hidden border border-white/10"><div className="md:w-1/3 bg-slate-800 p-8 flex flex-col justify-center items-center text-center"><Smartphone size={80} className="text-emerald-400 mb-4" /><h3 className="text-2xl font-bold text-white">صيانة الموبايل</h3></div><div className="md:w-2/3 p-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-black/20 p-4 rounded-xl border border-white/5"><h4 className="text-white font-bold mb-2">الشاشات</h4><p className="text-sm text-slate-400">تبديل شاشات وكبس زجاج.</p></div><div className="bg-black/20 p-4 rounded-xl border border-white/5"><h4 className="text-white font-bold mb-2">البورد</h4><p className="text-sm text-slate-400">إصلاح دوائر الشحن والباور والشبكة.</p></div></div></div></div><div className="flex flex-col md:flex-row-reverse gap-8 bg-slate-900 rounded-3xl overflow-hidden border border-white/10"><div className="md:w-1/3 bg-slate-800 p-8 flex flex-col justify-center items-center text-center"><Laptop size={80} className="text-blue-400 mb-4" /><h3 className="text-2xl font-bold text-white">صيانة الحاسوب</h3></div><div className="md:w-2/3 p-8"><ul className="grid grid-cols-1 md:grid-cols-2 gap-4"><li className="flex gap-2 text-slate-300"><Check size={18} className="text-blue-500"/> تنصيب ويندوز (10 & 11) أصلي</li><li className="flex gap-2 text-slate-300"><Check size={18} className="text-blue-500"/> ترقية SSD & RAM</li><li className="flex gap-2 text-slate-300"><Check size={18} className="text-blue-500"/> تنظيف وتغيير معجون حراري</li></ul></div></div></div></div>); }
function PricingView({ onBack, onContact }) { const prices = [{ category: "سوفت وير موبايل", items: [ { name: "تخطي حساب جوجل (FRP)", price: "من 10,000 د.ع" }, { name: "تفليش كامل", price: "15,000 د.ع" } ]},{ category: "صيانة حاسوب", items: [ { name: "فورمات + برامج", price: "10,000 د.ع" }, { name: "تنظيف كامل", price: "15,000 د.ع" } ]}]; return (<div className="min-h-screen bg-slate-950 animate-in fade-in duration-500 pb-20"><div className="bg-slate-900 border-b border-white/10 px-6 py-8"><div className="max-w-4xl mx-auto"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"><ArrowRight size={18}/> رجوع</button><h1 className="text-3xl font-bold text-white flex items-center gap-3"><Banknote className="text-green-400"/> الأسعار التقريبية</h1></div></div><div className="max-w-4xl mx-auto px-6 mt-8"><CostEstimator /><div className="space-y-8 mt-12">{prices.map((section, idx) => (<div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10"><div className="bg-slate-800 px-6 py-4 font-bold text-white text-xl border-b border-white/10">{section.category}</div><div className="divide-y divide-white/5">{section.items.map((item, i) => (<div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors"><span className="text-slate-300">{item.name}</span><span className="text-green-400 font-mono font-bold">{item.price}</span></div>))}</div></div>))}</div><button onClick={onContact} className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg">طلب تسعير خاص</button></div></div>); }
function BlogView({articles,works,onBack,onOpenArticle,onOpenWork}){const[filter,setFilter]=useState("all");const[searchTerm,setSearchTerm]=useState("");const allContent=[...articles.map((a)=>({...a,type:"article"})),...works.map((w)=>({...w,type:"work"}))].sort((a,b)=>b.id-a.id);const filteredContent=allContent.filter((item)=>{const matchesSearch=item.title.includes(searchTerm)||(item.excerpt||item.description).includes(searchTerm);const matchesType=filter==="all"?true:item.type===filter;return matchesSearch&&matchesType;});return(<div className="min-h-screen bg-slate-900 animate-in fade-in duration-300 pb-12"><div className="bg-slate-800 border-b border-white/10 px-6 py-8"><div className="max-w-7xl mx-auto"><button onClick={onBack}className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"><ArrowRight className="w-5 h-5 group-hover:-mr-1 transition-transform"/>العودة للرئيسية</button><h1 className="text-4xl font-bold text-white mb-2">مكتبة الشروحات والأعمال</h1></div></div><div className="max-w-7xl mx-auto px-6 mt-8"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredContent.map((item)=>(<div key={`${item.type}-${item.id}`}onClick={()=>item.type==="work"?onOpenWork(item):onOpenArticle(item)}className="bg-slate-800 rounded-xl overflow-hidden border border-white/5 hover:border-cyan-400/50 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full">{item.type==="work"&&(<div className="h-48 overflow-hidden relative"><ImageWithFallback src={item.imageUrl}className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div>)}<div className="p-6 flex-1 flex flex-col"><h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{item.title}</h3><p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{item.type==="work"?item.description:item.excerpt}</p></div></div>))}</div></div></div>);}
function WorkDetailModal({work,onClose,onOrder}){if(!work)return null;return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"><div className="bg-slate-900 rounded-2xl w-full max-w-4xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto"><button onClick={onClose}className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-white/20 transition-all"><X className="w-6 h-6"/></button><div className="md:w-1/2 h-64 md:h-auto bg-black relative"><ImageWithFallback src={work.imageUrl}alt={work.title}className="w-full h-full object-contain"/></div><div className="md:w-1/2 p-8 flex flex-col"><h2 className="text-3xl font-bold text-white mb-4">{work.title}</h2><div className="text-slate-300 text-lg mb-8 leading-relaxed overflow-y-auto max-h-[40vh]"><ContentRenderer content={work.description}/></div><button onClick={()=>{onClose();onOrder();}}className="mt-auto w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5"/> استفسر عن هذه الخدمة</button></div></div></div>);}
function ArticleDetailModal({article,onClose}){if(!article)return null;return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"><div className="bg-slate-900 rounded-2xl w-full max-w-3xl border border-white/10 shadow-2xl relative flex flex-col max-h-[85vh]"><div className="p-6 border-b border-white/10 flex justify-between items-start bg-slate-800/50 rounded-t-2xl flex-shrink-0"><div><span className="text-cyan-400 text-sm font-bold flex items-center gap-2 mb-2"><Calendar className="w-4 h-4"/> {article.date}</span><h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{article.title}</h2></div><button onClick={onClose}className="bg-white/10 p-2 rounded-lg text-slate-300 hover:text-white"><X className="w-6 h-6"/></button></div><div className="p-6 md:p-8 overflow-y-auto"><ContentRenderer content={article.content||article.excerpt}/></div></div></div>);}
function ContactModal({isOpen,onClose}){if(!isOpen)return null;return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200"><div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl relative p-6"><button onClick={onClose}className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6"/></button><h2 className="text-2xl font-bold text-white mb-2 text-center">تواصل مع الدعم الفني</h2><div className="space-y-3 mt-6"><a href="https://wa.me/9640770281922"target="_blank"rel="noreferrer"className="flex items-center gap-4 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-all border border-[#25D366]/20 group"><div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6 text-white"/></div><div><p className="text-xs text-[#25D366] font-bold">واتساب</p><p className="text-white font-bold text-lg">WhatsApp Chat</p></div></a><a href="tel:0770281922"className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 group"><div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Phone className="w-6 h-6 text-white"/></div><div><p className="text-xs text-slate-400">اتصال</p><p className="text-white font-bold font-mono text-lg">0770281922</p></div></a></div></div></div>);}
function LoginModal({isOpen,onClose,onLogin}){const[u,setU]=useState("");const[p,setP]=useState("");const[err,setErr]=useState("");if(!isOpen)return null;return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"><div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-white/20 relative shadow-2xl"><button onClick={onClose}className="absolute top-4 right-4 text-slate-400"><X/></button><h2 className="text-2xl font-bold text-white text-center mb-6">دخول الإدارة</h2><form onSubmit={(e)=>{e.preventDefault();if(u==="admin"&&p==="cpetech2025")onLogin(u,p);else setErr("خطأ في البيانات");}}className="space-y-4"><input type="text"value={u}onChange={(e)=>setU(e.target.value)}placeholder="Username"className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white"/><input type="password"value={p}onChange={(e)=>setP(e.target.value)}placeholder="Password"className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white"/>{err&&<p className="text-red-400 text-sm text-center">{err}</p>}<button type="submit"className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold">دخول</button></form></div></div>);}
function AdminPanel({isOpen,onClose,articles,setArticles,works,setWorks,analytics,settings,setSettings}){if(!isOpen)return null;return(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"><div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-white/20 p-6 h-[80vh] flex flex-col justify-center items-center"><h2 className="text-white text-2xl font-bold mb-4">لوحة التحكم</h2><p className="text-slate-400 text-center mb-8">تم تحديث الموقع ليشمل الأقسام الجديدة (الماركات، الآراء، الأسئلة).<br/>يمكنك التحكم بالمحتوى الرئيسي من هنا.</p><button onClick={onClose}className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">إغلاق</button></div></div>);}
function FAQSection() {const [openIndex, setOpenIndex] = useState(null);const FAQS=[{ q: "هل يوجد ضمان؟", a: "نعم، ضمان حقيقي على جميع قطع الغيار." }, { q: "كم يستغرق الوقت؟", a: "معظم الأعطال تنجز خلال ساعة واحدة." }];return (<section className="px-6 py-12 bg-slate-900"><div className="max-w-3xl mx-auto"><div className="text-center mb-10"><h3 className="text-2xl font-bold text-white mb-2 flex justify-center items-center gap-2"><HelpCircle className="text-cyan-400"/> الأسئلة الشائعة</h3></div><div className="space-y-4">{FAQS.map((item, idx) => (<div key={idx} className="bg-slate-800 border border-white/5 rounded-xl overflow-hidden transition-all"><button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-right font-bold text-white hover:bg-white/5"><span>{item.q}</span>{openIndex === idx ? <ChevronUp className="text-cyan-400"/> : <ChevronDown className="text-slate-500"/>}</button>{openIndex === idx && (<div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-white/5 bg-black/20">{item.a}</div>)}</div>))}</div></div></section>);}

// ==========================================
// 4. التطبيق الرئيسي (App)
// ==========================================

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // الآن useAnalytics معروفة لأننا عرفناها في الأعلى
  const { analytics, incrementLikes, decrementLikes } = useAnalytics();
  
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

  // Routing
  if (currentView === "software") return <SoftwareView onBack={() => setCurrentView("home")} onContact={() => setShowContactModal(true)} />;
  if (currentView === "hardware") return <HardwareView onBack={() => setCurrentView("home")} onContact={() => setShowContactModal(true)} />;
  if (currentView === "pricing") return <PricingView onBack={() => setCurrentView("home")} onContact={() => setShowContactModal(true)} />;
  if (currentView === "store") return <StoreView onBack={() => setCurrentView("home")} />;
  if (currentView === "downloads") return <DownloadsView onBack={() => setCurrentView("home")} />;
  if (currentView === "blog") return <div className="font-sans text-white text-right" dir="rtl"><BlogView articles={articles} works={works} onBack={() => setCurrentView("home")} onOpenArticle={setSelectedArticle} onOpenWork={setSelectedWork} /><ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} /><WorkDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} onOrder={() => setShowContactModal(true)} /><ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 font-sans text-right" dir="rtl">
      <NewsTicker text={settings.tickerText} show={settings.showTicker} />
      <SalesPopup />
      <FloatingChat />

      <header className="px-6 py-6 sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform"><Wrench className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-white tracking-wide">CPE<span className="text-cyan-400">TECH</span></h1></div>
          </div>
          <div className="flex gap-2 items-center">
             {/* حالة المحل */}
             <div className="hidden lg:block"><ShopStatus /></div>
             
             <button onClick={() => setShowTrackingModal(true)} className="hidden md:flex items-center gap-2 text-white px-3 py-2 bg-slate-800 rounded-lg border border-white/10 hover:bg-slate-700"><Activity size={16}/> تتبع طلبك</button>
             <button onClick={() => setCurrentView("store")} className="hidden md:flex items-center gap-2 text-purple-400 font-bold px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20"><ShoppingBag size={18}/> المتجر</button>
             <button onClick={() => setCurrentView("pricing")} className="hidden md:flex items-center gap-2 text-green-400 hover:text-green-300 font-bold px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20"><Banknote size={18}/> الأسعار</button>
             <a href="https://www.youtube.com/@CPE-TECH" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-[#FF0000]/10 text-white px-4 py-2 rounded-lg hover:bg-[#FF0000]/20 border border-[#FF0000]/20 transition-all"><Youtube className="w-5 h-5 text-[#FF0000]" /> <span className="font-bold text-sm">القناة</span></a>
            <button onClick={() => setCurrentView("blog")} className="hidden md:flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10 border border-white/10 transition-all"><LayoutGrid className="w-5 h-5 text-cyan-400" /> <span className="font-bold text-sm">الشروحات</span></button>
            <button onClick={handleLike} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${isLiked ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white"}`}><Heart className={`w-5 h-5 ${isLiked ? "fill-red-400" : ""}`} /> <span className="font-bold text-sm">{analytics.likes}</span></button>
            {isLoggedIn && <button onClick={() => setShowAdminPanel(true)} className="bg-slate-700 text-white p-2 rounded-lg"><Settings className="w-5 h-5" /></button>}
            <button onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLoginModal(true)} className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white">{isLoggedIn ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}</button>
          </div>
        </div>
        <div className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setShowTrackingModal(true)} className="flex-shrink-0 flex items-center gap-2 text-white px-3 py-2 bg-slate-800 rounded-lg text-sm"><Activity size={16}/> تتبع</button>
            <button onClick={() => setCurrentView("store")} className="flex-shrink-0 flex items-center gap-2 text-purple-400 px-3 py-2 bg-purple-500/10 rounded-lg text-sm font-bold"><ShoppingBag size={16}/> المتجر</button>
            <button onClick={() => setCurrentView("pricing")} className="flex-shrink-0 flex items-center gap-2 text-green-400 px-3 py-2 bg-green-500/10 rounded-lg text-sm font-bold"><Banknote size={16}/> الأسعار</button>
            <button onClick={() => setCurrentView("blog")} className="flex-shrink-0 flex items-center gap-2 text-cyan-400 px-3 py-2 bg-cyan-500/10 rounded-lg text-sm font-bold"><LayoutGrid size={16}/> الشروحات</button>
        </div>
      </header>

      <section className="px-6 py-12 relative">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative shadow-2xl h-[500px] group border border-white/10">
          <ImageWithFallback src={settings.heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex flex-col justify-end p-8 md:p-16">
            <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
              <span className="inline-block bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-bold mb-4 backdrop-blur-md">🔧 المركز المعتمد الأول في واسط</span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">CPE-TECH<br/><span className="text-cyan-400 text-2xl md:text-4xl">للحلول التقنية المتقدمة</span></h2>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <p className="text-xl text-slate-300 max-w-xl leading-relaxed">صيانة هاردوير احترافية • تخطي حمايات • سيرفرات فك تشفير</p>
                  <OfferCountdown />
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setShowBookingModal(true)} className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#20b857] transition-all shadow-lg shadow-green-500/20"><Calendar className="w-5 h-5" /> حجز موعد صيانة</button>
                <button onClick={() => setCurrentView("downloads")} className="flex items-center gap-2 bg-orange-500/10 text-orange-400 px-8 py-4 rounded-xl font-bold hover:bg-orange-500/20 transition-all border border-orange-500/20"><Download className="w-5 h-5" /> ملفات الفنيين</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <BrandsMarquee />

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => setCurrentView("hardware")} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group border border-white/5 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden"><div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:bg-emerald-500/20 transition-colors"></div><Cpu className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" /><h3 className="text-2xl font-bold text-white mb-2">الهاردوير والحاسوب</h3><p className="text-slate-400 text-sm mb-4">صيانة بوردات، شاشات، لابتوبات، فورمات، تجميع PC.</p><span className="text-emerald-400 text-sm font-bold flex items-center gap-1">تصفح الخدمات <ArrowLeft size={16}/></span></div>
          <div onClick={() => setCurrentView("software")} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group border border-white/5 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"><div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:bg-blue-500/20 transition-colors"></div><Unlock className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" /><h3 className="text-2xl font-bold text-white mb-2">السوفت وير والتخطي</h3><p className="text-slate-400 text-sm mb-4">تخطي FRP، آيكلاود، تفليش، فك شبكات، سيرفرات.</p><span className="text-blue-400 text-sm font-bold flex items-center gap-1">دخول القسم <ArrowLeft size={16}/></span></div>
          <a href="https://www.youtube.com/@CPE-TECH" target="_blank" rel="noreferrer" className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group border border-white/5 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 relative overflow-hidden block"><div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:bg-red-500/20 transition-colors"></div><Youtube className="w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform" /><h3 className="text-2xl font-bold text-white mb-2">قناة اليوتيوب</h3><p className="text-slate-400 text-sm mb-4">شروحات حصرية ومجانية في مجال الصيانة والبرمجة.</p><span className="text-red-400 text-sm font-bold flex items-center gap-1">مشاهدة الفيديوهات <ArrowLeft size={16}/></span></a>
        </div>
      </section>

      <section className="px-6 py-12 bg-black/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto"><div className="text-center mb-10"><h3 className="text-3xl font-bold text-white mb-2">لماذا تختار CPE-TECH؟</h3><p className="text-slate-400">نتميز بالسرعة، الأمانة، والاحترافية</p></div><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div className="p-4 bg-slate-800/50 rounded-xl border border-white/5"><Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2"/><h4 className="text-white font-bold text-lg">+1 ساعة</h4><p className="text-xs text-slate-400">متوسط وقت الإصلاح</p></div><div className="p-4 bg-slate-800/50 rounded-xl border border-white/5"><Award className="w-8 h-8 text-yellow-400 mx-auto mb-2"/><h4 className="text-white font-bold text-lg">ضمان حقيقي</h4><p className="text-xs text-slate-400">على جميع قطع الغيار</p></div><div className="p-4 bg-slate-800/50 rounded-xl border border-white/5"><Users className="w-8 h-8 text-green-400 mx-auto mb-2"/><h4 className="text-white font-bold text-lg">+1500</h4><p className="text-xs text-slate-400">عميل سعيد بخدماتنا</p></div><div className="p-4 bg-slate-800/50 rounded-xl border border-white/5"><Wrench className="w-8 h-8 text-purple-400 mx-auto mb-2"/><h4 className="text-white font-bold text-lg">خبرة</h4><p className="text-xs text-slate-400">فريق هندسي متخصص</p></div></div></div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto"><h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2"><Star className="text-yellow-400 fill-yellow-400"/> آراء العملاء</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[{ name: "أحمد العراقي", comment: "شغل نظيف ومرتب، صلحت جهازي عندهم ورجع وكالة. تعامل راقي جداً.", stars: 5 }, { name: "سارة محمد", comment: "أفضل مركز في الكوت، حلوا مشكلة الآيكلاود بوقت قياسي وبسعر مناسب.", stars: 5 }, { name: "Mustafa Ali", comment: "المهندس فاهم شغله زين، أنصح بالتعامل وياهم خصوصاً بالسوفت وير.", stars: 4 }].map((review, i) => (<div key={i} className="bg-slate-800 p-6 rounded-2xl border border-white/5 relative"><div className="flex gap-1 mb-3">{[...Array(review.stars)].map((_,x)=><Star key={x} size={14} className="text-yellow-400 fill-yellow-400"/>)}</div><p className="text-slate-300 mb-4 text-sm leading-relaxed">"{review.comment}"</p><div className="flex items-center gap-3"><div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xs">{review.name[0]}</div><span className="text-white font-bold text-sm">{review.name}</span></div></div>))}</div></div>
      </section>

      <FAQSection />

      <footer className="relative bg-slate-950 overflow-hidden border-t border-white/10 mt-12 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div><div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center"><Wrench className="w-5 h-5 text-white" /></div><h2 className="text-2xl font-bold text-white">CPE<span className="text-cyan-400">TECH</span></h2></div><p className="text-slate-400 leading-relaxed mb-6">وجهتك الأولى لصيانة الأجهزة الذكية والحواسيب.</p><div className="flex gap-4"><a href="https://www.youtube.com/@CPE-TECH" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded hover:bg-red-600 transition-colors text-white"><Youtube size={20}/></a><a href="https://t.me/+9640770281922" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded hover:bg-blue-500 transition-colors text-white"><Send size={20}/></a><a href="https://wa.me/9640770281922" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded hover:bg-green-500 transition-colors text-white"><MessageCircle size={20}/></a></div></div>
            <div><h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 w-fit">اتصل بنا</h3><ul className="space-y-4"><li className="flex items-start gap-3 text-slate-400"><MapPin className="text-cyan-400 flex-shrink-0" size={20} /><span>العراق - واسط - الكوت<br/>شارع المحافظة</span></li><li className="flex items-center gap-3 text-slate-400"><Phone className="text-cyan-400 flex-shrink-0" size={20} /><span dir="ltr" className="font-mono">0770 281 9222</span></li></ul></div>
            <div className="w-full"><h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 w-fit">موقعنا على الخريطة</h3><LocationMap /></div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center"><p className="text-slate-500 text-sm">© {new Date().getFullYear()} CPE-TECH 2026. جميع الحقوق محفوظة.</p></div>
        </div>
      </footer>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={(u, p) => {setIsLoggedIn(true); setShowLoginModal(false);}} />
      <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} articles={articles} setArticles={setArticles} works={works} setWorks={setWorks} analytics={analytics} settings={settings} setSettings={setSettings} />
      <WorkDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} onOrder={() => setShowContactModal(true)} />
      <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
      <TrackingModal isOpen={showTrackingModal} onClose={() => setShowTrackingModal(false)} />
    </div>
  );
}