function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(60);
  noFill();
}

function draw() {
  background(0, 50);

  // Θέσεις για τα “laser”
  let centers = [
    { x: width / 2, y: height / 2, speed: 0.0002, beams: 30, radius: 250 },
    { x: width / 2 + 300, y: height / 2 - 150, speed: -0.0003, beams: 20, radius: 150 },
    { x: width / 2 - 250, y: height / 2 + 200, speed: 0.00015, beams: 25, radius: 200 },
    { x: width / 2 + 100, y: height / 2 + 250, speed: 0.00025, beams: 35, radius: 220 }
  ];

  // Σχεδίαση κάθε laser μοτίβου ξεχωριστά
  for (let center of centers) {
    drawLaserPattern(center.x, center.y, center.beams, center.radius, center.speed);
  }
}

function drawLaserPattern(cx, cy, beams, radius, speed) {
  noFill();
  strokeWeight(1.5);

  let time = millis() * speed;

  drawGlow(cx, cy);

  for (let i = 0; i < beams; i++) {
    let angle = TWO_PI / beams * i + time;
    let alpha = 150 + 50 * sin(time * 10 + i);

    stroke(0, 150, 255, alpha);

    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;

    line(cx, cy, x, y);

    noStroke();
    fill(0, 200, 255, alpha);
    ellipse(x, y, 6, 6);
  }
}

function drawGlow(cx, cy) {
  noStroke();
  for (let r = 300; r > 50; r -= 20) {
    let alpha = map(r, 50, 300, 15, 2);
    fill(0, 150, 255, alpha);
    ellipse(cx, cy, r);
  }
}



