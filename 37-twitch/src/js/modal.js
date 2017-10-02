const $modalOverlay = $('.overlay');
const $iframe = $('.modal__iframe');

function openModal() {
    const videoPrefix = 'https://www.youtube.com/embed/';
    const videoID = $(this).data('video-id');
    const iframeURL = `${videoPrefix}${videoID}`;

    $modalOverlay.show();
    $iframe.attr('src', iframeURL);
}

function closeModal() {
    $modalOverlay.hide();
}

function clickOutside(e) {
    if (this === e.target) {
        closeModal();
    }
}

$(document).ready(() => {
    $('.js-channel-card').on('click', '.channel-card__item', openModal);
    $('.js-close-btn').on('click', closeModal);
    $('.overlay').on('click', clickOutside);
});
