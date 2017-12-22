const canvas = document.querySelector('#canvas');
const canvas_content = canvas.getContext('2d');
let x_last = 0;
let y_last = 0;
let is_drawing = false;

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawing(e) {
    if (!is_drawing) return;

    canvas_content.beginPath();
    canvas_content.moveTo(x_last, y_last);
    canvas_content.lineTo(e.offsetX, e.offsetY);
    canvas_content.stroke();

    console.log(`[x_last: ${x_last}; y_last: ${y_last}]`);
    console.log(`e.offsetX: ${e.offsetX}; e.offsetY: ${e.offsetY}`);

    [x_last, y_last] = [e.offsetX, e.offsetY];
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
console.log(canvas_content);



