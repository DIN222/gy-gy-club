const Agent = {
    version: "2.8.4",
    // Список флагов для выбора
    languages: ['en', 'ru', 'fr', 'de', 'es', 'it', 'cn', 'jp', 'kr', 'pt', 'tr', 'ua'],
    
    init() {
        console.log(`GY-GY Agent v.${this.version} заступил на смену.`);
        this.renderFlags();
        this.startSlogans();
    },

    renderFlags() {
        const grid = document.getElementById('flag-dropdown');
        this.languages.forEach(lang => {
            const img = document.createElement('img');
            img.src = `flags/${lang}.png`;
            img.className = 'flag-item';
            img.onclick = () => this.selectLanguage(lang);
            grid.appendChild(img);
        });
    },

    selectLanguage(lang) {
        document.getElementById('user-flag').src = `flags/${lang}.png`;
        this.toggleFlags();
        console.log(`Язык изменен на: ${lang}`);
    },

    toggleFlags() {
        document.getElementById('flag-dropdown').classList.toggle('hidden');
    },

    enterClub() {
        try { document.getElementById('snd-click').play(); } catch(e){}
        
        document.querySelector('.door-left').classList.add('open');
        document.querySelector('.door-right').classList.add('open');
        
        setTimeout(() => {
            try { document.getElementById('snd-door').play(); } catch(e){}
            document.getElementById('welcome-content').classList.add('hidden');
        }, 300);
    },

    startSlogans() {
        // Остроумные и креативные слоганы (без пошлости)
        const list = [
            "Интеллект — это когда гы-гы уместно.",
            "Твой цифровой след ведет к успеху.",
            "Синхронный перевод душ запущен.",
            "Вход только для тех, кто понимает иронию кода.",
            "Здесь реальность исправляется юмором."
        ];
        
        const update = () => {
            const el = document.getElementById('slogan-text');
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerText = list[Math.floor(Math.random() * list.length)];
                el.style.opacity = 1;
            }, 500);
        };
        update();
        setInterval(update, 8000); // Динамика каждые 8 секунд
    }
};

window.onload = () => Agent.init();
