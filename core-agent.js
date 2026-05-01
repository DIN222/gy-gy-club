/** 
 * . CORE AGENT v.4.8.8
 * Использование маркеров блокировки для отлаженных конструкций.
 * Реализация Cookie-recognition и Magic Key.
 */

const Agent = {
    loc: 'entrance',
    user: {
        id: localStorage.getItem('gy_trace') || null,
        avatar: localStorage.getItem('gy_avatar') || null
    },

    // . СОЗИДАТЕЛЬНЫЕ БЛОКИ
    blocks: {
        entrance: `
            <div id="block-entrance">
                <img src="door_1.jpg" id="main-door" class="img-door" onclick="Agent.handleEntry()">
            </div>`,

        welcome: `
            <div id="block-welcome" style="display:flex; flex-direction:column; align-items:center;">
                <div class="quote">«В каждой шутке есть доля виски»</div>
                <img src="horse_welcome.png" class="img-horse">
                <div style="display:flex; gap:10px;">
                    <button class="btn-gy" onclick="Agent.render('identity')">ПОЛУЧИТЬ ID</button>
                    <button id="hall-btn" class="btn-gy" onclick="Agent.enterHall()">В ХОЛЛ</button>
                </div>
            </div>`,

        identity: `
            <div id="block-identity" style="display:flex; flex-direction:column; align-items:center;">
                <div class="quote" style="font-size:18px;">ИДЕНТИФИКАЦИЯ</div>
                <div class="id-grid">
                    <div class="box-slot" id="s-trace"><b>ID</b><br><span id="val-id">WAIT</span></div>
                    <div class="box-slot" id="s-qr"><b>MAGIC</b><br>QR</div>
                    <div class="box-slot" id="s-av" onclick="Agent.genAvatar()" style="cursor:pointer;"><b>AVATAR</b><br>GEN</div>
                    <div class="box-slot" id="s-tg" onclick="Agent.linkTG()" style="cursor:pointer;"><b>STABLE</b><br>TELEGRAM</div>
                </div>
                <button class="btn-gy" style="margin-top:20px; width:100%;" onclick="Agent.saveProfile()">СОХРАНИТЬ И ЗАПЕРЕТЬ</button>
            </div>`
    },

    render(target) {
        this.loc = target;
        const stage = document.getElementById('app-stage');
        stage.style.opacity = 0;
        
        setTimeout(() => {
            stage.innerHTML = this.blocks[target];
            stage.style.opacity = 1;
            this.syncUI();
            if(target === 'identity') this.initIdentity();
        }, 350);
    },

    // . COOKIE-RECOGNITION И АВТО-ВХОД
    handleEntry() {
        const door = document.getElementById('main-door');
        door.style.transform = "scale(4)";
        door.style.opacity = "0";

        if (!this.user.id) {
            this.user.id = 'GY-' + Math.floor(100 + Math.random() * 899) + '-' + Date.now().toString().slice(-4);
            localStorage.setItem('gy_trace', this.user.id);
        }
        
        setTimeout(() => this.render('welcome'), 1200);
    },

    initIdentity() {
        document.getElementById('val-id').innerText = this.user.id;
        if(this.user.avatar) {
            document.getElementById('s-av').innerHTML = `<img src="${this.user.avatar}">`;
        }
        // Генерация QR-кода как Magic Key
        new QRCode(document.getElementById("s-qr"), { text: this.user.id, width: 95, height: 95 });
    },

    genAvatar() {
        const seed = Math.random();
        this.user.avatar = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}`;
        document.getElementById('s-av').innerHTML = `<img src="${this.user.avatar}">`;
    },

    saveProfile() {
        localStorage.setItem('gy_avatar', this.user.avatar);
        this.render('welcome');
    },

    syncUI() {
        // Управление кнопкой возврата
        const back = document.getElementById('nav-back');
        back.style.visibility = (this.loc === 'entrance') ? 'hidden' : 'visible';
        
        // Управление доступом в Холл
        const hBtn = document.getElementById('hall-btn');
        if(hBtn && !this.user.avatar) hBtn.classList.add('btn-sleep');
    },

    toggleLang() { document.getElementById('lang-list').classList.toggle('active'); },
    setLang(l) { this.toggleLang(); alert('Language: ' + l); },
    goBack() { this.render('welcome'); },
    enterHall() { if(this.user.avatar) alert('ID: ' + this.user.id + ' \nВход разрешен!'); },
    linkTG() { alert('Stability Mode: Telegram Linking...'); }
};

// . СТАРТ МОНОЛИТА
window.onload = () => Agent.render('entrance');
