'use strict';
// Модуль корректного отображения тега "picture"
require('picturefill');
// Модуль корректной вставки изображений из svg спрайта
require('svgxuse');

// Модуль предзагрузки
require('./modules/preloader/preloader')();

/**
 * URL стиля для карты
 * @constant {number}
 */
const MAP_STYLES = '../map.json';

/**
 * Контейнер карты
 * @type {HTMLElement}
 */
let myMap = document.querySelector(".map");

// Получает стиль для карты по XMLHttpRequest
let load = require('./modules/load');

load(myMap, MAP_STYLES, (styles) => {
    let styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    let mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(55.765405, 37.689795),
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    let map = new google.maps.Map( myMap,
        mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
});
