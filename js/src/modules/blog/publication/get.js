'use strict';

/**
 * Шаблон для блока с публикацией
 * @type {HTMLElement}
 */
let templateElement = document.querySelector('#template-publication');

/**
 * content элемента templateElement
 * @type {HTMLElement}
 */
let elementToClone;

// Если браузер не поддерживает тег 'template'
if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.publication__item');
} else {
    elementToClone = templateElement.querySelector('.publication__item');
}

/**
 * Создаёт объект element на основе шаблона templateElement
 * @return {HTMLElement} element
 */
let getElement = () => {
    // Клонируем шаблонный элемент
    var element = elementToClone.cloneNode(true);
    element.publicationTitle = element.querySelector('.publication__title');
    element.publicationDate = element.querySelector('.publication__date');
    element.content = element.querySelector('.publication__content');
    return element;
};

module.exports = getElement;