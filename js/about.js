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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Модуль предзагрузки

	__webpack_require__(2)();

	var myMap = document.querySelector(".map");

	var load = __webpack_require__(7);

	load(myMap, '../map.json', function (data) {
	    var styles = data;

	    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

	    var mapOptions = {
	        zoom: 17,
	        center: new google.maps.LatLng(55.765405, 37.689795),
	        mapTypeControlOptions: {
	            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	        }
	    };
	    var map = new google.maps.Map(myMap, mapOptions);

	    map.mapTypes.set('map_style', styledMap);
	    map.setMapTypeId('map_style');
	});

/***/ },
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

/***/ }
/******/ ]);