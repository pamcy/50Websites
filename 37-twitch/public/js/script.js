'use strict';

var api = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=20&type=video&order=viewCount&key= AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0&pageToken=';
var urlVideo = 'https://www.youtube.com/watch?v=';
var DOM = {
    $section: $('.channel-card')
};
var url = '';
var tokenID = '';

function displayVideo(data) {
    var loadContent = '';

    for (var i = 0; i < data.items.length; i += 1) {
        loadContent += '\n            <a href="' + urlVideo + data.items[i].id.videoId + '"class="channel-card__link" target="_blank">\n                <div class="channel-card__item">\n                    <img src="' + data.items[i].snippet.thumbnails.high.url + '" class="channel-card__img">\n                    <div class="channel-card__content">\n                        <img src="imgs/avatar.png" alt="" class="channel-card__avatar">\n                        <div class="channel-card__container">\n                            <h2 class="channel-card__heading">' + data.items[i].snippet.title + '</h2>\n                            <h3 class="channel-card__subheading">' + data.items[i].snippet.channelTitle + '</h3>\n                        </div>\n                    </div>\n                </div>\n            </a>';
    }

    DOM.$section.append(loadContent + '<hr>');
    $('body').css('overflow', 'auto'); // Show scroll
}

function getVideo() {
    url = api + tokenID;

    $.getJSON(url, function (data) {
        tokenID = data.nextPageToken;

        console.log(data.items.length);
        if (data.items.length !== 0) {
            displayVideo(data);
        }

        console.log('url:' + url);
        console.log('tokenID:' + tokenID);
    });
}

function loadMore() {
    // console.log('scrollTop : ' + $(window).scrollTop());
    // console.log($(window).height());
    // console.log('document height : ' + $(document).height());

    if ($(window).height() + $(window).scrollTop() > $(document).height() - 100) {
        $('body').css('overflow', 'hidden'); // Hide scroll 避免一直觸發呼叫function
        getVideo();
    }
}

$(document).ready(function () {
    getVideo();
    $(window).on('scroll', loadMore);
});