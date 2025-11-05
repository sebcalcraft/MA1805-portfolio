let step = 0;
let words = ["A THROW", "OF THE DICE", "WILL NEVER", "ABOLISH", "CHANCE"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  textAlign(LEFT, BASELINE);
}

function draw() {
  background(245);

  // Moving random lines
  stroke(100);
  for (let i = 0; i < 50; i++) {
    let x1 = (i * 20 + step) % width;
    let y1 = random(height);
    let x2 = x1 + random(-80, 80);
    let y2 = y1 + random(-30, 30);
    strokeWeight(random(0.3, 1.5));
    line(x1, y1, x2, y2);
  }

  // Random text clusters
  noStroke();
  fill(0);
  for (let j = 0; j < 12; j++) {
    let s = 18 + random(60);  // variable size
    textSize(s);
    let x = random(width);
    let y = random(height);
    text(random(words), x, y);
  }

  // Main headline changes randomly
  let headlineSize = 40 + random(30);
  textSize(headlineSize);
  textStyle(BOLD);
  text(words[0] + " " + words[1], 50, height * 0.7);
}