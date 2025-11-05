
let rows = 14, cols = 14, pad = 8;
let w, h, sW, sH;

let sizes = [], speeds = [], phases = [], rgba = [];
let mode = 0;     // 0=circles bias, 1=squares bias
let rotateOn = true;

// queue (1D list) across the bottom – “everyday waiting”
let qCount = 32, qx = [], qy = [], qv = [], qAge = [];

function setup() {
  w = windowWidth; h = windowHeight;
  createCanvas(w, h);
  noStroke();
  initGrid();
  initQueue();
  reseedPalette();
}

function windowResized(){
  w = windowWidth; h = windowHeight;
  resizeCanvas(w, h);
  sW = (w/cols) - (pad + (pad/cols));
  sH = (h/rows) - (pad + (pad/rows));
}

function initGrid(){
  sizes = []; speeds = []; phases = [];
  sW = (w/cols) - (pad + (pad/cols));
  sH = (h/rows) - (pad + (pad/rows));
  for(let i=0; i<rows*cols; i++){
    sizes[i] = random(0.4, 0.95);
    speeds[i] = random(0.003, 0.02);
    phases[i] = random(TWO_PI);
  }
}

function initQueue(){
  qx = []; qy = []; qv = []; qAge = [];
  let y = h - 40;
  for(let i=0; i<qCount; i++){
    qx[i] = map(i, 0, qCount-1, 30, w-30);
    qy[i] = y;
    qv[i] = random(0.4, 1.6);
    qAge[i] = int(random(0, 120));
  }
}

function reseedPalette(){
  rgba = [int(random(40,255)), int(random(40,255)), int(random(40,255)), 200];
}

function draw() {
  background(18);

  // --- GRID (2D list) ---
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      let i = r*cols + c;
      // cell center
      let x = pad + (c*sW) + (pad*c) + sW/2;
      let y = pad + (r*sH) + (pad*r) + sH/2;

      // animate phase & pulse
      phases[i] += speeds[i];
      let pulse = (sin(phases[i]) * 0.5 + 0.5); // 0..1
      let sz = lerp(0.25, 1.0, pulse) * min(sW, sH) * sizes[i];

      // alternate per index and time -> conditional pattern
      let alt = ((i + floor(frameCount/15)) % 2 === 0);

      // color varies by row and mode
      let a = map(pulse, 0, 1, 80, 230);
      if (mode === 0) {
        fill(rgba[0], map(r,0,rows-1,40,rgba[1]), rgba[2], a);
      } else {
        fill(map(c,0,cols-1,40,rgba[0]), rgba[1], map(r,0,rows-1,40,rgba[2]), a);
      }

      push();
      translate(x, y);
      if (rotateOn && alt) rotate((r+c+frameCount*0.01) * (PI/24));

      // shape conditional: mouse toggles bias
      let drawCircle = (mode === 0) ? alt : !alt;

      if (drawCircle) {
        circle(0, 0, sz);
      } else {
        rectMode(CENTER);
        rect(0, 0, sz, sz);
      }
      pop();
    }
  }

  // --- QUEUE (1D list) ---
  for(let i=0; i<qCount; i++){
    qAge[i]++;

    // subtle drift + wrap (repetition of waiting)
    qx[i] += qv[i] * 0.3;
    if(qx[i] > width-20){
      qx[i] = 20;
      // on wrap, conditional color “tick”
      rgba[ (i%3) ] = int(random(60,255));
    }

    // older dots brighter
    let a = constrain(map(qAge[i], 0, 240, 80, 255), 80, 255);
    fill(220, a);
    circle(qx[i], qy[i] + sin((i+frameCount)*0.08)*2, 8);

    // occasional “skip the queue”
    if (mouseIsPressed && i%7===0) qx[i] += 2;
  }

  // HUD
  fill(255, 180);
  textSize(12);
  textAlign(LEFT, TOP);
  text("03.multiples — arrays/loops/conditionals | click: switch mode | g: rotate on/off | r: reseed", 12, 12);
}

function mouseClicked(){
  mode = (mode===0) ? 1 : 0;
  return false;
}

function keyPressed(){
  if(key==='g' || key==='G') rotateOn = !rotateOn;
  if(key==='r' || key==='R') reseedPalette();
  return false;
}