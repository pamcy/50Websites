const $grid = $('.js-filter-grid');
const $hamBtn = $('.filter-hamburger-btn');
const $menuItem = $('.filter-menu__nav-item');

function toggleFilterMenu() {
    $(this).parent().toggleClass('menu-is-open');
}

function filterMenu(e) {
    e.preventDefault();

    const $value = $(this).attr('data-filter');

    $grid.isotope({
        filter: `${$value}`,
    });

    $menuItem.removeClass('menu-is-select');
    $(this).addClass('menu-is-select');
}

$(window).on('load', () => {
    // init Isotope
    if ($grid.length > 0) {
        $grid.isotope({
            layoutMode: 'masonry',
            itemSelector: '.overlap-card__item',
            transitionDuration: '0.7s',
        });
    }

    $hamBtn.on('click', toggleFilterMenu);
    $menuItem.on('click', filterMenu);
});

