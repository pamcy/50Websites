const topBtn = $('.to-top__btn');
const offset = 300;
const offsetOpacity = 1500;
const scrollSpeed = 800;

function scrollToTop(e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, scrollSpeed, 'swing');
}

function displayBtn() {
    const $this = $(this);

    if ($this.scrollTop() > offset) {
        topBtn.addClass('is-visible');
    } else {
        topBtn.removeClass('is-visible is-fadeout');
    }

    if ($this.scrollTop() > offsetOpacity) {
        topBtn.addClass('is-fadeout');
    }
}

$(document).ready(() => {
    $('.to-top__btn').on('click', scrollToTop);
    $(window).on('scroll', displayBtn);
});
