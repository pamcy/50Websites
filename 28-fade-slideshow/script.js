$(document).ready(function () {
	var nav = $('.slideshow-nav li'),
		slides = $('.slideshow-slides li'),
		slidesAll = slides.length,
		nextSlide = 0,
		timer;

	// Play Slideshow and nav menu automatically
	function playSideshow() {
		slides.eq(nextSlide).addClass('slideshow-slides-isActive').siblings().removeClass('slideshow-slides-isActive');
		nav.eq(nextSlide).addClass('slideshow-nav-isActive').siblings().removeClass('slideshow-nav-isActive');
		nextSlide = (nextSlide + 1) % slidesAll;
		timer = setTimeout(playSideshow, 4000);
	}

	playSideshow();

	// Click to change the slide
	$('.slideshow-nav').on('click', 'li', function(e) {
		e.preventDefault();

		var navIndex = $(this).index();

		nav.eq(navIndex).addClass('slideshow-nav-isActive').siblings().removeClass('slideshow-nav-isActive');
		slides.eq(navIndex).addClass('slideshow-slides-isActive').siblings().removeClass('slideshow-slides-isActive');
		nextSlide = (navIndex + 1) % slidesAll;
	});
});
