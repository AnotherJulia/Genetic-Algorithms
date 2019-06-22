class dot {
  PVector pos;
  PVector vel;
  PVector acc;

  brain brain;

  boolean dead = false;
  boolean reachedGoal = false;
  boolean isBest = false;
  float maxspeed = 5;
  float fitness;

  dot() {
    brain = new brain(400);
    pos = new PVector(width/2, 680);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
  }


  // --------------------------------------------

  void show() {
    if (isBest) {
      fill(0, 255, 100);
      noStroke();
      ellipse(pos.x, pos.y, 8, 8);
    } else {

      fill(0);
      stroke(0);
      ellipse(pos.x, pos.y, 4, 4);
    }
  }

  // --------------------------------------------

  void move() {
    if (!dead && !reachedGoal) {
      if (brain.directions.length > brain.step) {  
        acc = brain.directions[brain.step];
        brain.step++;
      }

      vel.add(acc);
      vel.limit(maxspeed);
      pos.add(vel);
    }
  }

  // --------------------------------------------

  void update() {
    move();
    if (pos.x < 2 || pos.y < 2 || pos.x > width-2 || pos.y > height-2) {
      dead = true;
    } else if (dist(pos.x, pos.y, target.x, target.y) < 5) {
      reachedGoal=true;
    } else if (pos.x < 700 && pos.y < 310 && pos.x > 100 && pos.y > 300) {
      dead = true;    
    }
  }


  // --------------------------------------------

  void calculateFitness() {
    if (reachedGoal) {
      fitness = 1.0/16.0 + 10000.0/(float)(brain.step * brain.step);
    } else {
      float totaldist = dist(pos.x, pos.y, target.x, target.y);
      fitness = 1.0 / (totaldist * totaldist);
    }
  }

  // --------------------------------------------

  dot gimmeBaby() {
    dot baby = new dot();
    baby.brain = brain.clone();
    return baby;
  }
}
