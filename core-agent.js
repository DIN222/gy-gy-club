/**
 * GY-GY CLUB CORE AGENT
 * @version 2.8.0
 * @property {string} mode - Deep Research & Digital City
 * @property {string} humor_level - Permanent Attribute
 */

const Agent = {
    version: "2.8.0",
    
    init() {
        console.log(`Гы-гы! Агент v.${this.version} заступил на смену.`);
        const trace = this.getCookie('gy_trace');
        
        // Автоматическое назначение аватара и ника
        if (trace) {
            this.setupResident(trace);
        } else {
            this.setupGuest();
        }
        this.startHeartbeat();
    },

    async enterClub() {
        try {
            document.getElementById('snd-click').play();
            
            // Запуск анимации открытия дверей из репозитория
            const doors = document.querySelectorAll('.door');
            doors.forEach(d => d.classList.add('open'));
            
            document.getElementById('snd-door').play();
            document.getElementById('main-stage').classList.remove('content-blur');
            
            // Логирование входа для статистики города
            this.logEntry();
        } catch (e) {
            console.error("Произошло разрушение конструкции в v.2.8.0: ", e);
        }
    },

    // Интеллектуальный ротатор слоганов (без пошлости)
    startHeartbeat() {
        const slogans = [
            "Интеллект — это когда гы-гы уместно.",
            "Твой цифровой след пахнет успехом.",
            "Синхронный перевод душ запущен.",
            "Вход только для тех, кто понимает иронию кода."
        ];
        
        const updateSlogan = () => {
            const box = document.getElementById('slogan-text');
            if(box) {
                box.style.opacity = 0;
                setTimeout(() => {
                    box.innerText = slogans[Math.floor(Math.random() * slogans.length)];
                    box.style.opacity = 1;
                }, 500);
            }
        };

        updateSlogan();
        setInterval(updateSlogan, 12000); 
    },

    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
};

window.onload = () => Agent.init();
