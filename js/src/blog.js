'use strict';

// Модуль предзагрузки
require('./modules/preloader/preloader')();

let blog = require('./modules/blog/blogConstructor');

let load = require('./modules/load');

load(document.body, '../blog.json', (data) => {
    blog.init(data);
});

