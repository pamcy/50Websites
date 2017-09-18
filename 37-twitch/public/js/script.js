'use strict';

var DOM = {
    $section: $('.channel-card'),
    $loadingIcon: $('.channel-card__loader'),
    $imgWrapper: $('.channel-card__img-wrapper')
};
var keyID = 'AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0';
var api = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=21&type=video&order=viewCount&key=' + keyID + '&pageToken=';
var urlVideo = 'https://www.youtube.com/watch?v=';
var url = '';
var tokenID = '';
var isLoading = false; // 避免重複發多次 request

function displayVideo(data) {
    var loadContent = '';

    for (var i = 0; i < data.items.length; i += 1) {
        loadContent += '\n            <a href="' + urlVideo + data.items[i].id.videoId + '"class="channel-card__link" target="_blank">\n                <div class="channel-card__item">\n                    <div class="channel-card__img-wrapper">\n                        <img src="' + data.items[i].snippet.thumbnails.high.url + '" class="channel-card__img">\n                    </div>\n                    <div class="channel-card__content">\n                        <img src="imgs/avatar.png" alt="" class="channel-card__avatar">\n                        <div class="channel-card__container">\n                            <h2 class="channel-card__heading">' + data.items[i].snippet.title + '</h2>\n                            <h3 class="channel-card__subheading">' + data.items[i].snippet.channelTitle + '</h3>\n                        </div>\n                    </div>\n                </div>\n            </a>';
    }

    DOM.$section.append(loadContent);
}

function getVideo() {
    url = api + tokenID;
    isLoading = true;

    $.getJSON(url, function (data) {
        tokenID = data.nextPageToken;

        if (data.items.length > 0) {
            displayVideo(data);
            isLoading = false;
            DOM.$loadingIcon.hide();
            console.log('display');
        } else {
            DOM.$loadingIcon.hide();
        }

        // console.log(`url:${url}`);
        // console.log(`tokenID:${tokenID}`);
    });
}

function loadMore() {
    // console.log('scrollTop : ' + $(window).scrollTop());
    // console.log($(window).height());
    // console.log('document height : ' + $(document).height());

    if ($(window).height() + $(window).scrollTop() > $(document).height() - 100) {
        if (!isLoading) {
            DOM.$loadingIcon.show();
            getVideo();
            console.log('Get api');
        }
    }
}

$(document).ready(function () {
    getVideo();
    $(window).on('scroll', loadMore);
});