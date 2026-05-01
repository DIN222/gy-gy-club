/** 
 * . CORE AGENT v.5.1.5 | MONOLITH BUILD
 * - Маркер запрета деструктивного редактирования.
 */
const Agent = {
    state: { loc: 'entrance', user: localStorage.getItem('gy_trace') || null },

    blocks: {
        entrance: `
            <div id="b-entrance">
                <img src="door_1.jpg" style="max-height:40vh; cursor:pointer;" onclick="Agent.handleDoor()">
            </div>`,

        hall: `
            <div class="scene">
                <div class="slogan">ВЫ В ХОЛЛЕ</div>
                <div class="dropdown">
                    <button class="btn-gy" onclick="Agent.toggleLang('lang-list')">ПРОЙТИ ↓</button>
                    <div id="nav-drop" class="dropdown-content active" style="position:static; display:flex; flex-direction:column;">
                        <button class="btn-gy" onclick="Agent.transit('bar')">В БАР 🥃</button>
                        <button class="btn-gy btn-sleep" style="opacity:0.3">В АТЕЛЬЕ (В ПРОЕКТЕ)</button>
                    </div>
                </div>
            </div>`,

        bar: `
            <div class="scene">
                <div class="slogan">«КОНЬ — ТОЖЕ БАРМЕН, ЕСЛИ ВЫПИТЬ ДОСТАТОЧНО»</div>
                <img src="horse_bartender.png" class="img-horse">
                <div style="display:flex; gap:20px;">
                    <button class="btn-gy" onclick="Agent.transit('tables')">← ЗА СТОЛИКИ</button>
                    <button class="btn-gy" onclick="Agent.transit('server')">В AI ROOM →</button>
                </div>
            </div>`,

        tables: `
            <div class="scene">
                <img src="tables_layout.jpg" style="max-width:80vw; border:1px solid var(--gold);">
                <div class="mic-icon">🎤</div>
                <button class="btn-gy" style="margin-top:20px;" onclick="Agent.transit('bar')">К СТОЙКЕ</button>
            </div>`,

        server: `
            <div class="scene">
                <div class="slogan">СЕРВЕРНАЯ... [ШУМ ОХЛАЖДЕНИЯ]</div>
                <button class="btn-gy" onclick="Agent.transit('ai_room')">В AI ROOM</button>
            </div>`
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = "0"; // Холл тает

        setTimeout(() => {
            this.state.loc = target;
            stage.innerHTML = this.blocks[target];
            stage.style.opacity = "1"; // Бар проявляется
            this.handleAudio(target);
            this.syncUI();
        }, 800);
    },

    handleDoor() {
        // - Cookie-recognition для авто-входа
        if(!this.state.user) {
            this.state.user = 'ID-' + Math.random().toString(36).substr(2, 5).toUpperCase();
            localStorage.setItem('gy_trace', this.state.user);
        }
        this.transit('hall');
    },

    handleAudio(loc) {
        const barSnd = document.getElementById('snd-bar-ambient');
        const srvSnd = document.getElementById('snd-server');
        
        barSnd.pause(); srvSnd.pause();

        if(loc === 'bar' || loc === 'tables') barSnd.play();
        if(loc === 'server') srvSnd.play();
        
        if(loc === 'tables') {
            console.log("FX: Покашливание коня, звук наливания...");
            // Тут вызываем Agent.playFX('pour_whiskey');
        }
    },

    syncUI() {
        document.getElementById('nav-back').style.visibility = 
            (this.state.loc === 'entrance') ? 'hidden' : 'visible';
    },

    toggleLang(id) { document.getElementById(id || 'nav-drop').classList.toggle('active'); },
    goBack() { this.transit('hall'); }
};

window.onload = () => Agent.transit('entrance');
