/* . [BLOCK: SHARED_LOGIC_v6.1_FINAL] */
const langs = [
    {c:'en', n:'ENGLISH', f:'gb'}, {c:'ru', n:'РУССКИЙ', f:'ru'},
    {c:'ua', n:'УКРАЇНСЬКА', f:'ua'}, {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, {c:'es', n:'ESPAÑOL', f:'es'},
    {c:'cn', n:'中文', f:'cn'}, {c:'jp', n:'日本語', f:'jp'},
    {c:'ae', n:'العربية', f:'ae'}, {c:'br', n:'PORTUGUÊS', f:'br'}
];

function initShared() {
    const listContainer = document.getElementById('lang-list-12');
    if (listContainer) {
        // ОБНОВЛЕННЫЙ КОД ГЕНЕРАЦИИ КНОПОК
        listContainer.innerHTML = langs.map(l => `
            <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')">
                <img src="https://flagcdn.com/w20/${l.f}.png" class="flag-icon"> ${l.n}
            </button>
        `).join('');
    }
    
    // Подхватываем сохраненный язык или ставим английский по умолчанию
    const savedLang = localStorage.getItem('gy_lang') || 'en';
    const initial = langs.find(l => l.c === savedLang) || langs[0];
    applyTranslation(initial.c, initial.f, initial.n);
}

function applyTranslation(code, flag, name) {
    const flagImg = document.getElementById('current-lang-flag');
    const label = document.getElementById('current-lang-label');
    
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${flag}.png`;
    if (label) label.innerText = name.toUpperCase(); // Здесь выводится полное название как в старом коде

    // Управление RTL для арабского
    document.body.classList.toggle('rtl', code === 'ae');

    // Перевод элементов с атрибутом data-t
    if (typeof dictionary !== 'undefined') {
        const texts = dictionary[code] || dictionary['en'];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if(texts[key]) el.innerText = texts[key];
        });
    }
    localStorage.setItem('gy_lang', code);
    
    // Закрываем меню после выбора
    const list = document.getElementById('lang-list-12');
    if(list) list.style.display = 'none';
}

// Закрытие при клике в пустую область
document.addEventListener('click', (e) => {
    const root = document.getElementById('gy-lang-root');
    const list = document.getElementById('lang-list-12');
    if (list && root && !root.contains(e.target)) {
        list.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', initShared);
