/** 
 * . CORE AGENT v.4.8.0 
 * Применение блочной структуры по последней пояснительной записке.
 */
const Agent = {
    current: 'entrance',
    user: {
        id: localStorage.getItem('gy_trace') || null,
        avatar: localStorage.getItem('gy_avatar') || null
    },

    // . ОПРЕДЕЛЕНИЕ БЛОКОВ
    blocks: {
        entrance: `
            <div id="b-entrance">
                <img src="door_1.jpg" class="visual-door" onclick="Agent.openDoors()">
            </div>`,

        welcome: `
            <div id="b-welcome" style="text-align:center;">
                <div style="font-size:1.2rem; margin-bottom:20px;">«В каждой шутке есть доля виски»</div>
                <img src="horse_welcome.png" class="visual-horse">
                <div>
                    <button class="btn-gy" onclick="Agent.render('identity')">ID & STABILITY</button>
                    <button id="hall-link" class="btn-gy">HALL</button>
                </div>
            </div>`,

        identity: `
            <div id="b-identity" style="text-align:center;">
                <div class="identity-grid">
                    <div class="slot" id="s-id">ID<br>TRACED</div>
                    <div class="slot" id="s-qr">MAGIC<br>KEY</div>
                    <div class="slot" id="s-av" onclick="Agent.assignAvatar()">GEN<br>AVATAR</div>
                    <div class="slot" id="s-tg">TG<br>STABLE</div>
                </div>
                <button class="btn-gy" onclick="Agent.saveAndProceed()">SAVE & LOCK</button>
            </div>`
    },

    render(loc) {
        this.current = loc;
        const stage = document.getElementById('app-stage');
        stage.style.opacity = 0;
        
        setTimeout(() => {
            stage.innerHTML = this.blocks[loc];
            stage.style.opacity = 1;
            this.syncUI();
        }, 400);
    },

    openDoors() {
        // . Cookie-recognition & ID Assignment
        if (!this.user.id) {
            this.user.id = 'GY-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            localStorage.setItem('gy_trace', this.user.id);
        }
        this.render('welcome');
    },

    assignAvatar() {
        const avs = ['🥃', '🐎', '🎭', '🗝️'];
        this.user.avatar = avs[Math.floor(Math.random() * avs.length)];
        document.getElementById('s-av').innerHTML = `AVATAR<br>${this.user.avatar}`;
    },

    saveAndProceed() {
        localStorage.setItem('gy_avatar', this.user.avatar);
        this.render('welcome');
    },

    syncUI() {
        const backBtn = document.getElementById('global-back');
        backBtn.style.visibility = (this.current === 'entrance') ? 'hidden' : 'visible';
        
        const hallBtn = document.getElementById('hall-link');
        if (hallBtn) {
            if (!this.user.avatar) hallBtn.classList.add('btn-sleep');
            else hallBtn.onclick = () => alert('Welcome to the Hall, ' + this.user.id);
        }
    },

    toggleLang() { document.getElementById('lang-list').classList.toggle('open'); },
    setLang(l) { alert('Lang set to: ' + l); this.toggleLang(); },
    goBack() { if(this.current === 'welcome') this.render('entrance'); else this.render('welcome'); }
};

// . СТАРТ
window.onload = () => Agent.render('entrance');
