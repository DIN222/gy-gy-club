// modules/language.js
import { EventBus } from '../core/eventBus.js';

export const LanguageModule = {
    allLanguages: [
        { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
        { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w20/ru.png' },
        { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w20/es.png' },
        { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w20/de.png' },
        { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
        { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w20/it.png' },
        { code: 'zh-CN', name: '中文', flag: 'https://flagcdn.com/w20/cn.png' },
        { code: 'ja', name: '日本語', flag: 'https://flagcdn.com/w20/jp.png' },
        { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w20/sa.png' },
        { code: 'pt', name: 'Português', flag: 'https://flagcdn.com/w20/pt.png' },
        { code: 'uk', name: 'Українська', flag: 'https://flagcdn.com/w20/ua.png' },
        { code: 'pl', name: 'Polski', flag: 'https://flagcdn.com/w20/pl.png' }
    ],

    init() {
        this.updateGlobalFlagUI();
        this.syncGTranslateWidget();

        // Слушаем запросы на смену языка через шину событий
        EventBus.on('CHANGE_LANGUAGE', (data) => {
            this.selectClubLanguage(data.code, data.name, data.flag);
        });

        // Слушаем изменения localStorage из других вкладок
        window.addEventListener('storage', (e) => {
            if (e.key === 'gygy_flag' || e.key === 'gy_user_flag' || e.key === 'gygy_lang_name') {
                this.updateGlobalFlagUI();
            }
            if (e.key === 'gygy_lang_code') {
                this.syncGTranslateWidget();
            }
        });

        console.log("Модуль локализации запущен.");
    },

    flagCodeToCountry(code) {
        const map = { 'en': 'gb', 'ru': 'ru', 'es': 'es', 'de': 'de', 'fr': 'fr', 'it': 'it', 'zh-CN': 'cn', 'ja': 'jp', 'ar': 'sa', 'pt': 'pt', 'uk': 'ua', 'pl': 'pl' };
        return map[code] || 'gb';
    },

    syncGTranslateWidget() {
        const savedLangCode = localStorage.getItem('gygy_lang_code') || 'en';
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            if (combo.value !== savedLangCode) {
                combo.value = savedLangCode;
                combo.dispatchEvent(new Event('change'));
            }
        } else {
            setTimeout(() => this.syncGTranslateWidget(), 100);
        }
    },

    updateGlobalFlagUI() {
        const savedFlag = localStorage.getItem('gygy_flag') || localStorage.getItem('gy_user_flag') || 'gb';
        const flagUrl = `https://flagcdn.com/w20/${savedFlag.toLowerCase()}.png`;
        
        const currentFlagEl = document.getElementById('current-flag');
        if (currentFlagEl) currentFlagEl.src = flagUrl;

        const savedLangName = localStorage.getItem('gygy_lang_name');
        const langNameEl = document.getElementById('current-lang-name');
        if (savedLangName && langNameEl) langNameEl.innerText = savedLangName;
    },

    selectClubLanguage(langCode, langName, flagUrl) {
        const countryCode = this.flagCodeToCountry(langCode);
        localStorage.setItem('gygy_flag', countryCode);
        localStorage.setItem('gy_user_flag', countryCode);
        localStorage.setItem('gygy_lang_code', langCode);
        localStorage.setItem('gygy_lang_name', langName);
        
        const currentFlagEl = document.getElementById('current-flag');
        if (currentFlagEl) currentFlagEl.src = flagUrl;
        
        const langNameEl = document.getElementById('current-lang-name');
        if (langNameEl) langNameEl.innerText = langName;

        const listContainer = document.getElementById('club-lang-list');
        if (listContainer) {
            listContainer.innerHTML = '';
            this.allLanguages.forEach(lang => {
                if (lang.code !== langCode) {
                    const item = document.createElement('div');
                    item.className = 'club-lang-item';
                    item.onclick = () => EventBus.emit('CHANGE_LANGUAGE', { code: lang.code, name: lang.name, flag: lang.flag });
                    item.innerHTML = `
                        <div class="item-avatar"><img src="horse_welcome.png"></div>
                        <img class="item-flag" src="${lang.flag}">
                        <span class="item-text">${lang.name}</span>
                    `;
                    listContainer.appendChild(item);
                }
            });
            listContainer.classList.remove('open');
        }

        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event('change'));
        }
    }
};

// Глобальная функция для кликов в HTML, если они завязаны на onclick
window.selectClubLanguage = (code, name, flag) => {
    EventBus.emit('CHANGE_LANGUAGE', { code, name, flag });
};
// В самый конец файла modules/language.js добавьте это:
window.toggleLangDropdown = function() {
    const list = document.getElementById('club-lang-list');
    if (list) list.classList.toggle('open');
};
