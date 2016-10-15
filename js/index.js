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

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inputLogin = document.querySelector('.authorization__login'),
	    inputPassword = document.querySelector('.authorization__password'),
	    formLogin = document.querySelector('.authorization__form'),
	    validation = __webpack_require__(4);

	formLogin.addEventListener('submit', function (event) {
	    event.preventDefault();
	    if (validation(inputLogin, 'authorization__login--invalid') && validation(inputPassword, 'authorization__password--invalid')) {
	        event.target.submit();
	    }
	});

	inputLogin.addEventListener('focus', function (event) {
	    if (event.target.classList.contains('authorization__login--invalid')) {
	        event.target.classList.remove('authorization__login--invalid');
	    }
	});

	inputPassword.addEventListener('focus', function (event) {
	    if (event.target.classList.contains('authorization__login--invalid')) {
	        event.target.classList.remove('authorization__login--invalid');
	    }
	});

/***/ },
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

/***/ }
/******/ ]);