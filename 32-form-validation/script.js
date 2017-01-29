$(document).ready(function() {
    var nameError = false,
        emailError = false,
        passwordError = false,
        rePasswordError = false,
        namePattern = /(?:[^a-zA-Z0-9\s])+/,
        emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        passwordNumPattern = /(?:\d)+/,
        passwordUpPattern = /(?:[A-Z])+/,
        nameErrorMsg = $('#errorMsg-name li'),
        emailErrorMsg = $('#errorMsg-email li'),
        passwordErrorMsg = $('#errorMsg-password li'),
        re_passwordErrorMsg = $('#errorMsg-confirm-password li'),
        submitIsInvalid = false;

    // Username
    function nameVerify() {
        var $this = $(this),
            nameValue = $this.val(),
            nameLength = nameValue.length,
            isName = namePattern.test(nameValue),
            nameErrorMsg1 = nameErrorMsg.eq(0),
            nameErrorMsg2 = nameErrorMsg.eq(1);

        // Check username's length
        if (nameLength < 5) {
            nameErrorMsg1.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        } else {
            nameErrorMsg1.addClass('isValid').removeClass('isInvalid');
        }

        // Check if there're any special characters
        if (isName) {
            nameErrorMsg2.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        } else {
            nameErrorMsg2.addClass('isValid').removeClass('isInvalid');
        }
    }

    // Email
    function emailVerify() {
        var $this = $(this),
            emailValue = $this.val(),
            isEmail = emailPattern.test(emailValue),
            emailErrorMsg1 = emailErrorMsg.eq(0);

        if (isEmail) {
            emailErrorMsg1.addClass('isValid').removeClass('isInvalid');
        } else {
            emailErrorMsg1.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        }
    }

    // Password
    function passwordVerify() {
        var $this = $(this),
            passwordValue = $this.val(),
            passwordLength = passwordValue.length,
            hasNumber = passwordNumPattern.test(passwordValue),
            hasUppercase = passwordUpPattern.test(passwordValue),
            passwordErrorMsg1 = passwordErrorMsg.eq(0),
            passwordErrorMsg2 = passwordErrorMsg.eq(1),
            passwordErrorMsg3 = passwordErrorMsg.eq(2);

        // Check passwors's length
        if (passwordLength < 8) {
            passwordErrorMsg1.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        } else {
            passwordErrorMsg1.addClass('isValid').removeClass('isInvalid');
        }

        // Check must have one number
        if (hasNumber) {
            passwordErrorMsg2.addClass('isValid').removeClass('isInvalid');
        } else {
            passwordErrorMsg2.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        }

        // Check must have one Uppercase letter
        if (hasUppercase) {
            passwordErrorMsg3.addClass('isValid').removeClass('isInvalid');
        } else {
            passwordErrorMsg3.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        }
    }

    // Confirm Password
    function re_passwordVerify() {
        var $this = $(this),
            passwordValue = $('#password').val(),
            re_passwordValue = $this.val(),
            re_passwordErrorMsg1 = re_passwordErrorMsg.eq(0);

        if (re_passwordValue !== passwordValue) {
            re_passwordErrorMsg1.addClass('isInvalid').removeClass('isValid');
            submitIsInvalid = true;
        } else {
            re_passwordErrorMsg1.addClass('isValid').removeClass('isInvalid');
        }
    }

    // After Form Submitted Validation
    function submitVerify() {
        if (submitIsInvalid) {
            alert('you still need to fill sth!');
            return false;
        }
        console.log('hooray');
        return true;
    }

    $('#name').on('input', nameVerify);
    $('#email').on('input', emailVerify);
    $('#password').on('input', passwordVerify);
    $('#confirm-password').on('input', re_passwordVerify);

    $('#registration').on('submit', submitVerify);
});

// Apfel_2406

// http://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
// https://formden.com/blog/validate-contact-form-jquery

// var registerForm = document.getElementById('registration'),
//     inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])'),
//     userName = document.getElementById('name'),
//     nameError1 = document.querySelector('#name-error li:nth-child(1)'),
//     nameError2 = document.querySelector('#name-error li:nth-child(2)');
//
// function nameVerify() {
//     var userNameVal = userName.value;
//
//     if (userNameVal.length < 5) {
//         nameError1.classList.add('isInvalid');
//         nameError1.classList.remove('isValid');
//     } else {
//         nameError1.classList.add('isValid');
//         nameError1.classList.remove('isInvalid');
//     }
//
//     if (userNameVal.match(/[^a-zA-Z0-9]/g)) {
//         nameError2.classList.add('isInvalid');
//         nameError2.classList.remove('isValid');
//     } else if (userNameVal == '') {
//         nameError2.classList.add('isInvalid');
//         nameError2.classList.remove('isValid');
//     }
//     else {
//         nameError2.classList.add('isValid');
//         nameError2.classList.remove('isInvalid');
//     }
// }
//
// inputs[0].addEventListener('input', nameVerify);
