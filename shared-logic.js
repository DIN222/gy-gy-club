/* . [BLOCK: SHARED_LOGIC_v2.3_FIX] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

// --- ОБНОВЛЕННЫЙ АУДИО-ДВИЖОК ---
function playZoneSound(volume, delay = 0) {
    const safeVolume = Math.min(Math.max(volume, 0), 1);
    setTimeout(() => {
        let bgAudio = document.getElementById('gy-bg-audio');
        if (!bgAudio) {
            bgAudio = document.createElement('audio');
            bgAudio.id = 'gy-bg-audio';
            bgAudio.loop = true;
            bgAudio.src = "bar_ambient.mp3";
            document.body.appendChild(bgAudio);
        }
        bgAudio.volume = safeVolume;
        
        // Бронебойный запуск: пробуем играть сразу
        const promise = bgAudio.play();
        if (promise !== undefined) {
            promise.then(() => {
                console.log("Audio started successfully");
            }).catch(error => {
                console.log("Autoplay blocked. Waiting for click.");
                // Резервный запуск по клику на документ
                const startOnInterract = () => {
                    bgAudio.play();
                    document.removeEventListener('click', startOnInterract);
                };
                document.addEventListener('click', startOnInterract);
            });
        }
    }, delay * 1000);
}

function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path === '/';

    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; box-sizing: border-box; z-index: 2000; pointer-events: none;";
    
    // Ширина блока языка (кнопка и список равны)
    const boxWidth = "150px";

    header.innerHTML = `
        <div class="gy-left-side" style="pointer-events: auto; display: flex; align-items: center; gap: 20px;">
            ${!isIndex ? `<span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 3.5rem; font-weight: 900; line-height: 0.8; user-select: none;">«</span>` : ''}
            <div id="gy-lang-wrapper" style="position: relative; width: ${boxWidth};">
                <div onclick="toggleGyLang()" style="cursor:pointer; display:flex; align-items:center; justify-content: space-between; color:gold; border: 1px solid gold; padding: 8px 10px; background: rgba(0,0,0,0.7); box-sizing: border-box; width: 100%;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="https://flagcdn.com/w40/${current.f}.png" width="25">
                        <span style="font-weight:900; font-size: 0.9rem;">${current.c.toUpperCase()}</span>
                    </div>
                    <span style="font-size: 0.7rem;">▼</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute; top:100%; left:0; width:100%; max-height:250px; overflow-y:auto; background:rgba(0,0,0,0.95); border: 1px solid gold; border-top: none; z-index:2001; box-sizing: border-box;">
                </div>
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
        item.onclick = () => { localStorage.setItem('gy_lang', l.c); location.reload(); };
        list.appendChild(item);
    });

    // Автозапуск звука для зон (теперь надежнее)
    if (!isIndex) {
        if (path.includes('welcome.html')) playZoneSound(0.5, 0.2);
        if (path.includes('hall.html')) playZoneSound(0.8, 0.1);
    }
}

function toggleGyLang() {
    const list = document.getElementById('gy-lang-list');
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

window.addEventListener('DOMContentLoaded', injectPermanentAttributes);
