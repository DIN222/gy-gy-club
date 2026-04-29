const langs = [
    {c:'ru', n:'РУССКИЙ', f:'ru'}, {c:'en', n:'ENGLISH', f:'gb'},
    {c:'ua', n:'УКРАЇНСЬКА', f:'ua'}, {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, {c:'es', n:'ESPAÑOL', f:'es'},
    {c:'cn', n:'中文', f:'cn'}, {c:'jp', n:'日本語', f:'jp'},
    {c:'ae', n:'العربية', f:'ae'}, {c:'br', n:'PORTUGUÊS', f:'br'}
];

let dictionary = null;

async function initShared() {
    console.log("GY-GY: Инициализация каркаса...");
    
    // Отрисовка меню (сделаем это СРАЗУ)
    const list = document.getElementById('lang-list-12');
    if (list) {
        list.innerHTML = langs.map(l => `
            <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')">
                <img src="https://flagcdn.com/w20/${l.f}.png" class="flag-icon"> ${l.n}
            </button>
        `).join('');
    }

    // Загрузка JSON
    try {
        const res = await fetch('langs.json');
        if (res.ok) {
            dictionary = await res.json();
            console.log("GY-GY: JSON успешно загружен");
        }
    } catch (e) {
        console.warn("GY-GY: JSON не доступен (локальный запуск)");
    }

    // Определяем язык
    const saved = localStorage.getItem('gy_lang');
    const browser = navigator.language.split('-')[0];
    const initial = langs.find(l => l.c === saved) || langs.find(l => l.c === browser) || langs[0];
    
    applyTranslation(initial.c, initial.f, initial.n);
}

function applyTranslation(code, flag, name) {
    const label = document.getElementById('current-lang-label');
    const flagImg = document.getElementById('current-lang-flag');
    
    if (label) label.innerText = name.toUpperCase();
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${flag}.png`;
    
    document.body.classList.toggle('rtl', code === 'ae');

    if (dictionary && dictionary[code]) {
        const texts = dictionary[code];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if (texts[key]) el.innerHTML = texts[key];
        });
    }

    localStorage.setItem('gy_lang', code);
    const list = document.getElementById('lang-list-12');
    if (list) list.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initShared);
