import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class main extends PApplet {

population p;
PVector target = new PVector(400, 10);


public void setup() {
  
  p = new population(500);
}

public void draw() {
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
class brain {
  PVector[] directions;
  int step = 0;

  brain(int size) {
    directions = new PVector[size];
    randomize();
  }


  // --------------------------------------------

  public void randomize() {
    for (int i = 0; i < directions.length; i++) {
      float randomAngle = random(2*PI);
      directions[i] = PVector.fromAngle(randomAngle);
    }
  }


  // --------------------------------------------

  public brain clone() {
    brain clone = new brain(directions.length);
    for (int i = 0; i < directions.length; i++) {
      clone.directions[i] = directions[i].copy();
    }
    return clone;
  }

  // --------------------------------------------

  public void mutate() {
    float mutationRate = 0.01f;
    for (int i = 0; i < directions.length; i++) {
      float rand = random(1);
      if (rand < mutationRate) {
        float randomAngle = random(2*PI);
        directions[i] = PVector.fromAngle(randomAngle);
      }
    }
  }
}
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

  public void show() {
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

  public void move() {
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

  public void update() {
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

  public void calculateFitness() {
    if (reachedGoal) {
      fitness = 1.0f/16.0f + 10000.0f/(float)(brain.step * brain.step);
    } else {
      float totaldist = dist(pos.x, pos.y, target.x, target.y);
      fitness = 1.0f / (totaldist * totaldist);
    }
  }

  // --------------------------------------------

  public dot gimmeBaby() {
    dot baby = new dot();
    baby.brain = brain.clone();
    return baby;
  }
}
class population {
  dot[] dots;
  float fitnessSum;
  int gen = 1;
  int bestDot = 0;
  int minStep= 400;

  population(int size) {
    dots = new dot[size];  
    for (int i = 0; i < dots.length; i++) {
      dots[i] = new dot();
    }
  }
  // --------------------------------------------

  public void naturalSelection() {
    dot[] newdots = new dot[dots.length];  
    setBestDot();
    calculateFitnessSum();

    newdots[0] = dots[bestDot].gimmeBaby();
    newdots[0].isBest = true;
    for (int i = 1; i < dots.length; i++) {
      dot parent = selectparent();
      newdots[i] = parent.gimmeBaby();
    }

    dots = newdots.clone();
    gen++;
  }



  // --------------------------------------------

  public void show() {
    for (int i = 1; i < dots.length; i++) {
      dots[i].show();
    }
    dots[0].show();
  }

  // --------------------------------------------

  public void update() {
    for (int i = 0; i < dots.length; i++) {
      if (dots[i].brain.step > minStep) {
        dots[i].dead = true;
      } else {
        dots[i].update();
      }
    }
  }

  // --------------------------------------------

  public void calculateFitness() {
    for (int i = 0; i < dots.length; i++) {
      dots[i].calculateFitness();
    }
  }

  // --------------------------------------------

  public boolean allDotsDead() {
    for (int i = 0; i < dots.length; i++) {
      if (!dots[i].dead && !dots[i].reachedGoal) {
        return false;
      }
    }
    return true;
  }

  // --------------------------------------------
  public void calculateFitnessSum() {
    fitnessSum = 0;
    for (int i = 0; i < dots.length; i++) {
      fitnessSum += dots[i].fitness;
    }
  }


  public dot selectparent() {
    float rand = random(fitnessSum);
    float runningSum = 0;

    for (int i = 0; i < dots.length; i++) {
      runningSum += dots[i].fitness;
      if (runningSum > rand) {
        return dots[i];
      }
    }
    //should never get to this point
    return null;
  }

  // --------------------------------------------

  public void mutateDemBabies() {
    for (int i = 0; i < dots.length; i++) {
      dots[i].brain.mutate();
    }
  }

  // --------------------------------------------

  public void setBestDot() {
    float max = 0;
    int maxIndex = 0;
    for (int i = 0; i < dots.length; i++) {
      if (dots[i].fitness > max) {
        max = dots[i].fitness;
        maxIndex = i;
      }
    }
    bestDot = maxIndex;

    if (dots[bestDot].reachedGoal) {
      minStep = dots[bestDot].brain.step;
      println("step: ", minStep);
    }
  }
}
  public void settings() {  size(800, 700); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "--present", "--window-color=#666666", "--stop-color=#cccccc", "main" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
