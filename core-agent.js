const Agent = {
    // 1. Идентификация по "цифровому следу"
    init() {
        const trace = this.getCookie('gy_trace');
        if (trace) {
            this.setupResident(trace);
        } else {
            this.setupGuest();
        }
        this.startHeartbeat();
    },

    // 2. Логика входа
    async enterClub() {
        document.getElementById('snd-click').play();
        
        // Анимация дверей
        document.querySelector('.door-left').classList.add('open');
        document.querySelector('.door-right').classList.add('open');
        document.getElementById('snd-door').play();

        // Снимаем блюр с контента
        document.getElementById('main-stage').classList.remove('content-blur');
        
        console.log("Гы-гы! Мы внутри.");
    },

    // 3. Динамические слоганы (Твой интеллектуальный ценз)
    startHeartbeat() {
        const slogans = ["Интеллект — это модно.", "Твой след ведет к нам.", "Гы-гы — это серьезно."]; // Будет из langs.json
        setInterval(() => {
            const box = document.getElementById('slogan-text');
            box.style.opacity = 0;
            setTimeout(() => {
                box.innerText = slogans[Math.floor(Math.random() * slogans.length)];
                box.style.opacity = 1;
            }, 500);
        }, 10000); // Пульс города — раз в 10 сек
    },

    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
};

window.onload = () => Agent.init();
