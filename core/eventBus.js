// core/eventBus.js
// «Материнская плата» проекта для связи модулей между собой

export const EventBus = {
    // Отправить сигнал (опубликовать событие)
    emit(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    
    // Подписаться на сигнал (слушать линию)
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },

    // Отписаться (выключить прослушку)
    off(event, callback) {
        document.removeEventListener(event, callback);
    }
};
