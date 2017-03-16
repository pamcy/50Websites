document.getElementById('heading').innerHTML = localStorage['title'] || 'Happy Typing!';
document.getElementById('content').innerHTML = localStorage['text'] || 'Your text is automatically saved every second, even when you refresh the browser :)';

setInterval(function() {
	localStorage['title'] = document.getElementById('heading').innerHTML;
	localStorage['text'] = document.getElementById('content').innerHTML;
}, 1000);
