'use strict';
/**
 * Допустимое время загрузки
 * @constant {number}
 */
const LOAD_TIMEOUT = 10000;

/**
 * Действие при неудачной загрузке списка
 * @param {HTMLElement} container
 */
let toFailedLoadXHR = (container) => {
    container.classList.remove('loading');
    container.classList.add('error');
};

/**
 * Получает список по XMLHttpRequest
 * @param {HTMLElement} container
 * @param {string} url
 * @param {function(Array.<Object>)} callback
 */
let load = (container, url, callback) => {
    container.classList.add('loading');
    let xhr = new XMLHttpRequest();
    let xhrLoadTimeout = setTimeout(() => {
        toFailedLoadXHR(container);
    }, LOAD_TIMEOUT);

    /**
     * Обработчик загрузки
     * @param {ProgressEvent} event
     */
    xhr.onload = (event) => {
        xhr.onerror = null;
        var loadedData = JSON.parse(event.target.response);
        callback(loadedData);
    };

    // Обработчик пост загрузки
    xhr.onloadend = () => {
        clearTimeout(xhrLoadTimeout);
        container.classList.remove('loading');
    };

    // Обработчик ошибки
    xhr.onerror = () => {
        xhr.onload = null;
        toFailedLoadXHR(container);
    };

    xhr.open('GET', url);
    xhr.send();
};

module.exports = load;
