// Get the canvas element and its context
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

// Variables to keep track of the mouse movements
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners to track mouse movements
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        drawLine(lastX, lastY, e.offsetX, e.offsetY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Function to draw a line between two points
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Function to clear the canvas with animation
function clearCanvas() {
    canvas.classList.add('canvas-cleared');
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove('canvas-cleared');
    }, 500);
}

// Function to save the signature as an image and download it
function saveSignature() {
    const signatureImage = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = signatureImage;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
