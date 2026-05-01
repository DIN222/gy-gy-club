/** 
 * . GY-GY CORE AGENT v.4.7.0
 * Реализация блочной структуры по схеме Пояснительной Записки.
 */
const Agent = {
    currentLoc: 'entrance',
    
    // . СОЗИДАТЕЛЬНЫЕ БЛОКИ (Шаблоны)
    blocks: {
        // Вход: Двери
        entrance: `
            <div id="block-entrance" class="block active">
                <img src="door_1.jpg" id="main-door" onclick="Agent.handleDoor()">
            </div>`,

        // Приветствие: Конь
        welcome: `
            <div id="block-welcome" class="block active">
                <div class="quote-text">«В каждой шутке есть доля виски»</div>
                <img src="horse_welcome.png" class="horse-img">
                <button id="btn-w-hall" class="btn-gy btn-sleep" onclick="Agent.render('hall')">ПРОХОДИТЕ В ХОЛЛ</button>
                <button class="btn-gy" onclick="Agent.render('identity')">ПОЛУЧИТЬ ID</button>
            </div>`,

        // Регистрация: 4 Квадрата (ID, QR, Photo, Avatar)
        identity: `
            <div id="block-identity" class="block active">
                <div class="reg-grid">
                    <div class="box-final" id="id-label">#ID</div>
                    <div class="box-final" id="qr-box-reg"></div>
                    <div class="box-final" onclick="document.getElementById('file-input').click()">
                        <input type="file" id="file-input" onchange="Agent.preview(this)" hidden>
                        <span id="txt-photo">ФОТО</span>
                    </div>
                    <div class="box-final" onclick="Agent.genAvatar()">GEN AVATAR</div>
                </div>
                <button id="btn-save" class="btn-gy" onclick="Agent.saveProfile()">СОХРАНИТЬ</button>
            </div>`,

        // Холл: Финальная карточка
        hall: `
            <div id="block-hall" class="block active">
                <div class="id-card-hall">
                    <div id="h-id">#ID</div>
                    <div class="h-photo-wrap"><img id="h-photo"></div>
                    <button class="btn-gy" onclick="Agent.render('bar')">ВХОД В БАР</button>
                </div>
            </div>`
    },

    render(loc) {
        this.currentLoc = loc;
        const stage = document.getElementById('app-stage');
        stage.style.opacity = 0; // Плавный переход
        
        setTimeout(() => {
            stage.innerHTML = this.blocks[loc];
            stage.style.opacity = 1;
            if(loc === 'identity') this.updateIDUI();
            this.toggleBackButton(loc);
        }, 300);
    },

    handleDoor() {
        // Логика автоматического присвоения ID при первом входе
        if(!localStorage.getItem('gy_trace')) {
            const newID = `#GY-${Math.floor(100+Math.random()*899)}`;
            localStorage.setItem('gy_trace', newID);
        }
        this.render('welcome');
    },

    toggleBackButton(loc) {
        const btn = document.getElementById('global-back');
        btn.style.display = (loc === 'entrance') ? 'none' : 'block';
    }
};

window.onload = () => Agent.render('entrance');
