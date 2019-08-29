'use strict';

let searchButton = document.querySelector(".mobile_search_button");
let	search = document.querySelector(".search_form");
let	mobileMenuButton = document.querySelector(".mobile_menu_button");
let	mainMenu = document.querySelector(".header_top");
let	mobileCatalogToggle = document.querySelector(".catalog_mobile_link");
let	catalogMenu = document.querySelector(".catalog_menu");
let	mobileCatalogToggleBorder = document.querySelector(".catalog_mobile_link span");
let filterList = document.getElementsByClassName("filter_bttn");


let filterButton = document.querySelector(".mobile_roll_down_filter_bttn");
let	filterBlock = document.querySelector(".mobile_roll_down_filter_block");

let countryFilterButton = document.querySelector(".mobile_roll_down_countries");
let	countryFilterBlock = document.querySelector(".brands_nav");


let switchDisplay = function(block) {
	event.preventDefault();
	if (!(block.classList.contains("show"))) {
		block.classList.add("show");
	} else {
		block.classList.remove("show");
	}
}

let switchDisplayFlex = function(block) {
	event.preventDefault();
	if (!(block.classList.contains("show_flex"))) {
		block.classList.add("show_flex");
	} else {
		block.classList.remove("show_flex");
	}
}

let switchDisplayFilter = function(block, button) {
	event.preventDefault();
	if (!(block.classList.contains("show"))) {
		block.classList.add("show");
		button.classList.add("filter_bttn_open_style");
	} else {
		block.classList.remove("show");
		button.classList.remove("filter_bttn_open_style");
	}
}

if (!!(filterList)) {
	for (let i = 0; i < filterList.length; i++) {
		let current = filterList[i];
		let filterBlock = current.nextElementSibling;
		current.addEventListener("click", function(event) {
			switchDisplayFilter(filterBlock,current);
		});
	}
}

if(!!(searchButton)) {
	searchButton.addEventListener("click", function(event) {
		switchDisplay(search);
	});
}

if(!!(mobileMenuButton)) {
	mobileMenuButton.addEventListener("click", function(event) {
		switchDisplay(mainMenu);
	});
}

if(!!(filterButton)) {
	filterButton.addEventListener("click", function(event) {
		switchDisplayFlex(filterBlock,filterButton);
		if (filterBlock.classList.contains("show_flex")) {
			filterButton.classList.add("open");
		} else {
			filterButton.classList.remove("open");
		}
	});
}

if(!!(countryFilterButton)) {
	countryFilterButton.addEventListener("click", function(event) {
		switchDisplayFlex(countryFilterBlock,countryFilterButton);
		if (countryFilterBlock.classList.contains("show_flex")) {
			countryFilterButton.classList.add("open");
		} else {
			countryFilterButton.classList.remove("open");
		}
	});
}

let brandMenuPoint = document.querySelectorAll(".brand_navigation_menu > li > a");
let brandSubmenuPoint = document.querySelectorAll(".brand_navigation_submenu");

for (let i = 0; i < brandMenuPoint.length; i++) {
	let currentPoint = brandMenuPoint[i];
	currentPoint.addEventListener("click", function(){
		for (let j = 0; j < brandSubmenuPoint.length; j++) {
			if (!!brandSubmenuPoint[j] && j != i) {
				brandSubmenuPoint[j].classList.remove("show_flex");
			}
			if (!!brandMenuPoint[j] && j != i) {
				brandMenuPoint[j].classList.remove("active");
			}
		}
		let currentSubmenu = currentPoint.closest("li").querySelector(".brand_navigation_submenu");
		if (!!currentSubmenu) {
			switchDisplayFlex(currentSubmenu);
			if (!(currentPoint.classList.contains("active"))) {
				currentPoint.classList.add("active");
			} else {
				currentPoint.classList.remove("active");
			}
		}
	});
}

mobileCatalogToggle.addEventListener("click", function(event) {
	event.preventDefault();
	if (!(catalogMenu.classList.contains("show"))) {
		catalogMenu.classList.add("show");
		mobileCatalogToggle.classList.add("dark_green");
		mobileCatalogToggleBorder.style.borderBottomWidth="0px";
	} else {
		catalogMenu.classList.remove("show");
		mobileCatalogToggle.classList.remove("dark_green");
		mobileCatalogToggleBorder.style.borderBottomWidth="1px";
	}
});

let textRollDownBttn = document.querySelector(".text_roll_down_bttn");
let textRollDownBlock = document.querySelector(".text_roll_down_block");


let formCheckoutBttn = document.querySelector(".cart_checkout_link");
let formCheckoutBlock = document.querySelector(".cart_checkout");

