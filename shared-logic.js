/* GY-GY LOGIC v.5.3.1 (.) */
const Agent = {
    // Переход с затуханием
    transit(url) {
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = url; }, 1200);
    },
    // Проверка/Создание ID
    initID() {
        if (!localStorage.getItem('gy_trace')) {
            const id = "255-" + Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('gy_trace', JSON.stringify({numCode: id, avatar: "STALLION", flag: "🏴‍☠️"}));
        }
    }
};

const UI = {
    toggle(id) {
        const el = document.getElementById(id);
        el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    }
};

// Проявление при загрузке
window.onload = () => { document.body.style.opacity = '1'; };
