class dot {


    constructor(startpos) {
        this.r = 12;
        this.pos = createVector(startpos.x, startpos.y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);

        this.dead = false;
        this.reachedGoal = false;
        this.maxspeed = 5;
        this.fitness;

        this.brain = new Brain(400);
    }

    run() {
        this.show();
    }

    show() {

        fill(0, 100);
        stroke(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        
    }

}