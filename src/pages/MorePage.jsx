import React from 'react';

const MorePage = ({ cardClasses, textSecondary, isDarkMode }) => {
  const items = [
    { title: 'О компании', desc: 'История, миссия и ценности UZINFOCOM', icon: '🏢', slug: 'about' },
    { title: 'Карьера', desc: 'Вакансии и возможности развития', icon: '💼', slug: 'careers' },
    { title: 'Партнеры', desc: 'Наши деловые партнеры и союзники', icon: '🤝', slug: 'partners' },
    { title: 'Сертификаты', desc: 'Награды и сертификации компании', icon: '🏆', slug: 'certificates' },
    { title: 'Блог', desc: 'Статьи и материалы от экспертов', icon: '📝', slug: 'blog' },
    { title: 'Документы', desc: 'Официальная документация', icon: '📋', slug: 'documents' }
  ];

  const onCardClick = (item) => {
    // TODO: navigation logic (e.g., router push using item.slug)
    console.log('Navigate to:', item.slug);
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold">Дополнительно</h1>
        <p className={`max-w-2xl mx-auto text-sm md:text-base ${textSecondary}`}>
          Узнайте больше о направлениях, инициативах и ресурсах нашей организации
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onCardClick(item)}
            className={`${cardClasses} group relative rounded-2xl p-5 text-left overflow-hidden transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
            `}
          >
            {/* Accent background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-br from-blue-500/10 via-transparent to-amber-400/10"
            />
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-blue-500/40 transition" />

            <div className="relative flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center text-2xl rounded-xl
                bg-gradient-to-br from-blue-500/15 to-amber-400/15
                group-hover:from-blue-500/25 group-hover:to-amber-400/25 transition`}
              >
                {item.icon}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-400 transition">
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${textSecondary} line-clamp-3 group-hover:line-clamp-none transition-all`}>
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="relative mt-5 flex items-center justify-between">
              <span
                className={`text-[11px] uppercase tracking-wide ${textSecondary} group-hover:text-blue-400 transition`}
              >
                Подробнее
              </span>
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full
                bg-white/5 group-hover:bg-blue-600 text-blue-400 group-hover:text-white
                transition translate-x-0 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MorePage;
