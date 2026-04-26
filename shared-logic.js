/* . [BLOCK: LOGIC_FINAL_v9.5.3] */
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

// Твой словарь фраз (добавь сюда все свои ключи data-t)
const langData = {
    en: { btn_back: "← BACK", btn_hall: "TO HALL", btn_reg: "REGISTRATION", hall_title: "THE HALL" },
    ru: { btn_back: "← НАЗАД", btn_hall: "В ХОЛЛ", btn_reg: "РЕГИСТРАЦИЯ", hall_title: "ХОЛЛ" }
    // ... остальные 10 языков
};

function setLanguage(langCode) {
    localStorage.setItem('gy_lang', langCode);
    applyTranslation();
    
    const panel = document.querySelector('.lang-panel');
    if (panel) {
        panel.style.display = 'none';
        setTimeout(() => { panel.style.display = ''; }, 200);
    }
}

function applyTranslation() {
    // КООРДИНАТА: Теперь по умолчанию EN
    const lang = localStorage.getItem('gy_lang') || 'en'; 
    const data = translations[lang];
    
    // 1. Обновляем языковую панель (флаг и текст)
    const label = document.getElementById('current-lang-label');
    const flagImg = document.getElementById('current-lang-flag');
    if (label) label.innerText = data.label;
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${data.flag}.png`;

    // 2. ГЛОБАЛЬНЫЙ ПЕРЕВОД КОНТЕНТА
    // Ищем все элементы с атрибутом data-t и меняем их текст
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (langData[lang] && langData[lang][key]) {
            el.innerText = langData[lang][key];
        }
    });
}

// Запуск при загрузке любой страницы
document.addEventListener('DOMContentLoaded', applyTranslation);
