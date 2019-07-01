function Dot(startpos) {
    this.pos = startpos;
    this.vel = createVector();
    this.acc = createVector();

    this.maxspeed = 10;                     // #13
    this.size = 12;                         // #14

    
    this.run = function() {
        this.show();
    }

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);      // #13
        this.pos.add(this.vel);
        this.acc.mult(0); 
    }

    this.show = function() {
        fill(0, 100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

}