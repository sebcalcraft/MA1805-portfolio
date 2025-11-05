function setup(){
  createCanvas(520, 520);
  angleMode(DEGREES);
  noLoop(); 
}
function draw(){
  background(15,17,21);
  translate(width/2, height/2);


  noStroke();
  fill(0,0,0,190);
  ellipse(-120, -150, 360, 300);

  
  push();
  translate(-60, -40);
  
  fill(250,95,95);
  beginShape();
  let r = 90;
  for (let a = 0; a < 360; a += 30){
    let spike = (a % 60 === 0) ? 25 : -5;
    let rr = r + spike;
    vertex(rr * cos(a), rr * sin(a));
  }
  endShape(CLOSE);


  triangle(65,25, 135,40, 75,60);


  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("@#!", 0, 0);
  pop();

 
  push();
  translate(100, 100);
  fill(255,210,80);
  stroke(0,50);
  strokeWeight(2);
  circle(0,0,160);

  
  stroke(0,180);
  strokeWeight(10);
  point(-35,-20);
  point(35,-20);


  noFill();
  stroke(0,180);
  strokeWeight(12);
  arc(0, 25, 80, 50, 210, 330);


  noStroke();
  fill(90,160,255);
  circle(33, -2, 16);
  pop();
}