var menu_btn = document.querySelector(".main-header__menu-toggle");
var mobile_menu = document.querySelector(".main-nav");
var background = document.querySelector(".header-back");
var header = document.querySelector(".main-header");

document.addEventListener("DOMContentLoaded", function(event) {
	mobile_menu.classList.remove("main-nav--open");
	header.classList.remove("main-header--mobile");
	background.classList.remove("header-back--open");
});

menu_btn.addEventListener("click", function(event) {
	event.preventDefault();
	if(menu_btn.classList.contains("main-header__menu-open")){
		menu_btn.classList.remove("main-header__menu-open");
		mobile_menu.classList.add("main-nav--open");
		menu_btn.classList.add("main-header__menu-close");
		header.classList.add("main-header--mobile");
		background.classList.add("header-back--open");
	}
	else {
		menu_btn.classList.add("main-header__menu-open");
		mobile_menu.classList.remove("main-nav--open");
		menu_btn.classList.remove("main-header__menu-close");
		header.classList.remove("main-header--mobile");
		background.classList.remove("header-back--open");
	}
});
