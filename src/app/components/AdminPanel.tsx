import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Calendar, Image as ImageIcon, Save, Eye, Heart, Bookmark, MousePointerClick, MessageCircle, Send, BarChart3, TrendingUp } from 'lucide-react';

interface Article {
  id: number;
  date: string;
  title: string;
  excerpt: string;
}

interface WorkItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface Analytics {
  visitors: number;
  likes: number;
  saves: number;
  contactClicks: number;
  whatsappClicks: number;
  telegramClicks: number;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  works: WorkItem[];
  setWorks: (works: WorkItem[]) => void;
  analytics?: Analytics;
  onResetAnalytics?: () => void;
}

export function AdminPanel({ isOpen, onClose, articles, setArticles, works, setWorks, analytics, onResetAnalytics }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'articles' | 'works'>('analytics');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showWorkForm, setShowWorkForm] = useState(false);

  // Article form states
  const [articleTitle, setArticleTitle] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleDate, setArticleDate] = useState('');

  // Work form states
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workImageUrl, setWorkImageUrl] = useState('');

  if (!isOpen) return null;

  // Article functions
  const handleAddArticle = () => {
    if (!articleTitle || !articleExcerpt || !articleDate) return;

    const newArticle: Article = {
      id: Date.now(),
      date: articleDate,
      title: articleTitle,
      excerpt: articleExcerpt,
    };

    setArticles([newArticle, ...articles]);
    resetArticleForm();
  };

  const handleUpdateArticle = () => {
    if (!editingArticle || !articleTitle || !articleExcerpt || !articleDate) return;

    setArticles(
      articles.map((article) =>
        article.id === editingArticle.id
          ? { ...article, title: articleTitle, excerpt: articleExcerpt, date: articleDate }
          : article
      )
    );
    resetArticleForm();
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const startEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleTitle(article.title);
    setArticleExcerpt(article.excerpt);
    setArticleDate(article.date);
    setShowArticleForm(true);
  };

  const resetArticleForm = () => {
    setArticleTitle('');
    setArticleExcerpt('');
    setArticleDate('');
    setEditingArticle(null);
    setShowArticleForm(false);
  };

  // Work functions
  const handleAddWork = () => {
    if (!workTitle || !workDescription || !workImageUrl) return;

    const newWork: WorkItem = {
      id: Date.now(),
      title: workTitle,
      description: workDescription,
      imageUrl: workImageUrl,
    };

    setWorks([...works, newWork]);
    resetWorkForm();
  };

  const handleUpdateWork = () => {
    if (!editingWork || !workTitle || !workDescription || !workImageUrl) return;

    setWorks(
      works.map((work) =>
        work.id === editingWork.id
          ? { ...work, title: workTitle, description: workDescription, imageUrl: workImageUrl }
          : work
      )
    );
    resetWorkForm();
  };

  const handleDeleteWork = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
      setWorks(works.filter((work) => work.id !== id));
    }
  };

  const startEditWork = (work: WorkItem) => {
    setEditingWork(work);
    setWorkTitle(work.title);
    setWorkDescription(work.description);
    setWorkImageUrl(work.imageUrl);
    setShowWorkForm(true);
  };

  const resetWorkForm = () => {
    setWorkTitle('');
    setWorkDescription('');
    setWorkImageUrl('');
    setEditingWork(null);
    setShowWorkForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-6xl border border-white/20 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">لوحة التحكم - إدارة المحتوى</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-6">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            الإحصائيات
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'articles'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            المقالات والأخبار
          </button>
          <button
            onClick={() => setActiveTab('works')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'works'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            معرض الأعمال
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">إحصائيات الموقع</h3>
                    <p className="text-slate-400 text-sm">تتبع أداء وتفاعل الزوار مع صفحتك</p>
                  </div>
                </div>
                {onResetAnalytics && (
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من إعادة تعيين جميع الإحصائيات؟')) {
                        onResetAnalytics();
                      }
                    }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all"
                  >
                    إعادة تعيين
                  </button>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Visitors */}
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">عدد الزوار</p>
                  <p className="text-4xl font-bold text-white">{analytics.visitors}</p>
                  <p className="text-xs text-blue-400 mt-2">زائر فريد</p>
                </div>

                {/* Likes */}
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-500/30 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">الإعجابات</p>
                  <p className="text-4xl font-bold text-white">{analytics.likes}</p>
                  <p className="text-xs text-red-400 mt-2">إعجاب بالصفحة</p>
                </div>

                {/* Saves */}
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
                      <Bookmark className="w-6 h-6 text-purple-400 fill-purple-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">عمليات الحفظ</p>
                  <p className="text-4xl font-bold text-white">{analytics.saves}</p>
                  <p className="text-xs text-purple-400 mt-2">حفظ الصفحة</p>
                </div>

                {/* Contact Clicks */}
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500/30 rounded-lg flex items-center justify-center">
                      <MousePointerClick className="w-6 h-6 text-orange-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">نماذج التواصل</p>
                  <p className="text-4xl font-bold text-white">{analytics.contactClicks}</p>
                  <p className="text-xs text-orange-400 mt-2">محاولة إرسال</p>
                </div>

                {/* WhatsApp Clicks */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">نقرات واتساب</p>
                  <p className="text-4xl font-bold text-white">{analytics.whatsappClicks}</p>
                  <p className="text-xs text-green-400 mt-2">تواصل مباشر</p>
                </div>

                {/* Telegram Clicks */}
                <div className="bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-sky-500/30 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-sky-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-sky-400" />
                  </div>
                  <p className="text-slate-300 text-sm mb-1">نقرات تلغرام</p>
                  <p className="text-4xl font-bold text-white">{analytics.telegramClicks}</p>
                  <p className="text-xs text-sky-400 mt-2">تواصل مباشر</p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-6 mt-8">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  ملخص الأداء
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-2">معدل التفاعل</p>
                    <p className="text-2xl font-bold text-white">
                      {analytics.visitors > 0 
                        ? Math.round(((analytics.likes + analytics.saves) / analytics.visitors) * 100) 
                        : 0}%
                    </p>
                    <p className="text-xs text-slate-400 mt-1">إعجابات وحفظ / زوار</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-2">معدل التواصل</p>
                    <p className="text-2xl font-bold text-white">
                      {analytics.visitors > 0 
                        ? Math.round(((analytics.whatsappClicks + analytics.telegramClicks + analytics.contactClicks) / analytics.visitors) * 100) 
                        : 0}%
                    </p>
                    <p className="text-xs text-slate-400 mt-1">تواصل / زوار</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              {/* Add Button */}
              {!showArticleForm && (
                <button
                  onClick={() => setShowArticleForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  إضافة مقال جديد
                </button>
              )}

              {/* Article Form */}
              {showArticleForm && (
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {editingArticle ? 'تعديل المقال' : 'مقال جديد'}
                  </h3>

                  <div>
                    <label className="block text-white font-medium mb-2">التاريخ</label>
                    <input
                      type="text"
                      value={articleDate}
                      onChange={(e) => setArticleDate(e.target.value)}
                      placeholder="مثال: 30 يناير 2025"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">العنوان</label>
                    <input
                      type="text"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      placeholder="عنوان المقال"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">المحتوى المختصر</label>
                    <textarea
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
                      placeholder="نبذة مختصرة عن المقال..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Save className="w-5 h-5" />
                      {editingArticle ? 'حفظ التعديلات' : 'إضافة المقال'}
                    </button>
                    <button
                      onClick={resetArticleForm}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Articles List */}
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white/10 border border-white/20 rounded-xl p-6 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{article.date}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{article.title}</h4>
                      <p className="text-slate-300">{article.excerpt}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEditArticle(article)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-all"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Works Tab */}
          {activeTab === 'works' && (
            <div className="space-y-6">
              {/* Add Button */}
              {!showWorkForm && (
                <button
                  onClick={() => setShowWorkForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  إضافة عمل جديد
                </button>
              )}

              {/* Work Form */}
              {showWorkForm && (
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {editingWork ? 'تعديل العمل' : 'عمل جديد'}
                  </h3>

                  <div>
                    <label className="block text-white font-medium mb-2">العنوان</label>
                    <input
                      type="text"
                      value={workTitle}
                      onChange={(e) => setWorkTitle(e.target.value)}
                      placeholder="عنوان العمل"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">الوصف</label>
                    <input
                      type="text"
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="وصف مختصر للعمل"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">رابط الصورة</label>
                    <input
                      type="text"
                      value={workImageUrl}
                      onChange={(e) => setWorkImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={editingWork ? handleUpdateWork : handleAddWork}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Save className="w-5 h-5" />
                      {editingWork ? 'حفظ التعديلات' : 'إضافة العمل'}
                    </button>
                    <button
                      onClick={resetWorkForm}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Works Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {works.map((work) => (
                  <div
                    key={work.id}
                    className="bg-white/10 border border-white/20 rounded-xl overflow-hidden"
                  >
                    <div className="aspect-video bg-slate-700 flex items-center justify-center">
                      {work.imageUrl ? (
                        <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-slate-500" />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-1">{work.title}</h4>
                      <p className="text-sm text-slate-300 mb-3">{work.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditWork(work)}
                          className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-all text-sm font-semibold"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteWork(work.id)}
                          className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all text-sm font-semibold"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}