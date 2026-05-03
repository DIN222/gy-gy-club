/** 
 * GY-GY CLUB SCRIPT v.5.2.5 (.)
 */
const Agent = {
    user: JSON.parse(localStorage.getItem('gy_trace')) || null,

    initIdentity() {
        this.transit('generating');
        setTimeout(() => {
            if (!this.user) {
                // . Serial + 4 random digits
                const serial = 1; 
                const rand = Math.floor(1000 + Math.random() * 8999);
                this.user = {
                    numCode: `${serial}-${rand}`,
                    avatar: 'STALLION_PIC.png',
                    flag: '🏴‍☠️'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user));
            }
            this.transit('hall');
        }, 2000);
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = '0';
        setTimeout(() => {
            const content = typeof Scenes[target] === 'function' ? Scenes[target](this.user) : Scenes[target];
            stage.innerHTML = content;
            stage.style.opacity = '1';
            this.syncUI(target);
        }, 1200); // . 1.2s Плавный переход
    },

    syncUI(loc) {
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
    setLang(l) { this.toggle('lang-list'); console.log('Lang set to:', l); }
};

window.onload = () => Agent.transit('entrance');
