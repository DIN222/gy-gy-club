/* . [BLOCK: LOGIC_v9.3.9] */
const STORAGE_KEY = 'gy_club_v9';

const translations = {
    ru: { label: "РУССКИЙ", flag: "ru" },
    en: { label: "ENGLISH", flag: "gb" },
    ua: { label: "УКРАЇНСЬКА", flag: "ua" },
    pl: { label: "POLSKI", flag: "pl" },
    de: { label: "DEUTSCH", flag: "de" },
    fr: { label: "FRANÇAIS", flag: "fr" },
    it: { label: "ITALIANO", flag: "it" },
    es: { label: "ESPAÑOL", flag: "es" },
    cn: { label: "中文", flag: "cn" },
    jp: { label: "日本語", flag: "jp" },
    ae: { label: "العربية", flag: "ae" },
    br: { label: "PORTUGUÊS", flag: "br" }
};

function setLanguage(langCode) {
    const state = { lang: langCode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    applyTranslation();
}

function applyTranslation() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { lang: 'ru' };
    const data = translations[saved.lang];
    
    // Обновляем текст и ФЛАГ в рамке
    const label = document.getElementById('current-lang-label');
    const flagImg = document.getElementById('current-lang-flag');
    
    if (label) label.innerText = data.label;
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${data.flag}.png`;

    // Закрываем меню (через CSS оно само скроется, когда уберем мышь, но для мобилок полезно)
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[saved.lang][key]) el.innerText = translations[saved.lang][key];
    });
}

document.addEventListener('DOMContentLoaded', applyTranslation);
