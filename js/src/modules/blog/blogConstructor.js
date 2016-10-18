'use strict';

// Общие функции
let utilities = require('../utilities');

/**
 * Создаёт объект navigation на основе шаблона reviews-template
 * @return {Object} element
 */
let getNavigation = require('./navigation/get');

/**
 * Создание DOM-разметки в navigation
 * @param {HTMLElement} element
 * @param {Object} data
 */
let fillNavigation = require('./navigation/fill');

/**
 * Создаёт объект publication на основе шаблона reviews-template
 * @return {Object} element
 */
let getPublication = require('./publication/get');

/**
 * Создание DOM-разметки в publication
 * @param {HTMLElement} element
 * @param {Object} data
 */
let fillPublication = require('./publication/fill');

/**
 * Время через которое выполняется функция
 * @constant {number}
 */
let THROTTLE_DELAY = 100;

/**
 * Конструктор блога
 * @constructor
 */
class Blog {
    constructor() {
        /**
         * Контейнер блога
         * @type {HTMLElement}
         */
        this.wrapper = document.querySelector('.wrapper');

        /**
         * Блок статей
         * @type {Object}
         */
        this.publication = {

            /**
             * Контейнер статей
             * @type {HTMLElement}
             */
            container: document.querySelector('.publication__items'),

            /**
             * Статьи
             * @type {Array}
             */
            items: []
        };

        /**
         * Блок навигации
         * @type {Object}
         */
        this.navigation = {

            /**
             * Контейнер навигации по блогу
             * @type {HTMLElement}
             */
            container: document.querySelector('.publication__navigation'),

            /**
             * Контейнер элементов навигации
             * @type {HTMLElement}
             */
            list: document.querySelector('.publication__navigation-items'),

            /**
             * Кнопка открытия навигации
             * Видна только на мобильной и планшетной версии сайта
             * @type {HTMLElement}
             */
            button: document.querySelector('.publication__navigation-button'),

            /**
             * Элементы навигации
             * @type {Array}
             */
            items: []
        }
    }

    /**
     * Инициализация блога
     * @param {Object} data
     */
    init(data) {
        // Сохраняем данные с сервера
        this.data = data;
        // Отрисовываем блог
        this.render();
        // Подсвечиваем пункт в навигации, когда статья отображается на странице
        this.toAddActiveNavigation();
        // Обработчик клика по кнопке открытия навигации
        this.navigation.button.addEventListener('click', this.onClick.bind(this));
        // Обработчик scroll
        window.addEventListener('scroll', utilities.throttle(this.onScroll.bind(this), THROTTLE_DELAY));
    }

    /**
     * Фунция отрисовки блога
     */
    render() {
        this.data.forEach((item) => {
            // Создаем объект publication
            let publication = getPublication();

            fillPublication(publication, item);

            this.publication.items.push(publication);

            this.publication.container.appendChild(publication);

            // Создаем объект navigation
            let navigation = getNavigation();

            fillNavigation(navigation, item);

            this.navigation.items.push(navigation);

            this.navigation.list.appendChild(navigation);
        })
    }

    /**
     * Обработчик scroll, оптимизирован на выполнение не чаще чем в 0.1 сек
     */
    onScroll() {
        this.toAddActiveNavigation();
        this.toFixNavigation();
    }

    /**
     * Устанавливает фиксированную позицию блоку с навигацией, если он находится на верху страницы
     */
    toFixNavigation() {
        if(this.navigation.container.getBoundingClientRect().top <= 50) {
            this.navigation.list.classList.add('publication__navigation-items--fixed');

        } else {
            this.navigation.list.classList.remove('publication__navigation-items--fixed');
        }
    }

    /**
     * Подсвечивает пункт в навигации, когда статья отображается на странице
     */
    toAddActiveNavigation() {
        this.publication.items.forEach((item, index) => {
            if(item.getBoundingClientRect().top < document.documentElement.clientHeight / 2) {
                let activeItem = document.querySelector('.publication__navigation-item--active');
                if(activeItem)
                    activeItem.classList.remove('publication__navigation-item--active');
                this.navigation.items[index].classList.add('publication__navigation-item--active');
            }
        })
    }

    /**
     * Добавляет или убирает сдвиг у навигации и контейнера на блоге
     */
    onClick() {
        this.navigation.container.classList.toggle('shifted');
        this.wrapper.classList.toggle('shifted');
    }
}

module.exports = new Blog();
