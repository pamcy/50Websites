$(document).ready(function() {
    
    // Click on stars to turn yellow
    $('.table').find('.star').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('star-checked');
    });
     
    // Click on checkbox to turn background into grey 
    $('.ckbox').find('label').on('click', function() { 
        $(this).parents('tr').toggleClass('selected');
    });
    
    // Filter
    $('.filter-menu').on('click', function() {    
        var $target = $(this).data('target');
    
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn(600);
        }
        else {
            $('.table tr').fadeIn(600);
        }
    });
    
});


//WHY
//$('.filter-menu').on('click', function() {
//    var $target = $(this).data('target');
//    var $status = $('table tr').data('status');
//
//    if ($target === $status) {
//        $('.table tr').css('display', 'none');
//        $('.table tr[data-status="' + $target + '"]').fadeIn();
//    }
//    else {
//        $('.table tr').show();
//    }   
//});