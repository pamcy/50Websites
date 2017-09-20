const DOM = {
    $section: $('.channel-card'),
    $sectionTitle: $('.main-section__title'),
    $loadingIcon: $('.channel-card__loader'),
    $imgWrapper: $('.channel-card__img-wrapper'),
};
let tokenID = '';
let isLoading = false; // 避免重複發多次 request
// const keyID = 'AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0';
// const api = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=21&type=video&order=viewCount&key=${keyID}&pageToken=`;
// let url = '';



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

// function getVideo() {
//     url = api + tokenID;
//     isLoading = true;

//     $.getJSON(url, (data) => {
//         tokenID = data.nextPageToken;

//         if (data.items.length > 0) {
//             displayVideo(data);
//             isLoading = false;
//             DOM.$loadingIcon.hide();
//             console.log('display');
//         } else {
//             DOM.$loadingIcon.hide();
//         }

//         // console.log(`url:${url}`);
//         // console.log(`tokenID:${tokenID}`);
//     });
// }

function getVideo(lang, region) {
    isLoading = true;

    if (!lang) {
        lang = 'zh-TW';
        region = 'tw';
    }

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        data: {
            key: 'AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0',
            part: 'snippet,statistics,topicDetails',
            chart: 'mostPopular',
            hl: lang,
            regionCode: region,
            maxResults: 21,
            pageToken: tokenID,
        },
    })
        .done((data) => {
            // console.log(data);

            tokenID = data.nextPageToken;

            if (data.items.length > 0) {
                displayVideo(data);
                isLoading = false;
                DOM.$loadingIcon.hide();
                console.log('display');
            } else {
                DOM.$loadingIcon.hide();
            }
        });
}

function changeLanguage(e) {
    const currentLink = $(this);
    const $language = currentLink.data('lang');
    const $region = currentLink.data('region');
    const $content = window.i18N[`${$language}`].title;

    e.preventDefault();

    // $('.menu-lang__link').removeClass('is-selected');
    // currentLink.addClass('is-selected');
    // console.log(currentLink);

    DOM.$sectionTitle.text($content);
    DOM.$section.empty();
    getVideo($language, $region);
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

$(document).ready(() => {
    getVideo();
    $(window).on('scroll', loadMore);
    $('.menu-lang__link').on('click', changeLanguage);
});
