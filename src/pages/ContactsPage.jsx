import React, { useState, useMemo, useCallback, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Copy, ExternalLink } from 'lucide-react';

// Offices data (static)
const OFFICES = [
  {
    "id": 1,
    "title": "UzNIM Bosh Ofis",
    "address": "O‘zbekiston Respublikasi, Toshkent shahri, Olmazor tumani, Muminos ko‘chasi, 333A",
    "lat": 41.338645,
    "lng": 69.334343,
    "phone": "+998 (71) 123-45-67",
    "email": "info@uznim.uz"
  },
  {
    "id": 2,
    "title": "UzNIM Andijon Bo‘limi",
    "address": "O‘zbekiston, Andijon viloyati, Andijon shahri, Bobur shoh ko‘chasi, 21",
    "lat": 40.7821,
    "lng": 72.3442,
    "phone": "+998 (74) 202-22-02",
    "email": "andijon@uznim.uz"
  },
  {
    "id": 3,
    "title": "UzNIM Buxoro Bo‘limi",
    "address": "O‘zbekiston, Buxoro viloyati, Buxoro shahri, I. Karimov ko‘chasi, 17",
    "lat": 39.7675,
    "lng": 64.4236,
    "phone": "+998 (65) 202-22-02",
    "email": "buxoro@uznim.uz"
  },
  {
    "id": 4,
    "title": "UzNIM Farg‘ona Bo‘limi",
    "address": "O‘zbekiston, Farg‘ona viloyati, Farg‘ona shahri, Mustaqillik ko‘chasi, 185",
    "lat": 40.3842,
    "lng": 71.7843,
    "phone": "+998 (73) 202-22-02",
    "email": "fargona@uznim.uz"
  },
  {
    "id": 5,
    "title": "UzNIM Jizzax Bo‘limi",
    "address": "O‘zbekiston, Jizzax viloyati, Jizzax shahri, Sh. Rashidov ko‘chasi, 14",
    "lat": 40.1158,
    "lng": 67.8422,
    "phone": "+998 (72) 202-22-02",
    "email": "jizzax@uznim.uz"
  },
  {
    "id": 6,
    "title": "UzNIM Namangan Bo‘limi",
    "address": "O‘zbekiston, Namangan viloyati, Namangan shahri, Istiqlol ko‘chasi, 50",
    "lat": 40.9983,
    "lng": 71.6726,
    "phone": "+998 (69) 202-22-02",
    "email": "namangan@uznim.uz"
  },
  {
    "id": 7,
    "title": "UzNIM Navoiy Bo‘limi",
    "address": "O‘zbekiston, Navoiy viloyati, Navoiy shahri, Ibn Sino ko‘chasi, 22",
    "lat": 40.0844,
    "lng": 65.3792,
    "phone": "+998 (79) 202-22-02",
    "email": "navoiy@uznim.uz"
  },
  {
    "id": 8,
    "title": "UzNIM Qashqadaryo Bo‘limi",
    "address": "O‘zbekiston, Qashqadaryo viloyati, Qarshi shahri, Mustaqillik ko‘chasi, 19",
    "lat": 38.8606,
    "lng": 65.7891,
    "phone": "+998 (75) 202-22-02",
    "email": "qarshi@uznim.uz"
  },
  {
    "id": 9,
    "title": "UzNIM Qoraqalpog‘iston Bo‘limi",
    "address": "O‘zbekiston, Qoraqalpog‘iston Respublikasi, Nukus shahri, Qoraqalpog‘iston ko‘chasi, 6A",
    "lat": 42.4609,
    "lng": 59.6167,
    "phone": "+998 (61) 202-22-02",
    "email": "nukus@uznim.uz"
  },
  {
    "id": 10,
    "title": "UzNIM Samarqand Bo‘limi",
    "address": "O‘zbekiston, Samarqand viloyati, Samarqand shahri, Registon ko‘chasi, 11",
    "lat": 39.6542,
    "lng": 66.9597,
    "phone": "+998 (66) 202-22-02",
    "email": "samarqand@uznim.uz"
  },
  {
    "id": 11,
    "title": "UzNIM Sirdaryo Bo‘limi",
    "address": "O‘zbekiston, Sirdaryo viloyati, Guliston shahri, Navro‘z ko‘chasi, 7",
    "lat": 40.4914,
    "lng": 68.787,
    "phone": "+998 (67) 202-22-02",
    "email": "sirdaryo@uznim.uz"
  },
  {
    "id": 12,
    "title": "UzNIM Surxondaryo Bo‘limi",
    "address": "O‘zbekiston, Surxondaryo viloyati, Termiz shahri, Sho‘rq ko‘chasi, 9",
    "lat": 37.2242,
    "lng": 67.2783,
    "phone": "+998 (76) 202-22-02",
    "email": "termiz@uznim.uz"
  },
  {
    "id": 13,
    "title": "UzNIM Xorazm Bo‘limi",
    "address": "O‘zbekiston, Xorazm viloyati, Urganch shahri, Al-Xorazmiy ko‘chasi, 12",
    "lat": 41.55,
    "lng": 60.6333,
    "phone": "+998 (62) 202-22-02",
    "email": "urganch@uznim.uz"
  }
];

