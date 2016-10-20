'use strict';
// Модуль корректного отображения тега "picture"
require('picturefill');
// Модуль корректной вставки изображений из svg спрайта
require('svgxuse');

/**
 * URL списока статей
 * @constant {number}
 */
const BLOG_PUBLICATIONS = '../blog.json';

// Модуль предзагрузки
require('./modules/preloader/preloader')();

let blog = require('./modules/blog/blogConstructor');

// Получает список статей по XMLHttpRequest
let load = require('./modules/load');

load(document.body, BLOG_PUBLICATIONS, (data) => {
    blog.init(data);
});

