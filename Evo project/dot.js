function Dot(startpos) {
    this.pos = startpos;
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.maxspeed = 2;                     // #13
    this.size = 20;                        // #14
    this.dead = false;

    //this.dir = p5.Vector.random2D();
    this.dir = p5.Vector.fromAngle(random() * 360);
    
    this.run = function() {
        this.show();
        this.checkBoundary();
        this.applyForce(this.dir);
        this.update();
    }

    this.update = function() {
        if (!this.dead) {
            this.vel.add(this.acc);
            this.vel.limit(this.maxspeed);      // #13
            this.pos.add(this.vel);
            this.acc.mult(0);
        } 
    }

    this.checkBoundary = function() {
        if (this.pos.x < 1 || this.pos.x > window_width-1 || this.pos.y < 1 || this.pos.y > window_height-1) {
            this.dead = true;
        }
    }

    this.show = function() {
        fill(2, 100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

}