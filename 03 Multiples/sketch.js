
let rows = 20;
let cols = 20;
let pad = 10;

let tones = [];
let digits = [];
let reveal = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let count = rows * cols;

  // Fill arrays
  for (let i = 0; i < count; i++) {
    tones[i] = random(80, 200);    // grey shade
    digits[i] = int(random(0, 10)); // 0–9 digit
    reveal[i] = 0;                  // hidden at start
  }

  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(230);

  // Grid system (graph-paper idea)
  let cellW = (width / cols) - pad;
  let cellH = (height / rows) - pad;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

      let i = r * cols + c;
      let x = pad + c * (cellW + pad) + cellW / 2;
      let y = pad + r * (cellH + pad) + cellH / 2;

      // Cell fill (soft farmland-like zoning)
      fill(tones[i], 50);
      rectMode(CENTER);
      rect(x, y, cellW, cellH);

      // If clicked → reveal number, else hide (conditional)
      if (reveal[i] > 0) {
        fill(0, reveal[i]);
        textSize(min(cellW, cellH) * 0.6);
        text(digits[i], x, y);
        reveal[i] = reveal[i] - 5; // fade out slowly
        if (reveal[i] < 0) reveal[i] = 0;
      }
    }
  }
}

function mouseClicked() {
  // Find nearest grid position
  let cellW = (width / cols) - pad;
  let cellH = (height / rows) - pad;

  let c = floor((mouseX - pad) / (cellW + pad));
  let r = floor((mouseY - pad) / (cellH + pad));

  // Check bounds
  if (c >= 0 && c < cols && r >= 0 && r < rows) {
    let i = r * cols + c;

    // Toggle number visibility (conditional logic)
    if (reveal[i] === 0) {
      reveal[i] = 255;
    } else {
      reveal[i] = 0;
    }
  }
  return false; // p5 expects this in mouseClicked
}
