import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Calendar, Filter, Search as SearchIcon, Clock, Layers} from 'lucide-react';
import { t } from '../i18n/translations';

// Redesigned NewsPage
const NewsPage = ({ isDarkMode, cardClasses, newsData, lang }) => {
  // Categories
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(newsData.map(n => n.category).filter(Boolean)))],
    [newsData]
  );
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest'); // latest | oldest
  // Date range filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9); // was constant

  const parseRuDate = (str) => {
    if (!str) return null;
    const months = {
      'января':0,'февраля':1,'марта':2,'апреля':3,'мая':4,'июня':5,
      'июля':6,'августа':7,'сентября':8,'октября':9,'ноября':10,'декабря':11
    };
    const parts = str.split(' ');
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0],10);
    const m = months[parts[1].toLowerCase()];
    const y = parseInt(parts[2],10);
    if (isNaN(d)||m===undefined||isNaN(y)) return null;
    return new Date(Date.UTC(y,m,d));
  };

  // Reset page when filters/search/date/category/sort change
  useEffect(() => { setPage(1); }, [selectedCategory, search, sort, startDate, endDate, pageSize]); // added pageSize

  // Update filtered computation (add date filtering & remove visible)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = newsData.filter(n =>
      (selectedCategory === 'all' || n.category === selectedCategory) &&
      (!term || (n.title + n.summary).toLowerCase().includes(term))
    );
    // date range filter
    list = list.filter(n => {
      const dt = parseRuDate(n.date);
      if (!dt) return true;
      if (startDate && dt < new Date(startDate)) return false;
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23,59,59,999);
        if (dt > end) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => (sort === 'latest' ? b.id - a.id : a.id - b.id));
    return list;
  }, [newsData, selectedCategory, search, sort, startDate, endDate]);

  // shown now page-based
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);

  const pillBase = `px-3 py-1.5 rounded-full text-xs font-medium transition-colors border`;
  const activePill = `bg-blue-600 text-white border-blue-500`;
  const inactivePill = `${isDarkMode ? 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`;

  return (
    <div className="space-y-10">
      {/* Hero / Banner */}
      <section className={`relative overflow-hidden rounded-3xl p-8 md:p-12 `}>
        <div className="relative z-10 space-y-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t(lang, 'news.all')}
          </h1>
          <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Свежие публикации, аналитика и обновления. Используйте фильтры для точного отбора.
          </p>
          <div className="flex flex-wrap gap-6 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-blue-400" />
              <span>Категорий: {categories.length - 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-400" />
              <span>Всего: {newsData.length}</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: 'url(/images/building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      </section>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Sidebar Filters (sticky) */}
        <aside className="lg:col-span-1 space-y-8">
          <div className={`rounded-2xl p-5 text-white bg-blue-900 space-y-6 border border-white/10 sticky top-24`}>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Filter size={14} />
              Фильтры
            </div>
            {/* Search */}
            <div className="relative">
              <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск..."
                className={`w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none border transition
                  ${isDarkMode
                    ? 'bg-white/5 border-white/10 focus:border-blue-500'
                    : 'bg-white border-gray-300 focus:border-blue-500'}`}
              />
            </div>
            {/* Sort */}
            <div className="flex items-center gap-3">
              <label className="text-xs opacity-70">Сортировка:</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className={`text-xs px-2 py-1 rounded-md border outline-none ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-300'}`}
              >
                <option value="latest">Новейшие</option>
                <option value="oldest">Старые</option>
              </select>
            </div>
            {/* New: Page size */}
            <div className="flex items-center gap-3">
              <label className="text-xs opacity-70">На странице:</label>
              <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
                className={`text-xs px-2 py-1 rounded-md border outline-none ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-300'}`}
              >
                {[3,6,9,12].map(sz => <option key={sz} value={sz}>{sz}</option>)}
              </select>
            </div>
            {/* Date Range Filter */}
            <div className="space-y-3">
              <div className="text-xs opacity-70">Диапазон дат:</div>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
                  className={`text-xs px-2 py-1 rounded-md border outline-none ${isDarkMode?'bg-white/5 border-white/10':'bg-white border-gray-300'}`} />
                <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}
                  className={`text-xs px-2 py-1 rounded-md border outline-none ${isDarkMode?'bg-white/5 border-white/10':'bg-white border-gray-300'}`} />
              </div>
              {(startDate||endDate) && (
                <button onClick={()=>{setStartDate('');setEndDate('');}}
                  className="text-[10px] text-blue-400 hover:text-blue-300">
                  Сбросить даты
                </button>
              )}
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${pillBase} ${selectedCategory === cat ? activePill : inactivePill}`}
                >
                  {cat === 'all' ? 'Все' : cat}
                </button>
              ))}
            </div>
            <div className="text-[11px] opacity-60">
              Стр. {page} из {totalPages} • Всего: {filtered.length}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-10">
          {/* Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
              {shown.map(n => (
                <article
                  key={n.id}
                  className={`${cardClasses} rounded-2xl overflow-hidden border border-gray-300/30 flex flex-col hover:shadow-lg transition`}
                >
                  <div className="h-40 relative">
                    <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: 'url(/images/building.jpg)' }} />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-medium tracking-wide bg-blue-600/80 backdrop-blur text-white/90 flex items-center gap-1">
                      <Calendar size={12} /> {n.date}
                    </div>
                    {n.category && (
                      <div className="absolute bottom-3 left-3 text-[10px] px-2 py-1 rounded-md bg-black/50 backdrop-blur text-white/80">
                        {n.category}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="font-semibold text-sm mb-2 line-clamp-2">{n.title}</h2>
                    <p className="text-[11px] leading-relaxed mb-3 line-clamp-4 opacity-80">{n.summary}</p>
                    <button
                      className="mt-auto text-[12px] inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                      type="button"
                    >
                      {t(lang, 'news.detail')}
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {shown.length === 0 && (
              <div className="text-sm opacity-70 px-2">
                Нет новостей по выбранным условиям.
              </div>
            )}
            {/* Pagination (now always visible) */}
            <div className="flex items-center justify-center gap-1 flex-wrap pt-4">
              <button
                disabled={page===1}
                onClick={()=>setPage(p=>Math.max(1,p-1))}
                className={`px-3 py-1.5 text-xs rounded-md border transition ${
                  page===1
                    ? 'opacity-40 cursor-not-allowed'
                    : isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-300 hover:bg-gray-100'
                }`}
              >
                ‹
              </button>
              {Array.from({length: totalPages}, (_,i)=>i+1).slice(
                Math.max(0, Math.min(page-3, totalPages-5)),
                Math.max(0, Math.min(page-3, totalPages-5)) + Math.min(5,totalPages)
              ).map(p => (
                <button
                  key={p}
                  onClick={()=>setPage(p)}
                  className={`px-3 py-1.5 text-xs rounded-md border font-medium transition ${
                    p===page
                      ? 'bg-blue-600 text-white border-blue-500'
                      : isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page===totalPages}
                onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
                className={`px-3 py-1.5 text-xs rounded-md border transition ${
                  page===totalPages
                    ? 'opacity-40 cursor-not-allowed'
                    : isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-300 hover:bg-gray-100'
                }`}
              >
                ›
              </button>
            </div>
        </div>
      </div> 
    </div>
  );
};

export default NewsPage;
