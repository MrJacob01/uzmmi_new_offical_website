import React, { useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye } from 'lucide-react';

// Redesigned NewsPage with category filters, pagination, and interactive cards
const NewsPage = ({
  newsData = [],
  setCurrentPage = () => {},
  onSelectNews = () => {},
  t = (l, k) => k,
  lang = 'ru'
}) => {
  // Derive categories from data; fall back to 'general'
  const categories = useMemo(() => {
    const set = new Set();
    newsData.forEach(n => set.add(n.category || 'general'));
    return ['all', ...Array.from(set)];
  }, [newsData]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => (
    activeCategory === 'all' ? newsData : newsData.filter(n => (n.category || 'general') === activeCategory)
  ), [activeCategory, newsData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const categoryLabel = (cat) => {
    if (cat === 'all') return t(lang,'news.all') || 'Все';
    return cat; // Could map to translation keys if available
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <button
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          onClick={() => setCurrentPage('home')}
        >
          <ArrowLeft size={18} /> {t(lang, 'nav.home') || 'Главная'}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{t(lang, 'news.all') || 'Новости'}</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-start mb-10">
        {categories.map(cat => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`px-4 h-9 rounded-full text-xs md:text-sm font-medium tracking-wide border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50
                ${active ? 'bg-blue-600 border-blue-500 text-white shadow-blue-500/25' : 'bg-blue-900/40 border-blue-800 text-blue-100 hover:bg-blue-800/70'}`}
            >
              {categoryLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {currentItems.length > 0 ? currentItems.map(news => (
          <article
            key={news.id}
            className="group bg-[#0f1625] border border-white/10 rounded-xl flex flex-col overflow-hidden hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-800/20 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            onClick={() => { onSelectNews(news); setCurrentPage('news-detail'); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectNews(news); setCurrentPage('news-detail'); } }}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover transform transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${news.image || '/images/1.jpg'})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/70" />
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] font-medium tracking-wide text-white/80">
                {news.date || ''}
              </div>
              {news.views != null && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/55 text-[10px] text-white/80">
                  <Eye size={12} className="opacity-80" /> {news.views}
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col p-4">
              <h3 className="font-semibold text-sm md:text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">{news.title}</h3>
              <p className="text-[11px] text-blue-100/70 leading-relaxed line-clamp-3 mb-3">{news.summary}</p>
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-blue-300/70 font-medium">{(news.category || 'general')}</span>
                <span className="text-[10px] text-blue-200/50 group-hover:text-blue-200/80 transition">{t(lang,'news.readMore') || 'Подробнее'} →</span>
              </div>
            </div>
          </article>
        )) : (
          <div className="col-span-full text-center text-sm text-blue-100/70 py-10">{t(lang,'news.none') || 'Нет новостей'}</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-10 select-none">
          <button onClick={() => goTo(1)} disabled={page === 1} className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs transition ${page === 1 ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30' : 'border-white/15 text-blue-200 hover:bg-blue-800/50'}`} aria-label="First page"><ChevronsLeft size={14} /></button>
          <button onClick={() => goTo(page - 1)} disabled={page === 1} className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs transition ${page === 1 ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30' : 'border-white/15 text-blue-200 hover:bg-blue-800/50'}`} aria-label="Previous page"><ChevronLeft size={14} /></button>
          {Array.from({ length: totalPages }).slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5).map((_, i, arr) => {
            const start = Math.max(0, page - 3);
            const pageNumber = start + i + 1;
            if (pageNumber > totalPages) return null;
            return (
              <button
                key={pageNumber}
                onClick={() => goTo(pageNumber)}
                className={`min-w-8 h-8 px-2 flex items-center justify-center rounded-md border text-xs font-medium transition ${pageNumber === page ? 'bg-blue-600 border-blue-500 text-white' : 'border-white/15 text-blue-200 hover:bg-blue-800/50'}`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button onClick={() => goTo(page + 1)} disabled={page === totalPages} className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs transition ${page === totalPages ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30' : 'border-white/15 text-blue-200 hover:bg-blue-800/50'}`} aria-label="Next page"><ChevronRight size={14} /></button>
          <button onClick={() => goTo(totalPages)} disabled={page === totalPages} className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs transition ${page === totalPages ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30' : 'border-white/15 text-blue-200 hover:bg-blue-800/50'}`} aria-label="Last page"><ChevronsRight size={14} /></button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
