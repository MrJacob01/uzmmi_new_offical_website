import React from 'react';

const ProjectsPage = ({ cardClasses, textSecondary, textMuted, isDarkMode }) => {
  const projects = [
    { title: 'Единая система госуслуг', status: 'Завершен', desc: 'Цифровая платформа для получения государственных услуг онлайн', year: '2024' },
    { title: 'Система электронного документооборота', status: 'В разработке', desc: 'Модернизация документооборота в государственных учреждениях', year: '2025' },
    { title: 'Платформа цифровой идентификации', status: 'Планируется', desc: 'Безопасная система идентификации граждан', year: '2025' }
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Наши проекты</h1>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className={`${cardClasses} rounded-lg p-6`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-xs text-white ${
                  project.status === 'Завершен' ? 'bg-green-600' :
                  project.status === 'В разработке' ? 'bg-blue-600' : 'bg-orange-600'
                }`}>{project.status}</span>
                <span className={textMuted}>{project.year}</span>
              </div>
            </div>
            <p className={textSecondary}>{project.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
