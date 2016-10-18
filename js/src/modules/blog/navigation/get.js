'use strict';

/**
 * Шаблон для блока с навигацией
 * @type {HTMLElement}
 */
let templateElement = document.querySelector('#template-navigation');

/**
 * content элемента templateElement
 * @type {HTMLElement}
 */
let elementToClone;

// Если браузер не поддерживает тег 'template'
if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.publication__navigation-item');
} else {
    elementToClone = templateElement.querySelector('.publication__navigation-item');
}

/**
 * Создаёт объект element на основе шаблона templateElement
 * @return {HTMLElement} element
 */
let getElement = () => {
    // Клонируем шаблонный элемент
    var element = elementToClone.cloneNode(true);
    element.navigationItem = element.querySelector('a');
    return element;
};

module.exports = getElement;