import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, Sun, Moon } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

// Mega menu configuration
const MEGA_MENUS = {
  company: [
    {
      title: 'КОМПАНИЯ',
      links: [
        { label: 'О нас', id: 'about' },
        { label: 'Руководство', id: 'leadership' },
        { label: 'Карьера', id: 'careers' },
        { label: 'Политика конфиденциальности', id: 'privacy' },
        { label: 'ESG и устойчивое развитие', id: 'esg', className: 'text-green-500' }
      ]
    },
    {
      title: 'ДОКУМЕНТЫ',
      links: [
        { label: 'Сертификаты и лицензии', id: 'certs' },
        { label: 'Тендеры', id: 'tenders' },
        { label: 'Меморандумы', id: 'memos' },
        { label: 'Противодействие коррупции', id: 'anti-corruption' },
        { label: 'Открытые данные', id: 'open-data' }
      ]
    },
    {
      title: 'МЕДИАТЕКА',
      links: [
        { label: 'Медиатека', id: 'media' }
      ]
    }
  ],
  services: [
    {
      title: 'УСЛУГИ',
      links: [
        { label: 'Область по акустике, ультразвуку и вибрации', id: 'svc-acoustics' },
        { label: 'Область по длине', id: 'svc-length' },
        { label: 'Область по фотометрии и радиометрии', id: 'svc-photometry' },
        { label: 'Область по ионизирующему излучению', id: 'svc-ionizing' },
        { label: 'Область по времени и частоте', id: 'svc-time-frequency' },
        { label: 'Область по электричеству и магнетизму', id: 'svc-electricity-magnetism' },
        { label: 'Область по массам и соответствующим величинам', id: 'svc-mass' },
        { label: 'Область по количеству вещества: метрология в химии и биологии', id: 'svc-chem-bio' },
        { label: 'Область по термометрии', id: 'svc-thermometry' },
        { label: 'Область по единицам величин', id: 'svc-units' }
      ]
    },
    {
      title: 'ПОДХОД',
      links: [
        { label: 'Методологии', id: 'methodology' },
        { label: 'Архитектура', id: 'architecture' },
        { label: 'DevSecOps', id: 'devsecops' },
        { label: 'SLA и мониторинг', id: 'sla' }
      ]
    }
  ]
};

const DesktopNav = ({ isDarkMode, borderClasses, navItems, currentPage, setCurrentPage, setIsSearchOpen, setIsSettingsOpen, setIsDarkMode, lang, setLang }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);

  const open = (id) => setOpenMenu(id);
  const close = () => setOpenMenu(null);
  const toggle = (id) => setOpenMenu(prev => (prev === id ? null : id));

  const handleEnter = (id) => {
    if (!id) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => open(id), 120);
  };

  const handleLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => close(), 180);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Time state
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
  <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 bg-[#191970] bg-opacity-90 text-white backdrop-blur-xl border-b ${borderClasses} shadow-lg`} role="navigation" aria-label="Main navigation"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src='/images/logo_nim.svg' alt='logo' className="w-70" />
          </div>
          <div className="hidden md:flex items-center space-x-6" onMouseLeave={handleLeave} role="menubar">
            {navItems.map((item) => {
              const triggerId = item.id === 'services' ? 'services' : (item.id === 'company' || item.label === 'Компания' ? 'company' : null);
              return (
                <div key={item.id} className="relative" onMouseEnter={() => triggerId && handleEnter(triggerId)} onFocus={() => triggerId && handleEnter(triggerId)} onMouseLeave={handleLeave}>
                  <button
                    id={triggerId ? `menu-trigger-${triggerId}` : undefined}
                    onClick={(e) => {
                      if (triggerId) {
                        e.preventDefault();
                        toggle(triggerId);
                      } else {
                        setCurrentPage(item.id);
                      }
                    }}
                    className={`px-1 py-2 hover:text-blue-300 transition-colors ${currentPage === item.id ? 'text-blue-400' : ''}`}
                    aria-haspopup={triggerId ? 'menu' : undefined}
                    aria-expanded={triggerId ? openMenu === triggerId : undefined}
                    aria-controls={triggerId ? `${triggerId}-menu` : undefined}
                    role={triggerId ? 'menuitem' : undefined}
                  >
                    {item.label}{triggerId && <span className="ml-1 text-xs">▾</span>}
                  </button>
                  {triggerId && openMenu === triggerId && (
                    <div
                      id={`${triggerId}-menu`}
                      role="menu"
                      aria-labelledby={`menu-trigger-${triggerId}`}
                      className={`absolute left-0 top-full mt-3 w-[620px] bg-[#191970] xl:w-[740px] border 'border-white/10' rounded-2xl shadow-2xl p-8 grid grid-cols-3 gap-10 animate-fadeIn backdrop-blur-xl`}
                      onMouseEnter={() => handleEnter(triggerId)}
                      onMouseLeave={handleLeave}
                    > 
                      {MEGA_MENUS[triggerId].map(col => (
                        <div key={col.title} className="space-y-3">
                          <div className="text-xs tracking-wider font-semibold text-gray-400">{col.title}</div>
                          <ul className="space-y-2">
                            {col.links.map(l => (
                              <li key={l.id}>
                                <button
                                  className={`text-sm hover:text-blue-400 transition-colors text-left w-full ${l.className || ''}`}
                                  role="menuitem"
                                  onClick={() => { setCurrentPage('services'); close(); }}
                                >
                                  {l.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
            {/* Time display */}
            <span className={`font-mono text-3xl text-white`} aria-label="Current time">
              {timeStr}
            </span>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg bg-blue-800 hover:bg-gray-700 transition-colors`}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 rounded-lg bg-blue-800 hover:bg-gray-700 transition-colors`}
            >
              <Eye size={20} />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg bg-blue-800 hover:bg-gray-700 transition-colors`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <LanguageSwitcher lang={lang} onChange={setLang} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
