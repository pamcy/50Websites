/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentBoard = document.querySelector('.player-current-score'),
    currentScore = 0;

function shuffle(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollingDice() {
    var randomNumber = shuffle(1, 6),
        image = document.createElement('img'),
        container = document.querySelector('.wrapper');

    switch (randomNumber) {
        case 1:
            image.src = 'imgs/dice-1.png';
            break;
        case 2:
            image.src = 'imgs/dice-2.png';
            break;
        case 3:
            image.src = 'imgs/dice-3.png';
            break;
        case 4:
            image.src = 'imgs/dice-4.png';
            break;
        case 5:
            image.src = 'imgs/dice-5.png';
            break;
        case 6:
            image.src = 'imgs/dice-6.png';
            break;

        return image.src;
    }

    image.classList.add('dice');
    container.appendChild(image);
}

document.querySelector('.btn-roll').addEventListener('click', rollingDice);