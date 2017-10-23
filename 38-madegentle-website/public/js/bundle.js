/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isLiked = false;

function toggleLike(e) {
    e.preventDefault();

    var $target = $(this);
    var $likeIcon = $target.find('.overlap-card__like-icon');
    var $numberField = $target.find('.overlap-card__like-number');
    var $numberValue = $numberField.text();
    var $totalNumber = parseInt($numberValue, 10);

    isLiked = !isLiked;

    if (isLiked) {
        $likeIcon.removeClass('icon-favorite_border').addClass('icon-favorite');
        $target.addClass('is-liked');
        $numberField.text($totalNumber += 1);
    } else {
        $likeIcon.removeClass('icon-favorite').addClass('icon-favorite_border');
        $target.removeClass('is-liked');
        $numberField.text($totalNumber -= 1);
    }
}

$('.js-filter-grid').on('click', '.overlap-card__like', toggleLike);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mainMenu = __webpack_require__(2);

var _mainMenu2 = _interopRequireDefault(_mainMenu);

var _form = __webpack_require__(3);

var _form2 = _interopRequireDefault(_form);

var _carousel = __webpack_require__(4);

var _carousel2 = _interopRequireDefault(_carousel);

var _typing = __webpack_require__(5);

var _typing2 = _interopRequireDefault(_typing);

var _likeBtn = __webpack_require__(0);

var _likeBtn2 = _interopRequireDefault(_likeBtn);

var _filter = __webpack_require__(6);

var _filter2 = _interopRequireDefault(_filter);

var _loadmore = __webpack_require__(7);

var _loadmore2 = _interopRequireDefault(_loadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $openBtn = $('#js-hamburger');
var $header = $('.header');

function toggleMenu() {
    $header.toggleClass('menu-is-open');
}

$openBtn.on('click', toggleMenu);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $input = $('.contact-form__input');

function moveUp() {
    $(this).siblings().addClass('input-is-focus');
}

function moveDown() {
    var $this = $(this);

    if ($this.val() === '') {
        $this.siblings().removeClass('input-is-focus');
    }
}

$input.on('focus', moveUp);
$input.on('blur', moveDown);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {
    $('#js-single-slick').slick({
        slidesToShow: 1,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true
    });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {
    $('#js-typeit').typeIt({
        strings: ['Modern Combination', 'Creative Solutions'],
        speed: 100,
        breakDelay: 750,
        breakLines: false,
        autoStart: true,
        startDelay: 250,
        loop: true
    });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $grid = $('.js-filter-grid');
var $hamBtn = $('.filter-hamburger-btn');
var $menuItem = $('.filter-menu__nav-item');

function toggleFilterMenu() {
    $(this).parent().toggleClass('menu-is-open');
}

function filterMenu(e) {
    e.preventDefault();

    var $value = $(this).attr('data-filter');

    $grid.isotope({
        filter: '' + $value
    });

    $menuItem.removeClass('menu-is-select');
    $(this).addClass('menu-is-select');
}

$(window).on('load', function () {
    // init Isotope
    if ($grid.length > 0) {
        $grid.isotope({
            layoutMode: 'masonry',
            itemSelector: '.overlap-card__item',
            transitionDuration: '0.7s'
        });
    }

    $hamBtn.on('click', toggleFilterMenu);
    $menuItem.on('click', filterMenu);
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $loadBtn = $('.loadmore__link');
var $loadIcon = $('.loadmore__svg');
var $contentSection = $('.overlap-card');

function loadContent(e) {
    e.preventDefault();

    $loadIcon.addClass('icon-is-loading');

    $.ajax({
        url: 'public/ajax-3-column.html'
    }).done(function (data) {
        // $contentSection.isotope('insert', $(data));
        // layout Isotope after each image loads
        $contentSection.isotope('insert', $(data)).imagesLoaded().progress(function () {
            $contentSection.isotope('layout');
            $loadIcon.removeClass('icon-is-loading');
        });
    });
}

$(window).on('load', function () {
    $loadBtn.on('click', loadContent);
});

/***/ })
/******/ ]);