import React, { useState, useRef } from 'react';
import { t } from '../i18n/translations';
import { Calendar, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Partners mock data
const PARTNERS = [
  { id: 1, name: 'AloqaBank', sector: 'commercial', logo: '/images/logo192.png' },
  { id: 2, name: 'Веб-сайт Президента Республики Узбекистан', sector: 'government', logo: '/images/logo192.png' },
  { id: 3, name: 'Сенат Олий Мажлиса', sector: 'government', logo: '/images/logo192.png' },
  { id: 4, name: 'Министерство Юстиции', sector: 'government', logo: '/images/logo192.png' },
  { id: 5, name: 'Министерство Дошкольного Образования', sector: 'government', logo: '/images/logo192.png' },
  { id: 6, name: 'Коммерческий банк X', sector: 'commercial', logo: '/images/logo192.png' },
  { id: 7, name: 'ИТ Агентство', sector: 'commercial', logo: '/images/logo192.png' },
  { id: 8, name: 'Госкомитет Цифровизации', sector: 'government', logo: '/images/logo192.png' },
  { id: 9, name: 'Госкомитет Цифровизации', sector: 'government', logo: '/images/logo192.png' },
];

const HomePage = ({ isDarkMode, cardClasses, textSecondary, textMuted, newsData, analysisData, lang, setCurrentPage = () => {}, onSelectNews = () => {} }) => {
  const [sector, setSector] = useState('commercial');
  const partnersRef = useRef(null);

  const handleOpenNews = (news) => {
    if (onSelectNews) onSelectNews(news);
    setCurrentPage('news-detail');
  };

  const scrollPartners = (dir) => {
    const el = partnersRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };
  return (
    <div className="space-y-12">
      {/* Redesigned Hero Section */}
      <section className="relative h-[600px] rounded-[20px] overflow-hidden p-12 md:p-14 border border-blue/10">
        {/* Background image layer */}
        <div className="absolute inset-0 w-full h-full" style={{backgroundImage:'url(/images/building.jpg)', backgroundSize:'cover', backgroundPosition:'center', zIndex:0}} />
        <div className="grid text-center justify-center py-12 relative z-10">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-12 ">
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight ">
              {t(lang,'hero.titleLines')}
              <br className="hidden md:block" />
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed ${textSecondary}`}>
              Единый интегратор по созданию и поддержке государственных информационных систем
            </p>
            <div className="flex gap-4 pt-12 justify-center">
              <button className="flex items-center gap-2 px-6 h-14 rounded-xl bg-blue-900 hover:bg-[#162034] text-white font-medium transition-colors">
                <Play size={18} className="opacity-80" /> Смотреть видео
              </button>
              <button className="flex items-center gap-2 px-6 h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[40px] ring-1 ring-inset ring-white/5" />
      </section>
      {/* Feature / Why Choose Section */}
      <section className="mt-4">
        <div className="text-center mb-10">
          <div className="text-sm text-amber-400 mb-2 relative inline-block after:content-[''] after:block after:h-px after:bg-amber-500 after:mt-2 after:w-16 after:mx-auto">
            Почему мы?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">о нас</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-3xl overflow-hidden group min-h-[340px] flex flex-col justify-end p-6" style={{backgroundImage: "url(/images/building.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors"></div>
            <div className="relative">
              <h3 className="font-bold text-lg mb-2">Опыт и инновации</h3>
              <p className="text-sm text-gray-300 max-w-xs">Первые IT-решения в Узбекистане. Более 1400 экспертов.</p>
            </div>
          </div>
          {/* Card 2 (split layout with overlay bubble) */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden group h-[200px]" style={{backgroundImage: "url(/images/building.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4">
                  <h3 className="font-bold text-base mb-1">Умные технологии</h3>
                  <p className="text-xs text-gray-300 leading-snug">Лидеры в AI и машинном обучении. Инновации для вашего бизнеса.</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden group h-[140px]" style={{backgroundImage: "url(/images/building.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4">
                  <h3 className="font-bold text-base mb-1">Безопасность</h3>
                  <p className="text-xs text-gray-300 leading-snug">Современные стандарты защиты и непрерывный мониторинг.</p>
                </div>
              </div>
            </div>
          {/* Card 3 */}
          <div className="relative rounded-3xl overflow-hidden group min-h-[340px] flex flex-col justify-end p-6" style={{backgroundImage: "url(/images/building.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors"></div>
            <div className="relative">
              <h3 className="font-bold text-lg mb-2">IT-Партнер</h3>
              <p className="text-sm text-gray-300 max-w-xs">Надежный IT-партнер для роста вашего бизнеса.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${cardClasses} rounded-3xl p-6 py-8`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="text-blue-400" />
            <span>{t(lang,'news.latest')}</span>
          </h2>
          <button
            className="text-xs md:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            onClick={() => setCurrentPage('news')}
          >
            <span>{t(lang,'news.all')}</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {newsData.map(news => (
            <article
              key={news.id}
              className="group rounded-2xl overflow-hidden relative flex flex-col h-full border border-white/10 bg-white-500 hover:bg-blue-900 transition shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              onClick={() => handleOpenNews(news)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenNews(news); } }}
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-center bg-cover scale-100 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url(/images/building.jpg)' }} />
                <div className="absolute inset-0" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-medium tracking-wide bg-blue-600/80 backdrop-blur text-white/90">
                  {news.date}
                </div>
              </div>
              <div className="flex-1 flex flex-col p-4 group-hover:text-white">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">{news.title}</h3>
                <p className={`text-[11px] leading-relaxed mb-3 line-clamp-3`}>{news.summary}</p>
                <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="text-white group-hover:translate-x-1 transition-transform text-[11px] flex items-center gap-1">
                    {t(lang,'news.detail')}
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={`${cardClasses} rounded-3xl p-8 bg-gradient-to-br from-blue-900/80 to-blue-700/80 shadow-xl`}>
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
            Постановление Президента Республики Узбекистана Кабинета Министров Республики Узбекистан
          </h2>
          <p className="text-blue-200 mt-2 text-base md:text-lg">Актуальные отчеты и обращения руководства страны и министерства</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 h-300">
          {/* President Card */}
          <div className="bg-white/10 rounded-2xl flex flex-col items-start shadow-lg hover:shadow-2xl transition group border border-white/10 relative overflow-hidden">
            {/* Image */}
            <div className="w-full h-80 md:h-52 overflow-hidden">
              <img src="/images/prezint_qarori.jpg" alt="Президент Республики Узбекистан" className="w-full h-full object-cover" />
            </div>
            <div className="p-7 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="text-xs text-blue-200 font-semibold">Президент Республики Узбекистан</div>
                <h3 className="font-bold text-lg text-white">Доклады и обращения Президента</h3>
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-6">Последние отчеты, инициативы и обращения Президента Республики Узбекистан по вопросам цифровизации, инноваций и развития IT-сектора.</p>
            <a href="https://president.uz/ru/lists/view/press_service_news" target="_blank" rel="noopener noreferrer" className="mt-auto inline-block px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow transition">Читать подробнее</a>
            </div>
          </div>
          {/* Ministry Card */}
          <div className="bg-white/10 rounded-2xl flex flex-col items-start shadow-lg hover:shadow-2xl transition group border border-white/10 relative overflow-hidden">
            {/* Image */}
            <div className="w-full h-80 md:h-52 overflow-hidden">
              <img src="/images/minstery_report.png" alt="Министерство" className="w-full h-full object-cover" />
            </div>
            <div className="p-7 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="text-xs text-blue-200 font-semibold">Министерство</div>
                <h3 className="font-bold text-lg text-white">Отчеты и публикации Министерства</h3>
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-6">Актуальные отчеты, публикации и новости Министерства, связанные с цифровыми технологиями и государственными информационными системами.</p>
            <a href="https://mitc.uz/ru/news/list.php?SECTION_ID=1" target="_blank" rel="noopener noreferrer" className="mt-auto inline-block px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow transition">Читать подробнее</a>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-lg transition">Показать больше</button>
        </div>
      </section>
      {/* Partners Section */}
      <section className="pt-4">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <div className="text-sm text-amber-400 mb-3 relative inline-block after:content-[''] after:block after:h-px after:bg-amber-500 after:mt-2 after:w-24 after:mx-auto">
            Наши партнеры
          </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Доверие и лояльность наших клиентов это наш безусловный успех</h2>
          <p className={`${textSecondary} text-base md:text-lg leading-relaxed max-w-4xl mx-auto`}>Один из важнейших, ключевых аспектов цифровизации – создание мощной базы по обработке, управлению и хранению данных. С этой целью был создан Единый интегратор UZINFOCOM, в чьи задачи входит создание и поддержка государственных информационных систем.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-white">
            <button onClick={() => setSector('commercial')} className={`px-6 py-2 rounded-full text-xs font-medium tracking-wide transition-all border ${(sector==='commercial') ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/25' : 'bg-blue-900/50 border-blue-700 hover:bg-blue-800'}`}>Коммерческий сектор</button>
            <button onClick={() => setSector('government')} className={`px-6 py-2 rounded-full text-xs font-medium tracking-wide transition-all border ${(sector==='government') ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/25' : 'bg-blue-900/50 border-blue-700 hover:bg-blue-800'}`}>Государственный сектор</button>
          </div>
        </div>
        <div className="relative group">
          {/* Gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-2xl" />
          {/* Scroll buttons (desktop) */}
          <button type="button" aria-label="Scroll left" onClick={() => scrollPartners(-1)} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-black/60 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-black/70 transition-opacity opacity-0 group-hover:opacity-100">
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Scroll right" onClick={() => scrollPartners(1)} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-black/60 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-black/70 transition-opacity opacity-0 group-hover:opacity-100">
            <ChevronRight size={20} />
          </button>
          <div
            ref={partnersRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
            onWheel={(e) => {
              const el = e.currentTarget;
              if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                el.scrollLeft += e.deltaY;
                e.preventDefault();
              }
            }}
          >
            {PARTNERS.filter(p => p.sector === sector).map(partner => (
              <div
                key={partner.id}
                className={`min-w-[220px] md:min-w-[260px] snap-start rounded-2xl p-5 relative overflow-hidden ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/70 hover:bg-white/90'} border border-white/10 shadow-sm transition group`}
              >
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center overflow-hidden ring-1 ring-white/10">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-2 mix-blend-screen"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="font-medium text-sm leading-snug line-clamp-3 text-center px-1">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
