// steering code for Evo project

const window_width = 400;
const window_height = 400;

let v;

let target = createVector(100,200);

function setup() {
    createCanvas(window_width, window_height);
    v = new Vehicle();
}

function draw() {
    background(100);
    v.steer(target);
    v.update();
}

class Vehicle {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector();
        this.acc = createVector();
        this.maxspeed = 5;
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.normalize();
        desired.mult(maxspeed);
        let steer = p5.Vector.sub(desired, this.vel);
        this.applyForce(steer);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(5);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }
}