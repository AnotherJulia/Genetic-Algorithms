class Dot {
    constructor(startpos) {
        this.pos = startpos;
        this.vel = createVector();
        this.acc = createVector();

        this.maxspeed = 2;                     // #13
        this.size = 20;                        // #14
        this.dead = false;

        this.dir = p5.Vector.random2D();  
    }
    run() {
        this.dir = p5.Vector.random2D().mult(0.1);
        this.applyForce(this.dir);
        this.checkBoundary();
        this.update();
        this.show();
    }

    update() {
        if (!this.dead) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(5);
            this.acc.mult(0);
        }
    }

    checkBoundary() {
        if (this.pos.x < 1 || this.pos.x > window_width-1 || this.pos.y < 1 || this.pos.y > window_height-1) {
            this.dead = true;
        }
    }

    show() {
        fill(2, 100);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    applyForce(force) {
        this.acc.add(force);
    }

}