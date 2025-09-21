import React, { useState, useEffect } from 'react';
import { Home, Settings, Briefcase, Phone, Grid3X3 } from 'lucide-react';
import DesktopNav from '../components/DesktopNav';
import MobileNav from '../components/MobileNav';
import MobileBottomNav from '../components/MobileBottomNav';
import SearchModal from '../components/SearchModal';
import SettingsModal from '../components/SettingsModal';
import { t } from '../i18n/translations';
import Layout from '../layouts/Layout';
import Footer from '../components/Footer';
import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import ProjectsPage from './ProjectsPage';
import ContactsPage from './ContactsPage';
import MorePage from './MorePage';
import NewsPage from './NewsPage';

// Static data moved outside component to avoid recreation and satisfy exhaustive-deps
const FONTS = [
  { name: 'Inter', class: 'font-sans' },
  { name: 'Roboto', class: 'font-mono' },
  { name: 'Georgia', class: 'font-serif' },
  { name: 'Arial', class: 'font-sans' }
];

// New: available font size utility classes
const FONT_SIZES = [
  { label: 'S', value: 'text-sm' },
  { label: 'L', value: 'text-lg' },
  { label: 'XL', value: 'text-xl' },
  { label: '2XL', value: 'text-2xl' }
];

const NEWS_DATA = [
  {
    id: 1,
    title: 'Цифровая трансформация госуслуг достигла нового уровня',
    summary: 'UZINFOCOM запустил новую платформу для интеграции государственных сервисов',
    date: '15 сентября 2025',
    category: 'Технологии',
    image: '🚀'
  },
  {
    id: 2,
    title: 'Международное сотрудничество в области кибербезопасности',
    summary: 'Подписано соглашение о сотрудничестве с ведущими IT-компаниями региона',
    date: '12 сентября 2025',
    category: 'Партнерство',
    image: '🤝'
  },
  {
    id: 3,
    title: 'Новые стандарты информационной безопасности',
    summary: 'Внедрение современных протоколов защиты данных в госструктурах',
    date: '10 сентября 2025',
    category: 'Безопасность',
    image: '🔒'
  }
];

const ANALYSIS_DATA = [
  {
    id: 1,
    title: 'Тенденции цифровизации в Центральной Азии',
    summary: 'Анализ развития IT-инфраструктуры в регионе за 2025 год',
    readTime: '5 мин',
    category: 'Аналитика'
  },
  {
    id: 2,
    title: 'Влияние ИИ на государственные услуги',
    summary: 'Перспективы внедрения искусственного интеллекта в госсекторе',
    readTime: '7 мин',
    category: 'Инновации'
  }
];

// Unified search content list
const SEARCH_CONTENT = [
  // News
  { type: 'news', title: 'Цифровая трансформация госуслуг достигла нового уровня', content: 'UZINFOCOM запустил новую платформу для интеграции государственных сервисов', page: 'home' },
  { type: 'news', title: 'Международное сотрудничество в области кибербезопасности', content: 'Подписано соглашение о сотрудничестве с ведущими IT-компаниями региона', page: 'home' },
  { type: 'news', title: 'Новые стандарты информационной безопасности', content: 'Внедрение современных протоколов защиты данных в госструктурах', page: 'home' },
  // Services
  { type: 'service', title: 'Цифровизация госуслуг', content: 'Разработка и внедрение цифровых решений для государственных организаций', page: 'services' },
  { type: 'service', title: 'Информационная безопасность', content: 'Комплексная защита информационных систем и данных', page: 'services' },
  { type: 'service', title: 'ИТ-консалтинг', content: 'Экспертные консультации по цифровой трансформации', page: 'services' },
  { type: 'service', title: 'Интеграция систем', content: 'Объединение различных информационных систем в единую экосистему', page: 'services' },
  { type: 'service', title: 'Аналитика данных', content: 'Обработка и анализ больших данных для принятия решений', page: 'services' },
  { type: 'service', title: 'Техническая поддержка', content: 'Круглосуточная поддержка и обслуживание ИТ-систем', page: 'services' },
  // Projects
  { type: 'project', title: 'Единая система госуслуг', content: 'Цифровая платформа для получения государственных услуг онлайн', page: 'projects' },
  { type: 'project', title: 'Система электронного документооборота', content: 'Модернизация документооборота в государственных учреждениях', page: 'projects' },
  { type: 'project', title: 'Платформа цифровой идентификации', content: 'Безопасная система идентификации граждан', page: 'projects' }
];

const MainPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentFont, setCurrentFont] = useState('Inter');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lang, setLang] = useState('uz');
  // New: font size state
  const [fontSize, setFontSize] = useState('text-base');

  const fonts = FONTS; // alias for readability

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = SEARCH_CONTENT.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const themeClasses = isDarkMode 
    ? "bg-black opacity-90 text-white"
    : "bg-gradient-to-br from-white-100 via-white-900 to-indigo-100 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-black bg-opacity-30 backdrop-blur-lg"
    : "bg-white bg-opacity-70 backdrop-blur-lg";

  const borderClasses = isDarkMode ? "border-gray-800" : "border-gray-300";
  const textSecondary = isDarkMode ? "text-gray-300" : "text-gray-600";
  const textMuted = isDarkMode ? "text-gray-400" : "text-gray-500";

  const navItems = [
    { id: 'home', label: t(lang,'nav.home'), icon: Home },
    { id: 'services', label: t(lang,'nav.services'), icon: Settings },
    { id: 'projects', label: t(lang,'nav.projects'), icon: Briefcase },
    { id: 'contacts', label: t(lang,'nav.contacts'), icon: Phone },
    { id: 'more', label: t(lang,'nav.more'), icon: Grid3X3 }
  ];

  const getFontClass = () => {
    const font = fonts.find(f => f.name === currentFont);
    // Append font size class
    return `${font ? font.class : 'font-sans'} ${fontSize}`;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services': return <ServicesPage />;
      case 'projects': return <ProjectsPage />;
      case 'contacts': return <ContactsPage />;
      case 'more': return <MorePage />;
      case 'news': return <NewsPage isDarkMode={isDarkMode} cardClasses={cardClasses} newsData={NEWS_DATA} lang={lang} />;
      default:
        return (
          <HomePage
            isDarkMode={isDarkMode}
            cardClasses={cardClasses}
            textSecondary={textSecondary}
            textMuted={textMuted}
            newsData={NEWS_DATA}
            analysisData={ANALYSIS_DATA}
            lang={lang}
            setCurrentPage={setCurrentPage} // added
          />
        );
    }
  };

  return (
    <Layout themeClasses={themeClasses} getFontClass={getFontClass} isDarkMode={isDarkMode}>
      

      {!isMobile && (
        <DesktopNav
          isDarkMode={isDarkMode}
          borderClasses={borderClasses}
          navItems={navItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsSearchOpen={setIsSearchOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          setIsDarkMode={setIsDarkMode}
          lang={lang}
          setLang={setLang}
        />
      )}
      {isMobile && (
        <MobileNav
          isDarkMode={isDarkMode}
          setIsSearchOpen={setIsSearchOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          setIsDarkMode={setIsDarkMode}
          setCurrentPage={setCurrentPage}
          lang={lang}
          setLang={setLang}
        />
      )}
  {/* Add top padding to compensate for fixed DesktopNav height (h-16) */}
  <main className={`flex-1 px-4 ${isMobile ? 'pt-20 pb-24' : 'pt-24 pb-8'}`}>
        <div className="max-w-8xl mx-auto">
          {renderPage()}
        </div>
      </main>
  {isMobile && (
        <MobileBottomNav
          isDarkMode={isDarkMode}
          borderClasses={borderClasses}
          navItems={navItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          textMuted={textMuted}
        />
      )}
  <Footer lang={lang} isDarkMode={isDarkMode} />
      {isSearchOpen && (
        <SearchModal
          isDarkMode={isDarkMode}
          cardClasses={cardClasses}
          borderClasses={borderClasses}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setIsSearchOpen={setIsSearchOpen}
          setCurrentPage={setCurrentPage}
          textSecondary={textSecondary}
          textMuted={textMuted}
        />
      )}
      {isSettingsOpen && (
        <SettingsModal
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          cardClasses={cardClasses}
          borderClasses={borderClasses}
          setIsSettingsOpen={setIsSettingsOpen}
          fonts={fonts}
          currentFont={currentFont}
          setCurrentFont={setCurrentFont}
          // New props for size selection
          fontSizes={FONT_SIZES}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}
    </Layout>
  );
};

export default MainPage;