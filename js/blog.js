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

	module.exports = __webpack_require__(8);


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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Модуль предзагрузки

	__webpack_require__(2)();

	var blog = __webpack_require__(9);

	var load = __webpack_require__(7);

	load(document.body, '../blog.json', function (data) {
	    blog.init(data);
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Общие функции

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utilities = __webpack_require__(5);

	/**
	 * Создаёт объект navigation на основе шаблона reviews-template
	 * @return {Object} element
	 */
	var getNavigation = __webpack_require__(10);

	/**
	 * Создание DOM-разметки в navigation
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */
	var fillNavigation = __webpack_require__(11);

	/**
	 * Создаёт объект publication на основе шаблона reviews-template
	 * @return {Object} element
	 */
	var getPublication = __webpack_require__(12);

	/**
	 * Создание DOM-разметки в publication
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */
	var fillPublication = __webpack_require__(13);

	/**
	 * Время через которое выполняется функция
	 * @constant {number}
	 */
	var THROTTLE_DELAY = 100;

	/**
	 * Конструктор блога
	 * @constructor
	 */

	var Blog = function () {
	  function Blog() {
	    _classCallCheck(this, Blog);

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
	    };
	  }

	  /**
	   * Инициализация блога
	   * @param {Object} data
	   */


	  _createClass(Blog, [{
	    key: 'init',
	    value: function init(data) {
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

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      this.data.forEach(function (item) {
	        // Создаем объект publication
	        var publication = getPublication();

	        fillPublication(publication, item);

	        _this.publication.items.push(publication);

	        _this.publication.container.appendChild(publication);

	        // Создаем объект navigation
	        var navigation = getNavigation();

	        fillNavigation(navigation, item);

	        _this.navigation.items.push(navigation);

	        _this.navigation.list.appendChild(navigation);
	      });
	    }

	    /**
	     * Обработчик scroll, оптимизирован на выполнение не чаще чем в 0.1 сек
	     */

	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      this.toAddActiveNavigation();
	      this.toFixNavigation();
	    }

	    /**
	     * Устанавливает фиксированную позицию блоку с навигацией, если он находится на верху страницы
	     */

	  }, {
	    key: 'toFixNavigation',
	    value: function toFixNavigation() {
	      if (this.navigation.container.getBoundingClientRect().top <= 50) {
	        this.navigation.list.classList.add('publication__navigation-items--fixed');
	      } else {
	        this.navigation.list.classList.remove('publication__navigation-items--fixed');
	      }
	    }

	    /**
	     * Подсвечивает пункт в навигации, когда статья отображается на странице
	     */

	  }, {
	    key: 'toAddActiveNavigation',
	    value: function toAddActiveNavigation() {
	      var _this2 = this;

	      this.publication.items.forEach(function (item, index) {
	        if (item.getBoundingClientRect().top < document.documentElement.clientHeight / 2) {
	          var activeItem = document.querySelector('.publication__navigation-item--active');
	          if (activeItem) activeItem.classList.remove('publication__navigation-item--active');
	          _this2.navigation.items[index].classList.add('publication__navigation-item--active');
	        }
	      });
	    }

	    /**
	     * Добавляет или убирает сдвиг у навигации и контейнера на блоге
	     */

	  }, {
	    key: 'onClick',
	    value: function onClick() {
	      this.navigation.container.classList.toggle('shifted');
	      this.wrapper.classList.toggle('shifted');
	    }
	  }]);

	  return Blog;
	}();

	module.exports = new Blog();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Шаблон для блока с навигацией
	 * @type {HTMLElement}
	 */

	var templateElement = document.querySelector('#template-navigation');

	/**
	 * content элемента templateElement
	 * @type {HTMLElement}
	 */
	var elementToClone = void 0;

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
	var getElement = function getElement() {
	  // Клонируем шаблонный элемент
	  var element = elementToClone.cloneNode(true);
	  element.navigationItem = element.querySelector('a');
	  return element;
	};

	module.exports = getElement;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Создание DOM-разметки в element
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */

	var fill = function fill(element, data) {
	  element.navigationItem.textContent = data.title;
	  element.navigationItem.href = '#' + data.id;
	};

	module.exports = fill;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Шаблон для блока с публикацией
	 * @type {HTMLElement}
	 */

	var templateElement = document.querySelector('#template-publication');

	/**
	 * content элемента templateElement
	 * @type {HTMLElement}
	 */
	var elementToClone = void 0;

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
	var getElement = function getElement() {
	  // Клонируем шаблонный элемент
	  var element = elementToClone.cloneNode(true);
	  element.publicationTitle = element.querySelector('.publication__title');
	  element.publicationDate = element.querySelector('.publication__date');
	  element.content = element.querySelector('.publication__content');
	  return element;
	};

	module.exports = getElement;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Общие функции

	var utilities = __webpack_require__(5);

	/**
	 * Создание DOM-разметки в element
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */
	var fill = function fill(element, data) {
	    element.setAttribute('id', data.id);
	    element.publicationTitle.textContent = data.title;
	    element.publicationDate.textContent = data.date;
	    data.content.forEach(function (item) {
	        var paragraph = utilities.getElement('p', false, item);
	        element.content.appendChild(paragraph);
	    });
	};

	module.exports = fill;

/***/ }
/******/ ]);