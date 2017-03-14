$(document).ready(function() {

	//	Return false stops a form from being submitted.
	$('#messenger').on('submit', function() {
		return false;
	});
	
	$('#btn').on('click', function(){
		
		var text = $('#message').val();
		var bot = ['💩', 'Nice to meet you!', '👻', '🤖', 'OK, that is interesting.', '👽', '👀', '👊', '🙈', 'Hang on a second! I need to check something in the oven. Be right back!', 'I am glad you are here!', '😑', '🙄', '🍕', '🐽', '🚶', '💤', 'I am back...everything looks mighty tasty.', 'Rats....I just dropped my glasses.'];
		var randomReply = bot[Math.floor(Math.random() * bot.length)];
		
		$('.chat-content').append('<div class="right">' + text + '</div>');
		$('#message').val('');  // pass an empty string to remove values

		function botReply() {
			$('.chat-content').append('<div class="left"><div class="ing"><span>.</span><span>.</span><span>.</span></div><p>' + randomReply + '</p></div>');
		}
		
		setTimeout(botReply, 1500);
		
	}); // ^click
}); // ^ready
