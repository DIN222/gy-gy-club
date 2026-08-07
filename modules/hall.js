// modules/hall.js
// Модуль управления Холлом (центральный узел GY-GY Club)

import { EventBus } from '../core/eventBus.js';

export const HallModule = {
    init() {
        // Подписываемся на события, связанные с доступом в Холл
        EventBus.on('USER_ENTERED_HALL', () => {
            this.prepareHallUI();
        });
        
        console.log("Модуль Холла инициализирован.");
    },

    prepareHallUI() {
        // Логика подготовки Холла: 
        // например, проверка, открыты ли двери, есть ли права доступа и т.д.
        console.log("Подготовка интерфейса Холла...");
        
        // Здесь можно реализовать проверку: если пользователь "модермех", 
        // открываем дополнительные спец-кнопки в холле
        const isBoss = localStorage.getItem('gygy_is_boss') === 'true';
        const staffBtn = document.getElementById('btn-staff-room');
        
        if (isBoss && staffBtn) {
            staffBtn.style.display = 'block';
        }
    },

    // Метод для визуальной "разблокировки" кнопок в Холле
    unlockHallDirections() {
        const btnWHall = document.getElementById('btn-w-hall');
        const btnPass = document.getElementById('btn-pass');
        
        if (btnWHall) btnWHall.classList.remove('btn-sleep');
        if (btnPass) btnPass.classList.remove('btn-sleep');
    }
};
