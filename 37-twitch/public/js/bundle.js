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

const i18n = __webpack_require__(1);
i18n.keys().forEach(i18n);

const loadMore = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en.js": 2,
	"./zh-TW.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (!window.i18N) {
    window.i18N = {};
}

window.i18N['en'] = {
    title: 'Popular Videos',
};



/***/ }),
/* 3 */
/***/ (function(module, exports) {

if (!window.i18N) {
    window.i18N = {};
}

window.i18N['zh-TW'] = {
    title: '最受歡迎影片',
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const DOM = {
    $section: $('.channel-card'),
    $sectionTitle: $('.main-section__title'),
    $loadingIcon: $('.channel-card__loader'),
    $imgWrapper: $('.channel-card__img-wrapper'),
};

let language = 'zh-TW';
let region = 'tw';
let h2Title = window.i18N['zh-TW'].title;
let tokenID = '';
let isLoading = false; // 避免重複發多次 request

console.log(h2Title);
function displayVideo(data) {
    const urlVideo = 'https://www.youtube.com/watch?v=';
    let loadContent = '';

    for (let i = 0; i < data.items.length; i += 1) {
        loadContent += `
            <a href="${urlVideo}${data.items[i].id.videoId}"class="channel-card__link" target="_blank">
                <div class="channel-card__item">
                    <div class="channel-card__img-wrapper">
                        <img src="${data.items[i].snippet.thumbnails.high.url}" class="channel-card__img">
                    </div>
                    <div class="channel-card__content">
                        <img src="imgs/avatar.png" alt="" class="channel-card__avatar">
                        <div class="channel-card__container">
                            <h2 class="channel-card__heading">${data.items[i].snippet.title}</h2>
                            <h3 class="channel-card__subheading">${data.items[i].snippet.channelTitle}</h3>
                        </div>
                    </div>
                </div>
            </a>`;
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
            pageToken: tokenID,
        },
    })
        .done((data) => {
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

function changeLanguage(e) {
    e.preventDefault();

    language = $(this).data('lang');
    region = $(this).data('region');
    h2Title = window.i18N[`${language}`].title;

    DOM.$sectionTitle.text(h2Title);
    DOM.$section.empty();
    getVideo();
}

$(document).ready(() => {
    getVideo();
    $(window).on('scroll', loadMore);
    $('.menu-lang__link').on('click', changeLanguage);
});


/***/ })
/******/ ]);