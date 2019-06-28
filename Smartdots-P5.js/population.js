function Population() {
    this.dots = [];
    this.popsize = 25;
    this.matingpool = [];

    for (var i = 0; i < this.popsize; i++) {
      this.dots[i] = new Dot();
    }

    this.evaluate = function() {

      var maxfit = 0;
      for (var i = 0; i < this.popsize; i++) {
        this.dots[i].calcFitness();
        if (this.dots[i].fitness > maxfit) {
          maxfit = this.dots[i].fitness;
        }
      }
      for (var i = 0; i < this.popsize; i++) {
        this.dots[i].fitness /= maxfit;
      }

      this.matingpool = [];
      for (var i = 0; i < this.popsize; i++) {
        var n = this.dots[i].fitness * 100;
        for (var j = 0; j < n; j++) {
          this.matingpool.push(this.dots[i]);
        }
      }
    }
    this.selection = function() {
      var newDots = [];
      for (var i = 0; i < this.dots.length; i++) {
        var parentA = random(this.matingpool).dna;
        var parentB = random(this.matingpool).dna;
        var child = parentA.crossover(parentB);
        child.mutation();
        newDots[i] = new Dot(child);
      }
      this.dots = newDots;
    }

    this.run = function() {
      for (var i = 0; i < this.popsize; i++) {
        this.dots[i].update();
        this.dots[i].show();
      }
    }
  }
