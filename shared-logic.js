/** 
 * GY-GY SHARED LOGIC v.5.2.9 (.)
 */
const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    },
    setLang(lang) {
        localStorage.setItem('gy_lang', lang);
        console.log("Language set to:", lang);
        this.toggle('lang-panel');
        // Здесь можно добавить смену флага и текста
    }
};

const Identity = {
    checkTrace() {
        let trace = localStorage.getItem('gy_trace');
        if (!trace) return null;
        try { return JSON.parse(trace); } catch(e) { return null; }
    },
    genTrace() {
        const id = "255-" + Math.floor(1000 + Math.random() * 9000);
        const user = { numCode: id, avatar: "STALLION", flag: "🏴‍☠️" };
        localStorage.setItem('gy_trace', JSON.stringify(user));
        return user;
    }
};

// При загрузке каждой страницы — проявляем её
window.onload = () => {
    document.body.style.opacity = '1';
};
