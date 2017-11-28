const number_field = $('.farthest__number');
const max_number = number_field.data('max-number');
let current_number = 0;

// Menu navigation
const toggleMenu = () => {
    $(this).parent().toggleClass('nav-is-open');
};

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

$(document).ready(() => {
    $('.nav__btn').on('click', toggleMenu);
    showNumber();
});
