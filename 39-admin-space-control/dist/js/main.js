'use strict';

function toggleMenu() {
    $(this).parent().toggleClass('nav-is-active');
}

$(document).ready(function () {
    $('.nav__btn').on('click', toggleMenu);
});