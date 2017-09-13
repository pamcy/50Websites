const urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=20&type=video&order=viewCount&key= AIzaSyBIZ1kKJvH6NIJzefMXGiOd18tr-Bic9Z0';
const urlVideo = 'https://www.youtube.com/watch?v=';
const DOM = {
    $section: $('.channel-card'),
};

$.getJSON(urlApi, (data) => {
    let loadingContent = '';

    for (let i = 0; i < data.items.length; i += 1) {
        loadingContent += `
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

    DOM.$section.html(loadingContent);
});

