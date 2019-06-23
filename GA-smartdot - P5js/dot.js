class dot {

    constructor() {
        this.pos = createVector(250, 450);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
    }

    show() {
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}