function updateIdea(ideaNumber) {
	
	// if ideaNumber == 3, e.g. data/idea-3.json
	var ideaUrl = "data/idea-" + ideaNumber + ".json"
	
	$.ajax({
		dataType: "json",
		url: ideaUrl,
		success: function(result) {
			$("#idea").html(result.idea);
			$("#title").html(result.title);
			$("#idea-box")
				.removeClass()
				.addClass("animated")
				.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					$(this).removeClass();
				});
			
			// encodeURIComponent encodes special characters
			$("#share").attr("href", "https://twitter.com/intent/tweet?text=\"" + encodeURIComponent($("#hidden").html(result.idea).text()) + "\" https://chinyi3005.github.io/100websites/12-random-inspiration-ajax/?q=" + ideaNumber );
		} //^ success
	}); //^ ajax
} //^ updateIdea

// Math.floor() returns the largest integer less than or equal to a given number.
// Get a random number between 1 and 10
function getRandomIdeaNmumber() {
	return Math.floor(Math.random() * 10 + 1);
}

$(document).ready(function() {
	$("#next-idea").on("click", function(e) {
		e.preventDefault();
		
		var randomIdeaNumber = getRandomIdeaNmumber();
		updateIdea(randomIdeaNumber);
	});
	
	// returns the querystring part of a URL after the question mark (?)
	var q = location.search.split("?q=")[1];
	
	if (q > 0 && q < ldeaUrl.length) {
		updateIdea(q);
	}else {
		$("#next-idea").click();
	}
}); //^ document ready