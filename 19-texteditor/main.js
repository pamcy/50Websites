document.getElementById('heading').innerHTML = localStorage['title'] || 'Just Write';
document.getElementById('content').innerHTML = localStorage['text'] || 'Your text is automatically saved every second :)';

setInterval(function() {
	localStorage['title'] = document.getElementById('heading').innerHTML;
	localStorage['text'] = document.getElementById('content').innerHTML;
}, 1000);




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