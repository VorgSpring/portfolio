'use strict';

let publicationButton = document.querySelector('.publication__navigation-button');

let publicationNavigation = document.querySelector('.publication__navigation');

let blogWrapper = document.querySelector('.wrapper');


publicationButton.addEventListener('click', () => {
    publicationNavigation.classList.toggle('shifted');
    blogWrapper.classList.toggle('shifted');
});
