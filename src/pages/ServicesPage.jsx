import React from 'react';
import { Waves, Ruler, Sun, Atom, Clock, Magnet, Scale, Beaker, Thermometer, Calculator } from 'lucide-react';

const ServicesPage = ({ cardClasses, isDarkMode, textSecondary }) => {
  const services = [
    { icon: <Waves className="w-12 h-12 text-sky-400" />, title: 'Область по акустике, ультразвуку и вибрации', desc: 'Измерения звука, вибрации и ультразвука' },
    { icon: <Ruler className="w-12 h-12 text-emerald-400" />, title: 'Область по длине', desc: 'Длины, размеры, геометрические параметры' },
    { icon: <Sun className="w-12 h-12 text-amber-400" />, title: 'Область по фотометрии и радиометрии', desc: 'Световые и радиометрические измерения' },
    { icon: <Atom className="w-12 h-12 text-pink-400" />, title: 'Область по ионизирующему излучению', desc: 'Радиационные измерения и дозиметрия' },
    { icon: <Clock className="w-12 h-12 text-indigo-400" />, title: 'Область по времени и частоте', desc: 'Временные интервалы, частота, синхронизация' },
    { icon: <Magnet className="w-12 h-12 text-yellow-400" />, title: 'Область по электричеству и магнетизму', desc: 'Электрические и магнитные измерения' },
    { icon: <Scale className="w-12 h-12 text-rose-400" />, title: 'Область по массам и соответствующим величинам', desc: 'Масса, сила, давление и связанные величины' },
    { icon: <Beaker className="w-12 h-12 text-green-400" />, title: 'Область по количеству вещества: метрология в химии и биологии', desc: 'Химические и биологические измерения' },
    { icon: <Thermometer className="w-12 h-12 text-orange-400" />, title: 'Область по термометрии', desc: 'Температура и тепловые измерения' },
    { icon: <Calculator className="w-12 h-12 text-purple-400" />, title: 'Область по единицам величин', desc: 'Единицы измерений и прослеживаемость' }
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Наши услуги</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className={`${cardClasses} rounded-lg p-6 hover:bg-opacity-40 transition-all`}>
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className={textSecondary}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
