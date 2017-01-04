var menuTitle = $('.accorTitle');
var menuItem = $('.accorItem');

$(document).ready(function () {
	
	menuItem.hide().first().show();
	
	menuTitle.on('click', function () {
		var $this = $(this);
		
		menuItem.slideUp();
		$this.next().slideDown();
		
		
	});
});

//$(this).find('.accordion-title').toggleClass('accordion-title-isActive');
//$(this).next().slideToggle(300);