/* . [BLOCK: SHARED_LOGIC_v5.0_STRICT] */
const langs = [
    {c:'ru', n:'РУССКИЙ', f:'ru'}, 
    {c:'en', n:'ENGLISH', f:'gb'},
    {c:'uk', n:'УКРАЇНСЬКА', f:'ua'}, 
    {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, 
    {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, 
    {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', n:'中文', f:'cn'}, 
    {c:'ja', n:'日本語', f:'jp'},
    {c:'ar', n:'العربية', f:'ae'}, 
    {c:'pt', n:'PORTUGUÊS', f:'br'}
];

function initLanguagePanel() {
    const listContainer = document.getElementById('lang-list-12');
    if (!listContainer) return;

    listContainer.innerHTML = langs.map(l => `
        <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')">
            <img src="https://flagcdn.com/w20/${l.f}.png"> ${l.n}
        </button>
    `).join('');

    const savedLang = localStorage.getItem('gy_lang') || 'ru';
    const initial = langs.find(l => l.c === savedLang) || langs[0];
    applyTranslation(initial.c, initial.f, initial.n);
}

function applyTranslation(code, flag, name) {
    const flagImg = document.getElementById('current-lang-flag');
    const label = document.getElementById('current-lang-label');
    
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${flag}.png`;
    if (label) label.innerText = name;

    const texts = dictionary[code] || dictionary['en'];
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if(texts[key]) el.innerText = texts[key];
    });
    
    localStorage.setItem('gy_lang', code);
}

window.addEventListener('DOMContentLoaded', initLanguagePanel);
