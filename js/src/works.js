'use strict';

// Модуль предзагрузки
require('./modules/preloader/preloader')();

let load = require('./modules/load');

let inputName = document.querySelector('.contact-me__name'),
    inputEmail = document.querySelector('.contact-me__email'),
    inputMessage = document.querySelector('.contact-me__message'),
    formContact = document.querySelector('.contact-me__form'),
    sliderContainer = document.querySelector('.slider'),
    slider = require('./modules/slider'),
    validation = require('./modules/validation');

formContact.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validation(inputName, 'contact-me__name--invalid') &&
        validation(inputEmail, 'contact-me__email--invalid') &&
        validation(inputMessage, 'contact-me__message--invalid')) {
        event.target.submit();
    }
});

inputName.addEventListener('focus', (event) => {
    if (event.target.classList.contains('contact-me__name--invalid')) {
        event.target.classList.remove('contact-me__name--invalid');
    }
});

inputEmail.addEventListener('focus', (event) => {
    if (event.target.classList.contains('contact-me__email--invalid')) {
        event.target.classList.remove('contact-me__email--invalid');
    }
});

inputMessage.addEventListener('focus', (event) => {
    if (event.target.classList.contains('contact-me__message--invalid')) {
        event.target.classList.remove('contact-me__message--invalid');
    }
});

load(sliderContainer, '../works.json', (data) => {
    slider.init(data);
});
