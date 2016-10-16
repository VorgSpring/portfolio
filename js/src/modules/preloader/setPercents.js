'use strict';

// HTML элементы модуля
let blocks = require('./bloks');

/**
 * Высчитывает, в процентах, и устанавливает высчитанное значение в блок отображения процентов
 * Если значение больше 100, то скрывает блок предзагрузки
 * @param {number} total
 * @param {number} correct
 */
module.exports = (total, correct) => {
    let percent = Math.ceil(correct / total * 100);

    if(percent >= 100) {
        blocks.preloader.classList.add('preloader--hidden');
    }

    blocks.preloaderPercent.textContent = percent;
};
