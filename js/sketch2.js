let sketch2 = (p) => {
  let curves = [];
  let numCurves = 5;
  let ledColors = [];

  // Αρχικοποίηση καμβά και καμπύλων
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.strokeWeight(4);

    // Δημιουργία κυματοειδών καμπύλων
    for (let i = 0; i < numCurves; i++) {
      let yOffset = p.map(i, 0, numCurves - 1, p.height * 0.2, p.height * 0.8);
      curves.push({
        yOffset: yOffset,
        amplitude: p.random(30, 70),
        frequency: p.random(0.01, 0.02),
        phase: p.random(p.TWO_PI)
      });
      ledColors.push(p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255)));
    }
  };

  // Σχεδίαση animation
  p.draw = () => {
    p.background(10);

    for (let i = 0; i < curves.length; i++) {
      let c = curves[i];
      p.stroke(ledColors[i]);
      p.beginShape();
      for (let x = 0; x < p.width; x += 10) {
        let y = c.yOffset + p.sin(x * c.frequency + c.phase + p.millis() * 0.001) * c.amplitude;
        p.vertex(x, y);
      }
      p.endShape();
    }

    // Tooltip
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(14);
    p.text("LEDstrips σε καμπύλες γραμμές – μετακίνησε το ποντίκι για αλλαγή φωτός", p.width / 2, p.height - 20);
  };

  // Με αλλαγή θέσης ποντικιού αλλάζουμε τα χρώματα
  p.mouseMoved = () => {
    for (let i = 0; i < ledColors.length; i++) {
      ledColors[i] = p.color(
        p.noise(i, p.frameCount * 0.01 + p.mouseX * 0.01) * 255,
        p.noise(i + 50, p.frameCount * 0.01 + p.mouseY * 0.01) * 255,
        p.noise(i + 100, p.frameCount * 0.01 + p.mouseX * 0.01 + p.mouseY * 0.01) * 255
      );
    }
  };

  // Responsive σχεδίαση
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Εκκίνηση του sketch
new p5(sketch2, 'container2');