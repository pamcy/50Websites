$(function() {
    $('.panel').on('mouseover', function () {
        const $this = $(this);
        const $panel = $('.panel');

        $panel.removeClass('active');
        $this.toggleClass('active');
    });
});
