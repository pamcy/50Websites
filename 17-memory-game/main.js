var icons = ['facebook', 'facebook', 'github', 'github', 'spotify', 'spotify', 'google', 'google', 'apple', 'apple', 'linkedin-square', 'linkedin-square', 'slack', 'slack', 'twitter', 'twitter'],
	opened = [],
	match = 0,
	moves = 0,
	$game = $('.game'),
	$scoreBoard = $('.scoreboard'),
	$moveNum = $scoreBoard.find('.moves'),
	$ratingStars = $scoreBoard.find('i'),
	$restart = $scoreBoard.find('.restart'),
	gameCardsQTY = icons.length / 2,
	rank3stars = gameCardsQTY + 2,
	rank2stars = gameCardsQTY + 6,
	rank1stars = gameCardsQTY + 10;


// Shuffle Function 
// via http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	
	return array;
}


// Initial Game
function startGame() {
	var cards = shuffle(icons);
	
	$game.empty();
	match = 0;
	moves = 0;
	$moveNum.text(moves);
	$ratingStars.removeClass('fa-star-o').addClass('fa-star');
	
	for(var i = 0; i < cards.length; i++) {
		$game.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
};


// Star Rating and scores
function setRating(moves) {
	var rating = 3;
	
	// eq() selects an element with a specific index number.
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	}
	
	else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	}
	
	else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}
	
	return {
		score: rating
	};
}


// Game Over
// Popup Box from SweetAlert2
function gameOver(moves, score) {
	swal({
		title: 'Congrats! You Rock!!',
		text: 'You have got total ' + moves + ' moves and ' + score + ' stars.\nJavascript Practice by <a href="https://github.com/chinyi3005" target="_blank">Pamcy</a>.',
		type: 'success',
		confirmButtonColor: '#9BCB3C',
		confirmButtonText: 'Play again?'		
	}).then(function(yesConfirm) {
		if(yesConfirm) {
			startGame();
		}
	})
}


// Restart Game
$restart.on('click', function() {
	swal({
		title: 'Are you sure?',
		text: 'Your progress will be lost.',
		type: 'warning',
		confirmButtonColor: '#9BCB3C',
		confirmButtonText: 'Yes, just restart!',
		showCancelButton: true,
		cancelButtonColor: '#EE0E51'
	}).then(function(yesConfirm) {
		if(yesConfirm) {
			startGame();
		}
	})
});


// Flip Cards Rules
$game.on('click', '.card:not(".match, .open")', function() {
	// :not() selects all elements except the specified element.
	// I don't want players to click matched cards again.
	
	var	oneCard = $(this).html();
	
	$(this).addClass('open show');	
	opened.push(oneCard);
	
	// Compare with 2 open cards
	if (opened.length > 1) {
	
		if (oneCard === opened[0]) {
			$game.find('.open').addClass('match animated rubberBand');

			setTimeout (function() {
				$game.find('.match').removeClass('open animated rubberBand');
			}, 800);

			match++;
		}

		else {
			$game.find('.open').addClass('nomatch animated wobble');

			setTimeout(function() {
				$game.find('.nomatch').removeClass('open show nomatch animated wobble');
			}, 600);
		}
		
		opened = [];
		moves++;
		setRating(moves);
		$moveNum.text(moves);
	}
	
	//	When game is over
	if (gameCardsQTY === match) {
		var scores = setRating(moves).score;
		var popOut = gameOver(moves, scores);
		
		setRating(moves);
		setTimeout(popOut, 3000);	
	}
	
});

startGame();



// QUESTION

//2. opened[0]，開過的所有卡會不斷存在 arrary 裡？
//3. if (opened.length > 1) / if = 2 / if no if?
//4. opened = []
//5. moves 怎麼判斷++
//6. score: rating