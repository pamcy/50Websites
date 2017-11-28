'use strict';

var number_field = $('.farthest__number');
var max_number = number_field.data('max-number');
var current_number = 0;

// Menu navigation
var toggleMenu = function toggleMenu() {
    $(undefined).parent().toggleClass('nav-is-open');
};

// Animate the farthest distance
var showNumber = function showNumber() {
    current_number += 195128740;
    number_field.html(current_number.toLocaleString() + ' km');
    animateNumber();
};

var animateNumber = function animateNumber() {
    if (current_number < max_number) {
        requestAnimationFrame(showNumber);
    } else {
        number_field.html(max_number.toLocaleString() + ' km');
    }
};

$(document).ready(function () {
    $('.nav__btn').on('click', toggleMenu);
    showNumber();
});