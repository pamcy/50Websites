$(document).ready(() => {
    // WOW Plugin
    new WOW().init();

    $('#js-single-slick').slick({
        slidesToShow: 1,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
    });

    $('#js-hero-slick').slick({
        autoplay: true,
        autoplaySpeed: 2500,
        appendArrows: '.hero-carousel__arrow-btns',
        prevArrow: '<button class="hero-carousel__arrow-btn hero-carousel__left-arrow-btn"><i class="icon-navigate_before hero-carousel__arrow-icon"></i></button>',
        nextArrow: '<button class="hero-carousel__arrow-btn hero-carousel__right-arrow-btn"><i class="icon-navigate_next hero-carousel__arrow-icon"></i></button>',
    });
});