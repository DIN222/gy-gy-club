// modules/passport.js
// Модуль цифрового паспорта, аватарок и регистрации резидента GY-GY Club

import { EventBus } from '../core/eventBus.js';

export const PassportModule = {
    currentID: '',
    currentUserImage: '',
    selectedNickType: 'own',
    userChosenNickname: '',

    init() {
        // Инициализируем ID, если его еще нет
        this.currentID = localStorage.getItem('gygy_id') || localStorage.getItem('gy_user_id') || localStorage.getItem('gy_trace');
        if (!this.currentID) {
            this.currentID = "GY-" + Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem('gygy_id', this.currentID);
        }

        // Слушаем сигналы из материнской платы
        EventBus.on('GENERATE_AVATAR', () => this.generateAvatar());
        EventBus.on('SAVE_PROFILE', () => this.saveUserProfile());

        this.checkAndFillForm();
        console.log("Модуль паспорта инициализирован. ID резидента:", this.currentID);
    },

    // Генерация случайного SVG-аватара
    generateAvatar() {
        const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="#${hex}"/><circle cx="50" cy="40" r="20" fill="#000000"/><path d="M20,90 C20,70 80,70 80,90" fill="#000000"/></svg>`;
        this.currentUserImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        
        // Передаем сигнал наружу, что аватар готов
        EventBus.emit('AVATAR_UPDATED', { image: this.currentUserImage, isSvg: true });
    },

    // Предпросмотр загруженной фотографии
    handleFilePreview(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentUserImage = e.target.result;
            EventBus.emit('AVATAR_UPDATED', { image: this.currentUserImage, isSvg: false });
        };
        reader.readAsDataURL(file);
    },

    // Рендеринг паспортов и QR-кодов
    renderPassports(targetID) {
        const idLabel = document.getElementById('id-label');
        const passIdVal = document.getElementById('pass-id-val');
        const qrBoxReg = document.getElementById('qr-box-reg');
        const passQrBox = document.getElementById('pass-qr-box');

        if (idLabel) idLabel.innerText = targetID;
        if (passIdVal) passIdVal.innerText = targetID;

        // Если подключена библиотека QRCode
        if (qrBoxReg && typeof QRCode !== 'undefined') { 
            qrBoxReg.innerHTML = ""; 
            new QRCode(qrBoxReg, { text: targetID, width: 75, height: 75 }); 
        }
        if (passQrBox && typeof QRCode !== 'undefined') { 
            passQrBox.innerHTML = ""; 
            new QRCode(passQrBox, { text: targetID, width: 90, height: 90 }); 
        }
    },

    // Сохранение профиля резидента
    saveUserProfile() {
        if (!this.currentUserImage) return;

        if (this.selectedNickType === 'club') {
            localStorage.setItem('gygy_nickname', this.currentID);
        } else if (this.userChosenNickname) {
            localStorage.setItem('gygy_nickname', this.userChosenNickname);
        }

        localStorage.setItem('gygy_avatar', this.currentUserImage);
        localStorage.setItem('gy_user_img', this.currentUserImage);
        localStorage.setItem('gy_user_avatar', this.currentUserImage);
        localStorage.setItem('gy_user_id', this.currentID);

        const currentNickname = localStorage.getItem('gygy_nickname') || '';
        if (currentNickname.toLowerCase() === 'модермех') {
            localStorage.setItem('gygy_is_boss', 'true');
        }

        // Сигнализируем системе, что профиль успешно сохранен
        EventBus.emit('PROFILE_SAVED', { 
            id: this.currentID, 
            image: this.currentUserImage,
            nickname: currentNickname 
        });

        console.log("Профиль резидента успешно сохранен!");
    },

    checkAndFillForm() {
        // Проверка Telegram WebApp юзера, если открыто внутри бота
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
            const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
            if (tgUser.first_name) {
                localStorage.setItem('gygy_nickname', tgUser.first_name + (tgUser.last_name ? ' ' + tgUser.last_name : ''));
            }
        }

        const savedAvatar = localStorage.getItem('gy_user_img') || localStorage.getItem('gygy_avatar');
        if (this.currentID) {
            this.renderPassports(this.currentID);
        }

        if (savedAvatar) {
            this.currentUserImage = savedAvatar;
            EventBus.emit('AVATAR_LOADED', { image: savedAvatar });
        }
    }
};
