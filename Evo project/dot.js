class Dot {
    constructor(startpos) {
        this.pos = startpos;
        this.vel = createVector();
        this.acc = createVector();

        this.maxspeed = 2;                     // #13
        this.size = 10;                        // #14
        this.sense = 150;

        this.dead = false;
        this.dir = p5.Vector.random2D(); 
        
        this.dir_value = 0.1;
        this.BFC = 1;

        this.hasTarget = false;
    }
    run() {
        this.applyForce(this.dir);
        this.checkBoundary();
        this.update();
        this.show();
    }

    update() {
        if (!this.dead) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(this.maxspeed);
            this.acc.mult(0);

            if (this.hasTarget) {
                // move towards target
            } else {
                this.moveRandom();
            }
        }
    }

    checkBoundary() {
        if (this.pos.x < 1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(this.BFC, 0);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }

        else if (this.pos.x > window_width-1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(-this.BFC, 0);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }

        else if (this.pos.y < 1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(0, this.BFC);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }

        else if (this.pos.y > window_height-1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(0, -this.BFC);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }

    }

    show() {
        // draw dot
        fill(2, 100);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

        //draw radius
        noFill();
        stroke(0, 50);
        strokeWeight(0.5);
        ellipse(this.pos.x, this.pos.y, this.sense, this.sense);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    checkForTarget() {
        //check for target in range
    }

    moveTowardsTarget(target) {
        // move towards target after checking for location
    }

    moveRandom() {
        this.dir = p5.Vector.random2D().mult(this.dir_value);
    }







}