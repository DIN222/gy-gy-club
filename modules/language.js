// modules/language.js
import { EventBus } from '../core/eventBus.js';

// Автоматически внедряем стили для выпадающего списка, стрелок и аватарок
const styleEl = document.createElement('style');
styleEl.innerHTML = `
    .club-lang-dropdown-wrapper { position: absolute; top: 18px; left: 20px; z-index: 1000001; width: 175px; font-family: 'Share Tech Mono', monospace; }
    .club-lang-current { display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.95); border: 2px solid #FFD700; padding: 6px 10px; border-radius: 10px; cursor: pointer; gap: 8px; }
    .club-lang-current-content { display: flex; align-items: center; gap: 7px; min-width: 0; flex-grow: 1; }
    
    .item-avatar { width: 22px; height: 22px; border-radius: 50%; overflow: hidden; border: 1px solid #FFD700; background: #111; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .item-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    
    .item-flag { width: 18px; height: 12px; object-fit: cover; border: 1px solid #FFD700; flex-shrink: 0; display: block; }
    .item-text { color: #FFD700; font-size: 11px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    
    .arrow-down { color: #FFD700; font-size: 11px; font-weight: bold; flex-shrink: 0; transition: transform 0.3s ease; }
    .club-lang-list.open + .club-lang-current .arrow-down, 
    .club-lang-dropdown-wrapper.active .arrow-down { transform: rotate(180deg); }
    
    .club-lang-list { position: absolute; top: calc(100% + 5px); left: 0; background: rgba(0,0,0,0.95); border: 2px solid #FFD700; border-radius: 10px; width: 100%; max-height: 280px; overflow-y: auto; display: none; z-index: 1000002; scrollbar-width: thin; scrollbar-color: #FFD700 #111; }
    .club-lang-list.open { display: block !important; }
    
    .club-lang-item { display: flex; align-items: center; gap: 7px; padding: 7px 8px; cursor: pointer; border-bottom: 1px solid rgba(255,215,0,0.15); }
    .club-lang-item:last-child { border-bottom: none; }
    .club-lang-item:hover { background: rgba(255,215,0,0.15); }
`;
document.head.appendChild(styleEl);

export const allLangs = [
    { code: 'en', name: 'English', c: 'gb', flag: 'https://flagcdn.com/w20/gb.png', avatar: 'horse_welcome.png' },
    { code: 'ru', name: 'Русский', c: 'ru', flag: 'https://flagcdn.com/w20/ru.png', avatar: 'horse_welcome.png' },
    { code: 'es', name: 'Español', c: 'es', flag: 'https://flagcdn.com/w20/es.png', avatar: 'horse_welcome.png' },
    { code: 'de', name: 'Deutsch', c: 'de', flag: 'https://flagcdn.com/w20/de.png', avatar: 'horse_welcome.png' },
    { code: 'fr', name: 'Français', c: 'fr', flag: 'https://flagcdn.com/w20/fr.png', avatar: 'horse_welcome.png' },
    { code: 'it', name: 'Italiano', c: 'it', flag: 'https://flagcdn.com/w20/it.png', avatar: 'horse_welcome.png' },
    { code: 'zh-CN', name: '中文', c: 'cn', flag: 'https://flagcdn.com/w20/cn.png', avatar: 'horse_welcome.png' },
    { code: 'ja', name: '日本語', c: 'jp', flag: 'https://flagcdn.com/w20/jp.png', avatar: 'horse_welcome.png' },
    { code: 'ar', name: 'العربية', c: 'sa', flag: 'https://flagcdn.com/w20/sa.png', avatar: 'horse_welcome.png' },
    { code: 'pt', name: 'Português', c: 'pt', flag: 'https://flagcdn.com/w20/pt.png', avatar: 'horse_welcome.png' },
    { code: 'uk', name: 'Українська', c: 'ua', flag: 'https://flagcdn.com/w20/ua.png', avatar: 'horse_welcome.png' },
    { code: 'pl', name: 'Polski', c: 'pl', flag: 'https://flagcdn.com/w20/pl.png', avatar: 'horse_welcome.png' }
];

