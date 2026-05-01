/** 
 * GY-GY CORE AGENT v.3.4.0 
 */
const Agent = {
    version: "3.4.0",

    init() {
        // Cookie-recognition
        let trace = this.getCookie('gy_trace');
        if (!trace) {
            trace = this.createTrace(); // Скрытый ID
        }
        this.render('entrance');
    },

    createTrace() {
        const id = 'GY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        document.cookie = `gy_trace=${id}; max-age=31536000; path=/`;
        // Автоматический ник и аватар
        localStorage.setItem('gy_nick', "Member-" + id.substr(3, 3));
        return id;
    },

    enterClub() {
        document.querySelectorAll('.door').forEach(d => d.classList.add('open'));
        setTimeout(() => this.render('hall'), 600);
    },

    // . БЛОКИ ЛОКАЦИЙ (v.3.4.0) - Отсутствие маркера позволяет редактирование
    blocks: {
        entrance: `
            <div class="loc-block">
                <h1>GY-GY CLUB</h1>
                <button class="gy-btn" onclick="Agent.enterClub()">OPEN GATES</button>
                <button class="gy-btn" onclick="Agent.tgAuth()">TELEGRAM ENTRY</button> <!-- -->
            </div>`,
        hall: `
            <div class="loc-block">
                <h2>MAIN HALL</h2>
                <div class="nav-grid">
                    <button class="gy-btn" onclick="Agent.render('bar')">BAR (TABLES)</button>
                    <button class="gy-btn" onclick="Agent.render('server')">SERVER ROOM</button>
                    <button class="gy-btn" onclick="Agent.render('ai_room')">AI ROOM</button>
                </div>
                <button class="key-btn" onclick="Agent.downloadKey()">DOWNLOAD MAGIC KEY</button> <!-- -->
            </div>`,
        bar: `<div><h1>SINGULARITY BAR</h1><p>Tables are humming with humor.</p></div>`,
        server: `<div><h1>SERVER ROOM</h1><p>Nodes connected.</p></div>`,
        ai_room: `<div><h1>AI ROOM</h1><p>Deep Research Active.</p></div>`
    },

    render(loc) {
        document.getElementById('app-stage').innerHTML = this.blocks[loc];
    },

    downloadKey() { alert("Magic Key (QR) for continuity"); },
    getCookie(name) { 
        let m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return m ? decodeURIComponent(m[1]) : undefined;
    }
};

window.onload = () => Agent.init();
