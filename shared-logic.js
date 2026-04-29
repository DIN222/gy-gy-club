/* . [BLOCK: SHARED_LOGIC_v6.0_FINAL] */
const langs = [
    {c:'ru', n:'РУССКИЙ', f:'ru'}, {c:'en', n:'ENGLISH', f:'gb'},
    {c:'uk', n:'УКРАЇНСЬКА', f:'ua'}, {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, {c:'es', n:'ESPAÑOL', f:'es'},
    {c:'cn', n:'中文', f:'cn'}, {c:'ja', n:'日本語', f:'jp'},
    {c:'ar', n:'العربية', f:'ae'}, {c:'pt', n:'PORTUGUÊS', f:'br'}
];

function initShared() {
    const listContainer = document.getElementById('lang-list-12');
    if (listContainer) {
        listContainer.innerHTML = langs.map(l => `
            <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')" 
                style="width:100%; padding:10px; background:#000; color:#D4AF37; border:none; 
                border-bottom:1px solid rgba(212,175,55,0.1); text-align:left; cursor:pointer; 
                display:flex; align-items:center; gap:8px; font-family:inherit; font-size:13px;">
                <img src="https://flagcdn.com/w20/${l.f}.png" width="20"> ${l.n}
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
    if (label) label.innerText = code.toUpperCase(); 

    if (typeof dictionary !== 'undefined') {
        const texts = dictionary[code] || dictionary['en'];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if(texts[key]) el.innerText = texts[key];
        });
    }
    localStorage.setItem('gy_lang', code);
}

function toggleMenu() {
    const list = document.getElementById('lang-list-12');
    if(list) list.style.display = (list.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
    const trigger = document.querySelector('.lang-trigger');
    const list = document.getElementById('lang-list-12');
    if (list && trigger && !trigger.contains(e.target)) list.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', initShared);
