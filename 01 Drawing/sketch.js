function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(200);

  // big bully hill thing
  fill(50);
  ellipse(120, 120, 250, 200);

  // mean speech bubble
  fill(255);
  ellipse(200, 100, 150, 100);
  triangle(160, 120, 180, 130, 170, 140);
  fill(0);
  textSize(32);
  text("@!", 180, 110);

  // small scared face
  fill(255, 255, 0);
  ellipse(300, 280, 100, 100);

  // eyes
  fill(0);
  ellipse(285, 270, 10, 10);
  ellipse(315, 270, 10, 10);

  // sad mouth
  noFill();
  stroke(0);
  arc(300, 300, 40, 20, PI, 0);
}
