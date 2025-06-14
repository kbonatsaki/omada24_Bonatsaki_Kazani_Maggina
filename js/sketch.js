let sketch1 = (p) => {

  // Αρχικοποίηση καμβά
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.frameRate(60);
    p.noFill();
  };

  // Σχεδίαση του animation
  p.draw = () => {
    // Ελαφρύ ξεθώριασμα του προηγούμενου frame για motion trails
    p.background(0, 50);

    // Θέσεις για τα “laser”
    let centers = [
      { x: p.width / 2, y: p.height / 2, speed: 0.0002, beams: 30, radius: 250 },
      { x: p.width / 2 + 300, y: p.height / 2 - 150, speed: -0.0003, beams: 20, radius: 150 },
      { x: p.width / 2 - 250, y: p.height / 2 + 200, speed: 0.00015, beams: 25, radius: 200 },
      { x: p.width / 2 + 100, y: p.height / 2 + 250, speed: 0.00025, beams: 35, radius: 220 }
    ];

    // Σχεδίαση κάθε laser μοτίβου ξεχωριστά
    for (let center of centers) {
      drawLaserPattern(center.x, center.y, center.beams, center.radius, center.speed);
    }
  };

  // Σχεδιάζει ένα μοτίβο laser
  function drawLaserPattern(cx, cy, beams, radius, speed) {
    p.noFill();
    p.strokeWeight(1.5);

    let time = p.millis() * speed;

    // Εφέ λάμψης στο κέντρο
    drawGlow(cx, cy);

    // Σχεδίαση γραμμών
    for (let i = 0; i < beams; i++) {
      let angle = p.TWO_PI / beams * i + time;
      let alpha = 150 + 50 * p.sin(time * 10 + i);

      p.stroke(0, 150, 255, alpha);

      let x = cx + p.cos(angle) * radius;
      let y = cy + p.sin(angle) * radius;

      p.line(cx, cy, x, y);

      // Τελείες στις άκρες των γραμμών
      p.noStroke();
      p.fill(0, 200, 255, alpha);
      p.ellipse(x, y, 6, 6);
    }
  }

  // Προσθέτει κυκλικά επίπεδα λάμψης
  function drawGlow(cx, cy) {
    p.noStroke();
    for (let r = 300; r > 50; r -= 20) {
      let alpha = p.map(r, 50, 300, 15, 2);
      p.fill(0, 150, 255, alpha);
      p.ellipse(cx, cy, r);
    }
  }

  // Responsive σχεδίαση
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Εκκίνηση του sketch
new p5(sketch1, 'container1');