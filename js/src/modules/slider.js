'use strict';

// Общие функции
let utilities = require('./utilities');

/**
 * Конструктор слайдера
 * @constructor
 */
class Slider {
    constructor() {
        
        /**
         * Номер текущкго слайда
         * @type {number}
         */
        this.currentSlide = 0;
        
        /**
         * Блок элементов слайдера
         * @type {Object}
         */
        this.elements = {

            /**
             * Блок с описанием
             */
            descriptions: {
                /**
                 * Заголовок слайда
                 * @type {HTMLElement}
                 */
                title: document.querySelector('.title--slider'),
                
                /**
                 * Список используемых технологий
                 * @type {HTMLElement}
                 */
                technologies: document.querySelector('.slider__technologies')
            },

            /**
             * Блок с картинкой
             * @type {HTMLElement}
             */
            image: document.querySelector('.slider__image'),

            /**
             * Блок кнопок
             */
            controls: {
                
                /**
                 * Кнопка "следующий слайд"
                 * @type {HTMLElement}
                 */
                prev: document.querySelector('.slider__control--prev'),
                
                /**
                 * Кнопка "предыдущий слайд"
                 * @type {HTMLElement}
                 */
                next: document.querySelector('.slider__control--next')
            }
        }
    }

    /**
     * Возвращает номер следующего слайда
     */
    get nextSlide() {
        if(this.currentSlide + 1 > this.works.length - 1) {
            return 0;
        } else {
            return this.currentSlide + 1;
        }
    }
    
    /**
     * Возвращает номер предыдущего слайда
     */
    get prevSlide() {
        if(this.currentSlide - 1 < 0) {
            return this.works.length - 1;
        } else {
            return this.currentSlide - 1;
        }
    }

    /**
     * Инициализация слайдера
     * @param {Object} data
     */
    init(data) {
        // Сохраняем данные с сервера
        this.works = data;
        // Отрисовываем слайдер
        this.renderSlide();
        // Обработчик клика по кнопке "следующий слайд"
        this.elements.controls.prev.addEventListener('click', this.showPrev.bind(this));
        // Обработчик клика по кнопке "предыдущий слайд"
        this.elements.controls.next.addEventListener('click', this.showNext.bind(this));
    }

    /**
     * Фунция отрисовки блога
     */
    renderSlide() {
        this.renderTitle(this.works[this.currentSlide].title);
        this.renderDescriptions(this.works[this.currentSlide].technologies);
        this.renderImageBlock();
        this.renderControl(this.elements.controls.next, 'current', this.works[this.nextSlide].image);
        this.renderControl(this.elements.controls.prev, 'current', this.works[this.prevSlide].image);
    }

    /**
     * Фунция отрисовки списока используемых технологий
     * @param {Object} data
     */
    renderDescriptions(data) {
        data.forEach((item)=> {
            let technologiesItem =
                utilities.getElement('li', 'slider__technologies-item', item);
            this.elements.descriptions.technologies.appendChild(technologiesItem);
        });
    }

    /**
     * Фунция отрисовки заголовока слайда
     * @param {Object} data
     */
    renderTitle(data) {
        // Разбиваем фразу по словам
        let words = data.split(' ');
        // Счетчик букв, нужен для корректного отображения задержки в анимации
        let counter = 0;
        // Перебираем слова
        words.forEach((item) => {
            // Каждое слово оборачиваем в контейнер
            let word = utilities.getElement('div', false, '');
            // Перебираем буквы в слове
            for(let i = 0; i < item.length; i++) {
                counter++;
                // Каждую букву оборачиваем в контейнер
                let char = utilities.getElement('span', 'slider__char', item[i]);
                // Задаем задержку анимации
                char.style.cssText += `animation-delay: ${counter*0.01}s`;
                // Вставляем буквы в слова
                word.appendChild(char);
            }
            // Вставляем слова в заголовок
            this.elements.descriptions.title.appendChild(word);
        });
    }

    /**
     * Возвращает объект img с заданным url
     * @param {Object} url
     * @return {HTMLElement}
     */
    getImage(url) {
        let img = new Image();
        utilities.loadImage(url, () => {
            img.src = url
        }, () => {
            img.classList.add('slider__image--error');
        });
        return img
    }


    /**
     * Фунция отрисовки блока с картинкой
     */
    renderImageBlock() {
        let img =
            this.getImage(this.works[this.currentSlide].image);
        this.elements.image.appendChild(img);
    }


    /**
     * Фунция отрисовки кнопки
     * @param {HTMLElement} container
     * @param {string} modifier
     * @param {string} url
     */
    renderControl(container, modifier, url) {
        let img = this.getImage(url);
        let classModifier = `slider__control-image--${modifier}`;
        let div = utilities.getElement('div', 'slider__control-image', '');
        div.classList.add(classModifier);
        div.appendChild(img);
        container.appendChild(div);
    }

    /**
     * Фунция отрисовки следующего слайда
     */
    showNext() {
        this.clearSlider();
        this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].image);
        this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].image);
        this.currentSlide = this.nextSlide;
        this.renderSlide();
    }

    /**
     * Фунция отрисовки предыдущего слайда
     */
    showPrev() {
        this.clearSlider();
        this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].image);
        this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].image);
        this.currentSlide = this.prevSlide;
        this.renderSlide();
    }

    /**
     * Фунция очистки слайдера
     */
    clearSlider() {
        this.elements.descriptions.title.innerHTML = '';
        this.elements.descriptions.technologies.innerHTML= '';
        this.elements.image.innerHTML = '';
        this.elements.controls.next.innerHTML = '';
        this.elements.controls.prev.innerHTML = '';
    }
}

module.exports = new Slider();

