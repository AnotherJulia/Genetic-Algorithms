population p;
PVector target = new PVector(400, 10);


void setup() {
  size(800, 700);
  p = new population(500);
}

void draw() {
  background(255);

  //draw target
  noStroke();
  fill(255, 0, 0);
  ellipseMode(CENTER);
  ellipse(target.x, target.y, 8, 8);

  //draw obstacles
  stroke(0);
  strokeWeight(2);
  fill(0, 100, 100);
  rect(100, 300, 600, 10);


  if (p.allDotsDead()) {
    p.calculateFitness();
    p.naturalSelection();
    p.mutateDemBabies();
  } else {
    p.update();
    p.show();
  }
}
