// MA1805 — Media + Pixelation (image, sound, video)
// Files expected (copy from the MA1805 repo 06-media folder):
//  - Antenna.jpg
//  - humm.wav
//  - TheSea.mov
//  - p5.sound.min.js (already linked in index.html)

let img, hum, video;
let playing = false;

// pixelation settings
let bgBlock = 12;         // background pixel size (bigger = chunkier)
let spriteBlock = 8;      // sprite pixel size
let spriteX = 0, spriteY = 0, spriteDX = 2, spriteDY = 1.5;
let tintShift = 0;

function preload() {
  img = loadImage('Antenna.jpg');
  hum = loadSound('humm.wav');
  video = createVideo('TheSea.mov');
  video.hide(); // hide HTML element; we'll draw it to canvas
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  hum.amp(0.12);
  frameRate(60);

  // start video paused; click to toggle (matches your working code idea)
  video.volume(0);
  video.pause();

  // place sprite somewhere sensible
  spriteX = width * 0.6;
  spriteY = height * 0.25;
}

function draw() {
  background(0);

  // --- Task A-1: Pixelated background from the image (greyscale style) ---
  if (img) {
    pixelateImageGreyscale(img, 0, 0, width, height * 0.75, bgBlock);
  }

  // --- Draw the video feed with a mild filter look (corner) ---
  image(video, 16, 16, 420, 260);
  push();
  // simple aesthetic tweak to differentiate media layers
  noFill();
  stroke(0, 0, 100, 60);
  rect(16, 16, 420, 260);
  pop();

  // --- Task A-2: Animated smaller pixelated "sprite" (colour shifting) ---
  if (img) {
    pixelateImageColor(img, spriteX, spriteY, 240, 180, spriteBlock, tintShift);
  }

  // sprite motion + wrap
  spriteX += spriteDX;
  spriteY += spriteDY;

  if (spriteX < 0 || spriteX + 240 > width)  spriteDX *= -1;
  if (spriteY < 0 || spriteY + 180 > height) spriteDY *= -1;

  // gentle hue cycling
  tintShift = (tintShift + 0.6) % 360;

  // on-screen hint
  drawHUD();
}

function mousePressed() {
  // Browser policies: start/resume audio on interaction
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  if (playing) {
    video.pause();
    hum.pause();
  } else {
    video.loop();
    hum.loop();
  }
  playing = !playing;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ----------------- Helpers -----------------

// Greyscale blocky pixelation (like "pixelate-grey")
function pixelateImageGreyscale(src, x, y, w, h, block) {
  // draw the image scaled to the target area first
  push();
  image(src, x, y, w, h);
  pop();

  // read pixels blockwise and paint rectangles in GREY
  src.loadPixels();
  for (let yy = 0; yy < h; yy += block) {
    for (let xx = 0; xx < w; xx += block) {
      // sample from the source image coordinates
      // map canvas block to image pixel
      let sx = int(map(xx, 0, w, 0, src.width - 1));
      let sy = int(map(yy, 0, h, 0, src.height - 1));
      const c = src.get(sx, sy); // [r,g,b,a]
      const g = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
      fill(0, 0, map(g, 0, 255, 0, 100)); // HSB grey
      noStroke();
      rect(x + xx, y + yy, block, block);
    }
  }
}

// Colour pixelation (like "pixelate-color"), plus hue shift
function pixelateImageColor(src, x, y, w, h, block, hueShift) {
  src.loadPixels();
  for (let yy = 0; yy < h; yy += block) {
    for (let xx = 0; xx < w; xx += block) {
      let sx = int(map(xx, 0, w, 0, src.width - 1));
      let sy = int(map(yy, 0, h, 0, src.height - 1));
      const rgb = src.get(sx, sy);
      // convert to HSB-ish by letting p5 handle tint via fill in HSB mode
      let col = color(rgb[0], rgb[1], rgb[2]);
      let hh = (hue(col) + hueShift) % 360;
      fill(hh, saturation(col), brightness(col), 100);
      noStroke();
      rect(x + xx, y + yy, block, block);
    }
  }
}

function drawHUD() {
  push();
  textFont('monospace');
  textSize(12);
  fill(0, 0, 100, 90);
  text('click to toggle sound + video • bgBlock +/- with [1]/[2] • spriteBlock +/- with [3]/[4]', 16, height - 16);
  pop();
}

function keyPressed() {
  if (key === '1') bgBlock = max(4, bgBlock - 2);
  if (key === '2') bgBlock = min(64, bgBlock + 2);
  if (key === '3') spriteBlock = max(2, spriteBlock - 1);
  if (key === '4') spriteBlock = min(32, spriteBlock + 1);
}
