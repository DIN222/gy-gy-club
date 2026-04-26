/* . [BLOCK: SHARED_LOGIC_CORE_v1.0] */

// 1. КООРДИНАТЫ ЯЗЫКОВ (12 направлений)
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

// 2. ГЛОБАЛЬНЫЙ СЛОВАРЬ (База для постоянных атрибутов)
const GY_DICT = {
    en: { btn_back: "← BACK", welcome: "Welcome," },
    ru: { btn_back: "← НАЗАД", welcome: "Добро пожаловать," },
    // Сюда добавляются переводы для остальных 10 языков по мере необходимости
};

// 3. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    initGlobalStyles();      // Проверяем наличие стилей
    renderPermanentAttrs();  // Отрисовываем Лого, Назад и Языки
    applyGlobalTranslation(); // Переводим всё, что имеет [data-t]
    syncUserCard();          // Синхронизируем ID и никнейм, если мы в Холле
});

// 4. ОТРИСОВКА ПОСТОЯННЫХ АТРИБУТОВ (Лого, Язык, Назад)
function renderPermanentAttrs() {
    if (document.getElementById('gy-header')) return; // Защита от дублей

    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.innerHTML = `
        <div class="gy-nav-left">
            <button class="btn-gy-alt" onclick="history.back()" data-t="btn_back">
                ${GY_DICT[langCode]?.btn_back || GY_DICT['en'].btn_back}
            </button>
        </div>
        <div class="gy-nav-right">
            <div class="gy-lang-trigger" onclick="toggleGyLangMenu()">
                <img src="https://flagcdn.com/w40/${current.f}.png" width="24">
                <span>${current.c.toUpperCase()}</span>
            </div>
            <div class="gy-logo-main">GY-GY</div>
        </div>
        <div id="gy-lang-menu" class="gy-lang-dropdown" style="display:none;"></div>
    `;
    document.body.prepend(header);
    
    // Генерируем меню выбора из 12 языков
    const menu = document.getElementById('gy-lang-menu');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.className = 'gy-lang-item';
        item.innerHTML = `<img src="https://flagcdn.com/w40/${l.f}.png" width="20"> ${l.n}`;
        item.onclick = () => {
            localStorage.setItem('gy_lang', l.c);
            location.reload();
        };
        menu.appendChild(item);
    });
}

// 5. ФУНКЦИЯ ПЕРЕВОДА
function applyGlobalTranslation() {
    const lang = localStorage.getItem('gy_lang') || 'en';
    
    // Перевод элементов с атрибутом data-t
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        // Сначала ищем в локальном словаре страницы (если он есть), потом в глобальном
        const text = (window.PAGE_DICT && window.PAGE_DICT[lang]) 
                     ? window.PAGE_DICT[lang][key] 
                     : (GY_DICT[lang] ? GY_DICT[lang][key] : null);
        
        if (text) el.innerText = text;
    });
}

// 6. УПРАВЛЕНИЕ МЕНЮ ЯЗЫКОВ
function toggleGyLangMenu() {
    const m = document.getElementById('gy-lang-menu');
    m.style.display = m.style.display === 'none' ? 'grid' : 'none';
}

// 7. СИНХРОНИЗАЦИЯ КАРТОЧКИ (Для Холла и Ателье)
function syncUserCard() {
    const nickEl = document.getElementById('u-nick');
    const idEl = document.getElementById('u-id');
    const avatarEl = document.getElementById('u-avatar');

    if (nickEl) nickEl.innerText = localStorage.getItem('gy_nick') || 'GUEST';
    if (idEl) idEl.innerText = localStorage.getItem('gy_user_id') || '000-GY';
    if (avatarEl) {
        const url = localStorage.getItem('gy_avatar') || 'default_avatar.png';
        avatarEl.style.backgroundImage = `url('${url}')`;
        avatarEl.style.backgroundSize = 'cover';
    }
}

// Вспомогательная функция для стилей, если они не загрузились
function initGlobalStyles() {
    if (!document.querySelector('.gy-logo-main')) {
        console.log("System: Waiting for shared-core.css...");
    }
}
