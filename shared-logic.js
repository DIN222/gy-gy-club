/* . [BLOCK: SHARED_LOGIC_v2.9_ULTIMATE] */
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
    
    // Пытаемся играть. Если браузер блокирует - вешаем на любой клик по документу
    const forcePlay = () => {
        audio.play().catch(() => {
            console.log("Audio blocked. Waiting for interaction...");
            document.addEventListener('click', () => audio.play(), { once: true });
        });
    };
    forcePlay();
}

function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;

    const path = window.location.pathname;
    const isIndex = path.includes('index.html') || path.endsWith('/');

    // ПРОВЕРКА ПАМЯТИ
    let saved = localStorage.getItem('gy_lang_code');
    if (!saved) {
        saved = 'en';
        localStorage.setItem('gy_lang_code', 'en');
    }
    
    const current = GY_LANGS.find(l => l.c === saved) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; box-sizing: border-box; z-index: 9999; pointer-events: none;";
    
    header.innerHTML = `
        <div style="pointer-events: auto; display: flex; align-items: center; gap: 20px;">
            ${!isIndex ? `<span onclick="location.href='index.html'" style="cursor:pointer; color:gold; font-size: 50px; font-weight: 900; line-height: 0.5; user-select: none;">«</span>` : ''}
            <div id="gy-lang-wrapper" style="position: relative; width: 150px; border: 1px solid gold; background: rgba(0,0,0,0.9);">
                <div onclick="toggleGyLang()" style="cursor:pointer; display:flex; align-items:center; justify-content: space-between; color:gold; padding: 8px 10px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="https://flagcdn.com/w40/${current.f}.png" width="25">
                        <span style="font-weight:900; font-size: 14px;">${current.c.toUpperCase()}</span>
                    </div>
                    <span>▼</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute; top:100%; left:-1px; width:calc(100% + 2px); max-height:250px; overflow-y:auto; background:black; border: 1px solid gold; border-top:none;"></div>
            </div>
        </div>
        <div style="pointer-events: auto;">
            <div style="font-size: 35px; font-weight: 900; color: gold; letter-spacing: 4px; line-height: 1; text-shadow: 2px 2px 5px black;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);

    const list = document.getElementById('gy-lang-list');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.style = "padding: 10px; color: gold; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(255,215,0,0.1); font-size: 13px;";
        item.innerHTML = `<img src="https://flagcdn.com/w20/${l.f}.png" width="20"> <span>${l.n}</span>`;
        item.onclick = (e) => {
            e.stopPropagation();
            localStorage.setItem('gy_lang_code', l.c);
            console.log("Language saved:", l.c);
            window.location.reload(); 
        };
        list.appendChild(item);
    });

    // ЗВУК ДЛЯ ВСЕХ КРОМЕ ГЛАВНОЙ
    if (!isIndex) {
        setTimeout(() => playZoneSound(0.5), 100);
    }
}

function toggleGyLang() {
    const list = document.getElementById('gy-lang-list');
    if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

// Запуск через два разных события для надежности
window.addEventListener('DOMContentLoaded', injectPermanentAttributes);
window.addEventListener('load', () => {
    // Если шапка не создалась - создаем
    if(!document.getElementById('gy-header')) injectPermanentAttributes();
});
