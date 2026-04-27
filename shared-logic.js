/* . [BLOCK: SHARED_LOGIC_v1.9] */

const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊS'}
];

// --- ЦЕНТРАЛЬНЫЙ АУДИО-ДВИЖОК ---
const GY_SOUNDS = {
    bar_bg: "bar_ambient.mp3" 
};

function playZoneSound(volume, delay = 0) {
    const safeVolume = Math.min(Math.max(volume, 0), 1); // Максимум 1.0
    
    setTimeout(() => {
        let bgAudio = document.getElementById('gy-bg-audio');
        if (!bgAudio) {
            bgAudio = document.createElement('audio');
            bgAudio.id = 'gy-bg-audio';
            bgAudio.loop = true;
            bgAudio.src = GY_SOUNDS.bar_bg;
            document.body.appendChild(bgAudio);
        }
        bgAudio.volume = safeVolume;
        bgAudio.play().catch(e => console.log("Waiting for user interaction to play audio..."));
    }, delay * 1000);
}

// --- ПОСТОЯННЫЕ АТРИБУТЫ (Стрелка « и Лого) ---
function injectPermanentAttributes() {
    if (document.getElementById('gy-header')) return;
    
    const header = document.createElement('div');
    header.id = 'gy-header';
    // pointer-events: none позволяет кликать сквозь шапку
    header.style = "position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 30px 40px; box-sizing: border-box; z-index: 999; pointer-events: none;";
    
    header.innerHTML = `
        <div style="pointer-events: auto;">
            <span onclick="history.back()" 
                  style="cursor:pointer; color:gold; font-size: 4rem; font-weight: 900; line-height: 1; user-select: none;">«</span>
        </div>
        <div style="pointer-events: auto;">
            <div style="font-size: 3.5rem; font-weight: 900; color: gold; letter-spacing: 5px; line-height: 1;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);

    // Логика звуковых зон (Задержка 1 сек после входа)
    const path = window.location.pathname;
    if (path.includes('welcome.html')) playZoneSound(0.5, 1.0);
    if (path.includes('registration.html')) playZoneSound(0.7, 1.0);
    if (path.includes('hall.html')) playZoneSound(0.9, 1.0);
    if (path.includes('bar.html')) playZoneSound(1.0, 1.0);
}

function applyTranslations(dict) {
    const lang = localStorage.getItem('gy_lang') || 'en';
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (dict && dict[lang] && dict[lang][key]) el.innerText = dict[lang][key];
    });
}
