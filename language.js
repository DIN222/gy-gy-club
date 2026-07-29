
let currentActiveCode = 'en';
let currentFlagCode = 'gb';

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,de,es,fr,it,pl,pt,ru,tr,uk,zh-CN,ja',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

function applyTranslationsToDOM(langCode) {
    if (typeof translations === 'undefined' || !translations[langCode]) return;
    const dict = translations[langCode];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });
}

function forceTriggerGoogleTranslate(langCode) {
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
}

// Инициализация языка при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    let savedLangCode = safeStorageGet('gy_lang') || safeStorageGet('gygy_lang');
    const savedFlag = safeStorageGet('gygy_flag') || safeStorageGet('gy_user_flag');
    
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
        currentFlagCode = matchedLang.c;
        currentActiveCode = matchedLang.code;
        
        const badgeFlagImg = document.getElementById('badge-flag-img');
        if (badgeFlagImg) badgeFlagImg.src = `https://flagcdn.com/w20/${matchedLang.c}.png`;
        
        applyTranslationsToDOM(matchedLang.code);
        forceTriggerGoogleTranslate(matchedLang.code);
    }
});
