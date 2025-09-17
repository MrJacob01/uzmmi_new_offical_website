import React from 'react';

const ContactsPage = ({ cardClasses, textSecondary, borderClasses, isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Контакты</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`${cardClasses} rounded-lg p-6`}>
          <h3 className="text-xl font-semibold mb-4">Основной офис</h3>
          <div className={`space-y-3 ${textSecondary}`}>
            <p>📍 г. Ташкент, ул. Амира Темура, 108</p>
            <p>📞 +998 71 202 20 20</p>
            <p>📧 info@uzinfocom.uz</p>
            <p>🕒 Пн-Пт: 9:00 - 18:00</p>
          </div>
        </div>
        <div className={`${cardClasses} rounded-lg p-6`}>
          <h3 className="text-xl font-semibold mb-4">Техническая поддержка</h3>
          <div className={`space-y-3 ${textSecondary}`}>
            <p>📞 +998 71 202 20 21</p>
            <p>📧 support@uzinfocom.uz</p>
            <p>💬 Онлайн-чат на сайте</p>
            <p>🕒 24/7 круглосуточно</p>
          </div>
        </div>
      </div>
      <div className={`${cardClasses} rounded-lg p-6`}>
        <h3 className="text-xl font-semibold mb-4">Написать нам</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Ваше имя" className={`w-full p-3 ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-gray-100'} rounded-lg border ${borderClasses} focus:border-blue-400 outline-none`} />
          <input type="email" placeholder="Email" className={`w-full p-3 ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-gray-100'} rounded-lg border ${borderClasses} focus:border-blue-400 outline-none`} />
          <textarea placeholder="Сообщение" rows="4" className={`w-full p-3 ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-gray-100'} rounded-lg border ${borderClasses} focus:border-blue-400 outline-none resize-none`}></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors text-white">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ContactsPage;
