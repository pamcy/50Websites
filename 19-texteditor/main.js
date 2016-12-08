document.getElementById('heading').innerHTML = localStorage['title'] || 'Happy Typing!';
document.getElementById('content').innerHTML = localStorage['text'] || 'Your text is automatically saved every second, even when you refresh the browser :)';

setInterval(function() {
	localStorage['title'] = document.getElementById('heading').innerHTML;
	localStorage['text'] = document.getElementById('content').innerHTML;
}, 1000);




//Question
//$('#heading').html() = localStorage.setItem('title', 'Just write');

//var headingText = document.getElementById('heading').innerHTML,
//	contentText = document.getElementById('content').innerHTML;
//
// headingText = localStorage['title'] || 'Just Write';
// contentText = localStorage['text'] || 'Your text is automatically saved every second :)';
//
//setInterval(function() {
//	localStorage['title'] = headingText;
//	localStorage['text'] = contentText;
//}, 1000);