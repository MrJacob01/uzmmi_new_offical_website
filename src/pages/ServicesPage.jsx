import React, { useState, useMemo } from 'react';
import {
  Waves, Ruler, Sun, Atom, Clock, Magnet, Scale,
  Beaker, Thermometer, Calculator
} from 'lucide-react';

// Data (memoized to keep stable reference)
const rawServices = [
  { id: 1, icon: Waves, color: 'text-sky-400',    title: 'Акустика, ультразвук и вибрация', cat: 'Физика', desc: 'Измерения параметров звука, вибрации и ультразвука; точная передача уровней и частот.' },
  { id: 2, icon: Ruler, color: 'text-emerald-400', title: 'Длина и геометрия', cat: 'Размеры', desc: 'Линейные и угловые измерения, калибровка средств контроля геометрических параметров.' },
  { id: 3, icon: Sun, color: 'text-amber-400',     title: 'Фотометрия и радиометрия', cat: 'Оптика', desc: 'Световые, спектральные и радиометрические измерения для обеспечения прослеживаемости.' },
  { id: 4, icon: Atom, color: 'text-pink-400',     title: 'Ионизирующее излучение', cat: 'Радиация', desc: 'Дозиметрия, калибровка приборов контроля ионизирующих излучений.' },
  { id: 5, icon: Clock, color: 'text-indigo-400',  title: 'Время и частота', cat: 'Физика', desc: 'Эталонные шкалы времени, синхронизация, высокоточные частотные сигналы.' },
  { id: 6, icon: Magnet, color: 'text-yellow-400', title: 'Электричество и магнетизм', cat: 'Электрика', desc: 'Электрические величины, сопротивление, напряжение, ток, мощность, параметры полей.' },
  { id: 7, icon: Scale, color: 'text-rose-400',    title: 'Масса и соответствующие величины', cat: 'Механика', desc: 'Прослеживаемость измерений массы, силы, давления и связанных величин.' },
  { id: 8, icon: Beaker, color: 'text-green-400',  title: 'Кол-во вещества (химия/биология)', cat: 'Аналитика', desc: 'Химические и биологические измерения: состав, концентрации, чистота.' },
  { id: 9, icon: Thermometer, color: 'text-orange-400', title: 'Термометрия', cat: 'Физика', desc: 'Измерения температуры, калибровка термопар, термометров сопротивления, тепловых датчиков.' },
  { id: 10, icon: Calculator, color: 'text-purple-400', title: 'Единицы и прослеживаемость', cat: 'Методология', desc: 'Обеспечение единства измерений, методики, стандарты, метрологическая прослеживаемость.' }
];

const ServicesPage = ({ cardClasses, isDarkMode, textSecondary }) => {
  const [category, setCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});

  const categories = useMemo(
    () => ['Все', ...Array.from(new Set(rawServices.map(s => s.cat)))],
    []
  );

  const services = rawServices; // stable

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return services.filter(s =>
      (category === 'Все' || s.cat === category) &&
      (s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))
    );
  }, [services, category, search]);

  const toggle = (id) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold">Наши услуги</h1>
        <p className={`max-w-3xl mx-auto text-sm md:text-base ${textSecondary}`}>
          Направления эталонных и экспертных работ: поиск по областям, фильтрация по категории
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition
                ${category === c
                  ? 'bg-blue-600 text-white shadow'
                  : (isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 text-white/80'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700')}`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск услуги..."
          className={`w-full lg:w-72 px-3 py-2 rounded-lg text-sm outline-none border transition
            ${isDarkMode
              ? 'bg-white/5 border-white/10 focus:border-blue-500'
              : 'bg-white border-gray-300 focus:border-blue-500'}`}
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map(s => {
          const Icon = s.icon;
          const open = expanded[s.id];
          return (
            <div
              key={s.id}
              className={`${cardClasses} relative rounded-2xl p-5 flex flex-col overflow-hidden
                group transition hover:-translate-y-0.5 hover:shadow-lg`}
            >
              {/* Accent layer */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/5 via-transparent to-amber-400/10" />
              <div className="flex items-start gap-4 mb-4 relative">
                <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-white/5 ring-1 ring-white/10 group-hover:ring-blue-400/40 transition">
                  <Icon className={`w-8 h-8 ${s.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="text-[11px] uppercase tracking-wide mt-1 opacity-60">{s.cat}</p>
                </div>
              </div>
              <div className="relative">
                <p
                  className={`text-sm leading-relaxed ${textSecondary} ${
                    open ? '' : 'line-clamp-3'
                  } transition-all`}
                >
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between relative">
                <button
                  onClick={() => toggle(s.id)}
                  className="text-xs font-medium text-blue-500 hover:text-blue-400 transition"
                >
                  {open ? 'Скрыть' : 'Подробнее'}
                </button>
                <span className="text-[11px] px-2 py-1 rounded bg-white/5">
                  ID-{s.id.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm opacity-70">
            Ничего не найдено.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
