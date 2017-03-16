$(document).ready(function(){

	var slideshow = $('.slideshow'),
	wrapper = slideshow.find('.wrapper'),
	nav = $('.nav-dots'),
	slide = wrapper.children(),
	slideshow_length = slide.length,
	slideshow_width = slideshow.width() * slideshow_length,
	slideshow_height = slideshow.height(),
	autoSlide = null;

	//設定 wrapper 的長寬，包住所有橫向排列的 slideshow
	wrapper.css({
//		'position': 'relative',
		'width'   : slideshow_width,
		'height'  : slideshow_height
  	});

	//每張 slide 網址加上編號
	//each()：輸出每個 slide 底下的元素
	slide.each(function(index) {
		var i = index + 1;
		nav.append('<a href="#slide-' + i + '">' + i + '</a>');
		$(this).attr('id', 'slide-' + i);
	});

	//點選圓點列會發生以下
	nav.find('a').on('click', function(e) {
		e.preventDefault();

		clearInterval(autoSlide); //停止自動捲動

		//點圓點變色，找出相對應的 slide 位置
		nav.find('.active').removeClass('active');
		$(this).addClass('active');
		var pos = $(this).index() * slideshow.width(); //算出要移動多少距離

		//每 3 秒輪播自動往左移動的效果
		//The setInterval() method will continue calling the function until clearInterval() is called.
		wrapper.animate({left: '-' + pos + 'px'}, 600);　// e.g. wrapper.animate({left: '-200px'}, 600);

		autoSlide = setInterval(slideAuto, 3000);
	}).first().addClass('active');

	//輪播到最後一張時，再重新跳回第一張顯示
	function slideAuto() {
		if (nav.find('.active').next().length) {
			nav.find('.active').next().click();
			// length == 1, 當被選取的這張還有下一張時
		}
		else {
			nav.find('a').first().trigger('click');
			// length == 0 ，沒有下一張時
		}
	}

	autoSlide = setInterval(slideAuto, 3000);
});
