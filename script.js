/** 
 * GY-GY CLUB MONOLITH SCRIPT v.5.2.5 (.)
 */
const Agent = {
    user: JSON.parse(localStorage.getItem('gy_trace')) || null,

    // . LOGISTICS: Welcome -> ID Generation -> Hall
    initIdentity() {
        this.transit('generating');
        setTimeout(() => {
            if (!this.user) {
                // . ID: Serial + 4 random digits
                const serial = 1; 
                const rand = Math.floor(1000 + Math.random() * 9000);
                this.user = {
                    numCode: `${serial}-${rand}`,
                    avatar: 'STALLION',
                    flag: '🏴‍☠️'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user)); // Cookie-recognition
            }
            this.transit('hall');
        }, 2000);
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = '0'; // . FADE OUT (1.2s Transition)
        
        setTimeout(() => {
            const content = typeof Scenes[target] === 'function' 
                ? Scenes[target](this.user) 
                : Scenes[target];
            
            stage.innerHTML = content || '<h1>Error</h1>';
            stage.style.opacity = '1'; // . FADE IN
            this.syncUI(target);
        }, 1200); //
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
    setLang(l) { console.log('v.5.2.5 Lang changed:', l); this.toggle('lang-list'); }
};

// . INITIAL STARTUP
window.addEventListener('load', () => {
    Agent.transit('entrance');
});
