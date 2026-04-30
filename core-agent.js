const Agent = {
    init() {
        console.log("GY-GY Agent v.2.8.2 ready.");
        document.getElementById('slogan-text').innerText = "Click ENTER to proceed";
    },

    enterClub() {
        console.log("Opening Doors...");
        // Звук
        try { document.getElementById('snd-click').play(); } catch(e) {}
        
        // Анимация
        document.querySelector('.door-left').classList.add('open');
        document.querySelector('.door-right').classList.add('open');
        
        // Звук дверей
        setTimeout(() => {
            try { document.getElementById('snd-door').play(); } catch(e) {}
            document.getElementById('gate-control').style.display = 'none'; // Убираем кнопку
        }, 300);
    }
};

window.onload = () => Agent.init();
