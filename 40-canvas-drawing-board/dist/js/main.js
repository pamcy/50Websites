'use strict';

var text = document.querySelector('.description');
var clear_btn = document.querySelector('#js-clear');
var download_btn = document.querySelector('#js-download');
var canvas = document.querySelector('#canvas');
var content = canvas.getContext('2d');
var x_last = 0;
var y_last = 0;
var hue = 0;
var is_drawing = false;
var direction = true;

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

    // Change stroke color
    var _ref = [e.offsetX, e.offsetY];
    x_last = _ref[0];
    y_last = _ref[1];
    content.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
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
canvas.addEventListener('mousedown', function (e) {
    is_drawing = true;
    var _ref2 = [e.offsetX, e.offsetY];
    x_last = _ref2[0];
    y_last = _ref2[1];
});
canvas.addEventListener('mouseup', function () {
    is_drawing = false;
});
canvas.addEventListener('mouseout', function () {
    is_drawing = false;
});
clear_btn.addEventListener('click', clearBoard);
download_btn.addEventListener('click', downloadImage);
window.addEventListener('resize', initializeCanvas);

initializeCanvas();