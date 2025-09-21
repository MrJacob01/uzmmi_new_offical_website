import React from 'react';

const LanguageSwitcher = ({ lang, onChange, isDarkMode }) => {
  const languages = ['uz', 'ru', 'en'];
  return (
    <select
      value={lang}
      onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg text-sm cursor-pointer outline-none
        focus:ring-2 focus:ring-blue-400 focus:border-blue-400
        bg-blue-800 text-white`}
      aria-label="Select language"
    >
      {languages.map(code => (
        <option key={code} value={code}>
          {code.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;

