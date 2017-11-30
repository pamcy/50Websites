'use strict';

var number_field = $('.farthest__number');
var max_number = number_field.data('max-number');
var nav_is_open = false;
var current_number = 0;

// Menu navigation
function toggleMenu() {
    var nav_btn = $('.nav__btn');
    var nav_list = $('.nav__list');

    nav_is_open = !nav_is_open;
    $(this).parent().toggleClass('nav-is-open');

    if (nav_is_open) {
        nav_btn.attr('aria-expanded', true);
        nav_list.attr('aria-hidden', false);
    } else {
        nav_btn.attr('aria-expanded', false);
        nav_list.attr('aria-hidden', true);
    }
}

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

// Tab section
function changeTab(e) {
    e.preventDefault();

    var $this = $(this);
    var tab = $this.attr('href');

    $('.tab__link').attr('aria-selected', false);
    $('.tab-panel').attr('aria-hidden', true);

    $this.attr('aria-selected', true);
    $('' + tab).attr('aria-hidden', false);
}

$(document).ready(function () {
    $('.nav__btn').on('click', toggleMenu);
    $('.tab__link').on('click', changeTab);
    showNumber();
});