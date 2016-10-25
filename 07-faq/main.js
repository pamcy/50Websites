$(document).ready(function(){    
    $('.faq').on('click', 'h2', function(){
        $(this).next().slideToggle();
        $(this).find('span').toggle();
    });
});