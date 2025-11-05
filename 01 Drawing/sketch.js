function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(200);

  fill(255, 200, 0);
  ellipse(120, 200, 120, 120);

  stroke(0);
  strokeWeight(5);
  line(90, 170, 110, 180);
  line(130, 180, 150, 170);

  fill(0);
  ellipse(105, 190, 12, 12);
  ellipse(135, 190, 12, 12);

  noFill();
  strokeWeight(6);
  arc(120, 220, 50, 25, 0, PI);

  fill(255);
  noStroke();
  ellipse(190, 150, 90, 60);
  triangle(160, 165, 180, 175, 170, 185);
  fill(0);
  textSize(20);
  text("@£$%@!", 160, 155);

  noStroke();
  fill(255, 255, 0);
  ellipse(280, 200, 120, 120);

  fill(0);
  ellipse(265, 190, 10, 10);
  ellipse(295, 190, 10, 10);

  noFill();
  stroke(0);
  strokeWeight(4);
  arc(280, 230, 40, 25, PI, 0);

  noStroke();
  fill(0, 150, 255);
  ellipse(295, 205, 10, 15);
}