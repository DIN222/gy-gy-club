/** GY-GY SHARED LOGIC v.5.3.0 (.) */
const Agent = {
    // Плавный переход между страницами (1.2 сек)
    gate(url) {
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = url; }, 1200);
    },

    // Работа с цифровым следом (ID)
    getTrace() {
        const data = localStorage.getItem('gy_trace');
        try { return JSON.parse(data); } catch(e) { return null; }
    },

    setTrace() {
        const id = "255-" + Math.floor(1000 + Math.random() * 9000);
        const user = { numCode: id, avatar: "STALLION", flag: "🏴‍☠️" };
        localStorage.setItem('gy_trace', JSON.stringify(user));
        return user;
    }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    },
    setLang(l) {
        localStorage.setItem('gy_lang', l);
        this.toggle('lang-panel');
        location.reload(); // Перезагрузка для смены словаря
    }
};

// Проявление страницы при входе
window.onload = () => { document.body.style.opacity = '1'; };