let rollTextOnClick = function(button, block) {
	event.preventDefault();
	block.classList.add("show");
	button.classList.add("hide");
}

if (!!(formCheckoutBttn)) {
	formCheckoutBttn.addEventListener("click", function(event){
		rollTextOnClick(formCheckoutBttn,formCheckoutBlock);
	});
}

if (!!(textRollDownBttn)) {
	textRollDownBttn.addEventListener("click", function(event){
		rollTextOnClick(textRollDownBttn,textRollDownBlock);
	});
}

let scrollButton = document.querySelector(".uptotop");

window.onscroll = function() {
	if (window.pageYOffset > 200) {
		scrollButton.classList.add("show");
	} else if (window.pageYOffset < 200) {
		scrollButton.classList.remove("show");
	}
}

let faqQuestion = document.querySelectorAll(".faq_question");

faqQuestion.forEach (function (item) {
	item.addEventListener("click", function(event) {
		let currentFaqAnswer = item.closest(".faq_item_container").querySelector(".faq_answer_js");
		let closeAnswer = currentFaqAnswer.querySelector(".faq_answer_close");
		
		if (currentFaqAnswer.classList.contains("hide")) {
			currentFaqAnswer.classList.remove("hide");
			currentFaqAnswer.style.height = "auto";
			var height = currentFaqAnswer.clientHeight + "px";
			currentFaqAnswer.style.height = "0px";
			setTimeout(() => {
				currentFaqAnswer.style.height = height;
			}, 0) ;
			currentFaqAnswer.style.borderBottom = "1px solid #e1e1e1";
			item.classList.add("open");
		} else {
			currentFaqAnswer.style.height = "0px";
			currentFaqAnswer.addEventListener('transitionend', () => {
				currentFaqAnswer.classList.add('hide');
				item.classList.remove("open");
			}, {once: true});
		}

		closeAnswer.addEventListener("click", function(event) {
			event.preventDefault();
			currentFaqAnswer.style.height = "0px";
			currentFaqAnswer.addEventListener('transitionend', () => {
				currentFaqAnswer.classList.add('hide');
				item.classList.remove("open");
			}, {once: true});
		});
	});
});


/* Pop-ups */

let overlayPopup = document.querySelector(".overlay");

let callBackBttnArr = document.querySelectorAll(".header_callmeback_window_link");
let callBackPopup = document.querySelector(".call_back_popup");

let buyBttnArr = document.querySelectorAll(".buy_bttn");
let productInCartPopup = document.querySelector(".product_in_cart_popup");

let buyFastBttnArr = document.querySelectorAll(".buy_in_one_click_bttn");
let buyFastPopup = document.querySelector(".buy_in_one_click");

let reportLowerBttnArr = document.querySelectorAll(".report_lower_link");
let reportLowerPopup = document.querySelector(".report_lower_popup");

let detailPageImg = document.querySelector(".detail_gallery_main_img img");

let initPopUp = function (popup, overlay) {
	let returnToShopping = popup.querySelector(".return_buy");
	let closeButtonPopup = popup.querySelector(".close_popup");
	let closePopup = function () {
		popup.classList.remove("show");
		overlay.classList.remove("show");
	}

	closeButtonPopup.addEventListener("click", function(event) {
		event.preventDefault();
		closePopup();
	});

	if (popup.querySelector(".return_buy")) {
		returnToShopping.addEventListener("click", function(event) {
			event.preventDefault();
			closePopup();
		});
	}

	overlay.addEventListener("click", function(event) {
		closePopup();
	});
	window.addEventListener("keydown", function(event) {
		if (event.keyCode===27) {
			closePopup();
		}
	});
};

let openPopup = function (popup) {
	popup.classList.add("show");
	overlayPopup.classList.add("show");
};

if (!!productInCartPopup)
	initPopUp(productInCartPopup, overlayPopup);

bindBuyBtn();

