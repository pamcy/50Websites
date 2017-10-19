const $likeBtn = $('.overlap-card__like');
let isLiked = false;

function addLike(e) {
    e.preventDefault();

    const $target = $(this);
    const $likeIcon = $target.find('.overlap-card__like-icon');
    const $numberField = $target.find('.overlap-card__like-number');
    const $numberValue = $numberField.text();
    let $totalNumber = parseInt($numberValue, 10);

    isLiked = !isLiked;

    if (isLiked) {
        $likeIcon.removeClass('icon-favorite_border').addClass('icon-favorite');
        $target.addClass('is-liked');
        $numberField.text($totalNumber += 1);
    } else {
        $likeIcon.removeClass('icon-favorite').addClass('icon-favorite_border');
        $target.removeClass('is-liked');
        $numberField.text($totalNumber -= 1);
    }
}

$likeBtn.on('click', addLike);
