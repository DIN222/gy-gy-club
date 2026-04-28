/* . [BLOCK: SHARED_LOGIC_v2.8_FINAL_UA_FIX] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

function playZoneSound(volume) {
    let bgAudio = document.getElementById('gy-bg-audio');
    if (!bgAudio) {
        bgAudio = document.createElement('audio');
        bgAudio.id = 'gy-bg-audio';
        bgAudio.loop = true;
        bgAudio.src = "bar_ambient.mp3";
        document.body.appendChild(bgAudio);
    }
    bgAudio.volume = volume;
    
    // Пытаемся запустить сразу
    const start = () => {
        bgAudio.play().catch(() => {
            console.log("Audio needs user gesture");
            document.addEventListener('click', () => bgAudio.play(), { once: true });
        });
    };
    start();
}

function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;

    const path = window.location.pathname;
    const isIndex = path.includes('index.html') || path.endsWith('/');

    // ЧИТАЕМ ТОЛЬКО КОД (ua, ru, en)
    const savedCode = localStorage.getItem('gy_lang_code') || 'en';
    const current = GY_LANGS.find(l => l.c === savedCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; box-sizing: border-box; z-index: 2000; pointer-events: none;";
    
    header.innerHTML = `
        <div class="gy-left-side" style="pointer-events: auto; display: flex; align-items: center; gap: 20px;">
            ${!isIndex ? `<span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 3.5rem; font-weight: 900; line-height: 0.8;">«</span>` : ''}
            <div id="gy-lang-wrapper" style="position: relative; width: 150px;">
                <div onclick="toggleGyLang()" style="cursor:pointer; display:flex; align-items:center; justify-content: space-between; color:gold; border: 1px solid gold; padding: 8px 10px; background: rgba(0,0,0,0.8); width: 100%; box-sizing: border-box;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="https://flagcdn.com/w40/${current.f}.png" width="25">
                        <span style="font-weight:900; font-size: 0.9rem;">${current.c.toUpperCase()}</span>
                    </div>
                    <span>▼</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute; top:100%; left:0; width:100%; max-height:250px; overflow-y:auto; background:rgba(0,0,0,0.95); border: 1px solid gold; border-top: none; box-sizing: border-box;"></div>
            </div>
        </div>
        <div style="pointer-events: auto;">
            <div style="font-size: 35px; font-weight: 900; color: gold; letter-spacing: 4px; line-height: 1;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);

    const list = document.getElementById('gy-lang-list');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.style = "padding: 10px; color: gold; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 0.5px solid rgba(255,215,0,0.2); font-size: 0.85rem;";
        item.innerHTML = `<img src="https://flagcdn.com/w20/${l.f}.png" width="20"> <span>${l.n}</span>`;
        item.onclick = (e) => {
            e.stopPropagation();
            localStorage.setItem('gy_lang_code', l.c); // Сохраняем код (ua), а не текст
            window.location.reload(); 
        };
        list.appendChild(item);
    });

    // ЗВУК: Если не главная страница - включаем
    if (!isIndex) {
        playZoneSound(0.5);
    }
}

function toggleGyLang() {
    const list = document.getElementById('gy-lang-list');
    if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

window.addEventListener('load', injectPermanentAttributes);
