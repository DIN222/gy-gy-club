const Agent = {
    loc: 'entrance',
    user: JSON.parse(localStorage.getItem('gy_trace')) || null,

    initEntry() {
        this.transit('welcome');
        setTimeout(() => {
            if (!this.user) {
                // . REGISTRATION LOGIC
                const serial = Math.floor(Math.random() * 50);
                const rand = Math.floor(1000 + Math.random() * 8999);
                this.user = {
                    numCode: `${serial}-${rand}`,
                    flag: '🇬🇧', // Default flag
                    avatar: 'STALLION',
                    magicKey: 'QR_DATA_PLACEHOLDER'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user));
            }
            this.transit('hall');
        }, 2500);
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        stage.style.opacity = "0"; // . FADE OUT

        setTimeout(() => {
            this.loc = target;
            let content = Scenes[target];
            if (typeof content === 'function') content = content(this.user);
            
            stage.innerHTML = content;
            stage.style.opacity = "1"; // . MANIFESTATION
            UI.sync();
        }, 1200); // . 1.2S TRANSITION
    },

    goBack() { this.transit('hall'); }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        el.classList.toggle('open');
        if(id === 'go-menu') el.style.display = el.classList.contains('open') ? 'flex' : 'none';
    },
    sync() {
        document.getElementById('btn-back').style.visibility = 
            (Agent.loc === 'entrance' || Agent.loc === 'welcome') ? 'hidden' : 'visible';
    },
    setLang(l) { this.toggle('lang-list'); console.log('Lang set:', l); }
};

window.onload = () => Agent.transit('entrance');
