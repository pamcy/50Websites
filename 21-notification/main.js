$(document).ready(function() {
	
	//	Show notification bar
	$('#btn').on('click', function() {
		$('.notification').fadeIn(function() {
			$(this).animate( {
				'width': '100%',
				'left': 0
			}, 1000).animate( {'top': 0} );
		});	
	});
	
	//	Close button
	$('#icon-close').on('click', function() {
		$('.notification').fadeOut(function() {
			$(this).css( {
				'width': '900px',
				'left': '-1150px',
				'top': '-60px'
			});
		});
	});
});