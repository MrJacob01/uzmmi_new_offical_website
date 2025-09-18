import React from 'react';

const LanguageSwitcher = ({ lang, onChange, isDarkMode }) => {
  const next = lang === 'ru' ? 'en' : 'ru' ;
  return (
    <button
      onClick={() => onChange(next)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label="Switch language"
    >
      {lang.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;
