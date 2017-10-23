const $loadBtn = $('.loadmore__link');
const $loadIcon = $('.loadmore__svg');
const $contentSection = $('.overlap-card');

function loadContent(e) {
    e.preventDefault();

    $loadIcon.addClass('icon-is-loading');

    $.ajax({
        url: 'public/ajax-3-column.html',
    })
        .done((data) => {
            // $contentSection.isotope('insert', $(data));
            // layout Isotope after each image loads
            $contentSection.isotope('insert', $(data)).imagesLoaded().progress(() => {
                $contentSection.isotope('layout');
                $loadIcon.removeClass('icon-is-loading');
            });
        });
}

$(window).on('load', () => {
    $loadBtn.on('click', loadContent);
});
