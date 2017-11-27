function toggleMenu() {
    $(this).parent().toggleClass('nav-is-open');
}

$(document).ready(() => {
    $('.nav__btn').on('click', toggleMenu);
});
