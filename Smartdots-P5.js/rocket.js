function Rocket(dna) {
    this.pos = createVector(window_width/2, window_height);
    this.vel = createVector();
    this.acc = createVector();

    this.completed = false;
    this.crashed = false;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    this.update = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }

        if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry+rh) {
            this.crashed = true;
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d,0,width,width,0);
        if (this.completed) {
            this.fitness *= 10;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    }
}