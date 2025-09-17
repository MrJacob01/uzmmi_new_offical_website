import React from 'react';
import { Eye, X, Type, Sun, Moon } from 'lucide-react';

const SettingsModal = ({ isDarkMode, setIsDarkMode, cardClasses, borderClasses, setIsSettingsOpen, fonts, currentFont, setCurrentFont }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardClasses} rounded-lg w-full max-w-md`}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'transparent' }}>
          <h3 className="text-lg font-semibold flex items-center">
            <Eye size={20} className="mr-2" />
            Настройки отображения
          </h3>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 hover:bg-gray-600 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Type size={16} className="mr-2" />
              Шрифт
            </h4>
            <div className="space-y-2">
              {fonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setCurrentFont(font.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    currentFont === font.name
                      ? 'border-blue-400 bg-blue-400 bg-opacity-20'
                      : borderClasses
                  } ${font.class}`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Тема</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsDarkMode(true)}
                className={`flex-1 p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  isDarkMode
                    ? 'border-blue-400 bg-blue-400 bg-opacity-20'
                    : borderClasses
                }`}
              >
                <Moon size={16} className="mr-2" />
                Темная
              </button>
              <button
                onClick={() => setIsDarkMode(false)}
                className={`flex-1 p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  !isDarkMode
                    ? 'border-blue-400 bg-blue-400 bg-opacity-20'
                    : borderClasses
                }`}
              >
                <Sun size={16} className="mr-2" />
                Светлая
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
