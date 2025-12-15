
// LISTS (ARRAYS)

// circle positions
let xPos = [];
let yPos = [];

// circle size
let size = [];

// movement speed
let speedX = [];
let speedY = [];

// rotation speed
let rotation = [];

// label for each circle
let label = [];

// click animation
let hitFlash = [];

// SYSTEM VALUES
let score = 0;
let misses = 0;
let level = 1;
let frameCountLocal = 0;

// hover tracking
let hoverIndex = -1;
let hoverFrames = 0;

// layout
let sideBarWidth = 300;
let margin = 16;

// list of words for the classification
const words = [
  "tap","wait","scroll","confirm","retry",
  "skip","accept","deny","hold","queue",
  "refresh","again","more","submit","load"
];

// SETUP 
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("sans-serif");
  textAlign(LEFT, TOP);
  ellipseMode(CENTER);

  // create starting circles
  for (let i = 0; i < 12; i++) {
    createCircle(i);
  }
}

// DRAW LOOP 
function draw() {
  frameCountLocal++;
  background(12);

  updateLevel();
  drawGrid();
  drawSideBar();

  hoverIndex = getHoverIndex();
  hoverFrames = (hoverIndex !== -1) ? hoverFrames + 1 : 0;

  push();
  applyShake();
  moveCircles();
  drawCircles();
  pop();

  drawFooter();

  if (level === 5) drawEndScreen();
}

// CREATE CIRCLES 
function createCircle(i) {
  xPos[i] = random(sideBarWidth + 60, width - 40);
  yPos[i] = random(60, height - 60);
  size[i] = random(18, 40);

  let baseSpeed = 1 + level * 0.4;
  speedX[i] = random(-baseSpeed, baseSpeed);
  speedY[i] = random(-baseSpeed, baseSpeed);

  rotation[i] = random(-0.03, 0.03);
  label[i] = words[floor(random(words.length))];
  hitFlash[i] = 0;
}

// MOVE CIRCLES 
function moveCircles() {
  for (let i = 0; i < xPos.length; i++) {
    xPos[i] += speedX[i];
    yPos[i] += speedY[i];

    // wrap around screen
    if (xPos[i] < sideBarWidth) xPos[i] = width;
    if (xPos[i] > width) xPos[i] = sideBarWidth;
    if (yPos[i] < 0) yPos[i] = height;
    if (yPos[i] > height) yPos[i] = 0;

    // fade click effect
    hitFlash[i] *= 0.9;

    // circles react when you hover too long
    if (hoverIndex !== -1 && hoverFrames > 30 && i !== hoverIndex) {
      let d = dist(xPos[i], yPos[i], xPos[hoverIndex], yPos[hoverIndex]);
      if (d < 200) {
        speedX[i] *= 1.002;
        speedY[i] *= 1.002;
      }
    }

    // later levels slowly shrink circles
    if (level >= 4) {
      size[i] = max(10, size[i] - 0.01);
    }
  }
}

// DRAW CIRCLES 
function drawCircles() {
  for (let i = 0; i < xPos.length; i++) {
    let d = dist(mouseX, mouseY, xPos[i], yPos[i]);
    let hovering = d < size[i] + 10;

    push();
    translate(xPos[i], yPos[i]);
    rotate(frameCountLocal * rotation[i]);

    let drawSize = size[i] * (1 + hitFlash[i] * 0.4);

    noStroke();
    fill(hovering ? 255 : 220);
    ellipse(0, 0, drawSize * 2);

    if (hovering) {
      noFill();
      stroke(255);
      ellipse(0, 0, drawSize * 2 + 14);
    }

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(label[i], 0, 0);
    textAlign(LEFT, TOP);

    pop();
  }
}

// HOVER CHECK 
function getHoverIndex() {
  let closest = -1;
  let minDist = 99999;

  for (let i = 0; i < xPos.length; i++) {
    let d = dist(mouseX, mouseY, xPos[i], yPos[i]);
    if (d < size[i] + 10 && d < minDist) {
      minDist = d;
      closest = i;
    }
  }
  return closest;
}

// MOUSE CLICK
function mouseClicked() {
  let hit = -1;

  for (let i = 0; i < xPos.length; i++) {
    let d = dist(mouseX, mouseY, xPos[i], yPos[i]);
    if (d <= size[i]) {
      hit = i;
      break;
    }
  }

  if (hit !== -1) {
    score++;
    hitFlash[hit] = 1;
    label[hit] = words[floor(random(words.length))];
    xPos[hit] = random(sideBarWidth + 40, width - 40);
    yPos[hit] = random(40, height - 40);
  } else {
    misses++;
  }
}

// LEVEL SYSTEM 
function updateLevel() {
  let total = score + misses;

  if (total < 6) level = 1;
  else if (total < 14) level = 2;
  else if (total < 26) level = 3;
  else if (total < 42) level = 4;
  else level = 5;

  let targetCount = 10 + level * 3;

  while (xPos.length < targetCount) createCircle(xPos.length);
  while (xPos.length > targetCount) {
    xPos.pop();
    yPos.pop();
    size.pop();
    speedX.pop();
    speedY.pop();
    rotation.pop();
    label.pop();
    hitFlash.pop();
  }
}

// BACKGROUND GRID
function drawGrid() {
  let spacing = 40;
  if (level >= 3) spacing = 28;
  if (level >= 5) spacing = 20;

  stroke(255, 15);
  for (let x = sideBarWidth; x < width; x += spacing) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += spacing) {
    line(sideBarWidth, y, width, y);
  }

  noStroke();
  fill(0, 180);
  rect(0, 0, sideBarWidth, height);
}

// CAMERA SHAKE 
function applyShake() {
  let rotAmount = 0;
  let shake = 0;

  if (level === 2) { rotAmount = 0.01; shake = 0.5; }
  if (level === 3) { rotAmount = 0.02; shake = 1.0; }
  if (level === 4) { rotAmount = 0.04; shake = 1.6; }
  if (level === 5) { rotAmount = 0.06; shake = 2.4; }

  translate(width / 2, height / 2);
  rotate(sin(frameCountLocal * 0.01) * rotAmount);
  translate(random(-shake, shake), random(-shake, shake));
  translate(-width / 2, -height / 2);
}

// SIDE BAR 
function drawSideBar() {
  fill(255);
  textSize(16);
  text("REPETITION SYSTEM", margin, margin);

  fill(200);
  textSize(12);
  text("Click circles.\nMisses still count.", margin, margin + 26);

  fill(255);
  text("score: " + score, margin, margin + 70);
  text("misses: " + misses, margin, margin + 90);
  text("level: " + level + " / 5", margin, margin + 110);

  fill(180);
  text(levelText(), margin, margin + 140, sideBarWidth - margin * 2, 140);
}

// TEXT 
function levelText() {
  if (level === 1) return "Stable repetition.";
  if (level === 2) return "Movement speeds up.";
  if (level === 3) return "Attention becomes data.";
  if (level === 4) return "Control starts to fade.";
  return "System satisfied.";
}

// FOOTER 
function drawFooter() {
  fill(255, 140);
  textSize(12);
  text("Click to interact • Hover to influence", sideBarWidth + 20, height - 28);
}

// END SCREEN 
function drawEndScreen() {
  fill(0, 160);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("SYSTEM COMPLETE", width / 2, height / 2);
  textSize(14);
  text("Your repetition has been recorded.", width / 2, height / 2 + 26);
  textAlign(LEFT, TOP);
}

// RESIZE 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
