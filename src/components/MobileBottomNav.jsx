import React from 'react';

const MobileBottomNav = ({ isDarkMode, borderClasses, navItems, currentPage, setCurrentPage, textMuted }) => {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-black bg-opacity-90' : 'bg-white bg-opacity-90'} backdrop-blur-lg border-t ${borderClasses}`}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 transition-colors ${
                currentPage === item.id ? 'text-blue-400' : `${textMuted} hover:text-current`
              }`}
            >
              <IconComponent size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
