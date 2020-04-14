var canvas,
    context,
    isClicking = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    _lineColor,
    _lineSize;

function initCanvas() {
    setPencil();

    canvas = document.getElementById('main_canvas');
    context = canvas.getContext("2d");

    canvasWidht = canvas.width;
    canvasHeight = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        mouseHandler('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        mouseHandler('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        mouseHandler('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        mouseHandler('out', e)
    }, false);
}

function resetCanvas() {
    context.clearRect(0, 0, canvasWidht, canvasHeight);
}

function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = _lineColor;
    context.lineWidth = _lineSize;
    context.stroke();
    context.closePath();
}

function mouseHandler(action, e) {
    updateCursor(e);
    switch (action) {
        case 'down':
            isClicking = true;
            break;
        case 'up':
        case 'out':
            isClicking = false;
            break;
        case 'move':
            if (isClicking) {
                draw();
            }
            break;
    }
}

function updateCursor(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
}

function setColor(color) {
    _lineColor = color;
}

function setDrawingSize(size) {
    _lineSize = size;
}

function setPencil() {
    setColor("#000000");
    setDrawingSize(5);
}

function setEreaser() {
    setColor("#FFFFFF");
    setDrawingSize(7);
}


/// UGLIFY COMMAND
/// TODO: automatizar esto al guardar
/// uglifyjs public/js/drawing.js --mangle --toplevel -o public/js/drawing.min.js  