'use strict';

/**
 * Формирует массив url всех изображений на странице, включая фоновых
 * @return {Array}
 */
module.exports = () => {
    let images = [];
    // Получаем коллекцию всех элементов на странице
    let elements = document.getElementsByTagName('*');

    // Перебираем все элементы
    [].forEach.call(elements, (item) => {
        // Получаем css-свойтство 'backgroundImage' 
        let background = getComputedStyle(item).backgroundImage;

        // Если свойство есть
        if(background != 'none') {
            // Разбиваем на массив, т.к. изображений может быть несколько 
            let paths = background.split('url');

            // Фильтруем и форматируем массив, убираем градиенты и лишние символы
            paths = paths.filter((item) => {
                return item.indexOf('linear-gradient') === -1 && item !== '';
            }).map((item) => {
                return item.replace('("', '').replace('")', '').replace(', ', '');
            });
            images = images.concat(paths);
        }

        // Если элемент является изображением
        if(item.tagName === 'IMG') {
            let path = item.src;
            images.push(path);
        }
    });
    
    return images;
};