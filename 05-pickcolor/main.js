$(document).ready(function(){
    $('.pickcolor li').on('click', function(){  
        $('body').css('background-color', $(this).css('background-color'));
    });
});