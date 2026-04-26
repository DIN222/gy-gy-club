/* . [BLOCK: SHARED_LOGIC_TOOLS_v1.1] */

const GY_LANGS = [
    {c:'en', f:'gb', n:'ENGLISH'}, {c:'ru', f:'ru', n:'РУССКИЙ'},
    {c:'ua', f:'ua', n:'УКРАЇНСЬКА'}, {c:'pl', f:'pl', n:'POLSKI'},
    {c:'de', f:'de', n:'DEUTSCH'}, {c:'fr', f:'fr', n:'FRANÇAIS'},
    {c:'it', f:'it', n:'ITALIANO'}, {c:'es', f:'es', n:'ESPAÑOL'},
    {c:'cn', f:'cn', n:'中文'}, {c:'jp', f:'jp', n:'日本語'},
    {c:'ae', f:'ae', n:'العربية'}, {c:'br', f:'br', n:'PORTUGUÊС'}
];

// Функция, которая рисует атрибуты (Назад, Лого, Язык)
// Мы вызываем её ТОЛЬКО там, где это нужно (Холл, Ателье)
function injectPermanentAttributes() {
    const langCode = localStorage.getItem('gy_lang') || 'en';
    const current = GY_LANGS.find(l => l.c === langCode) || GY_LANGS[0];

    const header = document.createElement('div');
    header.id = 'gy-header';
    header.style = "position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; padding: 20px; z-index: 9999;";
    header.innerHTML = `
        <button class="btn-gy" onclick="history.back()">← BACK</button>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div id="gy-lang-trigger" style="cursor:pointer; color:gold;">
                <img src="https://flagcdn.com/w40/${current.f}.png" width="25"> ${current.c.toUpperCase()}
            </div>
            <div style="font-size: 2rem; font-weight: 900; color: gold;">GY-GY</div>
        </div>
    `;
    document.body.prepend(header);
}

// Функция перевода
function applyTranslations(pageDict) {
    const lang = localStorage.getItem('gy_lang') || 'en';
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (pageDict[lang] && pageDict[lang][key]) {
            el.innerText = pageDict[lang][key];
        }
    });
}
