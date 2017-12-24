const canvas = document.querySelector('#canvas');
const content = canvas.getContext('2d');
let x_last = 0;
let y_last = 0;
let hue = 0;
let is_drawing = false;
let direction = true;

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    content.lineCap = 'round';
    content.lineJoin = 'round';
    content.lineWidth = 10;
}

function drawing(e) {
    if (!is_drawing) return;

    content.beginPath();
    content.moveTo(x_last, y_last);
    content.lineTo(e.offsetX, e.offsetY);
    content.stroke();

    [x_last, y_last] = [e.offsetX, e.offsetY];
    content.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    if (hue >= 360) {
        hue = 0;
    }

    hue++;

    if (content.lineWidth > 50 || content.lineWidth < 10) {
        direction = !direction;
    }

    if (direction) {
        content.lineWidth++;
    } else {
        content.lineWidth--;
    }

    console.log(direction);
    console.log(content.lineWidth);
}

canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mousedown', (e) => {
    is_drawing = true;
    [x_last, y_last] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
    is_drawing = false;
});

canvas.addEventListener('mouseout', () => {
    is_drawing = false;
});

initializeCanvas();

console.log(canvas);
console.log(content);


// https://github.com/liyuechun/JavaScript30-liyuechun/tree/master/08%20-%20HTML5%20Canvas%20%E5%AE%9E%E7%8E%B0%E5%BD%A9%E8%99%B9%E7%94%BB%E7%AC%94%E7%BB%98%E7%94%BB%E6%9D%BF

// https://github.com/soyaine/JavaScript30/tree/master/08%20-%20Fun%20with%20HTML5%20Canvas
