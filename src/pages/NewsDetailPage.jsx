import React from 'react';

const NewsDetailPage = ({ selectedNews, setCurrentPage }) => {
  if (!selectedNews) {
    return (
      <div className="p-8">
        <div className="text-sm text-gray-400 mb-4">Нет выбранной новости</div>
        <button onClick={() => setCurrentPage && setCurrentPage('news')} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Назад к новостям</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 space-y-8">
      <button onClick={() => setCurrentPage && setCurrentPage('news')} className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 font-medium">
        <span>&larr;</span> Назад
      </button>
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{selectedNews.title}</h1>
        <div className="text-xs text-gray-400 mb-6">{selectedNews.date}</div>
        <div className="rounded-xl overflow-hidden mb-8 h-72 bg-center bg-cover" style={{ backgroundImage: 'url(/images/1.jpg)' }} />
        <div className="prose prose-invert max-w-none">
          <p className="text-base leading-relaxed mb-5">{selectedNews.content || selectedNews.summary}</p>
          {!selectedNews.content && (
            <p className="text-sm text-gray-400">(Полный текст недоступен. Добавьте поле content в объект новости для отображения полного текста.)</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;