function bindBuyBtn()
{
	let buyBttnArr = document.querySelectorAll(".buy_bttn");
	if (buyBttnArr.length > 0) {
		for (let i = 0; i < buyBttnArr.length; i++) {

			let currentBtn = buyBttnArr[i];
			if (currentBtn.classList.contains('js-btn')) {
				continue;
			}
			let currentProduct = currentBtn.closest(".product_item_preview");
			let tableContainer = currentBtn.closest("body");
			let offerId = currentBtn.dataset.id;
			let currentProductName;
			currentBtn.classList.add('js-btn');

			if (offerId) {
				currentBtn.addEventListener("click", function (event) {
					event.preventDefault();
					let q = 1;
					let detail_text = currentBtn.closest('.detail_text');
					if (!!detail_text) {
						q = +detail_text.querySelector('.product_amount input').value;
					}
					fetch('/basket/add/' + offerId + '/' + q, {
						method: 'POST',
						headers: {
							'X-Requested-With': "XMLHttpRequest"
						},
						body: ''
					})
						.then(function (response) {
							return response.json();
						})
						.then(function (response) {
							document.querySelector('.header_basket_count').innerHTML = response.count;
						});

					if (!!currentProduct) {
						currentProductName = currentProduct.querySelector("h2 a").textContent;
					} else {
						currentProductName = tableContainer.querySelector("h1").textContent;
					}
					openPopup(productInCartPopup);
					productInCartPopup.querySelector(".pop_up_product_name").textContent = currentProductName;
				});
			}
		}
	}
}

if(buyFastBttnArr.length > 0) {
	initPopUp(buyFastPopup, overlayPopup);
	for (let i = 0; i < buyFastBttnArr.length; i++) {
		let currentBtn = buyFastBttnArr[i];
		let currentProduct = currentBtn.closest(".product_item_preview");
		let tableContainer = currentBtn.closest("body");
		let trContainer = currentBtn.closest("tr");
		let oneVariationContainer = currentBtn.closest(".product_price_no_variation_cart");
		let productInput = document.getElementById('one_click_buy_form_product');
		let quantityInput = document.getElementById('one_click_buy_form_quantity');
		let currentProductName;
		let currentProductImg;
		let currentProductPrice;
		currentBtn.addEventListener("click", function (event) {
			event.preventDefault();
			let dt = event.target.closest('.detail_text');
			if (!!productInput)
				productInput.value = event.target.dataset.id;
			if (!!quantityInput) {
				quantityInput.value = 1;
				if (!!dt) {
					quantityInput.value = dt.querySelector('.product_amount input').value;
				}
			}
			if (!!currentProduct) {
				currentProductName = currentProduct.querySelector("h2 a").textContent;
				currentProductImg = currentProduct.querySelector("img").src;
				currentProductPrice = currentProduct.querySelector(".preview_price span").textContent;
			} else if (!!trContainer) {
				currentProductName = tableContainer.querySelector("h1").textContent;
				currentProductImg = detailPageImg.src;
				currentProductPrice = trContainer.querySelector(".total_price_js").textContent;
			}
			else {
				currentProductName = tableContainer.querySelector("h1").textContent;
				currentProductImg = detailPageImg.src;
				currentProductPrice = oneVariationContainer.querySelector(".total_price_js").textContent;
			}
			openPopup(buyFastPopup);
			buyFastPopup.querySelector(".popup_product_title").textContent = currentProductName;
			buyFastPopup.querySelector("img").src = currentProductImg;
			buyFastPopup.querySelector(".preview_price span").textContent = currentProductPrice;
		});
	}
}

if(reportLowerBttnArr.length > 0) {
	initPopUp(reportLowerPopup, overlayPopup);
	for (let i = 0; i < reportLowerBttnArr.length; i++) {
		let currentBtn = reportLowerBttnArr[i];
		let currentProduct = currentBtn.closest(".collection_detail_info");
		let oneVariationContainer = currentBtn.closest(".product_price_no_variation_cart");
		let moreVariationContainer = currentBtn.closest(".product_price_variation_cart");
		let currentProductName;
		let currentProductImg;
		let currentProductPrice;
		currentBtn.addEventListener("click", function (event) {
			event.preventDefault();
			if (!!currentProduct) {
				currentProductName = document.body.querySelector("h1").textContent;
				currentProductImg = detailPageImg.src;
				if (!!oneVariationContainer) {
					currentProductPrice = oneVariationContainer.querySelector(".price_product_detail_m2").textContent;
				} else {
					currentProductPrice = moreVariationContainer.querySelector(".price_product_detail_m2").textContent;
				}
			}
			openPopup(reportLowerPopup);
			reportLowerPopup.querySelector(".popup_product_title").textContent = currentProductName;
			reportLowerPopup.querySelector("img").src = currentProductImg;
			reportLowerPopup.querySelector(".preview_price span").textContent = currentProductPrice;
			document.getElementById('suggest_price_form_product').value = event.target.dataset.id;
		});
	}
}

initPopUp(callBackPopup, overlayPopup);
for (let i = 0; i < callBackBttnArr.length; i++) {
	callBackBttnArr[i].addEventListener("click", function(event) {
		event.preventDefault();
		openPopup(callBackPopup);
	});
}

/*Gallery hover change*/

let galleryPreview = document.getElementsByClassName("detail_gallery_slider_item");
let galleryBig = document.querySelector(".detail_gallery_main_img");

