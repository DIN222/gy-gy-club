/* . [BLOCK: SHARED_LOGIC_v4.1_STRICT_REPLACEMENT] */
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
    // 1. Ищем и удаляем старые блоки, если они есть в оригинале welcome.html
    // (Укажи здесь ID или классы своих старых лого/языка, если они мешают)
    const oldHeader = document.getElementById('gy-header');
    if (oldHeader) oldHeader.remove();

    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const saved = localStorage.getItem('gy_lang_code') || 'en';
    const current = GY_LANGS.find(l => l.c === saved) || GY_LANGS[0];

    // 2. Создаем чистый контейнер атрибутов
    const header = document.createElement('div');
    header.id = 'gy-header';
    
    // Стили первой страницы (лого 35px, отступы 20/30)
    header.style = "position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 30px; box-sizing: border-box; z-index: 10000; pointer-events: none;";

    const langMargin = !isIndex ? "60px" : "0px";

    header.innerHTML = `
        <div style="pointer-events: auto; display: flex; flex-direction: column; align-items: flex-start;">
            ${!isIndex ? `<div onclick="window.location.href='index.html'" style="cursor:pointer; color:gold; font-size: 50px; font-weight: 900; line-height: 0.5; margin-bottom: 10px; user-select: none; font-family: Arial, sans-serif;">«</div>` : ''}
            
            <div id="gy-lang-wrapper" style="position: relative; width: 150px; margin-top: ${langMargin};">
                <div onclick="toggleGyLang()" style="cursor:pointer; display:flex; align-items:center; justify-content: space-between; color:gold; border: 1px solid gold; padding: 8px 10px; background: rgba(0,0,0,0.8); width: 100%; box-sizing: border-box;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="https://flagcdn.com/w40/${current.f}.png" width="25">
                        <span style="font-weight:900; font-size: 0.9rem; font-family: Arial, sans-serif;">${current.c.toUpperCase()}</span>
                    </div>
                    <span style="font-size: 12px;">▼</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute; top:100%; left:0; width:100%; max-height:250px; overflow-y:auto; background:rgba(0,0,0,0.95); border: 1px solid gold; border-top: none; box-sizing: border-box;"></div>
            </div>
        </div>
        
        <div style="pointer-events: auto;">
            <div style="font-size: 35px; font-weight: 900; color: gold; letter-spacing: 4px; line-height: 1; font-family: Arial, sans-serif;">GY-GY</div>
        </div>
    `;

    // Вставляем в самое начало body
    document.body.prepend(header);

    const list = document.getElementById('gy-lang-list');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.style = "padding: 10px; color: gold; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 0.5px solid rgba(255,215,0,0.2); font-size: 0.85rem; font-family: Arial, sans-serif;";
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

window.addEventListener('DOMContentLoaded', initSharedAttributes);
