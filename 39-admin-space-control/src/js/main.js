function toggleMenu() {
    $(this).parent().toggleClass('nav-is-active');
}

$(document).ready(() => {
    $('.nav__btn').on('click', toggleMenu);
});
