class Dot {
    constructor(startpos) {
        // Vector variables
        this.pos = startpos;
        this.vel = createVector();
        this.acc = createVector();

        // Genetic Variables
        this.maxspeed = 2;                     
        this.size = 10;                        
        this.sense = 100;

        // Genetic Algorithm
        this.dead = false;

        // Move random + Check for Boundary
        this.dir = p5.Vector.random2D(); 
        this.dir_value = 0.1;
        this.BFC = 1; //(Boundary Force Constant)

        // Picking up food (Check for target)
        this.hasTarget = false;
        this.food_eaten = 0;
    }

    run() {
        this.checkBoundary();
        this.update();
        this.show();
        this.checkForTarget();
    }

    update() {
        if (!this.dead) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(this.maxspeed);
            this.acc.mult(0);

            if(!this.hasTarget) {
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
        //Draw dot
        fill(2, 100);
        stroke(0);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

        //Draw radius
        noFill();
        stroke(0, 50);
        strokeWeight(0.5);
        ellipse(this.pos.x, this.pos.y, this.sense, this.sense);
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

            
            let d = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);
            if (d < this.size) {
                console.log(targetIndex);
                this.food_eaten += 1;
                food.splice(targetIndex, 1);
            } 
        }
    }

    moveRandom() {
        this.dir = p5.Vector.random2D().mult(this.dir_value);
        this.applyForce(this.dir);
    }
}