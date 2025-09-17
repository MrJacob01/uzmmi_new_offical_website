import React, { useState } from 'react';
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
        { label: 'Цифровизация госуслуг', id: 'svc-digit' },
        { label: 'Информационная безопасность', id: 'svc-sec' },
        { label: 'ИТ-консалтинг', id: 'svc-consult' },
        { label: 'Интеграция систем', id: 'svc-integration' },
        { label: 'Аналитика данных', id: 'svc-analytics' },
        { label: 'Техническая поддержка', id: 'svc-support' }
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
    },
    {
      title: 'ТЕХНОЛОГИИ',
      links: [
        { label: 'AI / ML', id: 'ai' },
        { label: 'Cloud', id: 'cloud' },
        { label: 'Blockchain', id: 'blockchain' },
        { label: 'Microservices', id: 'microservices' }
      ]
    }
  ]
};

const DesktopNav = ({ isDarkMode, borderClasses, navItems, currentPage, setCurrentPage, setIsSearchOpen, setIsSettingsOpen, setIsDarkMode, lang, setLang }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleEnter = (id) => setOpenMenu(id);
  const handleLeave = () => setOpenMenu(null);

  const menuBg = isDarkMode ? 'bg-[#060a12]/95' : 'bg-white/95';
  const menuBorder = isDarkMode ? 'border-white/10' : 'border-black/10';
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl border-b ${borderClasses} shadow-lg`}> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src='/images/logo_nim.svg' alt='UZINFOCOM Logo' className="w-70" />
          </div>
          <div className="hidden md:flex items-center space-x-6" onMouseLeave={handleLeave}>
            {navItems.map((item) => {
            //   const hasMega = ['services','company','Компания','Услуги'].includes(item.id) || ['Услуги','Компания'].includes(item.label);
              const triggerId = item.id === 'services' ? 'services' : (item.id === 'company' || item.label === 'Компания' ? 'company' : null);
              return (
                <div key={item.id} className="relative" onMouseEnter={() => triggerId && handleEnter(triggerId)}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-1 py-2 hover:text-blue-300 transition-colors ${currentPage === item.id ? 'text-blue-400' : ''}`}
                  >
                    {item.label}{triggerId && <span className="ml-1 text-xs">▾</span>}
                  </button>
                  {triggerId && openMenu === triggerId && (
                    <div className={`absolute left-0 top-full mt-3 w-[620px] xl:w-[740px] ${menuBg} ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} border ${menuBorder} rounded-2xl shadow-2xl p-8 grid grid-cols-3 gap-10 animate-fadeIn backdrop-blur-xl`}> 
                      {MEGA_MENUS[triggerId].map(col => (
                        <div key={col.title} className="space-y-3">
                          <div className="text-xs tracking-wider font-semibold text-gray-400">{col.title}</div>
                          <ul className="space-y-2">
                            {col.links.map(l => (
                              <li key={l.id}>
                                <button className={`text-sm hover:text-blue-400 transition-colors text-left w-full ${l.className || ''}`}>{l.label}</button>
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
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <Eye size={20} />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
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
