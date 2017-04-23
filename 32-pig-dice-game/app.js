let totalScore;
let currentScore;
let activePlayer;
let gamePlaying;

function changePlayer() {
    currentScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function shuffle() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollingDice() {
    const diceDOM = document.querySelectorAll('.dice');

    if (gamePlaying) {
        for (let i = 0; i < diceDOM.length; i++) {
            const currentDiceNumber = shuffle();

            // Display dice images
            diceDOM[i].style.display = 'block';
            diceDOM[i].src = `imgs/dice-${currentDiceNumber}.svg`;
            diceDOM[i].classList.add('animated', 'bounceIn');
            setTimeout(function () {
                diceDOM[i].classList.remove('animated', 'bounceIn');
            }, 500);

            // Update current scores
            if (currentDiceNumber === 1) {
                setTimeout(function () {
                    diceDOM[0].style.display = 'none';
                    diceDOM[1].style.display = 'none';
                    setTimeout(changePlayer, 100);
                }, 500);
            } else {
                currentScore += currentDiceNumber;
                document.getElementById(`current-${activePlayer}`).textContent = currentScore;
            }
        }
    }
}

function holding() {
    if (gamePlaying) {
        // Get input value score & Check input value is not empty
        let inputValue = document.getElementById('setting-score').value;

        if (!inputValue) {
            inputValue = 100;
        }

        // Update total scores
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = totalScore[activePlayer];
        console.log(totalScore);

        // Winner rules
        if (totalScore[activePlayer] >= inputValue) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

            document.querySelectorAll('.dice')[0].style.display = 'none';
            document.querySelectorAll('.dice')[1].style.display = 'none';
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

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.getElementById('current-box-0').style.display = 'block';
    document.getElementById('current-box-1').style.display = 'block';
    document.querySelector('.player-0-panel .player-winner').style.display = 'none';
    document.querySelector('.player-1-panel .player-winner').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

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
