import React from 'react';

const Layout = ({ children, isMobile, themeClasses, getFontClass, isDarkMode }) => {
  return (
    <div className={`min-h-screen ${themeClasses} ${getFontClass()}`}>
      {children}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-1/4 right-1/4 w-32 h-32 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-400'} bg-opacity-20 rounded-full blur-xl`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-24 h-24 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-400'} bg-opacity-20 rounded-full blur-xl`}></div>
        <div className={`absolute top-1/3 left-1/3 w-16 h-16 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-400'} bg-opacity-30 rounded-full blur-lg`}></div>
      </div>
    </div>
  );
};

export default Layout;
