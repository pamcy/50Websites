$(document).ready(function(){    
    $('.faq').on('click', 'h2', function(){
        $(this).next().slideToggle(200);
        $(this).find('span').toggle();
    });
});