if (!!(galleryBig)) {

	for (let i = 0; i < galleryPreview.length; i++) {
		let currentPreview = galleryPreview[i];
		currentPreview.addEventListener("mouseover", function() {
			let galleryBigPhoto = galleryBig.querySelector("img");
			galleryBigPhoto.src = currentPreview.href;
			galleryBig.href = currentPreview.href;
		});
	}

	galleryBig.addEventListener("click", function(event) {
		event.preventDefault();
		for (let i = 0; i < galleryPreview.length; i++) {
			let currentLink = galleryPreview[i].href;
			if(galleryBig.href == currentLink) {
				console.log(galleryBig.href, currentLink);
				galleryPreview[i].click();
				break;
			}
		}
	});
}

/* Calculations */

/*Make a space in big numbers (1 000 & 1 000.25) */

let addSpace = function (yourNumber) {
	let totalPriceArr;
	let reverseAndSpace = function (yourArray) {
		yourArray.reverse();
		for (let i = 3; i < yourArray.length; i += 4) {
			yourArray.splice(i, 0, " ");
		}
		yourArray.reverse();
		return yourArray;
	};
	if (yourNumber !== Math.round(yourNumber)) {
		totalPriceArr = String(yourNumber);
		let totalPriceArrSplit = totalPriceArr.split(".");
		totalPriceArr = totalPriceArrSplit[0].split("");
		reverseAndSpace(totalPriceArr);
		yourNumber = totalPriceArr.join("") + "." + totalPriceArrSplit[1];
	} else {
		totalPriceArr = String(yourNumber).split("");
		reverseAndSpace(totalPriceArr);
		yourNumber = totalPriceArr.join("");
	}
	return yourNumber;
};

let counterPlusBttn = document.getElementsByClassName("product_amount_control_plus");
let counterMinusBttn = document.getElementsByClassName("product_amount_control_minus");
let isBasket = document.getElementsByClassName("products_in_cart").length > 0;
//console.log(isBasket);
for (let i = 0; i < counterPlusBttn.length; i++) {
	let currentBtnPlus = counterPlusBttn[i];
	let currentBtnMinus = counterMinusBttn[i];

	let counterParent = currentBtnPlus.closest("div");
	let currentInput = counterParent.querySelector("input");

	let trParent = currentBtnPlus.closest("tr");
	let metersInPack;
	if (!!(trParent.querySelector(".packaging"))) {
		metersInPack = parseFloat(trParent.querySelector(".packaging").textContent);
	}
	let pricePack = (trParent.querySelector(".price_js").textContent).replace(/\s+/g, '');

	let countTotals = function(value) {
		if (!!metersInPack) {
			let totalM2 = metersInPack * value;
			if (totalM2 !== Math.round(totalM2)) {
				totalM2 = totalM2.toFixed(2);
			}
			totalM2 = addSpace(totalM2);
			trParent.querySelector(".total_m2_js").textContent = totalM2 + " м2";
		}
		let totalPrice = pricePack * value;
		if (totalPrice !== Math.round(totalPrice)) {
			totalPrice = totalPrice.toFixed(2);
		}
		totalPrice = addSpace(totalPrice);
		trParent.querySelector(".total_price_js").textContent = totalPrice;
	};

	let setBasketQuantityAjax = function(id, count)
	{
		fetch('/basket/set/' + id + '/' + count, {
			method: 'POST',
			headers: {
				'X-Requested-With': "XMLHttpRequest"
			},
			body: ''
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				//
			});
	};

	currentBtnPlus.addEventListener("click", function() {
		let valueInput = +currentInput.value;
		valueInput += 1;
		currentInput.value = valueInput;
		countTotals(valueInput);
		if (isBasket)
			setBasketQuantityAjax(currentInput.dataset.id, valueInput);
	});
	currentBtnMinus.addEventListener("click", function() {
		let valueInput = +currentInput.value;
		if (valueInput > 1) {
			valueInput -= 1;
			currentInput.value = valueInput;
			countTotals(valueInput);
			if (isBasket)
				setBasketQuantityAjax(currentInput.dataset.id, valueInput);
		}
	});

	currentInput.addEventListener("input", function(event) {
		let valueInput = +currentInput.value;
		countTotals(valueInput);
		if (isBasket)
			setBasketQuantityAjax(event.target.dataset.id, valueInput);
	});

}



/*sliders*/

if (!!(document.querySelector(".slider_main_page_inner"))) {
	let sliderMain = tns({
		container: '.slider_main_page_inner',
		items: 1,
		slideBy: 'page',
		controls: false,
		navPosition: 'bottom',
		autoplay: true,
		autoplayButtonOutput: false
	});
}

