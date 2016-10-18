/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// HTML элементы модуля

	var blocks = __webpack_require__(3);

	// Высчитывает, в процентах, и устанавливает высчитанное значение в блок отображения процентов
	var setPercents = __webpack_require__(4);

	// Общие функции
	var utilities = __webpack_require__(5);

	// Формирует массив url всех изображений на странице, включая фоновых
	var getPathImages = __webpack_require__(6);

	/**
	 * Модуль предзагрузки, отображает процент загрузки страницы и в случае полной загрузке отображает элементы страницы
	 */
	module.exports = function () {
	    // Отображаем блок предзагрузки
	    blocks.preloader.classList.remove('preloader--hidden');

	    // Начальное значение процентов загрузки страницы
	    var percentsTotal = 0;

	    // Получам массив url всех изображений на странице
	    var images = getPathImages();

	    // Перебираем полученный массив
	    images.forEach(function (item) {
	        // Загружаем имеющиеся изображения
	        utilities.loadImage(item, function () {
	            percentsTotal++;
	            setPercents(images.length, percentsTotal);
	        }, function () {
	            percentsTotal++;
	            setPercents(images.length, percentsTotal);
	        });
	    });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * HTML элементы модуля
	 */

	module.exports = {
	  /**
	   * Блок предзагрузки
	   * @type {HTMLElement}
	   */
	  preloader: document.querySelector('.preloader'),

	  /**
	   * Блок отображения процентов загрузки страницы
	   * @type {HTMLElement}
	   */
	  preloaderPercent: document.querySelector('.wave text')
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// HTML элементы модуля

	var blocks = __webpack_require__(3);

	/**
	 * Высчитывает, в процентах, и устанавливает высчитанное значение в блок отображения процентов
	 * Если значение больше 100, то скрывает блок предзагрузки
	 * @param {number} total
	 * @param {number} correct
	 */
	module.exports = function (total, correct) {
	    var percent = Math.ceil(correct / total * 100);

	    if (percent >= 100) {
	        blocks.preloader.classList.add('preloader--hidden');
	    }

	    blocks.preloaderPercent.textContent = percent;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// Общие функции

	module.exports = {
	    /**
	     * Допустимое время загрузки изображения
	     * @constant {number}
	     */
	    LOAD_TIMEOUT: 5000,

	    /**
	     * Загрузка изображения
	     * @param {string} src
	     * @param {function} callbackLoaded
	     * @param {function} callbackError
	     */
	    loadImage: function loadImage(src, callbackLoaded, callbackError) {
	        var uploadImage = new Image();
	        var imageLoadTimeout = setTimeout(function () {
	            uploadImage.src = '';
	            uploadImage.onerror = null;
	            uploadImage.onload = null;
	            callbackError();
	        }, this.LOAD_TIMEOUT);

	        // Обработчик загрузки
	        uploadImage.onload = function () {
	            uploadImage.onerror = null;
	            clearTimeout(imageLoadTimeout);
	            callbackLoaded();
	        };

	        // Обработчик ошибки
	        uploadImage.onerror = function () {
	            uploadImage.onload = null;
	            clearTimeout(imageLoadTimeout);
	            callbackError();
	        };

	        uploadImage.src = src;
	    },
	    removeInvalidClass: function removeInvalidClass(event) {
	        if (event.target.classList.contains('invalid')) event.target.classList.remove('invalid');
	    },


	    /**
	     * Оптимизирует callback, чтобы функция вызывалась не чаще, чем раз в time интервал времени
	     * @param {function} callback
	     * @param {number} time
	     * @return {function}
	     */
	    throttle: function throttle(callback, time) {
	        var _this = this,
	            _arguments = arguments;

	        var state = null;
	        var COOLDOWN = 1;

	        return function () {
	            if (state) {
	                return;
	            }
	            callback.apply(_this, _arguments);
	            state = COOLDOWN;
	            setTimeout(function () {
	                state = null;
	            }, time);
	        };
	    },


	    /**
	     * Создаёт DOM элемент
	     * @param {string} tagName
	     * @param {string, boolean} className
	     * @param {string} textContent
	     * @return {HTMLElement}
	     */
	    getElement: function getElement(tagName, className, textContent) {
	        var element = document.createElement(tagName);
	        if (className) {
	            element.classList.add(className);
	        }
	        element.textContent = textContent;
	        return element;
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Формирует массив url всех изображений на странице, включая фоновых
	 * @return {Array}
	 */

	module.exports = function () {
	    var images = [];
	    // Получаем коллекцию всех элементов на странице
	    var elements = document.getElementsByTagName('*');

	    // Перебираем все элементы
	    [].forEach.call(elements, function (item) {
	        // Получаем css-свойтство 'backgroundImage' 
	        var background = getComputedStyle(item).backgroundImage;

	        // Если свойство есть
	        if (background != 'none') {
	            // Разбиваем на массив, т.к. изображений может быть несколько 
	            var paths = background.split('url');

	            // Фильтруем и форматируем массив, убираем градиенты и лишние символы
	            paths = paths.filter(function (item) {
	                return item.indexOf('linear-gradient') === -1 && item !== '';
	            }).map(function (item) {
	                return item.replace('("', '').replace('")', '').replace(', ', '');
	            });
	            images = images.concat(paths);
	        }

	        // Если элемент является изображением
	        if (item.tagName === 'IMG') {
	            var path = item.src;
	            images.push(path);
	        }
	    });

	    return images;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * Допустимое время загрузки
	 * @constant {number}
	 */

	var LOAD_TIMEOUT = 10000;

	/**
	 * Действие при неудачной загрузке списка
	 * @param {HTMLElement} container
	 */
	var toFailedLoadXHR = function toFailedLoadXHR(container) {
	    container.classList.remove('loading');
	    container.classList.add('error');
	};

	/**
	 * Получает список по XMLHttpRequest
	 * @param {HTMLElement} container
	 * @param {string} url
	 * @param {function(Array.<Object>)} callback
	 */
	var load = function load(container, url, callback) {
	    container.classList.add('loading');
	    var xhr = new XMLHttpRequest();
	    var xhrLoadTimeout = setTimeout(function () {
	        toFailedLoadXHR(container);
	    }, LOAD_TIMEOUT);

	    /**
	     * Обработчик загрузки
	     * @param {ProgressEvent} event
	     */
	    xhr.onload = function (event) {
	        xhr.onerror = null;
	        var loadedData = JSON.parse(event.target.response);
	        callback(loadedData);
	    };

	    // Обработчик пост загрузки
	    xhr.onloadend = function () {
	        clearTimeout(xhrLoadTimeout);
	        container.classList.remove('loading');
	    };

	    // Обработчик ошибки
	    xhr.onerror = function () {
	        xhr.onload = null;
	        toFailedLoadXHR(container);
	    };

	    xhr.open('GET', url);
	    xhr.send();
	};

	module.exports = load;

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (inputNode, classError) {
	    if (inputNode.value === '') {
	        inputNode.classList.add(classError);
	        return false;
	    } else {
	        return true;
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Модуль предзагрузки

	__webpack_require__(2)();

	var load = __webpack_require__(7);

	var inputName = document.querySelector('.contact-me__name'),
	    inputEmail = document.querySelector('.contact-me__email'),
	    inputMessage = document.querySelector('.contact-me__message'),
	    formContact = document.querySelector('.contact-me__form'),
	    sliderContainer = document.querySelector('.slider'),
	    slider = __webpack_require__(17),
	    validation = __webpack_require__(15);

	formContact.addEventListener('submit', function (event) {
	    event.preventDefault();
	    if (validation(inputName, 'contact-me__name--invalid') && validation(inputEmail, 'contact-me__email--invalid') && validation(inputMessage, 'contact-me__message--invalid')) {
	        event.target.submit();
	    }
	});

	inputName.addEventListener('focus', function (event) {
	    if (event.target.classList.contains('contact-me__name--invalid')) {
	        event.target.classList.remove('contact-me__name--invalid');
	    }
	});

	inputEmail.addEventListener('focus', function (event) {
	    if (event.target.classList.contains('contact-me__email--invalid')) {
	        event.target.classList.remove('contact-me__email--invalid');
	    }
	});

	inputMessage.addEventListener('focus', function (event) {
	    if (event.target.classList.contains('contact-me__message--invalid')) {
	        event.target.classList.remove('contact-me__message--invalid');
	    }
	});

	load(sliderContainer, '../works.json', function (data) {
	    slider.init(data);
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Общие функции

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utilities = __webpack_require__(5);

	/**
	 * Конструктор слайдера
	 * @constructor
	 */

	var Slider = function () {
	    function Slider() {
	        _classCallCheck(this, Slider);

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
	        };
	    }

	    /**
	     * Возвращает номер следующего слайда
	     */


	    _createClass(Slider, [{
	        key: 'init',


	        /**
	         * Инициализация слайдера
	         * @param {Object} data
	         */
	        value: function init(data) {
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

	    }, {
	        key: 'renderSlide',
	        value: function renderSlide() {
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

	    }, {
	        key: 'renderDescriptions',
	        value: function renderDescriptions(data) {
	            var _this = this;

	            data.forEach(function (item) {
	                var technologiesItem = utilities.getElement('li', 'slider__technologies-item', item);
	                _this.elements.descriptions.technologies.appendChild(technologiesItem);
	            });
	        }

	        /**
	         * Фунция отрисовки заголовока слайда
	         * @param {Object} data
	         */

	    }, {
	        key: 'renderTitle',
	        value: function renderTitle(data) {
	            var _this2 = this;

	            // Разбиваем фразу по словам
	            var words = data.split(' ');
	            // Счетчик букв, нужен для корректного отображения задержки в анимации
	            var counter = 0;
	            // Перебираем слова
	            words.forEach(function (item) {
	                // Каждое слово оборачиваем в контейнер
	                var word = utilities.getElement('div', false, '');
	                // Перебираем буквы в слове
	                for (var i = 0; i < item.length; i++) {
	                    counter++;
	                    // Каждую букву оборачиваем в контейнер
	                    var char = utilities.getElement('span', 'slider__char', item[i]);
	                    // Задаем задержку анимации
	                    char.style = 'animation-delay: ' + counter * 0.01 + 's';
	                    // Вставляем буквы в слова
	                    word.appendChild(char);
	                }
	                // Вставляем слова в заголовок
	                _this2.elements.descriptions.title.appendChild(word);
	            });
	        }

	        /**
	         * Возвращает объект img с заданным url
	         * @param {Object} url
	         * @return {HTMLElement}
	         */

	    }, {
	        key: 'getImage',
	        value: function getImage(url) {
	            var img = new Image();
	            utilities.loadImage(url, function () {
	                img.src = url;
	            }, function () {
	                img.classList.add('slider__image--error');
	            });
	            return img;
	        }

	        /**
	         * Фунция отрисовки блока с картинкой
	         */

	    }, {
	        key: 'renderImageBlock',
	        value: function renderImageBlock() {
	            var img = this.getImage(this.works[this.currentSlide].image);
	            this.elements.image.appendChild(img);
	        }

	        /**
	         * Фунция отрисовки кнопки
	         * @param {HTMLElement} container
	         * @param {string} modifier
	         * @param {string} url
	         */

	    }, {
	        key: 'renderControl',
	        value: function renderControl(container, modifier, url) {
	            var img = this.getImage(url);
	            var classModifier = 'slider__control-image--' + modifier;
	            var div = utilities.getElement('div', 'slider__control-image', '');
	            div.classList.add(classModifier);
	            div.appendChild(img);
	            container.appendChild(div);
	        }

	        /**
	         * Фунция отрисовки следующего слайда
	         */

	    }, {
	        key: 'showNext',
	        value: function showNext() {
	            this.clearSlider();
	            this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].image);
	            this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].image);
	            this.currentSlide = this.nextSlide;
	            this.renderSlide();
	        }

	        /**
	         * Фунция отрисовки предыдущего слайда
	         */

	    }, {
	        key: 'showPrev',
	        value: function showPrev() {
	            this.clearSlider();
	            this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].image);
	            this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].image);
	            this.currentSlide = this.prevSlide;
	            this.renderSlide();
	        }

	        /**
	         * Фунция очистки слайдера
	         */

	    }, {
	        key: 'clearSlider',
	        value: function clearSlider() {
	            this.elements.descriptions.title.innerHTML = '';
	            this.elements.descriptions.technologies.innerHTML = '';
	            this.elements.image.innerHTML = '';
	            this.elements.controls.next.innerHTML = '';
	            this.elements.controls.prev.innerHTML = '';
	        }
	    }, {
	        key: 'nextSlide',
	        get: function get() {
	            if (this.currentSlide + 1 > this.works.length - 1) {
	                return 0;
	            } else {
	                return this.currentSlide + 1;
	            }
	        }

	        /**
	         * Возвращает номер предыдущего слайда
	         */

	    }, {
	        key: 'prevSlide',
	        get: function get() {
	            if (this.currentSlide - 1 < 0) {
	                return this.works.length - 1;
	            } else {
	                return this.currentSlide - 1;
	            }
	        }
	    }]);

	    return Slider;
	}();

	module.exports = new Slider();

/***/ }
/******/ ]);