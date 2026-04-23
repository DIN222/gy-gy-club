/* . [BLOCK: LOGIC_v9.1.0] */
const STORAGE_KEY = 'gy_club_v9';

// 1. Словарь на 12 языков (добавляй свои фразы сюда)
const translations = {
    ru: { n: 'RU', flag: 'ru', quote: "«В каждой шутке есть доля виски»", btn_id: "ПОЛУЧИТЬ ID", welcome: "ДОБРО ПОЖАЛОВАТЬ" },
    en: { n: 'EN', flag: 'gb', quote: "«Every joke has a grain of whiskey»", btn_id: "GET ID", welcome: "WELCOME" },
    de: { n: 'DE', flag: 'de', quote: "«Jeder Witz hat свой Anteil Whiskey»", btn_id: "ID ERHALTEN", welcome: "WILLKOMMEN" },
    fr: { n: 'FR', flag: 'fr', quote: "«Chaque blague a sa part de whiskey»", btn_id: "OBTENIR ID", welcome: "BIENVENUE" },
    es: { n: 'ES', flag: 'es', quote: "«Cada broma tiene su parte de whiskey»", btn_id: "OBTENER ID", welcome: "BIENVENIDO" },
    it: { n: 'IT', flag: 'it', quote: "«Ogni scherzo ha la sua parte di whiskey»", btn_id: "OTTIENI ID", welcome: "BENVENUTO" },
    zh: { n: 'ZH', flag: 'cn', quote: "«每个笑话都有一份威士忌»", btn_id: "获取 ID", welcome: "欢迎" },
    ja: { n: 'JA', flag: 'jp', quote: "«すべてのジョークにはウイスキーの粒が含まれています»", btn_id: "IDを取得", welcome: "ようこそ" },
    ko: { n: 'KO', flag: 'kr', quote: "«모든 농담에는 위스키 한 알이 들어있다»", btn_id: "ID 받기", welcome: "환영합니다" },
    ar: { n: 'AR', flag: 'sa', quote: "«كل نكتة فيها ذرة من الويسكي»", btn_id: "الحصول على معرف", welcome: "أهلاً بك" },
    tr: { n: 'TR', flag: 'tr', quote: "«Her şakanın içinde bir miktar viski vardır»", btn_id: "ID AL", welcome: "HOŞ GELDİNİZ" },
    hi: { n: 'HI', flag: 'in', quote: "«हर मजाक में व्हिस्की का एक अंश होता है»", btn_id: "आईडी प्राप्त करें", welcome: "स्वागत है" }
};

// 2. Авто-определение (как в чате)
const getInitialLang = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.lang) return saved.lang;
    
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    lang: getInitialLang(),
    id: null
};

// 3. Функция смены языка
function setLanguage(langCode) {
    state.lang = langCode;
    saveState();
    applyTranslation();
}

function applyTranslation() {
    const data = translations[state.lang];
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerText = data[key];
    });
    // Обновляем активную кнопку в панели (если она есть)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(state.lang));
    });
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    applyTranslation();
});
