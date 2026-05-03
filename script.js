/** 
 * GY-GY CLUB MONOLITH SCRIPT v.5.2.6 (.)
 * FIX: Robust Identity Loading & Syntax Error Shield
 */
const Agent = {
    user: null,

    loadUser() {
        const data = localStorage.getItem('gy_trace');
        if (data) {
            try {
                // Пытаемся распарсить, если там объект
                this.user = JSON.parse(data);
            } catch (e) {
                // Если там просто строка (как твоя ошибка), подхватываем её как ID
                console.log("GY-GY Alert: Old trace detected, converting...");
                this.user = { 
                    numCode: data.replace('#', ''), 
                    avatar: 'STALLION', 
                    flag: '🏴‍☠️' 
                };
            }
        }
    },

    initIdentity() {
        this.transit('generating');
        setTimeout(() => {
            if (!this.user) {
                // Стандарт: Порядковый номер + 4 цифры
                const serial = 255; 
                const rand = Math.floor(1000 + Math.random() * 8999);
                this.user = {
                    numCode: `${serial}-${rand}`,
                    avatar: 'STALLION',
                    flag: '🏴‍☠️'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user));
            }
            this.transit('hall');
        }, 2000);
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        if (!stage) return;

        stage.style.opacity = '0'; // Плавный переход 1.2 сек
        
        setTimeout(() => {
            if (typeof Scenes === 'undefined') {
                stage.innerHTML = "<h1 style='color:red'>CRITICAL: blocks.js NOT FOUND</h1>";
                stage.style.opacity = '1';
                return;
            }

            const content = typeof Scenes[target] === 'function' 
                ? Scenes[target](this.user) 
                : Scenes[target];
            
            stage.innerHTML = content || '<h1>Scene Empty</h1>';
            stage.style.opacity = '1';
            this.syncUI(target);
        }, 600);
    },

    syncUI(loc) {
        const backBtn = document.getElementById('btn-back');
        const hideOn = ['entrance', 'welcome', 'generating'];
        if (backBtn) backBtn.style.display = hideOn.includes(loc) ? 'none' : 'block';
    },

    goBack() { this.transit('hall'); }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = (el.style.display === 'flex' || el.style.display === 'block') ? 'none' : 'flex';
    },
    setLang(l) { this.toggle('lang-list'); }
};

document.addEventListener('DOMContentLoaded', () => {
    Agent.loadUser();
    setTimeout(() => {
        Agent.transit('entrance');
    }, 100);
});
