// modules/hall.js
// Суб-материнская плата Холла для GY-GY Club

import { EventBus } from '../core/eventBus.js';

export const HallModule = {
    init() {
        // Слушаем глобальный сигнал, что пользователь прибыл в Холл
        EventBus.on('NAVIGATE_TO', (data) => {
            if (data.blockId === 'block-hall') {
                this.activateHall();
            }
        });

        // Слушаем сохранение профиля, чтобы сразу разблокировать двери Холла
        EventBus.on('PROFILE_SAVED', () => {
            this.unlockDirections();
        });

        console.log("Суб-материнская плата Холла запущена.");
    },

    activateHall() {
        console.log("Холл активирован. Проверка прав и доступов...");
        
        // Проверяем статус босса (модермеха)
        const isBoss = localStorage.getItem('gygy_is_boss') === 'true';
        const staffBtn = document.getElementById('btn-staff-room');
        if (isBoss && staffBtn) {
            staffBtn.style.display = 'block';
        }

        // Проверяем, есть ли аватар, чтобы разбудить кнопки направлений
        if (localStorage.getItem('gygy_avatar')) {
            this.unlockDirections();
        }
    },

    unlockDirections() {
        const btnWHall = document.getElementById('btn-w-hall');
        const btnPass = document.getElementById('btn-pass');
        
        if (btnWHall) btnWHall.classList.remove('btn-sleep');
        if (btnPass) btnPass.classList.remove('btn-sleep');
        
        // Оповещаем дочерние элементы Холла, что путь открыт
        EventBus.emit('HALL_DIRECTIONS_UNLOCKED');
    }
};
