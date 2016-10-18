'use strict';

// Модуль предзагрузки
require('./modules/preloader/preloader')();

let myMap = document.querySelector(".map");

let load = require('./modules/load');

load(myMap, '../map.json', (data) => {
    let styles = data;

    let styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    let mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(55.765405, 37.689795),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    let map = new google.maps.Map( myMap,
        mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
});
