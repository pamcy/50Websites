// Make a snow
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function snow(num, speed) {

	if (num > 0) {
		setTimeout(function() {
			$('#drop-dots' + randomInt(1, 250)).addClass('animate');
			num--;
			snow(num, speed);
		}, speed);
	}
}

function snowDrop(num, position) {
	if (num > 0) {
		var drop = '<div class="drop snow" id="drop-dots' + num + '"></div>';

		$('body').append(drop);
		$('#drop-dots' + num).css('left', position);
		num--;
		snowDrop(num, randomInt(60, 1900));
	}
}

snow(150, 150);
snowDrop(150, randomInt(1035, 1280));


// Countdown Timer
function countDown() {

	var now = new Date(),
		xmasDate = new Date(2017, 11, 25),
		currentTime = now.getTime(),
		xmasTime = xmasDate.getTime(),
		untilTime = xmasTime - currentTime,
		sec = Math.floor(untilTime / 1000),
		min = Math.floor(sec / 60),
		hur = Math.floor(min / 60),
		day = Math.floor( hur / 24);

	hur %= 24;
	min %= 60;
	sec %= 60;

	hur = (hur < 10) ? '0' + hur : hur;
	min = (min < 10) ? '0' + min : min;
	sec = (sec < 10) ? '0' + sec : sec;

	$('#day').html(day);
	$('#hour').html(hur);
	$('#minute').html(min);
	$('#second').html(sec);

	setTimeout(countDown, 1000);
}

countDown();
