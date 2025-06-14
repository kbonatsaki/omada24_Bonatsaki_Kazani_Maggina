let curves = [];
let numCurves = 5;
let ledColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(4);

  // Δημιουργία κυματοειδών καμπύλων
  for (let i = 0; i < numCurves; i++) {
    let yOffset = map(i, 0, numCurves - 1, height * 0.2, height * 0.8);
    curves.push({
      yOffset: yOffset,
      amplitude: random(30, 70),
      frequency: random(0.01, 0.02),
      phase: random(TWO_PI)
    });
    ledColors.push(color(random(100,255), random(100,255), random(100,255)));
  }
}

function draw() {
  background(10);

  for (let i = 0; i < curves.length; i++) {
    let c = curves[i];
    stroke(ledColors[i]);
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = c.yOffset + sin(x * c.frequency + c.phase + millis() * 0.001) * c.amplitude;
      vertex(x, y);
    }
    endShape();
  }

  // Tooltip
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("LEDstrips σε καμπύλες γραμμές – μετακίνησε το ποντίκι για αλλαγή φωτός", width / 2, height - 20);
}

// Με αλλαγή θέσης ποντικιού αλλάζουμε τα χρώματα
function mouseMoved() {
  for (let i = 0; i < ledColors.length; i++) {
    ledColors[i] = color(
      noise(i, frameCount * 0.01 + mouseX * 0.01) * 255,
      noise(i + 50, frameCount * 0.01 + mouseY * 0.01) * 255,
      noise(i + 100, frameCount * 0.01 + mouseX * 0.01 + mouseY * 0.01) * 255
    );
  }
}

