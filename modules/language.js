// modules/language.js
// Модуль локализации и языков для GY-GY Club

import { EventBus } from '../core/eventBus.js';

export const LanguageModule = {
    languages: [
        { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
        { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w20/ru.png' },
        { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w20/es.png' },
        { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w20/de.png' },
        { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
        { code: 'uk', name: 'Українська', flag: 'https://flagcdn.com/w20/ua.png' }
    ],

    currentLang: 'en',

    init() {
        // Читаем сохраненный язык или ставим английский по умолчанию
        this.currentLang = localStorage.getItem('gygy_lang_code') || 'en';
        
        // Слушаем события изменения языка, если кто-то другой их запросит
        EventBus.on('CHANGE_LANGUAGE', (data) => {
            this.setLanguage(data.code);
        });

        console.log("Модуль локализации инициализирован. Текущий язык:", this.currentLang);
    },

    setLanguage(code) {
        const langObj = this.languages.find(l => l.code === code);
        if (!langObj) return;

        this.currentLang = code;
        localStorage.setItem('gygy_lang_code', code);
        localStorage.setItem('gygy_lang_name', langObj.name);
        
        // Превращаем код языка в код страны для флага (например, ru -> ru, en -> gb)
        const countryMap = { 'en': 'gb', 'ru': 'ru', 'es': 'es', 'de': 'de', 'fr': 'fr', 'uk': 'ua' };
        const countryCode = countryMap[code] || 'gb';
        localStorage.setItem('gygy_flag', countryCode);

        // Отправляем сигнал в «материнскую плату», что язык изменился
        EventBus.emit('LANGUAGE_CHANGED', { 
            code: code, 
            name: langObj.name, 
            flag: langObj.flag 
        });

        console.لog || console.log(`Язык изменен на: ${langObj.name}`);
    }
};
