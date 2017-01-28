var registerForm = document.getElementById('registration'),
    inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])'),
    userName = document.getElementById('name'),
    nameError1 = document.querySelector('#name-error li:nth-child(1)'),
    nameError2 = document.querySelector('#name-error li:nth-child(2)');

function nameVerify() {
    var userNameVal = userName.value;

    if (userNameVal.length < 5) {
        nameError1.classList.add('isInvalid');
        nameError1.classList.remove('isValid');
    } else {
        nameError1.classList.add('isValid');
        nameError1.classList.remove('isInvalid');
    }

    if (userNameVal.match(/[^a-zA-Z0-9]/g)) {
        nameError2.classList.add('isInvalid');
        nameError2.classList.remove('isValid');
    } else {
        nameError2.classList.add('isValid');
        nameError2.classList.remove('isInvalid');
    }
}

inputs[0].addEventListener('input', nameVerify);
