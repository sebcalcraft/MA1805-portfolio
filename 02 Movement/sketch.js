let counter = 0;
let message = "lines: "; // string variable
let r, g, b; // colour variables

function setup(){
  createCanvas(windowWidth, windowHeight);
  // random colour set once — like week example
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
}

function draw(){
  background(255);

  // Draw random lines (from example)
  let x1 = random(width);
  let y1 = random(height);
  let x2 = random(width);
  let y2 = random(height);
  stroke(r, g, b);
  line(x1, y1, x2, y2);

  // Text that increments with counter++
  fill(0);
  textSize(width/20);
  textAlign(CENTER, CENTER);
  text(message + counter, width/2, height/2);

  counter++; // movement + increment
}
