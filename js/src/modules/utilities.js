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
     * @param {function} callback
     */
    loadImage(src, callback) {
        let uploadImage = new Image();
        var imageLoadTimeout = setTimeout(() => {
            uploadImage.src = '';
        }, this.LOAD_TIMEOUT);
        
        // Обработчик загрузки
        uploadImage.onload = () => {
            uploadImage.onerror = null;
            clearTimeout(imageLoadTimeout);
            callback();
        };

        // Обработчик ошибки
        uploadImage.onerror = () => {
            uploadImage.onload = null;
            clearTimeout(imageLoadTimeout);
        };

        uploadImage.src = src;
    },
    
    removeInvalidClass(event) {
        if (event.target.classList.contains('invalid'))
            event.target.classList.remove('invalid');
    }
};
