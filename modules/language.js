// modules/language.js
import { EventBus } from '../core/eventBus.js';

export const LanguageModule = {
    currentActiveCode: 'en',
    currentFlagCode: 'gb',

    init() {
        let savedLangCode = (typeof safeStorageGet === 'function' ? safeStorageGet('gy_lang') || safeStorageGet('gygy_lang') : localStorage.getItem('gy_lang') || localStorage.getItem('gygy_lang'));
        const savedFlag = (typeof safeStorageGet === 'function' ? safeStorageGet('gygy_flag') || safeStorageGet('gy_user_flag') : localStorage.getItem('gygy_flag') || localStorage.getItem('gy_user_flag'));
        
        if (savedLangCode) {
            savedLangCode = savedLangCode.toLowerCase();
            if (savedLangCode === 'ua') savedLangCode = 'uk';
        }

        let matchedLang = null;
        if (savedFlag && typeof allLangs !== 'undefined') {
            matchedLang = allLangs.find(l => l.c.toLowerCase() === savedFlag.toLowerCase());
        } else if (savedLangCode && typeof allLangs !== 'undefined') {
            matchedLang = allLangs.find(l => l.code === savedLangCode);
        }

        if (matchedLang) {
            this.currentFlagCode = matchedLang.c;
            this.currentActiveCode = matchedLang.code;
            
            const badgeFlagImg = document.getElementById('badge-flag-img');
            if (badgeFlagImg) badgeFlagImg.src = `https://flagcdn.com/w20/${matchedLang.c}.png`;
            
            this.applyTranslationsToDOM(matchedLang.code);
            this.forceTriggerGoogleTranslate(matchedLang.code);
        }

        console.log("Модуль языка успешно инициализирован.");
    },

    googleTranslateElementInit() {
        if (typeof google !== 'undefined' && google.translate) {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,de,es,fr,it,pl,pt,ru,tr,uk,zh-CN,ja',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }
    },

    applyTranslationsToDOM(langCode) {
        if (typeof translations === 'undefined' || !translations[langCode]) return;
        const dict = translations[langCode];
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (dict[key]) {
                el.innerText = dict[key];
            }
        });
    },

    forceTriggerGoogleTranslate(langCode) {
        if (window.langTimer) clearInterval(window.langTimer);
        let attempts = 0;
        window.langTimer = setInterval(() => {
            const selectEl = document.querySelector('.goog-te-combo');
            if (selectEl) {
                clearInterval(window.langTimer);
                if (selectEl.value === langCode) return;
                selectEl.value = langCode;
                selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (++attempts > 100) {
                clearInterval(window.langTimer);
            }
        }, 100);
    },

    selectClubLanguage(code, name, flagUrl) {
        this.currentActiveCode = code;
        this.currentFlagCode = flagUrl;
        
        localStorage.setItem('gygy_lang', code);
        localStorage.setItem('gygy_flag', flagUrl);
        
        this.applyTranslationsToDOM(code);
        this.forceTriggerGoogleTranslate(code);
        
        EventBus.emit('LANGUAGE_CHANGED', { code, name, flag: flagUrl });
    }
};

// Глобальные мостики для HTML-тегов onclick="..."
window.toggleLangDropdown = function() {
    const list = document.getElementById('club-lang-list');
    if (list) list.classList.toggle('open');
};

window.selectClubLanguage = function(code, name, flagUrl) {
    LanguageModule.selectClubLanguage(code, name, flagUrl);
};

window.googleTranslateElementInit = function() {
    LanguageModule.googleTranslateElementInit();
};
