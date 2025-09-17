import React from 'react';
import { Search, Eye, Sun, Moon } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const MobileNav = ({ isDarkMode, setIsSearchOpen, setIsSettingsOpen, setIsDarkMode, setCurrentPage, lang, setLang }) => {
  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-lg`}>
      <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <img src='/images/logo_nim.svg' alt='Logo' className="w-25" />
      </div>
      <div className="flex items-center space-x-2">
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
    </header>
  );
};

export default MobileNav;
