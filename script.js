/** 
 * . CORE AGENT ENGINE
 * Logic for: Identity, Logistics, and UI Sync.
 */
const Agent = {
    loc: 'entrance',
    // . IDENTITY & COOKIE-RECOGNITION: Unique digital trace
    user: JSON.parse(localStorage.getItem('gy_trace')) || null,

    initEntry() {
        this.transit('welcome');
        setTimeout(() => {
            if (!this.user) {
                // . REGISTRATION: Serial + 4 random digits + Avatar + Flag
                const serial = Math.floor(Math.random() * 50);
                const rand = Math.floor(1000 + Math.random() * 8999);
                const flags = ['🇬🇧', '🇺🇸', '🇫🇷', '🇩🇪', '🇯🇵', '🏴‍☠️'];
                const avs = ['BARTENDER', 'STALLION', 'GUEST', 'AGENT'];
                
                this.user = {
                    numCode: `${serial}-${rand}`,
                    flag: flags[Math.floor(Math.random() * flags.length)],
                    avatar: avs[Math.floor(Math.random() * avs.length)],
                    magicKey: 'GENERATED_QR_STUB'
                };
                localStorage.setItem('gy_trace', JSON.stringify(this.user)); //
            }
            this.transit('hall');
        }, 2500);
    },

    transit(target) {
        const stage = document.getElementById('app-stage');
        // . TRANSITION: 1.2s smooth fade
        stage.style.opacity = "0"; 

        setTimeout(() => {
            this.loc = target;
            // Get content from blocks.js registry
            let content = Scenes[target];
            if (typeof content === 'function') content = content(this.user);
            
            stage.innerHTML = content;
            stage.style.opacity = "1"; // Manifestation
            UI.sync();
        }, 1200); 
    },

    goBack() {
        this.transit('hall');
    }
};

const UI = {
    // . UI PERMANENTS: Logo, Back button, Lang panel
    toggle(id) {
        const el = document.getElementById(id);
        el.classList.toggle('open');
        // Simple display toggle for menus
        if (el.style.display === 'flex' || el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
        }
    },

    sync() {
        // Back button visibility logic
        const backBtn = document.getElementById('btn-back');
        const hideOn = ['entrance', 'welcome'];
        backBtn.style.visibility = hideOn.includes(Agent.loc) ? 'hidden' : 'visible';
    },

    setLang(l) {
        // Gab-list logic for 11 languages
        console.log(`GY-GY Alert: Language switched to ${l}`);
        this.toggle('lang-list');
    }
};

// Initial startup
window.onload = () => Agent.transit('entrance');
