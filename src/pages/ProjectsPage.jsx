import React, { useState, useMemo } from 'react';

const ProjectsPage = ({ cardClasses, textSecondary, textMuted, isDarkMode }) => {
  const projects = useMemo(() => ([
    { title: 'Единая система госуслуг', status: 'Завершен', desc: 'Цифровая платформа для получения государственных услуг онлайн', year: '2024' },
    { title: 'Система электронного документооборота', status: 'В разработке', desc: 'Модернизация документооборота в государственных учреждениях', year: '2025' },
    { title: 'Платформа цифровой идентификации', status: 'Планируется', desc: 'Безопасная система идентификации граждан', year: '2025' }
  ]), []);

  const statusMeta = {
    'Завершен': { color: 'bg-green-500/15 text-green-400 ring-1 ring-green-500/30', progress: 100 },
    'В разработке': { color: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30', progress: 55 },
    'Планируется': { color: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30', progress: 10 }
  };

  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('Все');
  const [expanded, setExpanded] = useState({});

  const statuses = ['Все', ...Array.from(new Set(projects.map(p => p.status)))];

  const filtered = useMemo(() =>
    projects.filter(p =>
      (activeStatus === 'Все' || p.status === activeStatus) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
       p.desc.toLowerCase().includes(search.toLowerCase()))
    ), [projects, activeStatus, search]);

  const toggleExpand = (idx) =>
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center">Наши проекты</h1>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs text-black font-medium transition ${
                activeStatus === s
                  ? 'bg-blue-600 shadow'
                  : `${isDarkMode ? 'bg-white hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          placeholder="Поиск проекта..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`w-full md:w-64 px-3 py-2 rounded-lg text-sm outline-none border ${
            isDarkMode
              ? 'bg-white/5 border-white/10 focus:border-blue-500'
              : 'bg-white border-gray-300 focus:border-blue-500'
          }`}
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => {
          const meta = statusMeta[p.status] || {};
          const isOpen = expanded[idx];
            return (
              <div
                key={idx}
                className={`${cardClasses} relative rounded-xl border border-blue-50 p-5 flex flex-col overflow-hidden group transition shadow-sm hover:shadow-lg border border-transparent hover:border-blue-500/40`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide ${meta.color || 'bg-gray-200 text-gray-700'}`}>
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs mb-4">
                  {meta.progress !== undefined && (
                    <span className={`text-[11px] ${textSecondary}`}>Прогресс: {meta.progress}%</span>
                  )}
                </div>

                {meta.progress !== undefined && (
                  <div className="h-1.5 w-full rounded bg-black/10 dark:bg-white/10 mb-4 overflow-hidden">
                    <div
                      className="h-full rounded bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                      style={{ width: `${meta.progress}%` }}
                    />
                  </div>
                )}

                <div className="text-sm leading-relaxed">
                  <p className={`${textSecondary} ${!isOpen ? 'line-clamp-3' : ''}`}>
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="text-xs font-medium text-blue-500 hover:text-blue-400 transition"
                  >
                    {isOpen ? 'Скрыть' : 'Подробнее'}
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Открыть
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-blue-500/5 via-transparent" />
              </div>
            );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm opacity-70">
            Проекты не найдены.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
