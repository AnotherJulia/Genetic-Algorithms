class brain {
  PVector[] directions;
  int step = 0;

  brain(int size) {
    directions = new PVector[size];
    randomize();
  }


  // --------------------------------------------

  void randomize() {
    for (int i = 0; i < directions.length; i++) {
      float randomAngle = random(2*PI);
      directions[i] = PVector.fromAngle(randomAngle);
    }
  }


  // --------------------------------------------

  brain clone() {
    brain clone = new brain(directions.length);
    for (int i = 0; i < directions.length; i++) {
      clone.directions[i] = directions[i].copy();
    }
    return clone;
  }

  // --------------------------------------------

  void mutate() {
    float mutationRate = 0.01;
    for (int i = 0; i < directions.length; i++) {
      float rand = random(1);
      if (rand < mutationRate) {
        float randomAngle = random(2*PI);
        directions[i] = PVector.fromAngle(randomAngle);
      }
    }
  }
}
