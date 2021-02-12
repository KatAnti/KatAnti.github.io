'use strict';

var menu = document.querySelector('.main-nav');
var menuToggle = document.querySelector('.header__menu-button');
var logoWrapper = document.querySelector('.header__logo-wrapper');
var body = document.querySelector('body');

menu.classList.remove('main-nav--nojs');
menuToggle.classList.remove('header__menu-button--nojs');
logoWrapper.classList.remove('header__logo-wrapper--nojs');

var toggleMobileMenu = function () {
  menu.classList.toggle('main-nav--closed');
  logoWrapper.classList.toggle('header__logo-wrapper--open');
  menuToggle.classList.toggle('header__menu-button--open');
  menuToggle.classList.toggle('header__menu-button--close');
  body.classList.toggle('body--overflow');
};

menuToggle.addEventListener('click', function () {
  toggleMobileMenu();
});


menu.addEventListener('click', function (evt) {
  if (evt.target.matches('a') && !menu.classList.contains('main-nav--closed')) {
    toggleMobileMenu();
  }
});
