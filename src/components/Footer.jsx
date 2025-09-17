import React from 'react';
import { t } from '../i18n/translations';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaTelegramPlane, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = ({ lang, isDarkMode }) => {
  const year = new Date().getFullYear();
  const sectionTitle = 'text-sm font-semibold tracking-wide uppercase mb-3';
  const linkBase = 'text-sm hover:text-blue-400 transition-colors';

  return (
    <footer className={`mt-16 ${isDarkMode ?  'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} pt-12 pb-8`}>      
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-4 lg:grid-cols-6">
        {/* Brand / About */}
        <div className="md:col-span-3 space-y-6">
          <img src='/images/logo_nim.svg' alt='Logo' className="w-30" />
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t(lang,'footer.tagline')}</p>
          <div className="flex gap-3 pt-2">
            <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-400"><FaTelegramPlane size={18} /></a>
            <a href="https://instagram.com/yourinstagram" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-400"><FaInstagram size={18} /></a>
            <a href="https://facebook.com/yourfacebook" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-400"><FaFacebookF size={18} /></a>
          </div>
        </div>
        {/* Navigation */}
              <div className='col-span-3 grid grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
                  <div>
                      <h4 className={sectionTitle}>{t(lang, 'footer.company')}</h4>
                      <ul className="space-y-2">
                          <li><button className={linkBase}>{t(lang, 'nav.services')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'nav.projects')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'footer.careers')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'footer.press')}</button></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className={sectionTitle}>{t(lang, 'footer.resources')}</h4>
                      <ul className="space-y-2">
                          <li><button className={linkBase}>{t(lang, 'news.latest')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'analytics.title')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'footer.docs')}</button></li>
                          <li><button className={linkBase}>{t(lang, 'footer.support')}</button></li>
                      </ul>
                  </div>
              </div>
              <div>
                  <h4 className={sectionTitle}>{t(lang, 'footer.contact')}</h4>
                  <ul className="space-y-4 text-sm w-60">
                      <li className="flex gap-2 items-center rounded-xl px-8 py-5 border border-white bg-blue-700/10 hover:bg-blue-900 hover:text-white transition">
                          <MapPin size={14} className="text-blue-400" />
                          <a href='https://www.google.com/maps?ll=41.341055,69.212171&z=13&t=m&hl=ru-RU&gl=US&mapclient=embed&q=41%C2%B020%2727.8%22N+69%C2%B012%2743.8%22E+41.341055,+69.212171@41.3410553,69.2121707' target="_blank" rel="noreferrer" className="hover:text-blue-200 transition-colors">
                          <span>{t(lang, 'footer.address')}</span></a>
                      </li>
                      <li className="flex gap-2 items-center rounded-xl px-8 py-5 border border-white bg-blue-700/10 hover:bg-blue-900 hover:text-white transition">
                          <Phone size={14} className="text-blue-400" />
                          <a
                              href="tel:+9987801502603"
                              aria-label="Call us at +998 (78) 150-26-03"
                              className="hover:text-blue-200 transition-colors"
                          >
                              +998 (78) 150-26-03
                          </a>
                      </li>
                      <li className="flex gap-2 items-center rounded-xl px-8 py-5 border border-white bg-blue-700/10 hover:bg-blue-900 hover:text-white transition">
                          <Mail size={14} className="text-blue-400" />
                          <a
                              href="mailto:info@nim.uz"
                              aria-label="Send an email to info@nim.uz"
                              className="hover:text-blue-200 transition-colors"
                          >
                              info@nim.uz
                          </a>
                      </li>
                  </ul>
              </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4 md:items-center justify-between text-xs text-gray-400">
        <div>&copy; {year} {t(lang,'footer.rights')}</div>
        <div className="flex gap-6">
          <button className="hover:text-blue-400 transition-colors">{t(lang,'footer.privacy')}</button>
          <button className="hover:text-blue-400 transition-colors">{t(lang,'footer.terms')}</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
