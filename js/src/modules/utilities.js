'use strict';

// Общие функции
module.exports = {
    /**
     * Допустимое время загрузки изображения
     * @constant {number}
     */
    LOAD_TIMEOUT: 5000,
    
    /**
     * Загрузка изображения
     * @param {string} src
     * @param {function} callbackLoaded
     * @param {function} callbackError
     */
    loadImage(src, callbackLoaded, callbackError) {
        let uploadImage = new Image();
        var imageLoadTimeout = setTimeout(() => {
            uploadImage.src = '';
            uploadImage.onerror = null;
            uploadImage.onload = null;
            callbackError();
        }, this.LOAD_TIMEOUT);
        
        // Обработчик загрузки
        uploadImage.onload = () => {
            uploadImage.onerror = null;
            clearTimeout(imageLoadTimeout);
            callbackLoaded();
        };

        // Обработчик ошибки
        uploadImage.onerror = () => {
            uploadImage.onload = null;
            clearTimeout(imageLoadTimeout);
            callbackError();
        };

        uploadImage.src = src;
    },
    
    removeInvalidClass(event) {
        if (event.target.classList.contains('invalid'))
            event.target.classList.remove('invalid');
    },

    /**
     * Оптимизирует callback, чтобы функция вызывалась не чаще, чем раз в time интервал времени
     * @param {function} callback
     * @param {number} time
     * @return {function}
     */
    throttle(callback, time) {
        let state = null;
        let COOLDOWN = 1;

        return () => {
            if (state) {
                return;
            }
            callback.apply(this, arguments);
            state = COOLDOWN;
            setTimeout(() => {
                state = null;
            }, time);
        };
    },
    
    /**
     * Создаёт DOM элемент
     * @param {string} tagName
     * @param {string, boolean} className
     * @param {string} textContent
     * @return {HTMLElement}
     */
    getElement(tagName, className, textContent) {
        let element = document.createElement(tagName);
        if(className) {
            element.classList.add(className);
        }
        element.textContent = textContent;
        return element
    }
};
