'use strict';

// Модуль предзагрузки
require('./modules/preloader/preloader')();

let inputLogin = document.querySelector('.authorization__login'),
    inputPassword = document.querySelector('.authorization__password'),
    formLogin = document.querySelector('.authorization__form'),
    validation = require('./modules/validation');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validation(inputLogin, 'authorization__login--invalid') && 
        validation(inputPassword, 'authorization__password--invalid')) {
        event.target.submit();
    }
});

inputLogin.addEventListener('focus', (event) => {
    if (event.target.classList.contains('authorization__login--invalid')) {
        event.target.classList.remove('authorization__login--invalid');
    }
});

inputPassword.addEventListener('focus', (event) => {
    if (event.target.classList.contains('authorization__login--invalid')) {
        event.target.classList.remove('authorization__login--invalid');
    }
});


