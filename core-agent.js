/** 
 * . CORE AGENT v.4.7.2 
 * Реализация: Блочная структура + Автоматический ID + Magic Key
 */
const Agent = {
    state: {
        loc: 'entrance',
        id: localStorage.getItem('gy_trace') || null,
        avatar: localStorage.getItem('gy_avatar') || null
    },

    // . ОПРЕДЕЛЕНИЕ БЛОКОВ
    blocks: {
        entrance: `
            <div class="block-wrap">
                <img src="door_1.jpg" id="main-door" class="visual-small-door" onclick="Agent.openDoors()">
            </div>`,

        welcome: `
            <div class="block-wrap">
                <div class="humor-quote">«В каждой шутке есть доля виски»</div>
                <img src="horse_welcome.png" class="visual-small-horse">
                <div class="btn-group">
                    <button class="btn-gy" onclick="Agent.render('identity')">ID & STABILITY</button>
                    <button id="btn-hall-access" class="btn-gy" onclick="Agent.render('hall')">HALL</button>
                </div>
            </div>`,

        identity: `
            <div class="block-wrap">
                <div class="identity-grid">
                    <div class="box-slot" id="slot-id"><b>ID</b><br><span id="val-id">...</span></div>
                    <div class="box-slot" id="slot-qr"><b>QR</b><br>KEY</div>
                    <div class="box-slot" id="slot-avatar" onclick="Agent.genAvatar()"><b>AVATAR</b><br>GEN</div>
                    <div class="box-slot" id="slot-tg" onclick="Agent.linkTG()"><b>STABLE</b><br>TELEGRAM</div>
                </div>
                <button class="btn-gy" onclick="Agent.saveProfile()">SAVE & LOCK</button>
            </div>`,

        hall: `
            <div class="block-wrap">
                <div class="id-card-final">
                    <div id="display-avatar"></div>
                    <div id="display-id"></div>
                    <button class="btn-gy" onclick="alert('Entering Bar...')">ENTER BAR</button>
                </div>
            </div>`
    },

    init() {
        this.render('entrance');
        this.checkIdentity();
    },

    render(loc) {
        this.state.loc = loc;
        const stage = document.getElementById('app-stage');
        stage.innerHTML = this.blocks[loc];
        
        // Управление кнопкой возврата
        document.getElementById('global-back').style.display = (loc === 'entrance') ? 'none' : 'block';
        
        if(loc === 'identity') this.updateIdentityUI();
        if(loc === 'welcome' && !this.state.id) document.getElementById('btn-hall-access').classList.add('btn-sleep');
    },

    openDoors() {
        const door = document.getElementById('main-door');
        door.style.transform = "scale(3)";
        door.style.opacity = "0";
        
        // Автоматическое присвоение ID при первом входе
        if(!this.state.id) {
            this.state.id = `GY-${Math.floor(1000 + Math.random() * 9000)}`;
            localStorage.setItem('gy_trace', this.state.id);
        }
        
        setTimeout(() => this.render('welcome'), 1200);
    },

    genAvatar() {
        const icons = ['🥃', '🐎', '🎭', '🗝️'];
        this.state.avatar = icons[Math.floor(Math.random() * icons.length)];
        document.getElementById('slot-avatar').innerHTML = `<b>AVATAR</b><br>${this.state.avatar}`;
    },

    saveProfile() {
        localStorage.setItem('gy_avatar', this.state.avatar);
        this.render('welcome');
    },

    goBack() {
        if(this.state.loc === 'welcome') this.render('entrance');
        else if(this.state.loc === 'identity') this.render('welcome');
        else if(this.state.loc === 'hall') this.render('welcome');
    }
};

window.onload = () => Agent.init();
