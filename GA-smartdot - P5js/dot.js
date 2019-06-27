class dot {

    constructor(startpos, target) {
        this.r = 12;
        this.pos = createVector(startpos.x, startpos.y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.target = target;

        this.dead = false;
        this.reachedGoal = false;
        this.maxspeed = 5;

        this.brain = new Brain(400);
    }

    run() {
        this.move();
        
        // collision
        if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > window_width-2 || this.pos.y > window_height-2) {
            this.dead = true;
        } else if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 6) {
            this.reachedGoal = true;
        }

        this.show();
    }

    move() {
        if (!this.dead && !this.reachedGoal) {
            if (this.brain.directions.length > this.brain.step) {
                this.acc = this.brain.directions[this.brain.step];
                this.brain.step++;
            }
            this.applyForce();
        }
    }

    applyForce() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
    }

    show() {
        fill(0, 100);
        stroke(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

}