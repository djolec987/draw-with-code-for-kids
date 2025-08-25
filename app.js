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

function postaviBojuOlovke(r, g, b) {
  penColor = `rgb(${r},${g},${b})`;
}

function postaviDebljinuOlovke(s) {
  penSize = s;
}

let fillColor = null; // Dodato za boju popune

function postaviBojuPopune(r, g, b) {
  fillColor = `rgb(${r},${g},${b})`;
}

// Ako želite da isključite popunu, možete napraviti i ovu funkciju:
function bezPopune() {
  fillColor = null;
}

function nacrtajPravougaonik(x, y, w, h) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  }
  ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
}

function nacrtajKrug(x, y, r) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.stroke();
}

function nacrtajElipsu(x, y, a, b) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.ellipse(cx, cy, a / 2, b / 2, 0, 0, 2 * Math.PI);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.stroke();
}

// --- Configurable origin ---
function postaviPocetak(x, y) {
  originX = x;
  originY = canvas.height - y; // keep bottom-left as (0,0) by default
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

  ctx.restore();

  drawCoordinateLabels();
}

// --- Reset settings ---
function resetujPodesavanjaPlatna() {
  originX = 0;
  originY = canvas.height;
  currentX = 0;
  currentY = 0;
}

function resetujPodesavanjaAlata() {
  penColor = "black";
  penSize = 2;
  fillColor = null;
}

function resetujSvaPodesavanja() {
  resetujPodesavanjaPlatna();
  resetujPodesavanjaAlata();
}

// --- Run code from textarea ---
document.getElementById("runButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resetujSvaPodesavanja(); // Reset svih podešavanja
  nacrtajRaster();
  try {
    const code = document.getElementById("codeInput").value;
    eval(code); // execute user code (safe for local learning use)
  } catch (err) {
    alert("Greška u kodu: " + err.message);
  }
});

function drawCoordinateLabels() {
  const xLabels = document.getElementById("xLabels");
  const yLabels = document.getElementById("yLabels");
  if (xLabels && yLabels) {
    // X ose
    xLabels.innerHTML = "";
    for (let x = 0; x <= canvas.width; x += 50) {
      const label = document.createElement("div");
      label.style.textAlign = "center";
      label.textContent = x;
      xLabels.appendChild(label);
      const nextLabel = document.createElement("div");
      nextLabel.style.textAlign = "center";
      nextLabel.textContent = x + 50;
      xLabels.appendChild(nextLabel);
      nextLabel.style.margin = "0";
      label.style.margin = "0";
      label.style.marginRight = `${
        50 - (nextLabel.offsetWidth / 2 + label.offsetWidth / 2)
      }px`;
      xLabels.removeChild(nextLabel);
    }
    // Y ose
    yLabels.innerHTML = "";
    for (let y = 0; y <= canvas.height; y += 50) {
      if (y !== 0) {
        // skip 0 to avoid overlap
        const label = document.createElement("div");
        label.textContent = y;
        yLabels.prepend(label); // prepend to have 0 at bottom
        const nextLabel = document.createElement("div");
        nextLabel.textContent = y + 50;
        yLabels.prepend(nextLabel);
        label.style.margin = "0";
        nextLabel.style.margin = "0";
        label.style.marginBottom = `${
          50 - (nextLabel.offsetHeight / 2 + label.offsetHeight / 2)
        }px`;
        yLabels.removeChild(nextLabel);
      }
    }
  }
}

function drawSmiley() {
  document.getElementById("codeInput").value = `// Primer koda za crtanje smeška

postaviBojuOlovke(0, 0, 0);
postaviBojuPopune(255, 220, 40);
nacrtajKrug(300, 200, 120);

postaviBojuPopune(255, 255, 255);
nacrtajKrug(255, 240, 20);
nacrtajKrug(345, 240, 20);

postaviBojuPopune(0, 0, 0);
nacrtajKrug(260, 245, 7);
nacrtajKrug(350, 245, 7);

bezPopune();
postaviBojuOlovke(180, 80, 0);
postaviDebljinuOlovke(6);
pomeriNa(250, 160);
linijaDo(270, 145);
linijaDo(300, 140);
linijaDo(330, 145);
linijaDo(350, 160);
  `;

  const code = document.getElementById("codeInput").value;
  eval(code); // execute user code (safe for local learning use)
}

// draw grid on load
nacrtajRaster();
drawSmiley();

let poligonTemena = [];

function zapocniPoligon() {
  poligonTemena = [];
}

function dodajTeme(x, y) {
  poligonTemena.push([x, y]);
}

function zavrsiPoligon() {
  if (poligonTemena.length < 3) {
    alert("Poligon mora imati bar 3 temena!");
    poligonTemena = [];
    return;
  }
  ctx.beginPath();
  const [startX, startY] = toCanvasCoords(poligonTemena[0][0], poligonTemena[0][1]);
  ctx.moveTo(startX, startY);
  for (let i = 1; i < poligonTemena.length; i++) {
    const [cx, cy] = toCanvasCoords(poligonTemena[i][0], poligonTemena[i][1]);
    ctx.lineTo(cx, cy);
  }
  ctx.closePath();
  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  ctx.stroke();
  poligonTemena = [];
}
