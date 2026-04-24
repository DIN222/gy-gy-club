
/* . [BLOCK: LOGIC_v9.3.5] */
const STORAGE_KEY = 'gy_club_v9';

const translations = {
    ru: { current_lang: "ЯЗЫК", btn_back: "← НАЗАД", quote: "«В каждой шутке есть доля виски»", btn_reg: "ПРОЙДИТЕ НА РЕГИСТРАЦИЮ", btn_hall: "ПРОЙДИТЕ В ХОЛЛ" },
    en: { current_lang: "LANG", btn_back: "← BACK", quote: "«Every joke has a grain of whiskey»", btn_reg: "PROCEED TO REGISTRATION", btn_hall: "PROCEED TO THE HALL" },
    ua: { current_lang: "МОВА", btn_back: "← НАЗАД", quote: "«У кожному жарті є частка віскі»", btn_reg: "ПРОЙДИТЕ НА РЕГІСТРАЦІЮ", btn_hall: "ПРОЙДИТЕ ДО ХОЛУ" },
    pl: { current_lang: "JĘZYK", btn_back: "← COFNIJ", quote: "«W każdym żarcie jest kropla whisky»", btn_reg: "PRZEJDŹ DO REJESTRACJI", btn_hall: "PRZEJDŹ DO HOLU" },
    de: { current_lang: "SPRACHE", btn_back: "← ZURÜCK", quote: "«Jeder Witz hat einen Teil Whiskey»", btn_reg: "ZUR REGISTRIERUNG", btn_hall: "ZUR HALLE GEHEN" },
    fr: { current_lang: "LANGUE", btn_back: "← RETOUR", quote: "«Chaque blague a sa part de whisky»", btn_reg: "PASSER À L'ENREGISTREMENT", btn_hall: "ALLER AU SALON" },
    it: { current_lang: "LINGUA", btn_back: "← INDIETRO", quote: "«Ogni scherzo ha la sua parte di whisky»", btn_reg: "VAI ALLA REGISTRAZIONE", btn_hall: "VAI ALLA SALA" },
    es: { current_lang: "IDIOMA", btn_back: "← VOLVER", quote: "«Cada broma tiene su parte de whisky»", btn_reg: "IR A REGISTRO", btn_hall: "IR AL VESTÍBULO" },
    cn: { current_lang: "语言", btn_back: "← 返回", quote: "«每个笑话里都藏着威士忌»", btn_reg: "前往注册", btn_hall: "前往大厅" },
    jp: { current_lang: "言語", btn_back: "← 戻る", quote: "«すべてのジョークにはウイスキーのひとしずくがある»", btn_reg: "登録へ進む", btn_hall: "ホールへ進む" },
    ae: { current_lang: "لغة", btn_back: "← عودة", quote: "«كل نكتة تحتوي على قطرة من الويسكي»", btn_reg: "التوجه إلى التسجيل", btn_hall: "التوجه إلى القاعة" },
    br: { current_lang: "LÍNGUA", btn_back: "← VOLTAR", quote: "«Cada piada tem sua parte de uísque»", btn_reg: "IR PARA O REGISTRO", btn_hall: "IR PARA O SALÃO" }
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
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerText = data[key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        btn.classList.toggle('active', btnLang === state.lang);
    });
}

document.addEventListener('DOMContentLoaded', applyTranslation);
