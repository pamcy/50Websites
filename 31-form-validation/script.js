$(document).ready(function () {
    var namePattern = /(?:[^a-zA-Z0-9\s])+/,
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

        // Red border when input has errors
        if (nameErrorMsg.hasClass('isInvalid')) {
            $this.addClass('input-isError');
            submitIsInvalid = true;
        } else {
            $this.removeClass('input-isError');
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
            $this.removeClass('input-isError');
        } else {
            emailErrorMsg1.addClass('isInvalid').removeClass('isValid');
            $this.addClass('input-isError')
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

        // Check password's length
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

        if (passwordErrorMsg.hasClass('isInvalid')) {
            $this.addClass('input-isError');
            submitIsInvalid = true;
        } else {
            $this.removeClass('input-isError');
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
            $this.addClass('input-isError');
            submitIsInvalid = true;
        } else {
            re_passwordErrorMsg1.addClass('isValid').removeClass('isInvalid');
            $this.removeClass('input-isError');
        }

        if (re_passwordErrorMsg.hasClass('isInvalid')) {
            $this.addClass('input-isError');
            submitIsInvalid = true;
        } else {
            $this.removeClass('input-isError');
        }
    }

    // After Form Submitted Validation
    function submitVerify() {
        submitIsInvalid = false;

        if (submitIsInvalid) {
            alert('Please complete this form');
            return false;
        }
        return true;
    }

    $('#name').on('input', nameVerify);
    $('#email').on('input', emailVerify);
    $('#password').on('input', passwordVerify);
    $('#confirm-password').on('input', re_passwordVerify);

    $('#registration').on('submit', submitVerify);
});
