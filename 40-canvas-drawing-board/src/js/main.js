const text = document.querySelector('.description');
const clear_btn = document.querySelector('#js-clear');
const download_btn = document.querySelector('#js-download');
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
    text.classList.remove('is-hidden');
}

function drawing(e) {
    if (!is_drawing) return;

    text.classList.add('is-hidden');

    content.beginPath();
    content.moveTo(x_last, y_last);
    content.lineTo(e.offsetX, e.offsetY);
    content.stroke();

    [x_last, y_last] = [e.offsetX, e.offsetY];

    // Change stroke color
    content.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if (hue >= 360) {
        hue = 0;
    }
    hue++;

    // Change line width
    if (content.lineWidth > 50 || content.lineWidth < 10) {
        direction = !direction;
    }
    if (direction) {
        content.lineWidth++;
    } else {
        content.lineWidth--;
    }
}

function clearBoard(e) {
    e.preventDefault();
    content.clearRect(0, 0, canvas.width, canvas.height);
    content.beginPath();
    text.classList.remove('is-hidden');
}

function downloadImage() {
    download_btn.href = canvas.toDataURL();
    download_btn.download = 'canvas-image.png';
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
clear_btn.addEventListener('click', clearBoard);
download_btn.addEventListener('click', downloadImage);
window.addEventListener('resize', initializeCanvas);

initializeCanvas();
