/** 
 * GY-GY CORE AGENT v.2.8.1 
 * Фикс "Черного экрана"
 */
const Agent = {
    init() {
        console.log("Гы-гы! Пробуждение системы...");
        
        // Если через 2 секунды двери всё еще закрыты — пробуем открыть принудительно
        setTimeout(() => {
            const slogan = document.getElementById('slogan-text');
            if (slogan && slogan.innerText === "...") {
                slogan.innerText = "Система готова к гы-гыканью";
            }
        }, 1000);

        // Наполняем кнопку текстом, если langs.json не ответил
        const btn = document.getElementById('enter-btn');
        if (btn) btn.innerText = "ENTER CLUB";
    },

    enterClub() {
        console.log("Открываем двери...");
        try {
            document.getElementById('snd-click').play();
        } catch(e) {}

        const dLeft = document.querySelector('.door-left');
        const dRight = document.querySelector('.door-right');
        
        if (dLeft && dRight) {
            dLeft.classList.add('open');
            dRight.classList.add('open');
            
            try {
                setTimeout(() => document.getElementById('snd-door').play(), 200);
            } catch(e) {}
        }
        
        document.getElementById('main-stage').style.filter = "none";
    }
};

window.onload = () => Agent.init();
