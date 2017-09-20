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
