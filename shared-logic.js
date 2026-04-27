/* . [BLOCK: SHARED_LOGIC_v1.6] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

// Функция отрисовки Постоянных Атрибутов (Стрелка, Лого, Язык)
function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;
    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 30px 40px; box-sizing: border-box; z-index: 999; pointer-events: none;";
    
    header.innerHTML = `
        <div style="pointer-events: auto;">
            <span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 3.5rem; font-weight: 900; line-height: 1; user-select: none;">«</span>
        </div>
        <div style="display: flex; align-items: center; gap: 30px; pointer-events: auto;">
            <div onclick="toggleGyLangMenu()" style="cursor:pointer; display: flex; align-items: center; gap: 10px; color: gold;">
                <img src="https://flagcdn.com/w40/${current.f}.png" width="35">
                <span style="font-weight: 900; font-size: 1.4rem;">${current.c.toUpperCase()}</span>
            </div>
            <div style="font-size: 3.5rem; font-weight: 900; color: gold; letter-spacing: 5px; line-height: 1;">GY-GY</div>
        </div>
        <div id="gy-lang-menu" style="display:none; position: absolute; top: 100px; right: 40px; background: rgba(0,0,0,0.95); border: 2px solid gold; padding: 15px; grid-template-columns: repeat(4, 1fr); gap: 15px; z-index: 10001; pointer-events: auto;"></div>
    `;
    document.body.prepend(header);

    const menu = document.getElementById('gy-lang-menu');
    GY_LANGS.forEach(l => {
        const img = document.createElement('img');
        img.src = `https://flagcdn.com/w40/${l.f}.png`;
        img.style = "width: 30px; cursor: pointer; transition: 0.2s;";
        img.onmouseover = () => img.style.transform = "scale(1.2)";
        img.onmouseout = () => img.style.transform = "scale(1.0)";
        img.onclick = () => { localStorage.setItem('gy_lang', l.c); location.reload(); };
        menu.appendChild(img);
    });
}

function toggleGyLangMenu() {
    const m = document.getElementById('gy-lang-menu');
    m.style.display = m.style.display === 'none' ? 'grid' : 'none';
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