let slider = [];
let tabSliders = function() {
	let slidersList = document.getElementsByClassName("items_slider_js");
	for (let i = 0; i < slidersList.length; i++) {
		let sliderId = slidersList[i].id;
		let	nameSliderId = sliderId;
		slider.push(tns({
			container: '#' + nameSliderId,
			slideBy: 'page',
			nav: false,
			controlsText: ['',''],
			responsive: {
				1000: {
					items: 4
				},
				640: {
					fixedWidth: 290
				},
				470: {
					items: 3,
					controls: true,
					gutter: 15,
					edgePadding: 15,
				},
				300: {
					items: 2,
					fixedWidth: 144,
					controls: false,
					gutter: 10,
					edgePadding: 65,
				}
			},
		}));
	}
}

let sliderBrends = function() {
	tns({
		container: '.brends_slider',
		slideBy: 'page',
		nav: false,
		controlsText: ['',''],
		responsive: {
			620: {
				items: 6
			},
			470: {
				items: 4,
				fixedWidth: 190,
				gutter: 10,
				controls: true,
			},
			300: {
				items: 2,
				fixedWidth: 144,
				controls: false
			}
		},
	});
}

let sliderCertification = function() {
	tns({
		container: '.certification_slider',
		slideBy: 'page',
		nav: false,
		controlsText: ['',''],
		responsive: {
			620: {
				items: 6
			},
			470: {
				items: 4,
				fixedWidth: 190,
				gutter: 12,
				controls: true,
				edgePadding: 0
			},
			300: {
				items: 2,
				fixedWidth: 144,
				controls: false,
				gutter: 20,
				edgePadding: 10
			}
		},
	});
}

if (!!(document.querySelector(".detail_gallery_slider"))) {
	let sliderMain = tns({
		container: '.detail_gallery_slider',
		controls: false,
		rewind: true,
		//mode: 'gallery',
		nav: false,
		gutter: 16,
		slideBy: 1,
		mouseDrag: true,
		responsive: {
			620: {
				items: 6
			},
			470: {
				items: 4
			},
			300: {
				items: 3
			}
		},
	});
}



if (window.screen.width >= 470) {
	if (!!(document.querySelector(".brends_slider"))) {
		sliderBrends();
	}
	if (!!(document.querySelector(".certification_slider"))) {
		sliderCertification();
	}
	if (!!(document.querySelector(".items_slider_js"))) {
		tabSliders();
	}
}

/*Gallery sertification*/

if (!!(document.querySelector(".certification_slider"))) {
	WAMediaBox.lang = {
		prev: "Previous",
		next: "Next",
		close: "Close",
	};

	WAMediaBox.bindAll(document.querySelector(".certification_slider"));
}

if (!!(document.querySelector(".detail_gallery"))) {
	WAMediaBox.lang = {
		prev: "Previous",
		next: "Next",
		close: "Close",
	};
	WAMediaBox.bindAll(document.querySelector(".detail_gallery_slider"));
}


if (!!(document.querySelector(".gratitude_link"))) {
	WAMediaBox.lang = {
		prev: "Previous",
		next: "Next",
		close: "Close",
	};
	WAMediaBox.bind(document.querySelector(".gratitude_link"));
}


window.addEventListener("resize", function() {
	if (innerWidth >= 470) {
		slider_not_mobile();
	}
	console.log(innerWidth);
}, false);


/* toggle */


function openTab(evt, cityName) {
	event.preventDefault();
	// Declare all letiables
	let i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tab_content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].classList.remove("show");
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("selection_toggle_bttn");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	//document.getElementById(cityName).style.display = "block";
	let currentTab = document.getElementById(cityName);
	currentTab.classList.add("show");
	evt.currentTarget.className += " active";
}


/*phone number mask*/

let element = document.querySelectorAll('.phone_number_mask_js');
let maskOptions = {
  mask: '+{7}(000)000-00-00',
  lazy: false
};
for (let i = 0; i < element.length; i++) {
	let currentElement = element[i];
	let mask = IMask(currentElement, maskOptions);
}

/* Fix refill in input with * in placeholder */

let containerInputCustomPlaceholder = document.querySelectorAll('.required_input_holder');

containerInputCustomPlaceholder.forEach( function(element) {
	let input = element.querySelector('.form_input');
	let label = element.querySelector('label');

	if (input.value) {
		label.classList.add('hide');
	}

	input.addEventListener('change', function () {
		if (input.value) {
			label.classList.add('hide');
		} else {
			label.classList.remove('hide');
		}
	});
});