
const langData = {
    en: { f: 'gb', n: 'EN', q_whiskey: "«Every joke has a grain of whiskey»", btn_get_id: "GET ID", btn_to_hall: "TO HALL", btn_save: "SAVE", btn_to_bar: "ENTER BAR", label_avatar: "AVATAR", bar_welcome: "GY-GY BAR" },
    ru: { f: 'ru', n: 'RU', q_whiskey: "«В каждой шутке есть доля виски»", btn_get_id: "ПОЛУЧИТЬ ID", btn_to_hall: "В ХОЛЛ", btn_save: "СОХРАНИТЬ", btn_to_bar: "В БАР", label_avatar: "АВАТАР", bar_welcome: "GY-GY БАР" },
    // ... остальные 10 языков добавляются аналогично
};

let state = { lang: 'en', id: null, photo: null, history: ['scr-entry'] };

window.addEventListener('DOMContentLoaded', () => {
    initLangMenu();
    applyLang(localStorage.getItem('gy_pref_lang') || 'en');
    initHandlers();
});

function initHandlers() {
    document.getElementById('main-door').onclick = () => {
        document.getElementById('main-door').style.transform = "scale(5)";
        document.getElementById('main-door').style.opacity = "0";
        setTimeout(() => go('scr-welcome'), 1000);
    };

    document.getElementById('go-id').onclick = () => go('scr-id');
    document.getElementById('save-btn').onclick = () => {
        state.id = state.id || "GY-" + Math.floor(Math.random()*900+100);
        state.photo = document.getElementById('user-photo').src;
        localStorage.setItem('gy_user', JSON.stringify(state));
        syncUI();
        document.getElementById('final-hall').classList.remove('btn-sleep');
        go('scr-hall');
    };
}

function go(id) {
    state.history.push(id);
    document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goBack() {
    if (state.history.length > 1) {
        state.history.pop();
        const prev = state.history[state.history.length - 1];
        document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
        document.getElementById(prev).classList.add('active');
    }
}

function applyLang(l) {
    state.lang = l;
    const d = langData[l];
    if(!d) return;
    document.getElementById('cur-flag').src = `https://flagcdn.com/w20/${d.f}.png`;
    document.getElementById('cur-name').innerText = d.n;
    document.querySelectorAll('[data-key]').forEach(el => {
        const k = el.getAttribute('data-key');
        if(d[k]) el.innerText = d[k];
    });
}

function syncUI() {
    document.getElementById('id-label').innerText = state.id;
    document.getElementById('h-id').innerText = "#" + state.id;
    document.getElementById('h-photo').src = state.photo;
    document.getElementById('h-flag').src = document.getElementById('cur-flag').src;
}

function generateAvatar() {
    const url = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.random()}`;
    const img = document.getElementById('user-photo');
    img.src = url; img.style.display = "block";
}
