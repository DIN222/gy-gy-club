
// Глобальная база данных со счетчиками и списком резидентов для каждого языка
const allLangs = [
    {n:'ENGLISH', c:'gb', code:'en', count: 12, users: [{name: 'Charlie_Whisky', avatar: ''}, {name: 'Alice_In_Club', avatar: ''}, {name: 'Bob_The_Tee', avatar: ''}]}, 
    {n:'DEUTSCH', c:'de', code:'de', count: 4, users: [{name: 'Hans_Bier', avatar: ''}, {name: 'Klaus_S.', avatar: ''}, {name: 'Helga_M', avatar: ''}, {name: 'Dieter_N', avatar: ''}]}, 
    {n:'ESPAÑOL', c:'es', code:'es', count: 2, users: [{name: 'Carlos_Amigo', avatar: ''}, {name: 'Sofia_Sol', avatar: ''}]}, 
    {n:'FRANÇAIS', c:'fr', code:'fr', count: 5, users: [{name: 'Pierre_Champagne', avatar: ''}, {name: 'Amelie_Eiffel', avatar: ''}, {name: 'Jean_Luc', avatar: ''}, {name: 'Chloe_Paris', avatar: ''}, {name: 'Francois', avatar: ''}]},
    {n:'ITALIANO', c:'it', code:'it', count: 3, users: [{name: 'Giovanni_V', avatar: ''}, {name: 'Francesca_B', avatar: ''}, {name: 'Marco_Roma', avatar: ''}]}, 
    {n:'POLSKI', c:'pl', code:'pl', count: 2, users: [{name: 'Janusz_K', avatar: ''}, {name: 'Agnieszka', avatar: ''}]}, 
    {n:'PORTUGUÊS', c:'pt', code:'pt', count: 1, users: [{name: 'Thiago_Lisbon', avatar: ''}]}, 
    {n:'РУССКИЙ', c:'ru', code:'ru', count: 8, users: [{name: 'Модермех', avatar: ''}, {name: 'Дядя_Вася', avatar: ''}, {name: 'Кот_Матрос', avatar: ''}, {name: 'Ася_Дизайн', avatar: ''}, {name: 'Петр_Павлов', avatar: ''}, {name: 'Ольга_Креатив', avatar: ''}, {name: 'Шурик', avatar: ''}, {name: 'Маша_Арт', avatar: ''}]}, 
    {n:'TÜRKÇE', c:'tr', code:'tr', count: 2, users: [{name: 'Mustafa_Ist', avatar: ''}, {name: 'Canan_K', avatar: ''}]}, 
    {n:'УКРАЇНСЬКА', c:'ua', code:'uk', count: 3, users: [{name: 'Козак_Сміх', avatar: ''}, {name: 'Оксана_Д', avatar: ''}, {name: 'Дмитро_В', avatar: ''}]}, 
    {n:'中文', c:'cn', code:'zh-CN', count: 6, users: [{name: 'Lee_Shaolin', avatar: ''}, {name: 'Mei_Ling', avatar: ''}, {name: 'Zhang_Wei', avatar: ''}, {name: 'Wang_Fang', avatar: ''}, {name: 'Chen_Qiang', avatar: ''}, {name: 'Li_Jie', avatar: ''}]}, 
    {n:'日本語', c:'jp', code:'ja', count: 4, users: [{name: 'Satoshi_N', avatar: ''}, {name: 'Yuki_Tokyo', avatar: ''}, {name: 'Kenji_K', avatar: ''}, {name: 'Haruka_A', avatar: ''}]}
];

const clubPrefixes = ["Lucky", "Sweet", "Cyber", "Jolly", "Crypto", "Lazy", "Neon", "Grand", "Royal", "Crazy", "Gentle", "Silver", "Iron"];
const clubSuffixes = ["Panda", "Whisky", "Socrates", "Joker", "Tesla", "Tee", "Sherlock", "Pirate", "Hacker", "Baron", "Zeus", "Fox", "Gamer"];

// Функция автоматической регистрации текущего пользователя в базе языка
function registerCurrentUserToActiveLang(activeCode, flagCode, nickname, userImage, storageGetFn) {
    const currentLangCode = activeCode || 'en';
    const currentNick = nickname || storageGetFn('gygy_nickname') || 'Guest';
    const currentAvatar = userImage || storageGetFn('gygy_avatar') || '';

    let langObj = allLangs.find(l => l.code === currentLangCode || l.c === flagCode);
    if (!langObj) langObj = allLangs.find(l => l.code === 'en');

    if (langObj) {
        const existingIndex = langObj.users.findIndex(u => u.name === currentNick);
        if (existingIndex === -1) {
            langObj.users.push({ name: currentNick, avatar: currentAvatar });
            langObj.count = langObj.users.length;
        } else {
            langObj.users[existingIndex].avatar = currentAvatar;
        }
    }
}

// Интеграция с Telegram Web App
function initTelegramIntegration(setNicknameFn, updateUiFn, storageSetFn) {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser) {
            const tgNick = tgUser.username || tgUser.first_name;
            if (tgNick) {
                const cleanNick = tgNick.trim().substring(0, 15);
                setNicknameFn(cleanNick, false);
                updateUiFn(cleanNick);
            }
            if (tgUser.username) {
                storageSetFn('gygy_contact', 'https://t.me/' + tgUser.username);
            }
        }
    }
}
