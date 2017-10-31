const topBtn = $('.to-top-btn');

function toggleBtn() {
    const $this = $(this);
    const topHeight = 300;
    const opacityHeight = 1200;

    if ($this.scrollTop() > topHeight) {
        topBtn.addClass('is-visible');
    } else {
        topBtn.removeClass('is-visible is-fadeout');
    }

    if ($this.scrollTop() > opacityHeight) {
        topBtn.addClass('is-fadeout');
    }
}

function toTop(e) {
    const $body = $('body, html');
    const scrollSpeed = 800;

    e.preventDefault();
    $body.stop().animate({ scrollTop: 0 }, scrollSpeed, 'swing');
}

$(document).ready(() => {
    $(window).on('scroll', toggleBtn);
    topBtn.on('click', toTop);
});