const ContactsPage = ({ cardClasses, textSecondary }) => {
  const [selectedOffice, setSelectedOffice] = useState(OFFICES[0]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);
  const listRef = useRef(null);

  const mapSrc = `https://www.google.com/maps?q=${selectedOffice.lat},${selectedOffice.lng}&hl=ru&z=16&output=embed`;
  const mapsLink = `https://www.google.com/maps?q=${selectedOffice.lat},${selectedOffice.lng}&hl=ru&z=16`;

  const telHref = (p) => `tel:${p.replace(/[^\d+]/g, '')}`;

  const filtered = useMemo(
    () => OFFICES.filter(o =>
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.address.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleCopy = useCallback((value, key) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const handleKeyNav = (e) => {
    if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const idx = filtered.findIndex(o => o.id === selectedOffice.id);
    if (idx === -1) return;
    const nextIdx = e.key === 'ArrowDown'
      ? (idx + 1) % filtered.length
      : (idx - 1 + filtered.length) % filtered.length;
    setSelectedOffice(filtered[nextIdx]);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center">Контакты</h1>

      {/* Main responsive layout */}
      <div className="xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_22rem] gap-6 flex flex-col">
        
        {/* List */}
        <div className={`${cardClasses} rounded-xl p-4 flex flex-col h-[420px] xl:h-auto`}>
          <div className="mb-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск филиала..."
              className="w-full px-3 py-2 rounded-lg text-sm outline-none bg-white/5 border border-white/10 focus:border-blue-500 transition"
            />
          </div>
          <div
            ref={listRef}
            tabIndex={0}
            onKeyDown={handleKeyNav}
            className="overflow-auto custom-scroll -mx-2 px-2 space-y-1"
            aria-label="Список филиалов"
          >
            {filtered.map(o => {
              const active = o.id === selectedOffice.id;
              return (
                <button
                  key={o.id}
                  aria-current={active ? 'true' : 'false'}
                  onClick={() => setSelectedOffice(o)}
                  className={`w-full text-left p-3 rounded-lg flex gap-3 items-start transition group
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${active
                      ? 'bg-blue-600 text-white shadow'
                      : 'hover:bg-white/5'
                    }`}
                >
                  <span className="mt-0.5">
                    <MapPin className="h-4 w-4 opacity-80" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium leading-tight">{o.title}</span>
                    <span className={`block text-xs mt-1 ${active ? 'text-white/80' : textSecondary}`}>
                      {o.address}
                    </span>
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-xs opacity-60 py-6 text-center">Ничего не найдено</div>
            )}
          </div>
          <p className="mt-3 text-[11px] opacity-60">
            Навигация: ↑ / ↓ для выбора, Enter/Click для выбора
          </p>
        </div>

        {/* Map */}
        <div className={`${cardClasses} relative overflow-hidden`}>
          <iframe
            title={selectedOffice.title}
            src={mapSrc}
            loading="lazy"
            className="w-[720px] h-[360px] md:h-[420px] xl:h-[420px]"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute left-3 px-3 bg-black/50 backdrop-blur text-xs font-medium">
            {selectedOffice.title}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-md shadow transition inline-flex items-center gap-1"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Открыть
            </a>
          </div>
        </div>

        {/* Details / Actions */}
        <div className="space-y-6">
          {/* Selected office details */}
            <div className={`${cardClasses} rounded-xl p-6 space-y-5`}>
              <div>
                <h2 className="text-xl font-semibold leading-snug">{selectedOffice.title}</h2>
                <p className={`text-sm mt-1 ${textSecondary}`}>Текущий выбранный филиал</p>
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide opacity-70">Адрес</p>
                      <p className="text-sm mt-1 leading-relaxed">{selectedOffice.address}</p>
                      <div className="mt-2 flex gap-2">
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Карта
                        </a>
                        <button
                          onClick={() => handleCopy(selectedOffice.address, 'address')}
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          <Copy className="h-3.5 w-3.5" /> {copied === 'address' ? 'Скопировано' : 'Копировать'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide opacity-70">Телефон</p>
                      <p className="text-sm mt-1">{selectedOffice.phone}</p>
                      <div className="mt-2 flex gap-2">
                        <a
                          href={telHref(selectedOffice.phone)}
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          Позвонить
                        </a>
                        <button
                          onClick={() => handleCopy(selectedOffice.phone, 'phone')}
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          <Copy className="h-3.5 w-3.5" /> {copied === 'phone' ? 'Скопировано' : 'Копировать'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide opacity-70">Email</p>
                      <p className="text-sm mt-1 break-all">{selectedOffice.email}</p>
                      <div className="mt-2 flex gap-2">
                        <a
                          href={`mailto:${selectedOffice.email}`}
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          Написать
                        </a>
                        <button
                          onClick={() => handleCopy(selectedOffice.email, 'email')}
                          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-1"
                        >
                          <Copy className="h-3.5 w-3.5" /> {copied === 'email' ? 'Скопировано' : 'Копировать'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide opacity-70">График</p>
                      <p className="text-sm mt-1">Пн–Пт: 09:00–18:00</p>
                      <p className="text-xs mt-0.5 opacity-70">Обед: 13:00–14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions card */}
            <div className={`${cardClasses} rounded-xl p-4 grid grid-cols-2 gap-3`}>
              <a
                href={telHref(selectedOffice.phone)}
                className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition flex flex-col items-start gap-2 text-xs"
              >
                <Phone className="h-4 w-4 opacity-80" />
                <span>Позвонить</span>
              </a>
              <a
                href={`mailto:${selectedOffice.email}`}
                className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition flex flex-col items-start gap-2 text-xs"
              >
                <Mail className="h-4 w-4 opacity-80" />
                <span>Написать</span>
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition flex flex-col items-start gap-2 text-xs"
              >
                <MapPin className="h-4 w-4 opacity-80" />
                <span>Маршрут</span>
              </a>
              <button
                onClick={() => handleCopy(`${selectedOffice.title} • ${selectedOffice.address}`, 'all')}
                className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition flex flex-col items-start gap-2 text-xs"
              >
                <Copy className="h-4 w-4 opacity-80" />
                <span>{copied === 'all' ? 'Скопировано' : 'Скопировать'}</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
