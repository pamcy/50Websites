const number_field = $('.farthest__number');
const max_number = number_field.data('max-number');
let current_number = 0;

// Menu navigation
function toggleMenu() {
    console.log('ok');
    $(this).parent().toggleClass('nav-is-open');
}

// Animate the farthest distance
const showNumber = () => {
    current_number += 195128740;
    number_field.html(`${current_number.toLocaleString()} km`);
    animateNumber();
};

const animateNumber = () => {
    if (current_number < max_number) {
        requestAnimationFrame(showNumber);
    } else {
        number_field.html(`${max_number.toLocaleString()} km`);
    }
};

// Tab section
function changeTab(e) {
    e.preventDefault();

    const $this = $(this);
    const tab = $this.attr('href');

    $('.tab__link').attr('aria-selected', false);
    $('.tab-panel').attr('aria-hidden', true);

    $this.attr('aria-selected', true);
    $(`${tab}`).attr('aria-hidden', false);
}

$(document).ready(() => {
    $('.nav__btn').on('click', toggleMenu);
    $('.tab__link').on('click', changeTab);
    showNumber();
});
