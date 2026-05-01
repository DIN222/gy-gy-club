const Agent = {
    version: "2.8.3",

    init() {
        console.log(`GY-GY Agent v.${this.version} заступил на смену.`);
        this.updateSlogan();
    },

    enterClub() {
        // Звук и анимация открытия
        try { document.getElementById('snd-click').play(); } catch(e){}
        
        document.querySelector('.door-left').classList.add('open');
        document.querySelector('.door-right').classList.add('open');
        
        setTimeout(() => {
            try { document.getElementById('snd-door').play(); } catch(e){}
            document.getElementById('welcome-content').style.opacity = '0';
        }, 300);
    },

    toggleFlags() {
        document.getElementById('flag-dropdown').classList.toggle('hidden');
    },

    updateSlogan() {
        const slogans = [
            "Интеллект — это когда гы-гы уместно.",
            "Синхронный перевод душ запущен.",
            "Твой цифровой след ведет к успеху."
        ];
        document.getElementById('slogan-text').innerText = slogans[Math.floor(Math.random() * slogans.length)];
    }
};

window.onload = () => Agent.init();