export const LanguageModule = {
    currentActiveCode: 'en',
    currentFlagCode: 'gb',

    init(containerId = 'lang-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="club-lang-dropdown-wrapper notranslate">
                    <div class="club-lang-current" onclick="window.toggleLangDropdown(event)">
                        <div class="club-lang-current-content">
                            <div class="item-avatar"><img id="current-avatar" src="horse_welcome.png" alt="Charlie" onerror="this.src='https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100'"></div>
                            <img id="current-flag" class="item-flag" src="https://flagcdn.com/w20/gb.png" alt="Flag">
                            <span id="current-lang-name" class="item-text">English</span>
                        </div>
                        <span class="arrow-down">▼</span>
                    </div>
                    <div id="club-lang-list" class="club-lang-list"></div>
                </div>
            `;
            this.renderLanguageList();
        }

        let savedLangCode = localStorage.getItem('gy_lang') || localStorage.getItem('gygy_lang');
        const savedFlag = localStorage.getItem('gygy_flag') || localStorage.getItem('gy_user_flag');
        
        if (savedLangCode) {
            savedLangCode = savedLangCode.toLowerCase();
            if (savedLangCode === 'ua') savedLangCode = 'uk';
        }

        let matchedLang = null;
        if (savedFlag) {
            matchedLang = allLangs.find(l => l.c.toLowerCase() === savedFlag.toLowerCase());
        } else if (savedLangCode) {
            matchedLang = allLangs.find(l => l.code === savedLangCode);
        }

        if (matchedLang) {
            this.currentFlagCode = matchedLang.c;
            this.currentActiveCode = matchedLang.code;
            
            const badgeFlagImg = document.getElementById('current-flag');
            if (badgeFlagImg) badgeFlagImg.src = matchedLang.flag;

            const badgeLangName = document.getElementById('current-lang-name');
            if (badgeLangName) badgeLangName.innerText = matchedLang.name;
            
            this.applyTranslationsToDOM(matchedLang.code);
            this.forceTriggerGoogleTranslate(matchedLang.code);
        }

        // Закрытие выпадающего списка при клике мимо
        document.addEventListener('click', (e) => {
            const wrapper = document.querySelector('.club-lang-dropdown-wrapper');
            const list = document.getElementById('club-lang-list');
            if (wrapper && list && !wrapper.contains(e.target)) {
                list.classList.remove('open');
            }
        });

        console.log("Модуль языка успешно инициализирован.");
    },

    renderLanguageList() {
        const listContainer = document.getElementById('club-lang-list');
        if (!listContainer) return;
        listContainer.innerHTML = '';
        
        allLangs.forEach(lang => {
            const item = document.createElement('div');
            item.className = 'club-lang-item';
            item.onclick = (e) => {
                e.stopPropagation();
                this.selectClubLanguage(lang.code, lang.name, lang.c, lang.flag);
            };
            item.innerHTML = `
                <div class="item-avatar"><img src="${lang.avatar}" alt="" onerror="this.src='https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100'"></div>
                <img class="item-flag" src="${lang.flag}" alt="">
                <span class="item-text">${lang.name}</span>
            `;
            listContainer.appendChild(item);
        });
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
        if (typeof window.translations === 'undefined' || !window.translations[langCode]) return;
        const dict = window.translations[langCode];
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

    selectClubLanguage(code, name, flagCode, flagUrl) {
        this.currentActiveCode = code;
        this.currentFlagCode = flagCode;
        
        localStorage.setItem('gygy_lang', code);
        localStorage.setItem('gygy_flag', flagCode);
        
        const currentName = document.getElementById('current-lang-name');
        const currentFlag = document.getElementById('current-flag');
        const list = document.getElementById('club-lang-list');
        
        if (currentName) currentName.innerText = name;
        if (currentFlag) currentFlag.src = flagUrl;
        if (list) list.classList.remove('open');

        this.applyTranslationsToDOM(code);
        this.forceTriggerGoogleTranslate(code);
        
        EventBus.emit('LANGUAGE_CHANGED', { code, name, flag: flagUrl });
    }
};

// Глобальные мостики для HTML-тегов onclick="..."
window.toggleLangDropdown = function(event) {
    if (event) event.stopPropagation();
    const list = document.getElementById('club-lang-list');
    if (list) list.classList.toggle('open');
};

window.googleTranslateElementInit = function() {
    LanguageModule.googleTranslateElementInit();
};
