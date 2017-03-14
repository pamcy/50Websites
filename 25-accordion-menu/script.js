function openAndClose () {
	var $this = $(this);

	$this.toggleClass('accordion-title-isActive')
		.next().slideToggle()
		.siblings('dd:visible').slideUp()
		.prev('dt').removeClass('accordion-title-isActive');
}

$(document).ready(function () {	
	//	hide all Items except the last one
	$('.accordion-item:not(:last)').hide();
	
	$('.accordion-title').on('click', openAndClose);
});