import React from 'react';

const MorePage = ({ cardClasses, textSecondary, isDarkMode }) => {
  const items = [
    { title: 'О компании', desc: 'История, миссия и ценности UZINFOCOM', icon: '🏢' },
    { title: 'Карьера', desc: 'Вакансии и возможности развития', icon: '💼' },
    { title: 'Партнеры', desc: 'Наши деловые партнеры и союзники', icon: '🤝' },
    { title: 'Сертификаты', desc: 'Награды и сертификации компании', icon: '🏆' },
    { title: 'Блог', desc: 'Статьи и материалы от экспертов', icon: '📝' },
    { title: 'Документы', desc: 'Официальная документация', icon: '📋' }
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Дополнительно</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className={`${cardClasses} rounded-lg p-6 hover:bg-opacity-40 transition-all cursor-pointer`}>
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className={textSecondary}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorePage;
