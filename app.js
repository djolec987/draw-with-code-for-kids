const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Default settings
let penColor = "black";
let penSize = 2;
let currentX = 0;
let currentY = 0;
let originX = 0; // bottom-left by default
let originY = canvas.height;

ctx.lineCap = "round";

// --- Coordinate system transform ---
function toCanvasCoords(x, y) {
  return [originX + x, originY - y];
}

// --- Drawing functions (Serbian names) ---
function pomeriNa(x, y) {
  [currentX, currentY] = toCanvasCoords(x, y);
  ctx.moveTo(currentX, currentY);
}

function linijaDo(x, y) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(cx, cy);
  ctx.stroke();
  currentX = cx;
  currentY = cy;
}

function postaviBoju(r, g, b) {
  penColor = `rgb(${r},${g},${b})`;
}

function postaviDebljinu(s) {
  penSize = s;
}

function nacrtajPravougaonik(x, y, w, h) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
}

function nacrtajKrug(x, y, r) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.stroke();
}

// --- Configurable origin ---
function postaviPocetak(x, y) {
  originX = x;
  originY = canvas.height - y; // keep bottom-left as (0,0) by default
}

// --- Nova funkcija: elipsa ---
function nacrtajElipsu(x, y, a, b) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.ellipse(cx, cy, a / 2, b / 2, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.stroke();
}


// --- Raster (ruler) ---
function nacrtajRaster() {
  ctx.save();

  // grid lines
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // labels
  ctx.fillStyle = "#333";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";

  // bottom numbers (aligned to bottom edge)
  ctx.textBaseline = "bottom";
  for (let x = 0; x <= canvas.width; x += 50) {
    const coord = Math.round(x - originX);
    ctx.fillText(coord.toString(), x + 2, canvas.height - 2);
  }

  // left numbers (aligned to left edge)
  ctx.textBaseline = "middle";
  for (let y = 0; y <= canvas.height; y += 50) {
    const coord = Math.round(originY - y);
    if (coord != 0) {
        ctx.fillText(coord.toString(), 2, y);
    }    
  }

  ctx.restore();
}

// --- Run code from textarea ---
document.getElementById("runButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nacrtajRaster();
  try {
    const code = document.getElementById("codeInput").value;
    eval(code); // execute user code (safe for local learning use)
  } catch (err) {
    alert("Greška u kodu: " + err.message);
  }
});

// draw grid on load
nacrtajRaster();
