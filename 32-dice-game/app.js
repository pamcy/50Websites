/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var totalScore, currentScore, activePlayer, gamePlaying;

function init() {
    currentScore = 0;
    totalScore = [0, 0];
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; 

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-roll').addEventListener('click', rollingDice);
    document.querySelector('.btn-hold').addEventListener('click', holding);
}

function rollingDice() {
    var diceNumber = Math.floor(Math.random() * 6) + 1, // Shuffle numbers
        diceDOM = document.querySelector('.dice');

    if (gamePlaying) {
        // Display dice images
        diceDOM.style.display = 'block';
        diceDOM.src = `imgs/dice-${diceNumber}.svg`;
 
        diceDOM.classList.add('animated', 'bounceIn');setTimeout(function() {
            diceDOM.classList.remove('animated', 'bounceIn');
        }, 500);

        // Update current scores
        if (diceNumber === 1) {
            changePlayer();
        } else {
            currentScore += diceNumber;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }
    }
}

function holding() {
    if (gamePlaying) {
        // Update total scores
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = totalScore[activePlayer];
        console.log(totalScore);

        // Winner rules
        if (totalScore[activePlayer] >= 20) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
}

function changePlayer() {
    currentScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

init();

document.querySelector('.btn-roll').addEventListener('click', rollingDice);
document.querySelector('.btn-hold').addEventListener('click', holding);
document.querySelector('.btn-new').addEventListener('click', init);