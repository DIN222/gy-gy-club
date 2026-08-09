// modules/situationalScanner.js — Обновлен до v4.6.3 (Audio Lifecycle)
class SituationalScanner {
    constructor() {
        this.currentMood = "standard";
        this.activeAudio = null; // Ссылка на текущий фоновый элемент (например, звук бара)
        this.initListeners();
    }

    initListeners() {
        if (window.EventBus) {
            // Слушаем смену локаций/блоков
            window.EventBus.on('ROOM_CHANGED', (data) => {
                this.handleRoomAudio(data.room);
            });
        }
    }

    // Управление звуком в зависимости от зоны
    handleRoomAudio(roomName) {
        const ambientBar = document.getElementById('snd-ambient');

        if (roomName === 'block-bar' || roomName === 'bar') {
            // Входим в бар — включаем эмбиент с плавной громкостью
            if (ambientBar) {
                ambientBar.volume = 0.4;
                ambientBar.play().catch(e => console.log("Audio autoplay restricted"));
            }
        } else {
            // Возвращаемся к дверям, в холл или на регистрацию — глушим звук бара
            if (ambientBar) {
                this.fadeOutAudio(ambientBar);
            }
        }
    }

    // Плавное затухание звука (Fade Out)
    fadeOutAudio(audioElement) {
        let vol = audioElement.volume;
        const fadeInterval = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                audioElement.volume = Math.max(0, vol);
            } else {
                audioElement.pause();
                audioElement.currentTime = 0; // Сбрасываем на начало
                audioElement.volume = 0.5; // Возвращаем дефолтную громкость для следующего раза
                clearInterval(fadeInterval);
            }
        }, 100);
    }
}

window.Scanner = new SituationalScanner();
