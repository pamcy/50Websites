const api = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=20&type=video&order=viewCount&key= AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0&pageToken=';
const urlVideo = 'https://www.youtube.com/watch?v=';
const DOM = {
    $section: $('.channel-card'),
    $loadingIcon: $('.channel-card__loader'),
};
let url = '';
let tokenID = '';

function displayVideo(data) {
    let loadContent = '';

    for (let i = 0; i < data.items.length; i += 1) {
        loadContent += `
            <a href="${urlVideo}${data.items[i].id.videoId}"class="channel-card__link" target="_blank">
                <div class="channel-card__item">
                    <img src="${data.items[i].snippet.thumbnails.high.url}" class="channel-card__img">
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

    DOM.$section.append(loadContent + '<hr>');
    $('body').css('overflow', 'auto'); // Show scroll
    DOM.$loadingIcon.hide();
    // console.log('hide');
}

function getVideo() {
    url = api + tokenID;

    $.getJSON(url, (data) => {
        tokenID = data.nextPageToken;

        // console.log(data.items.length);
        if (data.items.length !== 0) {
            displayVideo(data);
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
        $('body').css('overflow', 'hidden'); // Hide scroll 避免一直觸發呼叫function
        // console.log('show');
        DOM.$loadingIcon.show();
        getVideo();
    }
}

$(document).ready(() => {
    getVideo();
    $(window).on('scroll', loadMore);
});

