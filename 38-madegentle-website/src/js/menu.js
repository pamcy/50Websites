const $openBtn = $('#js-hamburger');
const $header = $('.header');

function toggleMenu() {
    $header.toggleClass('menu-is-open');
}

$openBtn.on('click', toggleMenu);
