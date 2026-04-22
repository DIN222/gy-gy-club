
// 1. ПОЛНАЯ БАЗА 12 ЯЗЫКОВ
const langData = {
    en: { f: 'gb', n: 'ENGLISH', q_whiskey: "«Every joke has a grain of whiskey»", btn_get_id: "GET ID TOKEN", btn_to_hall: "PROCEED", btn_save: "SAVE PROFILE", btn_enter: "ENTER BAR", label_avatar: "AVATAR" },
    ru: { f: 'ru', n: 'РУССКИЙ', q_whiskey: "«В каждой шутке есть доля виски»", btn_get_id: "ПОЛУЧИТЬ ID", btn_to_hall: "В ХОЛЛ", btn_save: "СОХРАНИТЬ", btn_enter: "В БАР", label_avatar: "АВАТАР" },
    ua: { f: 'ua', n: 'УКРАЇНСЬКА', q_whiskey: "«У кожному жарті є частка віскі»", btn_get_id: "ОТРИМАТИ ID", btn_to_hall: "У ХОЛ", btn_save: "ЗБЕРЕГТИ", btn_enter: "В БАР", label_avatar: "АВАТАР" },
    pl: { f: 'pl', n: 'POLSKI', q_whiskey: "«W każdym żarcie jest ziarno whiskey»", btn_get_id: "POBIERZ ID", btn_to_hall: "DO HALLU", btn_save: "ZAPISZ", btn_enter: "WEJDŹ", label_avatar: "AWATAR" },
    de: { f: 'de', n: 'DEUTSCH', q_whiskey: "«Jeder Witz hat einen Teil Whiskey»", btn_get_id: "ID ERHALTEN", btn_to_hall: "ZUR HALLE", btn_save: "SPEICHERN", btn_enter: "EINTRITT", label_avatar: "AVATAR" },
    fr: { f: 'fr', n: 'FRANÇAIS', q_whiskey: "«Chaque blague contient du whisky»", btn_get_id: "OBTENIR ID", btn_to_hall: "VERS LE HALL", btn_save: "SAUVER", btn_enter: "ENTRER", label_avatar: "AVATAR" },
    it: { f: 'it', n: 'ITALIANO', q_whiskey: "«Ogni scherzo ha un po' di whiskey»", btn_get_id: "OTTIENI ID", btn_to_hall: "AL SALONE", btn_save: "SALVA", btn_enter: "ENTRA", label_avatar: "AVATAR" },
    es: { f: 'es', n: 'ESPAÑOL', q_whiskey: "«Cada broma tiene un poco de whisky»", btn_get_id: "OBTENER ID", btn_to_hall: "AL VESTÍBULO", btn_save: "GUARDAR", btn_enter: "ENTRAR", label_avatar: "AVATAR" },
    cn: { f: 'cn', n: '中文', q_whiskey: "“每个笑话都有一点威士忌”", btn_get_id: "获取 ID", btn_to_hall: "进入大厅", btn_save: "保存", btn_enter: "进入酒吧", label_avatar: "头像" },
    jp: { f: 'jp', n: '日本語', q_whiskey: "「すべてのジョークにはウイスキーが含まれています」", btn_get_id: "IDを取得", btn_to_hall: "ホールへ", btn_save: "保存", btn_enter: "入店", label_avatar: "アバター" },
    ae: { f: 'ae', n: 'العربية', q_whiskey: "«كل نكتة فيها القليل من الويسكي»", btn_get_id: "الحصول على الهوية", btn_to_hall: "إلى القاعة", btn_save: "حفظ", btn_enter: "دخول", label_avatar: "الصورة" },
    br: { f: 'br', n: 'PORTUGUÊS', q_whiskey: "«Toda piada tem um pouco de uísque»", btn_get_id: "OBTER ID", btn_to_hall: "AO SALÃO", btn_save: "SALVAR", btn_enter: "ENTRAR", label_avatar: "AVATAR" }
};

