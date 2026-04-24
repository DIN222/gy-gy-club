/* . [BLOCK: LOGIC_v9.3.6] */
const STORAGE_KEY = 'gy_club_v9';

const translations = {
    ru: { label: "РУССКИЙ", btn_back: "← НАЗАД", quote: "«В каждой шутке есть доля виски»", btn_reg: "ПРОЙДИТЕ НА РЕГИСТРАЦИЮ", btn_hall: "ПРОЙДИТЕ В ХОЛЛ" },
    en: { label: "ENGLISH", btn_back: "← BACK", quote: "«Every joke has a grain of whiskey»", btn_reg: "PROCEED TO REGISTRATION", btn_hall: "PROCEED TO THE HALL" },
    ua: { label: "УКРАЇНСЬКА", btn_back: "← НАЗАД", quote: "«У кожному жарті є частка віскі»", btn_reg: "ПРОЙДИТЕ НА РЕГІСТРАЦІЮ", btn_hall: "ПРОЙДИТЕ ДО ХОЛУ" },
    pl: { label: "POLSKI", btn_back: "← COFNIJ", quote: "«W każdym żarcie jest kropla whisky»", btn_reg: "PRZEJDŹ DO REJESTRACJI", btn_hall: "PRZEJDŹ DO HOLU" },
    de: { label: "DEUTSCH", btn_back: "← ZURÜCK", quote: "«Jeder Witz hat einen Teil Whiskey»", btn_reg: "ZUR REGISTRIERUNG", btn_hall: "ZUR HALLE GEHEN" },
    fr: { label: "FRANÇAIS", btn_back: "← RETOUR", quote: "«Chaque blague a sa part de whisky»", btn_reg: "PASSER À L'ENREGISTREMENT", btn_hall: "ALLER AU SALON" },
    it: { label: "ITALIANO", btn_back: "← INDIETRO", quote: "«Ogni scherzo ha la sua parte di whisky»", btn_reg: "VAI ALLA REGISTRAZIONE", btn_hall: "VAI ALLA SALA" },
    es: { label: "ESPAÑOL", btn_back: "← VOLVER", quote: "«Cada broma tiene su parte de whisky»", btn_reg: "IR A REGISTRO", btn_hall: "IR AL VESTÍBULO" },
    cn: { label: "中文", btn_back: "← 返回", quote: "«每个笑话里都藏着威士忌»", btn_reg: "前往注册", btn_hall: "前往大厅" },
    jp: { label: "日本語", btn_back: "← 戻る", quote: "«すべてのジョークにはウイスキーのひとしずくがある»", btn_reg: "登録へ進む", btn_hall: "ホールへ進む" },
    ae: { label: "العربية", btn_back: "← عودة", quote: "«كل نكتة تحتوي على قطرة من الويسكي»", btn_reg: "التوجه إلى التسجيل", btn_hall: "التوجه إلى القاعة" },
    br: { label: "PORTUGUÊS", btn_back: "← VOLTAR", quote: "«Cada piada tem sua parte de uísque»", btn_reg: "IR PARA O REGISTRO", btn_hall: "IR PARA O SALÃO" }
};

const getInitialLang = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.lang) return saved.lang;
    const bLang = navigator.language.split('-')[0];
    return translations[bLang] ? bLang : 'en';
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { lang: getInitialLang() };

function setLanguage(langCode) {
    state.lang = langCode;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    applyTranslation();
}

function applyTranslation() {
    const data = translations[state.lang];
    if (!data) return;
    
    // Обновляем текст на самой кнопке меню
    const label = document.getElementById('current-lang-label');
    if (label) label.innerText = data.label;

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerText = data[key];
    });
}

document.addEventListener('DOMContentLoaded', applyTranslation);
