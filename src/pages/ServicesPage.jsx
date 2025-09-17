import React from 'react';
import { Building, Shield, Cpu, Users, TrendingUp, Settings } from 'lucide-react';

const ServicesPage = ({ cardClasses, isDarkMode, textSecondary }) => {
  const services = [
    { icon: <Building className="w-12 h-12 text-blue-400" />, title: 'Цифровизация госуслуг', desc: 'Разработка и внедрение цифровых решений для государственных организаций' },
    { icon: <Shield className="w-12 h-12 text-green-400" />, title: 'Информационная безопасность', desc: 'Комплексная защита информационных систем и данных' },
    { icon: <Cpu className="w-12 h-12 text-purple-400" />, title: 'ИТ-консалтинг', desc: 'Экспертные консультации по цифровой трансформации' },
    { icon: <Users className="w-12 h-12 text-orange-400" />, title: 'Интеграция систем', desc: 'Объединение различных информационных систем в единую экосистему' },
    { icon: <TrendingUp className="w-12 h-12 text-red-400" />, title: 'Аналитика данных', desc: 'Обработка и анализ больших данных для принятия решений' },
    { icon: <Settings className="w-12 h-12 text-indigo-400" />, title: 'Техническая поддержка', desc: 'Круглосуточная поддержка и обслуживание ИТ-систем' }
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
