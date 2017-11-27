'use strict';

function toggleMenu() {
    $(this).parent().toggleClass('nav-is-open');
}

$(document).ready(function () {
    $('.nav__btn').on('click', toggleMenu);
});