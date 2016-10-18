'use strict';

/**
 * Создание DOM-разметки в element
 * @param {HTMLElement} element
 * @param {Object} data
 */
let fill = (element, data) => {
    element.navigationItem.textContent = data.title;
    element.navigationItem.href = `#${data.id}`;
};

module.exports = fill;