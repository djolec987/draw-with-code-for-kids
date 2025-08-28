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
  if (penSize === 0) {
    currentX = cx;
    currentY = cy;
    return;
  }
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
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  }
  if (penSize !== 0) {
    ctx.lineWidth = penSize;
    ctx.strokeStyle = penColor;
    ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
  }
}

function nacrtajKrug(x, y, r) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (penSize !== 0) {
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.stroke();
  }
}

function nacrtajElipsu(x, y, a, b) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.ellipse(cx, cy, a / 2, b / 2, 0, 0, 2 * Math.PI);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (penSize !== 0) {
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.stroke();
  }
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
  prikaziInfo();
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
nacrtajKrivu(250,160,300,125,350,160)
  `;
  resetujSvaPodesavanja();
  const code = document.getElementById("codeInput").value;
  eval(code); // execute user code (safe for local learning use)
}

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
  const [startX, startY] = toCanvasCoords(
    poligonTemena[0][0],
    poligonTemena[0][1]
  );
  ctx.moveTo(startX, startY);
  for (let i = 1; i < poligonTemena.length; i++) {
    const [cx, cy] = toCanvasCoords(poligonTemena[i][0], poligonTemena[i][1]);
    ctx.lineTo(cx, cy);
  }
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (penSize !== 0) {
    ctx.lineWidth = penSize;
    ctx.strokeStyle = penColor;
    ctx.stroke();
  }
  poligonTemena = [];
}

let figuraKoraci = [];
let figuraAktivna = false;

function zapocniFiguru() {
  figuraKoraci = [];
  figuraAktivna = true;
}

function dodajTemeFigure(x, y) {
  if (!figuraAktivna) {
    alert("Prvo pozovi zapocniFiguru()");
    return;
  }
  figuraKoraci.push({ tip: "linija", x, y });
}

// Ova funkcija se koristi samo UNUTAR figure!
function nacrtajKrivu(x1, y1, x2, y2, x3, y3, x4, y4) {
  if (figuraAktivna) {
    if (typeof x4 === "number" && typeof y4 === "number") {
      // Kubna
      figuraKoraci.push({ tip: "kubna", x1, y1, x2, y2, x3, y3, x4, y4 });
    } else {
      // Kvadratna
      figuraKoraci.push({ tip: "kvadratna", x1, y1, x2, y2, x3, y3 });
    }
    return;
  }
  // Ako nije deo figure, crtaj kao do sada:
  ctx.beginPath();
  const [startX, startY] = toCanvasCoords(x1, y1);
  ctx.moveTo(startX, startY);
  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  if (typeof x4 === "number" && typeof y4 === "number") {
    const [cp1x, cp1y] = toCanvasCoords(x2, y2);
    const [cp2x, cp2y] = toCanvasCoords(x3, y3);
    const [endX, endY] = toCanvasCoords(x4, y4);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  } else {
    const [cpx, cpy] = toCanvasCoords(x2, y2);
    const [endX, endY] = toCanvasCoords(x3, y3);
    ctx.quadraticCurveTo(cpx, cpy, endX, endY);
  }
  ctx.stroke();
}

function nacrtajLuk(x, y, r, ugaoOd, ugaoDo) {
  if (figuraAktivna) {
    // Dodaj kao deo figure
    figuraKoraci.push({
      tip: "luk",
      x,
      y,
      r,
      ugaoOd,
      ugaoDo,
    });
    return;
  }
  // Samostalno crtanje luka
  const [cx, cy] = toCanvasCoords(x, y);
  const radOd = (ugaoOd * Math.PI) / 180;
  const radDo = (ugaoDo * Math.PI) / 180;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -radOd, -radDo, true); // true za pozitivni smer (CCW)
  if (fillColor) {
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (penSize !== 0) {
    ctx.lineWidth = penSize;
    ctx.strokeStyle = penColor;
    ctx.stroke();
  }
}

function zavrsiFiguru() {
  if (!figuraAktivna || figuraKoraci.length < 2) {
    alert("Figura mora imati bar 2 koraka!");
    figuraKoraci = [];
    figuraAktivna = false;
    return;
  }
  ctx.beginPath();
  let prvi = true;
  let poslednjaTacka = null;
  for (let korak of figuraKoraci) {
    if (korak.tip === "linija") {
      const [cx, cy] = toCanvasCoords(korak.x, korak.y);
      if (prvi) {
        ctx.moveTo(cx, cy);
        poslednjaTacka = [cx, cy];
        prvi = false;
      } else {
        ctx.lineTo(cx, cy);
        poslednjaTacka = [cx, cy];
      }
    } else if (korak.tip === "kvadratna") {
      const [startX, startY] = toCanvasCoords(korak.x1, korak.y1);
      const [cpx, cpy] = toCanvasCoords(korak.x2, korak.y2);
      const [endX, endY] = toCanvasCoords(korak.x3, korak.y3);
      if (prvi) {
        ctx.moveTo(startX, startY);
        prvi = false;
      }
      ctx.quadraticCurveTo(cpx, cpy, endX, endY);
      poslednjaTacka = [endX, endY];
    } else if (korak.tip === "kubna") {
      const [startX, startY] = toCanvasCoords(korak.x1, korak.y1);
      const [cp1x, cp1y] = toCanvasCoords(korak.x2, korak.y2);
      const [cp2x, cp2y] = toCanvasCoords(korak.x3, korak.y3);
      const [endX, endY] = toCanvasCoords(korak.x4, korak.y4);
      if (prvi) {
        ctx.moveTo(startX, startY);
        prvi = false;
      }
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      poslednjaTacka = [endX, endY];
    } else if (korak.tip === "luk") {
      const [cx, cy] = toCanvasCoords(korak.x, korak.y);
      const radOd = (korak.ugaoOd * Math.PI) / 180;
      const radDo = (korak.ugaoDo * Math.PI) / 180;
      if (prvi) {
        // Pomeri na početak luka
        ctx.moveTo(
          cx + korak.r * Math.cos(-radOd),
          cy + korak.r * Math.sin(-radOd)
        );
        prvi = false;
      }
      ctx.arc(cx, cy, korak.r, -radOd, -radDo, true);
      poslednjaTacka = [
        cx + korak.r * Math.cos(-radDo),
        cy + korak.r * Math.sin(-radDo),
      ];
    }
  }
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (penSize !== 0) {
    ctx.lineWidth = penSize;
    ctx.strokeStyle = penColor;
    ctx.stroke();
  }
  figuraKoraci = [];
  figuraAktivna = false;
}

function nacrtajTacku(x, y) {
  const [cx, cy] = toCanvasCoords(x, y);
  ctx.beginPath();
  ctx.arc(cx, cy, penSize / 2, 0, 2 * Math.PI);
  ctx.fillStyle = penColor;
  ctx.fill();
}

// draw grid on load
nacrtajRaster();  
//drawSmiley();

// Funkcija za prikaz informacija ispod canvasa
function prikaziInfo() {
  // Prikaz trenutne pozicije (u korisničkim koordinatama)
  let x = Math.round((currentX - originX));
  let y = Math.round((originY - currentY));
  document.getElementById("info-pozicija").textContent =
    `Pozicija tačke: ${x}, ${y}`;

  // Prikaz boje popune
  document.getElementById("info-popuna").textContent =
    `Boja popune: ${fillColor ? fillColor.match(/\d+,\d+,\d+/) : "-"}`;

  // Prikaz boje olovke
  document.getElementById("info-olovka").textContent =
    `Boja olovke: ${penColor.match(/\d+,\d+,\d+/) || "0,0,0"}`;

  // Prikaz debljine olovke
  document.getElementById("info-debljina").textContent =
    `Debljina olovke: ${penSize}`;
}

// Funkcija za crtanje praznog canvasa
function crtajPrazno() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resetujSvaPodesavanja();
  nacrtajRaster();
  document.getElementById("codeInput").value = "";
  prikaziInfo();
}

// Funkcija za inicijalno učitavanje
function inicijalizujCanvas() {
  nacrtajRaster();
  const saved = localStorage.getItem("savedDrawingCode");
  if (saved === null) {
    // Pravo prazno stanje: crtaj smajli
    drawSmiley();
  } else if (saved === "") {
    // Lažno prazno stanje: prazan canvas
    crtajPrazno();
  } else {
    // Ima koda: iscrtaj ga
    document.getElementById("codeInput").value = saved;
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      resetujSvaPodesavanja();
      nacrtajRaster();
      eval(saved);
    } catch (err) {
      drawSmiley();
    }
    prikaziInfo();
  }
}

// Pokreni kod i upiši u localStorage samo ako je kod ispravan
document.getElementById("runButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resetujSvaPodesavanja();
  nacrtajRaster();
  try {
    const code = document.getElementById("codeInput").value;
    eval(code);
    localStorage.setItem("savedDrawingCode", code); // upiši samo ako je prošlo
  } catch (err) {
    alert("Greška u kodu: " + err.message);
  }
  prikaziInfo();
});

// Resetuj: obriši localStorage (NULL) i nacrtaj smajli
document.getElementById("resetButton").addEventListener("click", () => {
  localStorage.removeItem("savedDrawingCode");
  crtajPrazno();
  drawSmiley();
  prikaziInfo();
});

// Obriši: postavi localStorage na "" i prazan canvas
document.getElementById("clearButton").addEventListener("click", () => {
  localStorage.setItem("savedDrawingCode", "");
  crtajPrazno();
});

// Prilikom učitavanja stranice
window.addEventListener("DOMContentLoaded", inicijalizujCanvas);

// Sačuvaj crtež u fajl
document.getElementById("saveDrawingBtn").addEventListener("click", () => {
  const code = document.getElementById("codeInput").value;
  const datum = new Date();
  const dd = String(datum.getDate()).padStart(2, '0');
  const mm = String(datum.getMonth() + 1).padStart(2, '0');
  const yyyy = datum.getFullYear();
  const fileName = `crtez_${dd}${mm}${yyyy}.txt`;
  const blob = new Blob([code], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
});

// Učitaj crtež iz fajla
document.getElementById("loadDrawingBtn").addEventListener("click", () => {
  document.getElementById("loadDrawingInput").click();
});
document.getElementById("loadDrawingInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    document.getElementById("codeInput").value = evt.target.result;
  };
  reader.readAsText(file);
});
