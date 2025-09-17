export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      projects: 'Проекты',
      contacts: 'Контакты',
      more: 'Больше'
    },
    hero: {
      titleLines: ['УЗБЕКСКИЙ НАЦИОНАЛЬНЫЙ ИНСТИТУТ ', 'МЕТРОЛОГИИ'],
      subtitle: 'Точные измерения - основа качества и безопасности',
      watchVideo: 'Смотреть видео',
      learnMore: 'Узнать больше'
    },
    news: {
      latest: 'Последние новости',
      all: 'Все новости',
      detail: 'Детали новости'
    },
    analytics: {
      title: 'Аналитика и обзоры',
      all: 'Все материалы'
    },
    settings: {
      display: 'Настройки отображения',
      font: 'Шрифт',
      theme: 'Тема',
      dark: 'Темная',
      light: 'Светлая'
    },
    contact: {
      title: 'Контакты',
      office: 'Основной офис',
      support: 'Техническая поддержка',
      writeUs: 'Написать нам',
      send: 'Отправить'
    },
    more: { title: 'Дополнительно' },
    services: { title: 'Наши услуги' },
    projects: { title: 'Наши проекты' },
    award: { brandOfYear: 'Бренд года 2023', awardText: 'UZINFOCOM был признан лучшей ИТ-компанией в Узбекистане' },
    lang: 'Язык',
    footer: {
      tagline: 'Точные измерения - основа качества и безопасности',
      company: 'Компания',
      careers: 'Карьера',
      press: 'Пресса',
      resources: 'Ресурсы',
      docs: 'Документация',
      support: 'Поддержка',
      contact: 'Контакты',
      address: 'Ташкент, Узбекистан',
      rights: 'Все права защищены.',
      privacy: 'Конфиденциальность',
      terms: 'Условия использования'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      contacts: 'Contacts',
      more: 'More'
    },
    hero: {
      titleLines: ['UZBEK NATIONAL INSTITUTE OF', 'METROLOGY'],
      subtitle: 'Accurate measurements – the foundation of quality and safety',
      watchVideo: 'Watch video',
      learnMore: 'Learn more'
    },
    news: {
      latest: 'Latest News',
      all: 'All news',
      detail: 'News Detail'
    },
    analytics: {
      title: 'Analytics & Insights',
      all: 'All materials'
    },
    settings: {
      display: 'Display Settings',
      font: 'Font',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light'
    },
    contact: {
      title: 'Contacts',
      office: 'Head Office',
      support: 'Technical Support',
      writeUs: 'Write to us',
      send: 'Send'
    },
    more: { title: 'More' },
    services: { title: 'Our Services' },
    projects: { title: 'Our Projects' },
    award: { brandOfYear: 'Brand of the Year 2023', awardText: 'UZINFOCOM recognized as best IT company in Uzbekistan' },
    lang: 'Language',
    footer: {
      tagline: 'Unified integrator of digital government solutions & infrastructure',
      company: 'Company',
      careers: 'Careers',
      press: 'Press',
      resources: 'Resources',
      docs: 'Documentation',
      support: 'Support',
      contact: 'Contact',
      address: 'Tashkent, Uzbekistan',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  },
  uz: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      contacts: 'Contacts',
      more: 'More'
    },
    hero: {
      titleLines: ['UZBEK NATIONAL INSTITUTE OF', 'METROLOGY'],
      subtitle: 'Accurate measurements – the foundation of quality and safety',
      watchVideo: 'Watch video',
      learnMore: 'Learn more'
    },
    news: {
      latest: 'Latest News',
      all: 'All news',
      detail: 'News Detail'
    },
    analytics: {
      title: 'Analytics & Insights',
      all: 'All materials'
    },
    settings: {
      display: 'Display Settings',
      font: 'Font',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light'
    },
    contact: {
      title: 'Contacts',
      office: 'Head Office',
      support: 'Technical Support',
      writeUs: 'Write to us',
      send: 'Send'
    },
    more: { title: 'More' },
    services: { title: 'Our Services' },
    projects: { title: 'Our Projects' },
    award: { brandOfYear: 'Brand of the Year 2023', awardText: 'UZINFOCOM recognized as best IT company in Uzbekistan' },
    lang: 'Language',
    footer: {
      tagline: 'Unified integrator of digital government solutions & infrastructure',
      company: 'Company',
      careers: 'Careers',
      press: 'Press',
      resources: 'Resources',
      docs: 'Documentation',
      support: 'Support',
      contact: 'Contact',
      address: 'Tashkent, Uzbekistan',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  }
};

export const fallbackLang = 'ru';

export function t(lang, path) {
  const parts = path.split('.');
  let cur = translations[lang] || translations[fallbackLang];
  for (const p of parts) {
    if (!cur[p]) return path; // return key if missing
    cur = cur[p];
  }
  return cur;
}
