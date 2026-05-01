/** 
 * GY-GY CORE AGENT v.3.4.0+
 * Реализация навигации по Пояснительной записке.
 */
const Agent = {
    version: "3.9.0",

    init() {
        // Идентификация через Cookie-recognition
        let trace = this.getCookie('gy_trace');
        if (!trace) {
            this.render('welcome_horse'); // Если новый — к коню
        } else {
            this.render('entrance'); // Если свой — к дверям
        }
    },

    // . МЕХАНИКА ПРОДВИЖЕНИЯ ПО ЛОКАЦИЯМ
    blocks: {
        // БЛОК: ПРИВЕТСТВИЕ С КОНЕМ (Юмор и первый контакт)
        welcome_horse: `
            <div class="loc-block">
                <img src="horse_welcome.png" alt="Welcome Horse">
                <h1>Halt! Who goes there?</h1>
                <p>Welcome to GY-GY. The horse deems you worthy.</p>
                <button class="gy-btn" onclick="Agent.render('registration')">PROCEED</button>
            </div>`,

        // БЛОК: РЕГИСТРАЦИЯ С 4 КВАДРАТАМИ
        // Выбор пути: Cookie, Telegram, Magic Key или Guest ID
        registration: `
            <div class="loc-block">
                <h2>Choose Your Path</h2>
                <div class="reg-grid-4">
                    <div class="reg-square" onclick="Agent.setup('cookie')">COOKIE TRACE</div>
                    <div class="reg-square" onclick="Agent.setup('tg')">TELEGRAM</div>
                    <div class="reg-square" onclick="Agent.setup('key')">MAGIC KEY</div>
                    <div class="reg-square" onclick="Agent.setup('guest')">GUEST ID</div>
                </div>
            </div>`,

        // БЛОК: ВХОД С ДВЕРЯМИ (Кнопка открытия)
        entrance: `
            <div class="loc-block">
                <h1>The Gates of GY-GY</h1>
                <button class="gy-btn" onclick="Agent.enterClub()">OPEN DOORS</button>
            </div>`,

        // БЛОК: ХОЛЛ С АВАТАРОМ И КНОПКАМИ
        // Центральный хаб с переходом в Бар, Серверную и AI Room
        hall: `
            <div class="loc-block">
                <h2>Main Hall</h2>
                <div class="user-status">Logged in as: <span id="nick">...</span></div>
                <div class="nav-buttons">
                    <button class="gy-btn" onclick="Agent.render('bar')">SINGULARITY BAR</button>
                    <button class="gy-btn" onclick="Agent.render('server')">SERVER ROOM</button>
                    <button class="gy-btn" onclick="Agent.render('ai_room')">AI ROOM</button>
                </div>
                <button class="magic-key-btn" onclick="Agent.getMagicKey()">GET QR KEY</button>
            </div>`
    },

    enterClub() {
        // Синхронизация звука и анимации дверей
        new Audio('assets/sounds/door_open.mp3').play().catch(() => {});
        document.querySelectorAll('.door').forEach(d => d.classList.add('open'));
        setTimeout(() => this.render('hall'), 1200);
    },

    render(loc) {
        document.getElementById('app-stage').innerHTML = this.blocks[loc];
    },

    getCookie(n) { /* Логика куки */ },
    getMagicKey() { alert("Magic Key (QR) generated"); }
};

window.onload = () => Agent.init();
