import likeBtn from './like-btn';

const loadBtn = $('.loadmore__link');
const loadIcon = $('.loadmore__svg');
const contentSection = $('.overlap-card');

function loadContent(e) {
    e.preventDefault();

    loadIcon.addClass('icon-is-loading');

    $.ajax({
        url: 'public/ajax-3-column.html',
    })
        .done((data) => {
            contentSection.append(data);
            loadIcon.removeClass('icon-is-loading');
            // likeBtn.toggleLike();
        });
}

$(function () {
    loadBtn.on('click', loadContent);
});

