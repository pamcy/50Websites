function toggleMenu() {
    $(this).siblings('.dropdown__list').slideToggle(400);
}

function selectCountry() {
    $('.dropdown__item').removeClass('is-selected');
    $(this).addClass('is-selected');
    $(this).parent().slideUp(400);
}

function closeMenu(e) {
    if ($(e.target).closest('.js-dropdown').length === 0) {
        $('.dropdown__list').slideUp(400);
    }
}

$('.js-dropdown').on('click', toggleMenu);
$('.dropdown__item').on('click', selectCountry);
$('body').on('click', closeMenu);
