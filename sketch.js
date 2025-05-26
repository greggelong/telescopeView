let fated = false;
let greg; //variable to hold gurtle
let population = [];
let pressed = false; //for de bouncing
let bg;
let cnv;
let capture;
let dy1;
let dy;
let x, y, angle;
let noiseOffsetX = 0;
let noiseOffsetY = 1000;
let noiseOffsetAngle = 2000;

function preload() {
  dy1 = loadImage("dy.png");
}
function setup() {
  pixelDensity(1);
  cnv = createCanvas(windowWidth, windowHeight);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment",
      },
    },
    //video: {
    //facingMode: "user"
    //}
  };
  //if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  capture = createCapture(VIDEO);
  //}else{
  // false for not mobile device
  // capture = createCapture(VIDEO)
  //}
  //
  //capture = createCapture(VIDEO)
  capture.size(width / 2, height / 2);
  capture.hide();
  dy1.resize(0, 100);
  dy = dy1.get(0, 0, dy1.width, 70);
  //let cx = (windowWidth - cnv.width) / 2;
  //let cy = (windowHeight - cnv.height) / 2;
  //cnv.position(cx, cy);
  //bg.resize(width, height);
  angleMode(DEGREES);
  for (let i = 0; i < 21; i++) {
    population[i] = new Creature(color(0, 0, 0, 255), random(5, 30));
  }
}

function draw() {
  image(capture, 0, 0, width, height);
  // Update position and angle with Perlin noise
  x = noise(noiseOffsetX) * width;
  y = noise(noiseOffsetY) * height;
  angle = noise(noiseOffsetAngle) * TWO_PI;

  noiseOffsetX += 0.005;
  noiseOffsetY += 0.005;
  noiseOffsetAngle += 0.002;
  // Constrain to keep entire image on canvas
  let halfW = dy.width / 2;
  let halfH = dy.height / 2;
  x = constrain(x, halfW, width - halfW);
  y = constrain(y, halfH, height - halfH);

  push();
  translate(x, y);
  rotate(angle);
  image(dy, 0, 0);
  pop();
  // creatures
  for (let i = 0; i < population.length; i++) {
    population[i].show();
    population[i].squirm(frameCount);
    population[i].wither(); // forgot to call tis
    population[i].move();
  }

  if (!fated) {
    fill(255, 255, 0);
    textSize(50);
    noStroke();
    text("PRESS", width / 2, 100);
  } else {
    fill(255, 0, 0);
    textSize(50);
    noStroke();
    text("Press to start over", width / 2.5, 100);
  }
}

function mouseClicked() {
  let fate = random([instr, instr2]);
  if (!pressed) {
    pressed = true;
    if (!fated) {
      for (let i = 0; i < population.length; i++) {
        if (population[i].gene === fate) {
          population[i].dying = true;
        }
        fated = true;
      }
    } else {
      for (let i = 0; i < population.length; i++) {
        population[i].gene = random([instr, instr2]);
        population[i].dying = false;
        population[i].dead = false;
        population[i].sz = random(5, 30); //reset size
        population[i].deathClock = random(100, 500); // need to reset death clock too
      }
      fated = false;
    }
  }
}

function mouseReleased() {
  pressed = false;
}
