/* . [BLOCK: SHARED_LOGIC_v3.8_ARMORED] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

function playZoneSound(vol) {
    let audio = document.getElementById('gy-bg-audio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'gy-bg-audio';
        audio.loop = true;
        audio.src = "bar_ambient.mp3";
        document.body.appendChild(audio);
    }
    audio.volume = vol;
    audio.play().catch(() => {
        document.addEventListener('click', () => audio.play(), { once: true });
    });
}

function initSharedAttributes() {
    if (document.getElementById('gy-header')) return;

    // Определяем страницу по URL
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const saved = localStorage.getItem('gy_lang_code') || 'en';
    const current = GY_LANGS.find(l => l.c === saved) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    
    // Принудительные стили ПОВЕРХ любого контента
    header.setAttribute('style', `
        position: fixed !important; 
        top: 0 !important; 
        left: 0 !important; 
        width: 100% !important; 
        display: flex !important; 
        justify-content: space-between !important; 
        align-items: flex-start !important; 
        padding: 20px 30px !important; 
        box-sizing: border-box !important; 
        z-index: 999999 !important; 
        pointer-events: none !important;
        background: none !important;
    `);

    const langMargin = !isIndex ? "margin-top: 60px !important;" : "margin-top: 0px !important;";

    header.innerHTML = `
        <div style="pointer-events: auto !important; display: flex !important; flex-direction: column !important; align-items: flex-start !important;">
            ${!isIndex ? `<div onclick="window.location.href='index.html'" style="cursor:pointer !important; color:gold !important; font-size: 50px !important; font-weight: 900 !important; line-height: 0.5 !important; margin-bottom: 10px !important; user-select: none !important;">«</div>` : ''}
            
            <div id="gy-lang-wrapper" style="position: relative !important; width: 150px !important; ${langMargin}">
                <div onclick="toggleGyLang()" style="cursor:pointer !important; display:flex !important; align-items:center !important; justify-content: space-between !important; color:gold !important; border: 1px solid gold !important; padding: 8px 10px !important; background: rgba(0,0,0,0.9) !important; width: 100% !important; box-sizing: border-box !important;">
                    <div style="display:flex !important; align-items:center !important; gap:8px !important;">
                        <img src="https://flagcdn.com/w40/${current.f}.png" width="25" style="display:block !important;">
                        <span style="font-weight:900 !important; font-size: 0.9rem !important; font-family: sans-serif !important;">${current.c.toUpperCase()}</span>
                    </div>
                    <span style="font-size: 10px !important;">▼</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute !important; top:100% !important; left:0 !important; width:100% !important; max-height:250px !important; overflow-y:auto !important; background:black !important; border: 1px solid gold !important; border-top: none !important; box-sizing: border-box !important;"></div>
            </div>
        </div>
        
        <div style="pointer-events: auto !important; padding-top: 5px !important;">
            <div style="font-size: 35px !important; font-weight: 900 !important; color: gold !important; letter-spacing: 4px !important; line-height: 1 !important; font-family: sans-serif !important;">GY-GY</div>
        </div>
    `;

    document.body.prepend(header);

    const list = document.getElementById('gy-lang-list');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.setAttribute('style', "padding: 10px !important; color: gold !important; cursor: pointer !important; display: flex !important; align-items: center !important; gap: 10px !important; border-bottom: 0.5px solid rgba(255,215,0,0.2) !important; font-size: 0.85rem !important; font-family: sans-serif !important;");
        item.innerHTML = `<img src="https://flagcdn.com/w20/${l.f}.png" width="20"> <span>${l.n}</span>`;
        item.onclick = (e) => {
            e.stopPropagation();
            localStorage.setItem('gy_lang_code', l.c);
            window.location.reload();
        };
        list.appendChild(item);
    });

    if (!isIndex) playZoneSound(0.5);
}

function toggleGyLang() {
    const list = document.getElementById('gy-lang-list');
    if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedAttributes);
} else {
    initSharedAttributes();
}
