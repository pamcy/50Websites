const $input = $('.contact-form__input');

function moveUp() {
    $(this).siblings()
        .addClass('input-is-focus');
}

function moveDown() {
    const $this = $(this);

    if ($this.val() === '') {
        $this.siblings()
            .removeClass('input-is-focus');
    }
}

$input.on('focus', moveUp);
$input.on('blur', moveDown);
