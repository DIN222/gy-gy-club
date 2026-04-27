<script src="shared-logic.js"></script>
<script>
    const doorsDict = {
        en: { doors_slogan: "LAUGH OR LEAVE", enter_btn: "ENTER" },
        ru: { doors_slogan: "СМЕЙСЯ ИЛИ УХОДИ", enter_btn: "ВОЙТИ" }
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('gy_lang')) localStorage.setItem('gy_lang', 'en');
        
        // Рисуем только языковой селектор для первой страницы (без стрелок и лого)
        renderDoorsLangOnly(); 
        applyTranslations(doorsDict);
    });

    function renderDoorsLangOnly() {
        const lang = localStorage.getItem('gy_lang') || 'en';
        const current = GY_LANGS.find(l => l.c === lang) || GY_LANGS[0];
        const div = document.createElement('div');
        div.style = "position: fixed; top: 30px; right: 40px; z-index: 1000; cursor: pointer;";
        div.innerHTML = `<div onclick="toggleGyLangMenu()" style="display:flex; align-items:center; gap:10px; color:gold;">
            <img src="https://flagcdn.com/w40/${current.f}.png" width="35">
            <span style="font-weight:900; font-size:1.4rem;">${current.c.toUpperCase()}</span>
        </div><div id="gy-lang-menu" style="display:none; position:absolute; right:0; top:50px; background:rgba(0,0,0,0.9); border:1px solid gold; padding:10px; display:grid; grid-template-columns:repeat(4,1fr); gap:10px;"></div>`;
        document.body.appendChild(div);
        
        const menu = document.getElementById('gy-lang-menu');
        GY_LANGS.forEach(l => {
            const img = document.createElement('img');
            img.src = `https://flagcdn.com/w40/${l.f}.png`;
            img.style = "width:25px; cursor:pointer;";
            img.onclick = () => { localStorage.setItem('gy_lang', l.c); location.reload(); };
            menu.appendChild(img);
        });
    }

    // Твоя функция двери (пример)
    document.querySelector('.door-clickable-area').onclick = () => {
        // Логика открытия...
        location.href = 'welcome.html';
    };
</script>
