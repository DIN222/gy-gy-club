/* . [BLOCK: LOGIC_v9.4.3] */
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
    localStorage.setItem('gy_lang', langCode);
    applyTranslation();
    
    // МАГИЯ ИСЧЕЗНОВЕНИЯ:
    const panel = document.querySelector('.lang-panel');
    if (panel) {
        panel.classList.add('force-hide'); // Принудительно прячем
        
        // Когда мышка уйдет с контейнера и вернется, меню снова будет работать
        panel.parentElement.addEventListener('mouseleave', () => {
            panel.classList.remove('force-hide');
        }, { once: true });
    }
}

function applyTranslation() {
    const lang = localStorage.getItem('gy_lang') || 'ru';
    const data = translations[lang];
    
    const label = document.getElementById('current-lang-label');
    const flagImg = document.getElementById('current-lang-flag');
    
    if (label) label.innerText = data.label;
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${data.flag}.png`;
}

document.addEventListener('DOMContentLoaded', applyTranslation);
