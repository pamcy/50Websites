$(document).ready(function() {
	var nav = $('.slideshow-nav li'),
		slides = $('.slideshow-slides li'),
		slidesAll = slides.length,
		nextSlide = 0;

	function playSideshow() {
		slides.eq(nextSlide).addClass('slideshow-slides-isActive').siblings().removeClass('slideshow-slides-isActive');

		nextSlide = (nextSlide + 1) % slidesAll;

		setTimeout(playSideshow, 3000);

		// console.log(nextSlide);
	}

	playSideshow();

});


// var allSildes = $('.slideshow-slides li');
// var currentSlide = 0;
// var menu = $('.slideshow-nav li');
// var currentNav = 0;
//
// function slidePlaying () {
// 	$(allSildes[currentSlide]).fadeOut(2000);
//
// 	if (currentSlide === allSildes.length - 1) {
// 		currentSlide = 0;
// 	} else {
// 		currentSlide++;
// 	}
//
// 	$(allSildes[currentSlide]).fadeIn(2000);
//
//
// 	console.log(currentSlide);
// }
//
// $(document).ready(function() {
//
// 	console.log(allSildes);
// 	$('.slideshow-slides li:not(:first)').hide();
//
// 	setInterval(slidePlaying, 3500);
// });
