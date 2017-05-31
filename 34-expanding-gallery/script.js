// jQuery
$(function() {
    $('.panel').on('mouseover', function () {
        const $this = $(this);
        const $panel = $('.panel');

        $panel.removeClass('active');
        $this.toggleClass('active');
    });
});

// Vanilla Javascript
/*
const panels = document.querySelectorAll('.panel');

function displayPanel() {
    panels.forEach((panel) => {
        panel.classList.remove('active');
    });

    this.classList.toggle('active');
}

panels.forEach((panel) => {
    panel.addEventListener('mouseover', displayPanel);
});
*/

