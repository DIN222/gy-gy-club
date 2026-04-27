/* . [BLOCK: SHARED_LOGIC_v1.3] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

function injectPermanentAttributes() {
    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 25px 40px; box-sizing: border-box; z-index: 1000;";
    
    header.innerHTML = `
        <div class="gy-nav-left">
            <span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 2.2rem; font-weight: 900; line-height: 1;">«</span>
        </div>
        <div class="gy-nav-right" style="display: flex; align-items: center; gap: 25px;">
            <div id="gy-lang-trigger" style="cursor:pointer; color:gold; display: flex; align-items: center; gap: 8px;">
                <img src="https://flagcdn.com/w40/${current.f}.png" width="30">
                <span style="font-weight: bold; font-size: 1.1rem;">${current.c.toUpperCase()}</span>
            </div>
            <div style="font-size: 2.2rem; font-weight: 900; color: gold; letter-spacing: 3px;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);
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
