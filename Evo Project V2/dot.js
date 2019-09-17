class Dot {

    constructor(startpos, dna) {
        // Check for dna
        if (this.dna) {
            this.DNA = dna;
        } else {
            this.DNA = new DNA();
        }

        // Vector variables
        this.pos = createVector(startpos.x, startpos.y);
        this.vel = createVector();
        this.acc = createVector();

        // Genetic Variables
        this.maxspeed = this.DNA.maxspeed;                     
        this.size = this.DNA.size;                        
        this.sense = this.DNA.sense;
        this.fitness;
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
        this.maxenergy = 15000;
        this.current_energy = this.maxenergy;
        this.OutOfEnergy = false;
    }


    run() {
        this.update();
    }

    update() {
        if (!this.dead && !this.OutOfEnergy) {
            
            if (!this.hasTarget) {
                this.moveRandom();
            }
            
            this.move();
            this.opacity = 255;
        } else {
            this.opacity = 100;        
        }   
    }

    energyController() {
        let energycost = .5 * (.5 * (this.maxspeed)^2 + this.sense);

        if (this.current_energy <= 0) {
            this.outOfEnergy = true;
        } else {
            this.current_energy -= energycost;
        }
    }

    checkBoundary() {
        if (this.pos.x < 1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(this.BFC, 0);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }

        else if (this.pos.x > window_width/2-1) {
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

        else if (this.pos.y > window_height/2-1) {
            this.BFC = this.vel.mag();
            this.BoundaryForce = createVector(0, -this.BFC);
            this.applyForce(this.BoundaryForce);
            this.moveRandom();
        }
    }

    // Show function (must be used for every object nearby? --> see Issue #44)
    display() {
        fill(250, this.opacity);
        stroke(0, this.opacity);
        strokeWeight(1);
        ellipseMode(CENTER);
        ellipse(this.loc.x, this.loc.y, this.size, this.size);

        if (!this.dead) {
            noFill();
            stroke(0,50);
            strokeWeight(.5);
            ellipseMode(RADIUS);
            ellipse(this.pos.x, this.pos.y, this.sense, this.sense)

            this.showFoodUI();
        }

    }

    // Apply force to acceleration 
    applyForce(force) {
        this.acc.add(force);
    }

    checkForTarget() {
        let inRange = new Array();
        let indexArray = new Array();

        // Check when distance is less than the sense of an object 
        //--> if so? then add it to the inRange and indexArray lists
        for (let i = 0; i < food.length; i++) {
            let d = dist(food[i].pos.x, food[i].pos.y, this.pos.x, this.pos.y);
            if (d < this.sense) {
                inRange.push(food[i]);
                indexArray.push(i);
            }
        }

        // When inRange array is not empty (undefined error)
        if (!inRange.length == 0) {
            let closest = this.sense;
            let target, targetIndex;

            // Check what object in the inRange array is the closest to the object 
            // and set that object to the new closest
            for (let i = 0; i < inRange.length; i++) {
                let d = dist(inRange[i].pos.x, inRange[i].pos.y, this.pos.x, this.pos.y);
                if (d < closest) {
                    target = inRange[i];
                    targetIndex = indexArray[i];
                    closest = d;
                }
            }
        }

        // Seeking Behavior for the object, target
        let targetpos = createVector(target.loc.x, target.loc.y);
        let desired = targetpos.sub(this.loc);
        desired.normalize();
        desired.mult(this.maxspeed);
        let steeringForce = desired.sub(this.vel);
        this.applyForce(steeringForce);

        // Collision Manager food and Object
        let d = dist(targetpos.x, targetpos.x, this.loc.x, this.loc.y);
        if (d < this.size) {
            this.food_eaten += 1;
            food.splice(targetIndex, 1);
        }
    }

    // Food UI above the dot object
    showFoodUI() {
        fill(0);
        stroke(255);
        textAlign(CENTER);
        textSize(10);
        this.textOffset(this.food_eaten, this.loc.x, this.loc.y + this.textOffset);
    }

    // Move object in random2D direction
    moveRandom() {
        this.dir = p5.Vector.random2D().mult(this.dir_value);
        this.applyForce(this.dir);
    }

    // Genetic Algorithm
    getFitness() {
        this.fitness = this.food_eaten / food.length;
    }


}