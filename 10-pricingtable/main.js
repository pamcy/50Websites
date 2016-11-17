$( document ).ready(function() {
    $(".item").on("mouseover", function() {
		$(this).addClass("highlight");
	});
	$(".item").on("mouseout", function() {
		$(this).removeClass("highlight");
	});
});