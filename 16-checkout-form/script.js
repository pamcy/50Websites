$(document).ready(function() {
	
	//	change the border color of the Pay Method when it’s checked. 
	$('.method').on('click', function() {
		$('.method').removeClass('add-border');
		$(this).addClass('add-border');
	});
	
	//	Validate the input fields
	$('.btn-next').on('click', function() {
		
		var inputData = $('form').find('input');
		
		inputData.removeClass('warning');
		
		inputData.each(function() {
			
			var $this = $(this);
			
			if (!$this.val()) {
				$this.addClass('warning');
			}
		});
	});
}); // ^ready



//Question:
//var this = $(this)
//creditcard no radio button