let state = { lang: 'en', id: null, photo: null, flag: 'gb' };

// ИНИЦИАЛИЗАЦИЯ (СЕНСОР)
window.addEventListener('DOMContentLoaded', () => {
    const sysLang = navigator.language.split('-')[0];
    const saved = JSON.parse(localStorage.getItem('gy_user_v8'));
    
    // Построение выпадающего списка
    const list = document.getElementById('lang-list');
    Object.keys(langData).forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'btn-sub-lang';
        btn.innerHTML = `<img src="https://flagcdn.com/w20/${langData[key].f}.png" class="flag-icon"> ${langData[key].n}`;
        btn.onclick = () => applyLang(key);
        list.appendChild(btn);
    });

    // Определение стартового языка
    state.lang = localStorage.getItem('gy_pref_lang') || (langData[sysLang] ? sysLang : 'en');
    applyLang(state.lang);

    // Если юзер уже "свой" — восстанавливаем сессию
    if (saved) {
        state = saved;
        restoreUser(state);
    }
    
    initClickHandlers();
});

function applyLang(l) {
    state.lang = l;
    state.flag = langData[l].f;
    localStorage.setItem('gy_pref_lang', l);
    
    document.getElementById('cur-flag').src = `https://flagcdn.com/w20/${state.flag}.png`;
    document.getElementById('cur-name').innerText = langData[l].n;
    document.body.dir = (l === 'ae' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (langData[l][key]) el.innerText = langData[l][key];
    });
    document.getElementById('lang-list').classList.remove('open');
}

function initClickHandlers() {
    // Дверь
    document.getElementById('main-door').onclick = function() {
        this.style.transform = "scale(5) rotate(10deg)";
        this.style.opacity = "0";
        if (!state.id) state.id = "GY-" + Math.floor(Math.random()*899 + 100);
        setTimeout(() => go('scr-welcome'), 1000);
    };

    // Переключатель языка
    document.getElementById('lang-trigger').onclick = (e) => {
        e.stopPropagation();
        document.getElementById('lang-list').classList.toggle('open');
    };

    // Навигация
    document.getElementById('go-id').onclick = () => {
        go('scr-id');
        document.getElementById('id-label').innerText = "#" + state.id;
        updateQR("qr-reg", state.id);
    };

    // Сохранение профиля
    document.getElementById('save-btn').onclick = () => {
        state.photo = document.getElementById('user-photo').src;
        localStorage.setItem('gy_user_v8', JSON.stringify(state));
        
        // Магия: переносим данные в Холл
        document.getElementById('h-id').innerText = "#" + state.id;
        document.getElementById('h-photo').src = state.photo;
        document.getElementById('h-flag').src = `https://flagcdn.com/w20/${state.flag}.png`;
        updateQR("qr-hall", state.id);

        document.getElementById('final-hall').classList.remove('btn-sleep');
    };

    document.getElementById('final-hall').onclick = () => go('scr-hall');
    document.getElementById('go-hall').onclick = () => go('scr-hall');
}

function updateQR(containerId, text) {
    const box = document.getElementById(containerId);
    box.innerHTML = "";
    new QRCode(box, { text: text, width: 80, height: 80, colorDark : "#000000", colorLight : "#ffffff" });
}

function generateAvatar() {
    const seed = Math.random();
    const url = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}`;
    const img = document.getElementById('user-photo');
    img.src = url;
    img.style.display = "block";
    document.getElementById('label-av').style.display = "none";
}

function restoreUser(data) {
    document.getElementById('go-hall').classList.remove('btn-sleep');
    document.getElementById('h-id').innerText = "#" + data.id;
    document.getElementById('h-photo').src = data.photo;
    document.getElementById('h-flag').src = `https://flagcdn.com/w20/${data.flag}.png`;
}

function go(id) {
    document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Закрытие меню при клике мимо
window.onclick = () => document.getElementById('lang-list').classList.remove('open');
