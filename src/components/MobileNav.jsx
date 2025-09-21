import React, { useState, useEffect } from 'react';
import { Search, Eye, Sun, Moon } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const MobileNav = ({ isDarkMode, setIsSearchOpen, setIsSettingsOpen, setIsDarkMode, setCurrentPage, lang, setLang }) => {
  // Time state
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-[#191970] bg-opacity-90 `}>
      <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <img src='/images/logo_nim.svg' alt='Logo' className="w-13" />
      </div>
      <div className="flex items-center space-x-2 text-white">
        <span className={`font-mono text-xs text-white`} aria-label="Current time">{timeStr}</span>
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
    </header>
  );
};

export default MobileNav;
