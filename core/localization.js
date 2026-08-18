const ALL_LANGUAGES = [
    { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w20/ru.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w20/es.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w20/it.png' },
    { code: 'zh-CN', name: '中文', flag: 'https://flagcdn.com/w20/cn.png' },
    { code: 'ja', name: '日本語', flag: 'https://flagcdn.com/w20/jp.png' },
    { code: 'tr', name: 'Türkçe', flag: 'https://flagcdn.com/w20/tr.png' },
    { code: 'pt', name: 'Português', flag: 'https://flagcdn.com/w20/pt.png' },
    { code: 'uk', name: 'Українська', flag: 'https://flagcdn.com/w20/ua.png' },
    { code: 'pl', name: 'Polski', flag: 'https://flagcdn.com/w20/pl.png' }
];

window.GyLocalization = {
    flagCodeToCountry(code) {
        const map = { 
            'en': 'gb', 'ru': 'ru', 'es': 'es', 'de': 'de', 'fr': 'fr', 
            'it': 'it', 'zh-CN': 'cn', 'ja': 'jp', 'tr': 'tr', 'pt': 'pt', 
            'uk': 'ua', 'pl': 'pl' 
        };
        return map[code] || 'gb';
    },
    syncGTranslateWidget() {
        const savedLangCode = window.GyStorage.get('gygy_lang_code', 'en');
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
        const savedFlag = window.GyStorage.get('gygy_flag') || window.GyStorage.get('gy_user_flag') || 'gb';
        const flagUrl = `https://flagcdn.com/w20/${savedFlag.toLowerCase()}.png`;
        
        const currentFlagEl = document.getElementById('current-flag');
        if (currentFlagEl) currentFlagEl.src = flagUrl;

        const savedLangName = window.GyStorage.get('gygy_lang_name');
        const langNameEl = document.getElementById('current-lang-name');
        if (savedLangName && langNameEl) langNameEl.innerText = savedLangName;
    },
    selectLanguage(langCode, langName, flagUrl, callback) {
        const countryCode = this.flagCodeToCountry(langCode);
        window.GyStorage.set('gygy_flag', countryCode);
        window.GyStorage.set('gy_user_flag', countryCode);
        window.GyStorage.set('gygy_lang_code', langCode);
        window.GyStorage.set('gygy_lang_name', langName);
        
        const currentFlagEl = document.getElementById('current-flag');
        if (currentFlagEl) currentFlagEl.src = flagUrl;
        
        const langNameEl = document.getElementById('current-lang-name');
        if (langNameEl) langNameEl.innerText = langName;

        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event('change'));
        }

        if (typeof callback === 'function') callback(langCode, langName, flagUrl);
    },
    renderDropdownItems(containerId, onSelect) {
        const listContainer = document.getElementById(containerId);
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        ALL_LANGUAGES.forEach(lang => {
            const item = document.createElement('div');
            item.className = 'club-lang-item';
            item.onclick = () => onSelect(lang.code, lang.name, lang.flag);
            item.innerHTML = `
                <div class="item-avatar"><img src="horse_welcome.png"></div>
                <img class="item-flag" src="${lang.flag}">
                <span class="item-text">${lang.name}</span>
            `;
            listContainer.appendChild(item);
        });
    }
};
