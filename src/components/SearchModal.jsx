import React from 'react';
import { Search, X } from 'lucide-react';

const SearchModal = ({ isDarkMode, cardClasses, borderClasses, searchQuery, setSearchQuery, searchResults, setSearchResults, setIsSearchOpen, setCurrentPage, textSecondary, textMuted }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardClasses} rounded-lg w-full max-w-2xl max-h-96 flex flex-col`}>
        <div className="flex items-center p-4 border-b" style={{ borderColor: 'transparent' }}>
          <Search size={20} className="mr-3 text-blue-400" />
          <input
            type="text"
            placeholder="Поиск по сайту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            autoFocus
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
            className="ml-3 p-1 hover:bg-gray-600 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer transition-colors`}
                  onClick={() => {
                    setCurrentPage(result.page);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-400 uppercase">{result.type}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{result.title}</h3>
                  <p className={`text-xs ${textSecondary}`}>{result.content}</p>
                </div>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <p className={textMuted}>Результаты не найдены</p>
          ) : (
            <p className={textMuted}>Введите запрос для поиска</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
