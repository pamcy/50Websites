/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var totalScore = [0, 0],
    currentScore = 0,
    activePlayer = 0,
    diceDOM = document.querySelector('.dice');

function changePlayer() {
    currentScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function rollingDice() {
    // Shuffle numbers
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    console.log(diceNumber);

    // Display dice images
    diceDOM.style.display = 'block';
    diceDOM.src = `imgs/dice-${diceNumber}.png`;

    // Update current scores
    if (diceNumber === 1) {

        // Change player
        changePlayer();

    } else {
        currentScore += diceNumber;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    }
}

function holding() {
    // Update total scores
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = totalScore[activePlayer];
    console.log(totalScore);

    // Change player
    changePlayer();

    if (totalScore[activePlayer] >= 20) {
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
        return false;
    }
}

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', rollingDice);
document.querySelector('.btn-hold').addEventListener('click', holding);