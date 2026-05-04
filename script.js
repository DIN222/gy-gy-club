/** 
 * GY-GY CLUB SCRIPT v.5.2.6 (.)
 */
const Agent = {
    user: null,

    loadUser() {
        const raw = localStorage.getItem('gy_trace');
        try {
            // Если в памяти не JSON, а строка типа #GY-255-4186, это вызовет ошибку и уйдет в catch
            this.user = JSON.parse(raw);
        } catch (e) {
            console.log("Memory reset for v.5.2.6");
            this.user = null; // Очищаем битые данные
        }
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        if (!stage) return;

        stage.style.opacity = '0';
        
        setTimeout(() => {
            // Проверка наличия Scenes из blocks.js
            if (typeof Scenes === 'undefined') {
                stage.innerHTML = "<h1 style='color:red'>ERROR: blocks.js NOT FOUND</h1>";
                stage.style.opacity = '1';
                return;
            }

            const content = typeof Scenes[target] === 'function' ? Scenes[target](this.user) : Scenes[target];
            stage.innerHTML = content;
            stage.style.opacity = '1';
            
            // Управление кнопкой Назад
            const backBtn = document.getElementById('btn-back');
            const hideOn = ['entrance', 'welcome', 'generating'];
            if (backBtn) backBtn.style.display = hideOn.includes(target) ? 'none' : 'block';
        }, 1200); // Строго 1.2 сек по протоколу
    },

    initIdentity() {
        this.transit('generating');
        setTimeout(() => {
            // Генерация: Порядковый номер + 4 цифры
            const serial = 255; 
            const rand = Math.floor(1000 + Math.random() * 9000);
            this.user = {
                numCode: `${serial}-${rand}`,
                avatar: 'AV_GEN.png',
                flag: '🏴‍☠️'
            };
            localStorage.setItem('gy_trace', JSON.stringify(this.user));
            this.transit('hall');
        }, 2000);
    },

    goBack() { this.transit('hall'); }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = (el.style.display === 'flex') ? 'none' : 'flex';
    },
    setLang(l) { this.toggle('lang-list'); }
};

// СТАРТ
window.onload = () => {
    Agent.loadUser();
    Agent.transit('entrance');
};
