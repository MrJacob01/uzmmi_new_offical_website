import React from 'react';
import { Eye, X, Type, Sun, Moon } from 'lucide-react';

const SettingsModal = ({
  isDarkMode,
  setIsDarkMode,
  cardClasses,
  borderClasses,
  setIsSettingsOpen,
  fonts,
  currentFont,
  setCurrentFont,
  fontSizes = [],
  fontSize,
  setFontSize
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${cardClasses} rounded-lg w-full max-w-md max-h-[80vh] flex flex-col`} // added max-h and flex
      >
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
        <div className="p-4 space-y-6 overflow-y-auto flex-1"> {/* made scrollable */}
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
          {/* Font size selection with horizontal scroll */}
          <div className="mt-2">
            <div className="text-sm font-medium mb-2">
              Размер шрифта
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 pr-1 hidescrollbar">
              {fontSizes.map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFontSize && setFontSize(s.value)}
                  className={`
                    px-3 py-2 rounded-md border whitespace-nowrap transition
                    ${fontSize === s.value
                      ? 'border-blue-500 bg-blue-500/20 ring-1 ring-blue-400'
                      : 'border-transparent hover:border-blue-400'}
                    ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                  `}
                >
                  <span className={s.value}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* ...existing / future sections... */}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
