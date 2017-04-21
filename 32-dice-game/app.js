/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let totalScore;
let currentScore;
let activePlayer;
let gamePlaying;
let lastDiceNumber;

function changePlayer() {
    currentScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function rollingDice() {
    const currentDiceNumber = Math.floor(Math.random() * 6) + 1; // Shuffle numbers
    const diceDOM = document.querySelector('.dice');

    if (gamePlaying) {
        // Display dice images
        diceDOM.style.display = 'block';
        diceDOM.src = `imgs/dice-${currentDiceNumber}.svg`;
        console.log(`current one: ${currentDiceNumber}`);

        diceDOM.classList.add('animated', 'bounceIn');
        setTimeout(function () {
            diceDOM.classList.remove('animated', 'bounceIn');
        }, 500);

        // Update current scores
        if (currentDiceNumber === 1) {
            setTimeout(function () {
                document.querySelector('.dice').style.display = 'none';
                setTimeout(changePlayer, 100);
            }, 500);
        } else if (lastDiceNumber === 6 && currentDiceNumber === 6) {
            totalScore[activePlayer] = 0;
            document.getElementById(`score-${activePlayer}`).textContent = '0';

            setTimeout(function () {
                document.querySelector('.dice').style.display = 'none';
                setTimeout(changePlayer, 100);
            }, 500);
        } else {
            currentScore += currentDiceNumber;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }

        console.log(`Last one: ${lastDiceNumber}`);
        lastDiceNumber = currentDiceNumber;
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

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            document.getElementById(`current-box-${activePlayer}`).style.display = 'none';

            // Display winner image
            document.querySelector(`.player-${activePlayer}-panel .player-winner`).style.display = 'block';

            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
}

function init() {
    currentScore = 0;
    totalScore = [0, 0];
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.getElementById('current-box-0').style.display = 'block';
    document.getElementById('current-box-1').style.display = 'block';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel .player-winner').style.display = 'none';
    document.querySelector('.player-1-panel .player-winner').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-roll').addEventListener('click', rollingDice);
    document.querySelector('.btn-hold').addEventListener('click', holding);
}

function openInfo() {
    swal({
        title: 'Pig Dice Game',
        type: 'info',
        html:
            `<b>Be the first player to reach 100 points</b><br><br>
            <p style="text-align: left">
                Roll a 1:<br>
                Score zero and next player turn.<br><br>
                Roll two 6:<br>
                Lose ENTIRE score and next player turn.<br><br>
                Hold:<br>
                Stop rolling, record the total and next player turn.
            </p>`,
        padding: 60,
        allowEnterKey: true,
        confirmButtonText:
            'OK',
    })
}

init();

document.querySelector('.info').addEventListener('click', openInfo);
document.querySelector('.btn-roll').addEventListener('click', rollingDice);
document.querySelector('.btn-hold').addEventListener('click', holding);
document.querySelector('.btn-new').addEventListener('click', init);
