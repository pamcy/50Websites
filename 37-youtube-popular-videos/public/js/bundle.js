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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadmore = __webpack_require__(1);

var _loadmore2 = _interopRequireDefault(_loadmore);

var _dropdown = __webpack_require__(11);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _modal = __webpack_require__(12);

var _modal2 = _interopRequireDefault(_modal);

var _scroll = __webpack_require__(13);

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
    $('.dropdown__item').on('click', _loadmore2.default.changeLanguage);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _en = __webpack_require__(2);

var _en2 = _interopRequireDefault(_en);

var _zhTW = __webpack_require__(3);

var _zhTW2 = _interopRequireDefault(_zhTW);

var _ja = __webpack_require__(4);

var _ja2 = _interopRequireDefault(_ja);

var _ko = __webpack_require__(5);

var _ko2 = _interopRequireDefault(_ko);

var _de = __webpack_require__(6);

var _de2 = _interopRequireDefault(_de);

var _es = __webpack_require__(7);

var _es2 = _interopRequireDefault(_es);

var _fr = __webpack_require__(8);

var _fr2 = _interopRequireDefault(_fr);

var _it = __webpack_require__(9);

var _it2 = _interopRequireDefault(_it);

var _ru = __webpack_require__(10);

var _ru2 = _interopRequireDefault(_ru);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i18N = {
    'zh-TW': _zhTW2.default,
    en: _en2.default,
    ja: _ja2.default,
    ko: _ko2.default,
    de: _de2.default,
    es: _es2.default,
    fr: _fr2.default,
    it: _it2.default,
    ru: _ru2.default
};

var DOM = {
    $section: $('.js-channel-card'),
    $sectionTitle: $('.main-section__title'),
    $loadingIcon: $('.channel-card__loader'),
    $imgWrapper: $('.channel-card__img-wrapper')
};
var language = 'zh-TW';
var region = 'tw';
var h2Title = i18N['zh-TW'].title;
var tokenID = '';
var isLoading = false; // 避免重複發多次 request

function displayVideo(data) {
    var loadContent = '';

    for (var i = 0; i < data.items.length; i += 1) {
        loadContent += '\n            <div class="channel-card__item" data-video-id="' + data.items[i].id + '">\n                <div class="channel-card__img-wrapper">\n                    <img src="' + data.items[i].snippet.thumbnails.high.url + '" class="channel-card__img">\n                </div>\n                <div class="channel-card__content">\n                    <h2 class="channel-card__heading">' + data.items[i].snippet.title.substr(0, 35) + '</h2>\n                    <h3 class="channel-card__subheading">' + data.items[i].snippet.channelTitle + '</h3>\n                </div>\n            </div>';
    }

    DOM.$section.append(loadContent);
}

function getVideo() {
    isLoading = true;

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        data: {
            key: 'AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0',
            part: 'snippet,statistics,topicDetails',
            chart: 'mostPopular',
            hl: language,
            regionCode: region,
            maxResults: 21,
            pageToken: tokenID
        }
    }).done(function (data) {
        tokenID = data.nextPageToken;

        if (data.items.length > 0) {
            displayVideo(data);
            isLoading = false;
            DOM.$loadingIcon.hide();
        } else {
            DOM.$loadingIcon.hide();
        }
    });
}

function loadMore() {
    if ($(window).height() + $(window).scrollTop() > $(document).height() - 100) {
        if (!isLoading) {
            DOM.$loadingIcon.show();
            getVideo();
        }
    }
}

function changeLanguage() {
    language = $(this).data('lang');
    region = $(this).data('region');
    h2Title = i18N['' + language].title;

    DOM.$sectionTitle.text(h2Title);
    DOM.$section.empty();
    getVideo();
}

$(document).ready(function () {
    getVideo();
    $(window).on('scroll', loadMore);
});

exports.default = {
    changeLanguage: changeLanguage
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'People in USA are watching...'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: '台灣人都在瘋這些影片...'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: '日本の人々が見ている...'
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: '한국의 사람들이보고있다....'
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'Die Leute in Deutschland schauen zu...'
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'La gente en españa está viendo...'
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'Les gens en France regardent...'
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'Persone in Italia stanno guardando...'
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    title: 'Люди в россии смотрят...'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// let countryTitle = 'Select Country';

function toggleMenu() {
    $(this).siblings('.dropdown__list').slideToggle(400);
}

function selectCountry() {
    var countryTitle = $(this).text();

    $('.dropdown__item').removeClass('is-selected');
    $(this).addClass('is-selected');
    $(this).parent().slideUp(400);
    $('.dropdown__text').text(countryTitle);
}

function closeMenu(e) {
    if ($(e.target).closest('.js-dropdown').length === 0) {
        $('.dropdown__list').slideUp(400);
    }
}

$('.js-dropdown').on('click', toggleMenu);
$('.dropdown__item').on('click', selectCountry);
$('body').on('click', closeMenu);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $modalOverlay = $('.overlay');
var $iframe = $('.modal__iframe');

function openModal() {
    var videoPrefix = 'https://www.youtube.com/embed/';
    var videoID = $(this).data('video-id');
    var iframeURL = '' + videoPrefix + videoID;

    $modalOverlay.show();
    $iframe.attr('src', iframeURL);
    $('body').addClass('modal-isOpen');
}

function closeModal() {
    $modalOverlay.hide();
    $('body').removeClass('modal-isOpen'); // Remove scrollbar
    $iframe.attr('src', ''); // Stop playing video
}

function clickOutside(e) {
    if (this === e.target) {
        closeModal();
    }
}

$(document).ready(function () {
    $('.js-channel-card').on('click', '.channel-card__item', openModal);
    $('.js-close-btn').on('click', closeModal);
    $('.overlay, .modal__content').on('click', clickOutside);
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var topBtn = $('.to-top__btn');
var offset = 300;
var offsetOpacity = 1500;
var scrollSpeed = 800;

function scrollToTop(e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, scrollSpeed, 'swing');
}

function displayBtn() {
    var $this = $(this);

    if ($this.scrollTop() > offset) {
        topBtn.addClass('is-visible');
    } else {
        topBtn.removeClass('is-visible is-fadeout');
    }

    if ($this.scrollTop() > offsetOpacity) {
        topBtn.addClass('is-fadeout');
    }
}

$(document).ready(function () {
    $('.to-top__btn').on('click', scrollToTop);
    $(window).on('scroll', displayBtn);
});

/***/ })
/******/ ]);