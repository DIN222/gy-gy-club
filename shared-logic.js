/* . [BLOCK: SHARED_LOGIC_v5.1_AUTONOMOUS] */
const langs = [
    {c:'ru', n:'РУССКИЙ', f:'ru'}, {c:'en', n:'ENGLISH', f:'gb'},
    {c:'uk', n:'УКРАЇНСЬКА', f:'ua'}, {c:'pl', n:'POLSKI', f:'pl'},
    {c:'de', n:'DEUTSCH', f:'de'}, {c:'fr', n:'FRANÇAIS', f:'fr'},
    {c:'it', n:'ITALIANO', f:'it'}, {c:'es', f:'ESPAÑOL', f:'es'},
    {c:'cn', n:'中文', f:'cn'}, {c:'ja', n:'日本語', f:'jp'},
    {c:'ar', n:'العربية', f:'ae'}, {c:'pt', n:'PORTUGUÊS', f:'br'}
];

function initShared() {
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    
    // Если на странице нет контейнера для языка — создаем его (для 1-й страницы)
    if (!document.querySelector('.lang-container')) {
        const langHTML = `
            <div class="lang-container" style="position: fixed; top: ${isIndex ? '20px' : '80px'}; left: 25px; z-index: 10000;">
                <div class="lang-trigger" style="border: 1px solid #D4AF37; background: rgba(0,0,0,0.8); padding: 5px 10px; cursor: pointer; display: flex; align-items: center; gap: 10px; width: 130px; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="" id="current-lang-flag" width="25"> 
                        <span id="current-lang-label" style="font-weight: 900; font-size: 0.9rem; color: #D4AF37;"></span>
                    </div>
                    <span style="font-size: 10px; color: #D4AF37;">▼</span>
                </div>
                <div id="lang-list-12" class="lang-panel" style="display: none; position: absolute; top: 100%; left: 0; width: 152px; background: #000; border: 1px solid #D4AF37; border-top: none; max-height: 300px; overflow-y: auto;"></div>
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', langHTML);
    }

    // Если нет логотипа — создаем его (для 1-й страницы)
    if (!document.querySelector('.logo-text')) {
        const logoHTML = `<header style="position: fixed; top: 20px; right: 30px; z-index: 10000;"><div class="logo-text" style="font-size: 35px; font-weight: 900; color: #D4AF37; letter-spacing: 4px;">GY-GY</div></header>`;
        document.body.insertAdjacentHTML('afterbegin', logoHTML);
    }

    // Оживляем список языков
    const listContainer = document.getElementById('lang-list-12');
    const trigger = document.querySelector('.lang-trigger');
    
    if (listContainer) {
        listContainer.innerHTML = langs.map(l => `
            <button class="lang-btn" onclick="applyTranslation('${l.c}', '${l.f}', '${l.n}')" style="width: 100%; padding: 10px; background: #000; color: #D4AF37; border: none; border-bottom: 1px solid rgba(212,175,55,0.2); text-align: left; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; font-size: 0.85rem;">
                <img src="https://flagcdn.com/w20/${l.f}.png" width="20"> ${l.n}
            </button>
        `).join('');

        // Механика открытия/закрытия
        trigger.onclick = () => {
            const isVisible = listContainer.style.display === 'block';
            listContainer.style.display = isVisible ? 'none' : 'block';
        };
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target)) listContainer.style.display = 'none';
        });
    }

    const savedLang = localStorage.getItem('gy_lang') || 'ru';
    const initial = langs.find(l => l.c === savedLang) || langs[0];
    applyTranslation(initial.c, initial.f, initial.n);
}

function applyTranslation(code, flag, name) {
    const flagImg = document.getElementById('current-lang-flag');
    const label = document.getElementById('current-lang-label');
    
    if (flagImg) flagImg.src = `https://flagcdn.com/w40/${flag}.png`;
    if (label) label.innerText = isNaN(code) ? code.toUpperCase() : name; // Код для плашки (RU), имя для списка

    if (typeof dictionary !== 'undefined') {
        const texts = dictionary[code] || dictionary['en'];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if(texts[key]) el.innerText = texts[key];
        });
    }
    localStorage.setItem('gy_lang', code);
}

window.addEventListener('DOMContentLoaded', initShared);
