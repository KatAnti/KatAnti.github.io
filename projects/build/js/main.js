'use strict';

(function () {
  var buttonMobile = document.querySelector('.catalog__mobile-filter');
  var filter = document.querySelector('.catalog__filter');
  var buttonCloseFilter = document.querySelector('.catalog__filter-close');

  if (filter && buttonMobile && buttonCloseFilter) {
    filter.classList.add('catalog__filter--hide');

    buttonMobile.addEventListener('click', function (evt) {
      evt.preventDefault();
      filter.classList.remove('catalog__filter--hide');
      buttonMobile.classList.add('catalog__mobile-filter--hide');
    });

    buttonCloseFilter.addEventListener('click', function (evt) {
      evt.preventDefault();
      filter.classList.add('catalog__filter--hide');
      buttonMobile.classList.remove('catalog__mobile-filter--hide');
    });
  }
})();

'use strict';

(function () {
  var mobileWidth = window.matchMedia('(max-width: 768px)');
  var body = document.querySelector('.body');
  var header = body.querySelector('.header');
  var menu = header.querySelector('.main-nav');
  var menuToggle = header.querySelector('.header__mobile-menu-btn');
  var logo = header.querySelector('.header__logo');
  var basket = header.querySelector('.header__basket-link');

  menu.classList.remove('main-nav--nojs');
  header.classList.remove('header--nojs');
  logo.classList.remove('header__logo--nojs');
  basket.classList.remove('header__basket-link--nojs');

  var toggleMobileMenu = function () {
    body.classList.toggle('body--overflow');
    menu.classList.toggle('main-nav--open');
    header.classList.toggle('header--beige');
    logo.classList.toggle('header__logo--white');
    basket.classList.toggle('header__basket-link--white');
  };

  menuToggle.addEventListener('click', function () {
    toggleMobileMenu();
  });

  var isIos = function () {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  };
  console.log(isIos());
  if (!isIos()) {
    mobileWidth.addEventListener('change', function () {
      if (!mobileWidth.matches && menu.classList.contains('main-nav--open')) {
        toggleMobileMenu();
      }
    });
  }

})();

'use strict';

(function () {
  var ESCAPE = 'Escape';

  var pageBody = document.querySelector('.body');

  var cartPopup = pageBody.querySelector('.cart-popup');
  var addToCartBtn = pageBody.querySelector('.product-detail__cart-btn');

  var loginPopup = pageBody.querySelector('.login-popup');
  var loginBtn = pageBody.querySelector('.header__login-link');
  var loginMobileBtn = pageBody.querySelector('.main-nav__login-link');

  var overlay = pageBody.querySelector('.body__overlay');

  var storageEmail = localStorage.getItem('email');

  if (loginPopup) {
    var emailInput = loginPopup.querySelector('#login-email');
  }

  if (cartPopup || loginPopup) {
    var closeButtons = pageBody.querySelectorAll('.popup__close-button');
  }

  var onEscKeypress = function (evt) {
    if (evt.key === ESCAPE) {
      var currentPopup = pageBody.querySelector('.popup--show');
      closePopup(currentPopup);
    }
  };

  var closePopup = function (popup) {
    popup.classList.remove('popup--show');
    overlay.classList.remove('body__overlay--show');
    pageBody.classList.remove('body--overflow');

    document.removeEventListener('keydown', onEscKeypress);
  };

  var openPopup = function (popup) {
    popup.classList.add('popup--show');
    overlay.classList.add('body__overlay--show');
    pageBody.classList.add('body--overflow');

    document.addEventListener('keydown', onEscKeypress);
  };

  var setEmail = function () {
    emailInput.focus();

    if (storageEmail) {
      emailInput.value = storageEmail;
    }
  };

  if (closeButtons) {
    closeButtons.forEach(function (closeButton) {
      closeButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        var currentPopup = evt.target.closest('.popup');
        closePopup(currentPopup);
      });
    });
  }

  if (addToCartBtn && cartPopup && overlay) {
    addToCartBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(cartPopup);
    });


    overlay.addEventListener('click', function (evt) {
      if (evt.target === overlay) {
        closePopup(cartPopup);
      }
    });
  }

  if (loginBtn && loginPopup && overlay) {
    loginBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(loginPopup);
      setEmail();
    });

    loginMobileBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(loginPopup);
      setEmail();
    });

    overlay.addEventListener('click', function (evt) {
      if (evt.target === overlay) {
        closePopup(cartPopup);
      }
    });

    loginPopup.addEventListener('submit', function () {
      if (emailInput.value) {
        localStorage.setItem('email', emailInput.value);
      }
    });
  }
})();

'use strict';

(function () {
  var mobileWidth = window.matchMedia('(max-width: 768px)');
  var sliderContainer = document.querySelector('.swiper-container');
  var mobileCounter = document.querySelector('.swiper-count-mobile');

  var swiper = new window.Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 30,
    init: false,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  });

  var setSlidesCounter = function () {
    var bullets = Array.from(document.querySelectorAll('.swiper-pagination-bullet'));
    var currentDots = document.querySelector('.swiper-count-mobile__current');
    var totalDots = document.querySelector('.swiper-count-mobile__total');
    var countOfActiveBullet = bullets.findIndex(function (item) {
      return item.classList.contains('swiper-pagination-bullet-active');
    }) + 1;


    totalDots.textContent = bullets.length;
    currentDots.textContent = countOfActiveBullet;
  };

  swiper.init();

  if (sliderContainer) {
    setSlidesCounter();

    if (mobileWidth.matches) {
      mobileCounter.classList.add('swiper-count-mobile--show');
    }

    mobileWidth.addEventListener('change', function () {
      setSlidesCounter();

      if (!mobileWidth.matches) {
        mobileCounter.classList.remove('swiper-count-mobile--show');
      } else {
        mobileCounter.classList.add('swiper-count-mobile--show');
      }
    });

    swiper.on('slideChangeTransitionEnd', function () {
      setSlidesCounter();
    });
  }

})();

'use strict';

(function () {
  var tabs = document.querySelectorAll('.tab');
  var tabsContents = document.querySelectorAll('.tab-content');

  tabsContents.forEach(function (tab) {
    if (!tab.classList.contains('tab-content--start-open')) {
      tab.classList.add('tab-content--hide');
    }
  });

  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (evt) {
        evt.preventDefault();
        tab.classList.toggle('tab--open');
        tab.parentNode.querySelector('.tab-content').classList.toggle('tab-content--hide');
      });
    });
  }

})();
