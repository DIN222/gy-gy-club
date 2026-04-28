/* . [BLOCK: SHARED_LOGIC_v2.1_FINAL] */
const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

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
        bgAudio.play().catch(() => console.log("Audio ready"));
    }, delay * 1000);
}

function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;
    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; box-sizing: border-box; z-index: 2000; pointer-events: none;";
    
    header.innerHTML = `
        <div class="gy-left-side" style="pointer-events: auto; display: flex; align-items: center; gap: 20px;">
            <span onclick="history.back()" style="cursor:pointer; color:gold; font-size: 3.5rem; font-weight: 900; line-height: 0.8; user-select: none;">«</span>
            <div id="gy-lang-wrapper" style="position: relative;">
                <div onclick="toggleGyLang()" style="cursor:pointer; display:flex; align-items:center; gap:10px; color:gold; border: 1px solid gold; padding: 5px 10px; background: rgba(0,0,0,0.5);">
                    <img src="https://flagcdn.com/w40/${current.f}.png" width="30">
                    <span style="font-weight:900;">${current.c.toUpperCase()}</span>
                </div>
                <div id="gy-lang-list" style="display:none; position:absolute; top:45px; left:0; width:160px; max-height:250px; overflow-y:auto; background:rgba(0,0,0,0.95); border:1px solid gold; z-index:2001;">
                </div>
            </div>
        </div>
        <div style="pointer-events: auto;">
            <div style="font-size: 3rem; font-weight: 900; color: gold; letter-spacing: 4px;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);

    // Наполнение списка языков
    const list = document.getElementById('gy-lang-list');
    GY_LANGS.forEach(l => {
        const item = document.createElement('div');
        item.style = "padding: 10px; color: gold; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 0.5px solid rgba(255,215,0,0.2);";
        item.innerHTML = `<img src="https://flagcdn.com/w20/${l.f}.png" width="20"> <span>${l.n}</span>`;
        item.onclick = () => { localStorage.setItem('gy_lang', l.c); location.reload(); };
        list.appendChild(item);
    });

    // Авто-звук для всех страниц, кроме первой
    const path = window.location.pathname;
    if (path.includes('welcome.html')) playZoneSound(0.5, 0.5);
    if (path.includes('hall.html')) playZoneSound(0.9, 0.1);
}

function toggleGyLang() {
    const list = document.getElementById('gy-lang-list');
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

window.addEventListener('DOMContentLoaded', injectPermanentAttributes);
