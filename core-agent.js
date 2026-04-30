/**
 * GY-GY CLUB CORE AGENT v.2.8.0
 * Интеллектуальный вход, звук и динамика.
 */

const Agent = {
    version: "2.8.0",
    slogans: [], // Загрузится из langs.json

    async init() {
        console.log(`Гы-гы! Агент v.${this.version} активен.`);
        
        // 1. Распознавание (куки / цифровой след)
        const userTrace = this.getCookie('gy_trace');
        if (userTrace) {
            this.setupResident(userTrace);
        } else {
            this.setupGuest();
        }

        // 2. Запуск сердца (слоганы)
        this.startSlogans();
    },

    async enterClub() {
        // Звуки из твоего репозитория
        try {
            document.getElementById('snd-click').play();
            
            // Открываем двери
            document.querySelector('.door-left').classList.add('open');
            document.querySelector('.door-right').classList.add('open');
            
            setTimeout(() => {
                document.getElementById('snd-door').play();
                document.getElementById('main-stage').classList.remove('content-blur');
                document.getElementById('main-stage').style.pointerEvents = 'auto';
            }, 300);

        } catch (e) {
            console.warn("Звук заблокирован браузером до первого клика.");
        }
    },

    startSlogans() {
        // Пример интеллектуальных слоганов (в идеале тянем из langs.json)
        const list = [
            "Интеллект — это когда гы-гы уместно.",
            "Твой цифровой след ведет к нам.",
            "Синхронный перевод душ запущен.",
            "Вход только для тех, кто понимает иронию кода."
        ];
        
        const update = () => {
            const el = document.getElementById('slogan-text');
            if (el) {
                el.style.opacity = 0;
                setTimeout(() => {
                    el.innerText = list[Math.floor(Math.random() * list.length)];
                    el.style.opacity = 1;
                }, 500);
            }
        };
        update();
        setInterval(update, 10000);
    },

    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    toggleFlags() {
        document.getElementById('flag-dropdown').classList.toggle('hidden');
    }
};

window.onload = () => Agent.init();
