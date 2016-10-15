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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inputName = document.querySelector('.contact-me__name'),
	    inputEmail = document.querySelector('.contact-me__email'),
	    inputMessage = document.querySelector('.contact-me__message'),
	    formContact = document.querySelector('.contact-me__form'),
	    validation = __webpack_require__(4);

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

/***/ }
/******/ ]);