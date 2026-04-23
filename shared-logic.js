
/* . [BLOCK: LOGIC_v9.0.0] */

const STORAGE_KEY = 'gy_club_v9';

// Авто-определение языка (как в чате)
const getBrowserLang = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('ru') ? 'ru' : 'en';
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    lang: getBrowserLang(),
    id: null,
    avatar: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Если на странице есть логотип, можем добавить ему логику
    const logo = document.querySelector('.logo-link img');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.onclick = () => window.location.href = 'index.html';
    }
});

// Сохранение состояния
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
