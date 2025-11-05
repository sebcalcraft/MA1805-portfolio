let shieldOn = false;

function setup(){
  createCanvas(520, 520);
  angleMode(DEGREES);
  noCursor();
}

function draw(){
  background(15,17,21);
  translate(width/2, height/2);

  const k = constrain(map(mouseX, 0, width, 0, 1), 0, 1); // intensity

  // Simple vignette
  noStroke();
  for (let r = max(width, height); r > 0; r -= 10){
    fill(20,22,28, map(r,0,max(width,height), 230, 0));
    circle(0,0,r);
  }

  // Looming bully silhouette (top-left)
  push();
  translate(-110 - 15*k, -150 - 30*k);
  rotate(-8 - 6*k);
  fill(0, 0, 0, 180);
  ellipse(0,0, 320 + 40*k, 260 + 20*k);
  stroke(0,0,0,220);
  strokeWeight(14);
  line(-80,-40, -10,-70);
  line( 30,-20, 110,-50);
  pop();

  // Victim face (small, lower-right)
  push();
  const faceY = 90 + 8*sin(frameCount*2);
  translate(80, faceY);
  const baseCol = lerpColor(color(255,204,70), color(220,180,90), k);
  stroke(0,20);
  strokeWeight(2);
  fill(baseCol);
  circle(0,0,180);

  // Shadow overlay
  noStroke();
  fill(0, 40 + 120*k);
  arc(-10,-10, 190,190, 160,340, CHORD);

  // Eyes (worried)
  stroke(0,140);
  strokeWeight(10);
  const eyeDX = 32, eyeY = -20;
  if (k > 0.6){ line(-eyeDX-6,eyeY, -eyeDX+6,eyeY); } // left squints under stress
  else { point(-eyeDX, eyeY + map(k,0,1,0,2)); }
  point(eyeDX, eyeY + map(k,0,1,0,2));

  // Mouth: neutral → frown
  noFill();
  stroke(0,160);
  strokeWeight(12);
  const m = lerp(10, -35, k);
  arc(0, 30, 90, 60, 200 - m, 340 + m);

  // Tear (appears with intensity)
  if (k > 0.35){
    noStroke();
    fill(90,160,255,220);
    const tAmt = map(k, 0.35, 1, 0, 1);
    circle(eyeDX-2, eyeY+18 + 22*tAmt, 10 + 8*tAmt);
  }

  // Bandage (harm indicator)
  if (k > 0.55){
    push();
    rotate(-20);
    const a = map(k, 0.55, 1, 0, 200);
    fill(235,210,160,a); rectMode(CENTER); noStroke();
    rect(-8,6,56,18,6);
    fill(200,160,120,a);
    rect(-8,6,20,12,3);
    pop();
  }

  // Optional “shield” of resilience
  if (shieldOn){
    noFill();
    stroke(120,220,255,180);
    strokeWeight(3);
    circle(0,0, 200 + 4*sin(frameCount*3));
  }
  pop();

  // Spiky speech bubble (verbal abuse), points at victim
  push();
  translate(-40 - 30*k, -30 - 20*k);
  const bubbleCol = lerpColor(color(230,235,245,230), color(255,90,90,240), k);
  noStroke();
  fill(bubbleCol);
  beginShape();
  const rrBase = 90 + 30*k;
  for (let a = 0; a < 360; a += 30){
    const rr = rrBase + (a % 60 === 0 ? 18+8*k : -6);
    vertex(rr*cos(a), rr*sin(a));
  }
  endShape(CLOSE);
  triangle(60,20, 130,40, 70,60); // tail

  // Symbols inside bubble
  fill(20,24,32);
  textAlign(CENTER, CENTER);
  textSize(26 + 6*k);
  textStyle(BOLD);
  text("@#!", 0, 0);
  pop();

  // Cursor dot
  noStroke();
  fill(255,255,255,200);
  circle(mouseX - width/2, mouseY - height/2, 6);
}

function mousePressed(){ shieldOn = !shieldOn; }
