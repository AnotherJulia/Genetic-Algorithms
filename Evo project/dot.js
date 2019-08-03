class Dot {
    constructor(startpos, dna) {
        if (this.dna) {
            this.DNA = dna;
        } else {
            this.DNA = new DNA();
        }

        this.opacity = 255;
        this.paused = false;

        // Vector variables
        this.pos = createVector(startpos.x, startpos.y);
        this.vel = createVector();
        this.acc = createVector();

        // Genetic Variables
        this.maxspeed = this.DNA.maxspeed;                     
        this.size = this.DNA.size;                        
        this.sense = this.DNA.sense;
        this.fitness;

        // Genetic Algorithm
        this.dead = false;

        // Move random + Check for Boundary
        this.dir = p5.Vector.random2D(); 
        this.dir_value = 0.1;
        this.BFC = 1; //(Boundary Force Constant)

        // Picking up food (Check for target) and display text
        this.hasTarget = false;
        this.food_eaten = 0;
        this.textOffset = 25;

        // Calculating energy etc
        this.maxenergy = 100;
        this.current_energy = this.maxenergy;
    }


    run() {
        this.checkBoundary();
        this.update();
        this.show();
        this.checkForTarget();
    }

    update() {

        if (this.current_energy <= 0) {
            this.dead = true;
        }

        if (!this.dead && !this.pause) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(this.maxspeed);
            this.acc.mult(0);

            this.opacity = 255;

            if(!this.hasTarget) {
                this.moveRandom();
            }
        } else {
            this.opacity = 100;
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
        //Draw dot
        fill(250, this.opacity);
        stroke(0, this.opacity);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

        //Draw radius and showFood function only when not dead
        if (!this.dead) {
            noFill();
            stroke(0, 50);
            strokeWeight(0.5);
            ellipse(this.pos.x, this.pos.y, this.sense, this.sense);

            this.showFood();
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    checkForTarget() {
        let inRange = new Array();
        let indexArray = new Array();
        for (let i = 0; i < food.length; i++) {
            let d = dist(food[i].pos.x, food[i].pos.y, this.pos.x, this.pos.y);
            if (d < this.sense) {
                inRange.push(food[i]);
                indexArray.push(i);
            }
        }

        if (!inRange.length == 0) {
            let closest = this.sense;
            let target, targetIndex;

            for (let i = 0; i < inRange.length; i++) {
                let d = dist(inRange[i].pos.x, inRange[i].pos.y, this.pos.x, this.pos.y);
                if (d < closest) {
                    target = inRange[i];
                    targetIndex = indexArray[i];
                    closest = d;
                }
            }

            let targetpos = createVector(target.pos.x, target.pos.y); //fixed food removing from function (resetting position by using sub)
            let desired = targetpos.sub(this.pos);
            desired.normalize();
            desired.mult(this.maxspeed);
            let steeringForce = desired.sub(this.vel);
            this.applyForce(steeringForce);

            // Collision manager
            let d = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);
            if (d < this.size) {
                this.food_eaten += 1;
                food.splice(targetIndex, 1);
            } 
        }   
    }

    showFood() {
        fill(0);
        stroke(255);
        textAlign(CENTER);
        textSize(10);
        text(this.food_eaten, this.pos.x, this.pos.y+this.textOffset);
    }

    moveRandom() {
        this.dir = p5.Vector.random2D().mult(this.dir_value);
        this.applyForce(this.dir);
    }

    // Genetic Algorithm
    getFitness() {
        this.fitness = this.food_eaten / food.length;
    }

}