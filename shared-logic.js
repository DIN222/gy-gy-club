/* . [BLOCK: SHARED_LOGIC_v1.3] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

/* . [BLOCK: SHARED_LOGIC_v1.4] */
// ... (массив GY_LANGS остается прежним) ...

function injectPermanentAttributes() {
    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    // Чистая эстетика: крупные «« и Лого в один ряд
    header.style = "position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 30px 40px; box-sizing: border-box; z-index: 1000;";
    
    header.innerHTML = `
        <div class="gy-nav-left" style="display: flex; align-items: center;">
            <span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 2.5rem; font-weight: 900; line-height: 0.8; user-select: none;">«</span>
        </div>
        <div class="gy-nav-right" style="display: flex; align-items: center; gap: 30px;">
            <div id="gy-lang-trigger" onclick="toggleGyLangMenu()" style="cursor:pointer; color:gold; display: flex; align-items: center; gap: 10px;">
                <img src="https://flagcdn.com/w40/${current.f}.png" width="35">
                <span style="font-weight: 900; font-size: 1.3rem;">${current.c.toUpperCase()}</span>
            </div>
            <div style="font-size: 2.5rem; font-weight: 900; color: gold; letter-spacing: 4px; line-height: 0.8;">GY-GY</div>
        </div>
        <div id="gy-lang-menu" style="display:none; position: absolute; top: 80px; right: 40px; background: rgba(0,0,0,0.95); border: 2px solid gold; padding: 15px; grid-template-columns: repeat(4, 1fr); gap: 15px; z-index: 10001;"></div>
    `;
    document.body.prepend(header);
    // ... логика наполнения меню gy-lang-menu ...
}

function applyTranslations(pageDict) {
    const lang = localStorage.getItem('gy_lang') || 'en';
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (pageDict && pageDict[lang] && pageDict[lang][key]) {
            el.innerText = pageDict[lang][key];
        }
    });
}
