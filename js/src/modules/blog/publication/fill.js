'use strict';

// Общие функции
let utilities = require('../../utilities');

/**
 * Создание DOM-разметки в element
 * @param {HTMLElement} element
 * @param {Object} data
 */
let fill = (element, data) => {
    element.setAttribute('id', data.id);
    element.publicationTitle.textContent = data.title;
    element.publicationDate.textContent = data.date;
    data.content.forEach((item) => {
        let paragraph = utilities.getElement('p', false, item);
        element.content.appendChild(paragraph);
    });
};

module.exports = fill;