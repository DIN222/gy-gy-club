/** 
 * GY-GY CORE AGENT v.3.10.0
 * Фикс: Убраны дублирующие двери. 
 */
const Agent = {
    version: "3.10.0",

    init() {
        // Cookie-recognition (v.3.4.0)
        let trace = this.getCookie('gy_trace');
        if (!trace) {
            this.render('welcome_horse'); // Сначала Приветствие с конем
        } else {
            this.render('hall'); // Если узнали — сразу в Холл
        }
    },

    // . СОЗИДАТЕЛЬНЫЕ БЛОКИ
    blocks: {
        // 1. ПРИВЕТСТВИЕ С КОНЕМ (Юморной страж)
        welcome_horse: `
            <div class="loc-block">
                <img src="horse_welcome.png" style="width:200px;">
                <h1>Halt! Who goes there?</h1>
                <p>The GY-GY horse is watching you.</p>
                <button class="gy-btn" onclick="Agent.render('registration')">PROCEED</button>
            </div>`,

        // 2. РЕГИСТРАЦИЯ С 4 КВАДРАТАМИ (4 пути входа)
        registration: `
            <div class="loc-block">
                <h2>Identify Yourself</h2>
                <div class="reg-grid-4">
                    <div class="square" onclick="Agent.setup('cookie')">COOKIE ID</div>
                    <div class="square" onclick="Agent.setup('tg')">TELEGRAM</div>
                    <div class="square" onclick="Agent.setup('key')">MAGIC KEY</div>
                    <div class="square" onclick="Agent.setup('guest')">GUEST</div>
                </div>
            </div>`,

        // 3. ХОЛЛ С АВАТАРОМ И КНОПКАМИ (Сердце Клуба)
        hall: `
            <div class="loc-block">
                <h2>MAIN HALL</h2>
                <div class="nav-cluster">
                    <button class="gy-btn" onclick="Agent.render('bar')">BAR</button>
                    <button class="gy-btn" onclick="Agent.render('server')">SERVER ROOM</button>
                    <button class="gy-btn" onclick="Agent.render('ai_room')">AI ROOM</button>
                </div>
                <button class="qr-btn" onclick="Agent.getMagicKey()">DOWNLOAD QR KEY</button>
            </div>`
    },

    render(loc) {
        // Если переходим в Холл, сначала проигрываем анимацию дверей
        if (loc === 'hall' && document.querySelector('.door-left.open') === null) {
            this.enterAnimate();
        }
        document.getElementById('app-stage').innerHTML = this.blocks[loc] || 'Room under construction';
    },

    enterAnimate() {
        // ВХОД С ДВЕРЯМИ (Звук + Текстура door_1.jpg)
        new Audio('assets/sounds/door_open.mp3').play().catch(() => {});
        document.querySelectorAll('.door').forEach(d => d.classList.add('open'));
    },

    setup(type) {
        // Имитация регистрации и переход к дверям
        alert(`Path selected: ${type}`);
        this.render('hall');
    },

    getCookie(n) { let m = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return m ? decodeURIComponent(m[1]) : undefined; },
    getMagicKey() { alert("QR Key Downloaded."); },
    goBack() { this.render('hall'); }
};

window.onload = () => Agent.init();
