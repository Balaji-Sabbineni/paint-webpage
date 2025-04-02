const canvas = document.querySelector("#drawing-area");
let drawing = false;
let eraser = false;
let brushMode = false;
let lineMode = false;
let defaultStyle = "rgb(255, 255, 255)";
let defaultColor = "rgb(0, 0, 0)";
let startX, startY;

let ctx = canvas.getContext("2d");
ctx.fillStyle = defaultStyle;
ctx.lineWidth = 2; // Default line width

function changeColor(color) {
  defaultColor = color;
  ctx.strokeStyle = defaultColor;
  ctx.fillStyle = defaultColor; // Update fillStyle for brush mode
}
function eraseOnCanvas(currentX, currentY) {
  ctx.fillStyle = defaultStyle;
  ctx.beginPath();
  ctx.arc(currentX, currentY, 20, 0, Math.PI * 2);
  ctx.fill();
}

function drawOnCanvas(startX, startY, currentX, currentY) {
  ctx.fillStyle = defaultColor;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
}

function brushOnCanvas(currentX, currentY) {
  ctx.beginPath();
  ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
  ctx.fillStyle = defaultColor;
  ctx.fill();
}

function drawStraightLine(startX, startY, endX, endY) {
  ctx.strokeStyle = "rgb(0, 0, 255)";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  if (drawing) {
    if (eraser) {
      eraseOnCanvas(currentX, currentY);
    } else if (brushMode) {
      brushOnCanvas(currentX, currentY);
    } else {
      drawOnCanvas(startX, startY, currentX, currentY);
      startX = currentX;
      startY = currentY;
    }
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

const toggleEraser = () => {
  eraser = true;
  brushMode = false;
};

const selectPen = () => {
  eraser = false;
  brushMode = false;
};

const brush = () => {
  brushMode = true;
  eraser = false;
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eraser = false;
  brushMode = false;
};


const saveCanvasToLocalStorage = () => {
    const imageData = canvas.toDataURL();
    localStorage.setItem("canvasData", imageData);
};

const loadCanvasFromLocalStorage = () => {
    const savedData = localStorage.getItem("canvasData");
    if (savedData) {
        const img = new Image();
        img.src = savedData;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
};

canvas.addEventListener("mouseup", saveCanvasToLocalStorage);

window.addEventListener("load", loadCanvasFromLocalStorage);