function toggleFilterMenu() {
    $(this).parent().toggleClass('menu-is-open');
}

$('.filter-hamburger-btn').on('click', toggleFilterMenu);
