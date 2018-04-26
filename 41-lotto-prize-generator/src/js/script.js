const prizes = {
    0: '🙈',
    1: '🤢',
    2: '💩',
    3: '🦊',
    4: '👀',
    5: '👾',
    6: '👻',
    7: '🤖',
};
const total_items = 8;
const minimum_jumps = 30; // 超過這數字開始進入抽獎
let current_index = -1;
let jumps = 0; // 每次跑一格就是一個 jump
let speed = 30;
let timer = 0;
let prize = -1;

function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');

    // 順序很重要
    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    $(`[data-order="${current_index}"]`).addClass('is-active');
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}

function controllSpeed() {
    jumps += 1;
    runCircle();

    // 1. 抽到獎品停止遊戲
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        swal({
            title: `You Have Won a Prize ${prizes[current_index]}`,
            text: 'Congratulations!',
            icon: 'success',
        });

        prize = -1;
        jumps = 0;

    // 2. 還沒抽繼續跑
    } else {
        // 還沒進入關鍵抽獎階段前的速度 (單純前菜轉特效)
        if (jumps < minimum_jumps) {
            speed -= 5; // 加速
        // 決定獎品的位置
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            // 下一個就是獎品時放慢鈍一下
            if ( (jumps > minimum_jumps + 10) && prize === (current_index + 1) ) {
                speed += 600;
            } else {
                speed += 20; // 減慢
            }
        }
        if (speed < 40) {
            speed = 40;
        }
        // 重複跑這支 function
        timer = setTimeout(controllSpeed, speed);
    }

    // console.log({current_index, jumps});
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;

    controllSpeed();
}

$(document).ready(() => {
    $('#js-start').on('click', init);
});
