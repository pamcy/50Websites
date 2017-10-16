const $input = $('.contact-form__input');

function moveUp() {
    // if ($(this).val() !== 0) {
    //     moveUp();
    // }

    $(this).siblings().addClass('input-is-focus');
}

function moveDown() {
    if ($(this).val() === '') {
        $(this).siblings().removeClass('input-is-focus');
    }

    
    
}

$input.on('focus', moveUp);
$input.on('blur', moveDown);
