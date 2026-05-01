/** 
 * . CORE AGENT v.4.7.1 - ТВОЯ ЛОГИКА
 */
const Agent = {
    // . БЛОКИ ИЗ ТВОЕЙ ПОЯСНИТЕЛЬНОЙ ЗАПИСКИ
    blocks: {
        // Приветствие с конем
        welcome: `
            <div id="block-welcome" class="block active">
                <div class="quote-text" data-key="q_whiskey">«В каждой шутке есть доля виски»</div>
                <img src="horse_welcome.png" class="horse-main">
                <button id="btn-w-hall" class="btn-gy btn-sleep" onclick="Agent.portalTransition('hall')">ПРОХОДИТЕ В ХОЛЛ</button>
                <button class="btn-gy" onclick="Agent.portalTransition('identity')">ПОЛУЧИТЬ ID</button>
            </div>`,

        // Регистрация с 4 квадратами
        identity: `
            <div id="block-identity" class="block active">
                <div class="quote-text">«Шампанского много не бывает»</div>
                <div class="reg-grid-4">
                    <div class="box-final" id="id-label">#ID</div>
                    <div class="box-final" id="qr-box-reg"></div>
                    <div class="box-final" onclick="Agent.triggerPhoto()">ФОТО</div>
                    <div class="box-final" onclick="Agent.genAvatar()">AVATAR</div>
                </div>
                <button id="btn-save" class="btn-gy" onclick="Agent.save()">СОХРАНИТЬ</button>
                <button id="btn-pass" class="btn-gy btn-sleep" onclick="Agent.portalTransition('hall')">ПРОЙТИ В ХОЛЛ</button>
            </div>`,

        // Холл с аватаром
        hall: `
            <div id="block-hall" class="block active">
                <div class="id-card-hall">
                    <div id="h-id">#ID</div>
                    <div class="box-final"><img id="h-photo"></div>
                    <button class="btn-gy" onclick="Agent.portalTransition('bar')">ВХОД В БАР</button>
                </div>
                <button class="gy-back-btn" onclick="Agent.portalTransition('welcome')">← НАЗАД</button>
            </div>`
    },

    handleDoor() {
        document.getElementById('snd-door').play();
        document.getElementById('main-door').style.transform = "scale(5)"; 
        document.getElementById('main-door').style.opacity = "0";
        
        // Автоматический ID через скрытый след
        if(!localStorage.getItem('gy_trace')) {
            const id = `#GY-${Math.floor(Math.random()*999)}`;
            localStorage.setItem('gy_trace', id);
        }
        
        setTimeout(() => this.portalTransition('welcome'), 1800);
    },

    portalTransition(next) {
        document.getElementById('app-stage').innerHTML = this.blocks[next];
    }
};
