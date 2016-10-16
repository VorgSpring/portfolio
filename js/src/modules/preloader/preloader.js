'use strict';

// HTML элементы модуля
let blocks = require('./bloks');

// Высчитывает, в процентах, и устанавливает высчитанное значение в блок отображения процентов
let setPercents = require('./setPercents');

// Общие функции
let utilities = require('../utilities');

// Формирует массив url всех изображений на странице, включая фоновых
let getPathImages = require('./getPathImages');

/**
 * Модуль предзагрузки, отображает процент загрузки страницы и в случае полной загрузке отображает элементы страницы
 */
module.exports = () => {
    // Отображаем блок предзагрузки
    blocks.preloader.classList.remove('preloader--hidden');
    
    // Начальное значение процентов загрузки страницы
    let percentsTotal = 0;

    // Получам массив url всех изображений на странице
    let images = getPathImages();

    // Перебираем полученный массив
    images.forEach((item) => {
       // Загружаем имеющиеся изображения
       utilities.loadImage(item, () => {
           percentsTotal++;
           setPercents(images.length, percentsTotal);
       }) 
    })
};
