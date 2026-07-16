// ==========================================
// GY-GY CLUB — ЛОГИКА РЕГИСТРАЦИИ И ВХОДА
// ==========================================

let currentID = '';
let currentUserImage = '';

// --- Инициализация при загрузке страницы ---
window.addEventListener('load', () => {
    // 1. Проверяем, есть ли уже сохраненный профиль
    const savedAvatar = localStorage.getItem('gygy_avatar');
    const savedNickname = localStorage.getItem('gygy_nickname');
    currentID = localStorage.getItem('gygy_id');

    // Если ID нет — генерируем новый "цифровой след" заранее
    if (!currentID) {
        currentID = "GY-" + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('gygy_id', currentID);
    }
    
    const idLabel = document.getElementById('id-label');
    if (idLabel) idLabel.value = currentID;

    // 2. Если юзер уже регистрировался ранее — автозаполняем поля
    if (savedAvatar && savedNickname) {
        currentUserImage = savedAvatar;
        
        const avatarImg = document.getElementById('avatar-img');
        const txtAvatar = document.getElementById('txt-avatar');
        const inputNick = document.getElementById('input-nickname');
        const btnWHall = document.getElementById('btn-w-hall');

        if (avatarImg) { avatarImg.src = savedAvatar; avatarImg.style.display = 'block'; }
        if (txtAvatar) txtAvatar.style.display = 'none';
        if (inputNick) inputNick.value = savedNickname;
        if (btnWHall) btnWHall.classList.remove('btn-sleep');
    }
});

// --- Навигация по блокам (Бесшовная) ---
function portalTransition(nextId) {
    document.querySelectorAll('.block').forEach(block => {
        block.classList.remove('active');
    });
    
    const target = document.getElementById(nextId);
    if (target) {
        target.classList.add('active');
    }

    // Если вышли в Холл — включаем красивый бейдж резидента в углу
    const badge = document.getElementById('global-user-badge');
    if (badge) {
        badge.style.display = (nextId === 'block-hall') ? 'flex' : 'none';
    }
}

// --- Обработка клика по двери (Вход) ---
function handleDoor() {
    const sndDoor = document.getElementById('snd-door');
    const mainDoor = document.getElementById('main-door');

    if (sndDoor) sndDoor.play().catch(() => {});
    if (mainDoor) mainDoor.classList.add('door-exploded');

    setTimeout(() => {
        // После взрыва двери проверяем: если зарегистрирован — сразу в Холл, если нет — на Приветствие
        const savedAvatar = localStorage.getItem('gygy_avatar');
        const savedNickname = localStorage.getItem('gygy_nickname');

        if (savedAvatar && savedNickname) {
            setupBadge(savedAvatar, savedNickname);
            portalTransition('block-hall');
        } else {
            portalTransition('block-welcome');
        }
    }, 700);
}

// --- Логика аватарок (Загрузка / Генерация) ---
function preview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentUserImage = e.target.result;
            const pp = document.getElementById('pp');
            const avatarImg = document.getElementById('avatar-img');
            const txtAvatar = document.getElementById('txt-avatar');

            if (pp) { pp.src = currentUserImage; pp.style.display = 'block'; }
            if (avatarImg) avatarImg.style.display = 'none';
            if (txtAvatar) txtAvatar.style.display = 'none';
            
            validateInput();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function generateAvatar() {
    const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    // Наш фирменный юморной SVG-аватар
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="#${hex}"/><circle cx="50" cy="40" r="20" fill="#000"/><path d="M20,90 C20,70 80,70 80,90" fill="#000"/></svg>`;
    currentUserImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    
    const avatarImg = document.getElementById('avatar-img');
    const txtAvatar = document.getElementById('txt-avatar');
    const pp = document.getElementById('pp');

    if (avatarImg) { avatarImg.src = currentUserImage; avatarImg.style.display = 'block'; }
    if (txtAvatar) txtAvatar.style.display = 'none';
    if (pp) pp.style.display = 'none';

    validateInput();
}

// --- Валидация формы ---
function validateInput() {
    const nickVal = document.getElementById('input-nickname').value.trim();
    const btnWHall = document.getElementById('btn-w-hall');

    // Кнопка входа активна только если есть аватар И введён никнейм
    if (currentUserImage && nickVal.length > 0) {
        if (btnWHall) btnWHall.classList.remove('btn-sleep');
    } else {
        if (btnWHall) btnWHall.classList.add('btn-sleep');
    }
}

// --- Финализация регистрации и вход в Холл ---
function saveUserProfileAndEnter() {
    const nickname = document.getElementById('input-nickname').value.trim() || "GUEST";
    
    // Сохраняем в localStorage
    localStorage.setItem('gygy_avatar', currentUserImage);
    localStorage.setItem('gygy_nickname', nickname);

    // Инициализируем бейдж резидента в углу
    setupBadge(currentUserImage, nickname);

    // Переходим в Холл клуба!
    portalTransition('block-hall');
}

function setupBadge(avatar, nickname) {
    const badgeImg = document.getElementById('badge-avatar-img');
    const badgeNick = document.getElementById('badge-nickname');
    if (badgeImg) badgeImg.src = avatar;
    if (badgeNick) badgeNick.innerText = '@' + nickname;
}
