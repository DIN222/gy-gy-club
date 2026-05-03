const Agent = {
    user: null,
    load() {
        try { this.user = JSON.parse(localStorage.getItem('gy_trace')); } 
        catch(e) { localStorage.clear(); }
    },
    initIdentity() {
        this.transit('generating');
        setTimeout(() => {
            this.user = { numCode: "1-"+Math.floor(1000+Math.random()*9000), avatar: "⭐", flag: "🏴‍☠️" };
            localStorage.setItem('gy_trace', JSON.stringify(this.user));
            this.transit('hall');
        }, 2000);
    },
    transit(t) {
        const s = document.getElementById('app-stage');
        s.style.opacity = '0';
        setTimeout(() => {
            s.innerHTML = (typeof Scenes[t] === 'function') ? Scenes[t](this.user) : Scenes[t];
            s.style.opacity = '1';
            document.getElementById('btn-back').style.display = (t==='entrance')?'none':'block';
        }, 1200);
    },
    goBack() { this.transit('hall'); }
};
const UI = {
    toggle(id) { 
        const e = document.getElementById(id); 
        e.style.display = (e.style.display==='flex')?'none':'flex'; 
    },
    setLang(l) { this.toggle('lang-list'); }
};
window.onload = () => { Agent.load(); Agent.transit('entrance'); };
