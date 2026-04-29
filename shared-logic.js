/* . [BLOCK: SHARED_LOGIC_v6.2_FINAL] */
const langs = [
    {c:'ru', n:'РУССКИЙ', f:'ru'}, {c:'en', n:'ENGLISH', f:'gb'},
    {c:'ua', n:'УКРАЇНСЬКА', f:'ua'}, {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, {c:'es', n:'ESPAÑOL', f:'es'},
    {c:'cn', n:'中文', f:'cn'}, {c:'jp', n:'日本語', f:'jp'},
    {c:'ae', n:'العربية', f:'ae'}, {c:'br', n:'PORTUGUÊS', f:'br'}
];

function initShared() {
    const listContainer = document.getElementById('lang-list-12');
    if (listContainer) {
        listContainer.innerHTML = langs.map(l => `
            <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')">
                <img src="https://flagcdn.com/w20/${l.f}.png" class="flag-icon"> ${l.n}
            </button>
        `).join('');
    }
    const savedLang = localStorage.getItem('gy_lang') || 'ru';
    const initial = langs.find(l => l.c === savedLang) || langs[0];
    applyTranslation(initial.c, initial.f, initial.n);
}

function applyTranslation(code, flag, name) {
    const flagImg = document.getElementById('current-lang-flag');
    const label = document.getElementById('current-lang-label');
    
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${flag}.png`;
    if (label) label.innerText = name.toUpperCase();

    document.body.classList.toggle('rtl', code === 'ae');

    if (typeof dictionary !== 'undefined') {
        const texts = dictionary[code] || dictionary['en'];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if(texts[key]) el.innerText = texts[key];
        });
    }
    localStorage.setItem('gy_lang', code);
    
    const list = document.getElementById('lang-list-12');
    if(list) list.style.display = 'none';
}

document.addEventListener('click', (e) => {
    const root = document.getElementById('gy-lang-root');
    const list = document.getElementById('lang-list-12');
    if (list && root && !root.contains(e.target)) {
        list.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', initShared);
