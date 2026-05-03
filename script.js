const Agent = {
    user: JSON.parse(localStorage.getItem('gy_trace')) || null,

    // Переход в Зону приветствия после клика на дверь
    initEntry() {
        this.transit('welcome');
    },

    // Логика генерации ID (отдельный этап)
    initIdentity() {
        this.transit('generating');
        
        setTimeout(() => {
            if (!this.user) {
                // Стандарт: Порядковый номер + 4 цифры
                const serial = 1; 
                const rand = Math.floor(1000 + Math.random() * 9000);
                this.user = {
                    numCode: `${serial}-${rand}`,
                    avatar: 'STALLION',
                    flag: '🏴‍☠️',
                    magicKey: 'QR_AVATAR_DATA'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user));
            }
            this.transit('hall');
        }, 2000); // Имитация процесса сканирования
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = '0'; // Затухание
        
        setTimeout(() => {
            const content = typeof Scenes[target] === 'function' 
                ? Scenes[target](this.user) 
                : Scenes[target];
            
            stage.innerHTML = content;
            stage.style.opacity = '1'; // Проявление
            this.syncUI(target);
        }, 1200); // Плавный переход 1.2 сек
    },

    syncUI(loc) {
        // Кнопка Назад обязательна везде, кроме Входа и Генерации
        const backBtn = document.getElementById('btn-back');
        const hideOn = ['entrance', 'welcome', 'generating'];
        backBtn.style.display = hideOn.includes(loc) ? 'none' : 'block';
    },

    goBack() { this.transit('hall'); }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        el.style.display = (el.style.display === 'flex') ? 'none' : 'flex';
    },
    setLang(l) { 
        console.log('Language changed to:', l); 
        this.toggle('lang-list'); 
    }
};

window.onload = () => Agent.transit('entrance');
