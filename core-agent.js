/** 
 * . CORE AGENT v.5.2.2
 * MARKER: STRICT ADHERENCE TO ENGLISH BY DEFAULT.
 */
const Agent = {
    loc: 'entrance',
    user: {
        id: localStorage.getItem('gy_trace') || null,
        avatar: localStorage.getItem('gy_avatar') || null
    },

    blocks: {
        entrance: `
            <div class="scene">
                <img src="door_1.jpg" class="img-main" onclick="Agent.doorProtocol()">
            </div>`,

        hall: `
            <div class="scene">
                <div class="slogan">THE HALL</div>
                <div style="position:relative;">
                    <button class="btn-gy" onclick="UI.toggle('menu-go')">PROCEED ↓</button>
                    <div id="menu-go" class="drop-nav">
                        <button class="btn-gy btn-menu" onclick="Agent.transit('bar')">TO THE BAR 🥃</button>
                        <button class="btn-gy btn-menu" style="opacity:0.2">TO THE ATELIER (PLANNING)</button>
                    </div>
                </div>
            </div>`,

        bar: `
            <div class="scene">
                <div class="slogan">"THE HORSE IS A BARTENDER TOO, IF YOU DRINK ENOUGH"</div>
                <img src="horse_bartender.png" class="img-main">
                <div style="display:flex; gap:15px;">
                    <button class="btn-gy" onclick="Agent.transit('tables')">← TO TABLES</button>
                    <button class="btn-gy" onclick="Agent.transit('server')">TO AI ROOM →</button>
                </div>
            </div>`,

        tables: `
            <div class="scene">
                <img src="tables_map.jpg" style="max-width:85vw; border:1px solid var(--gold);">
                <div style="margin-top:10px;">[HEARING THE HORSE POURING A DRINK]</div>
                <button class="btn-gy" style="margin-top:20px;" onclick="Agent.transit('bar')">BACK TO BAR</button>
            </div>`,

        server: `
            <div class="scene">
                <div class="slogan">SERVER ROOM... FANS WHIRRING</div>
                <button class="btn-gy" onclick="Agent.transit('ai_room')">ENTER AI ROOM</button>
            </div>`
    },

    doorProtocol() {
        // . IDENTITY TRACE (COOKIE RECOGNITION)
        if (!this.user.id) {
            this.user.id = 'GY-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            localStorage.setItem('gy_trace', this.user.id);
            this.user.avatar = 'AV-' + Math.floor(Math.random() * 99);
            localStorage.setItem('gy_avatar', this.user.avatar);
        }
        this.transit('hall');
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = "0"; // Scene fades

        setTimeout(() => {
            this.loc = target;
            stage.innerHTML = this.blocks[target];
            stage.style.opacity = "1"; // Scene manifests
            this.audioEngine(target);
            UI.sync();
        }, 1200);
    },

    audioEngine(loc) {
        const bar = document.getElementById('snd-bar');
        const srv = document.getElementById('snd-server');
        const fx = document.getElementById('snd-fx');
        
        [bar, srv].forEach(s => { s.pause(); s.currentTime = 0; });

        if (loc === 'bar' || loc === 'tables') bar.play();
        if (loc === 'server') srv.play();
        if (loc === 'tables') setTimeout(() => fx.play(), 1500);
    },

    goBack() { this.transit('hall'); }
};

const UI = {
    toggle(id) { document.getElementById(id).classList.toggle('open'); },
    sync() {
        document.getElementById('btn-back').style.visibility = (Agent.loc === 'entrance') ? 'hidden' : 'visible';
    },
    setLang(l) { 
        this.toggle('lang-list'); 
        alert('Language switched to ' + l + '. But we stay GY-GY.'); 
    }
};

window.onload = () => Agent.transit('entrance');
