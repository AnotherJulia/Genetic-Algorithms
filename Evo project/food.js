class Food {
    constructor() {
        this.pos = createVector(5+random(window_width-10), 5+random(window_height-10));
        this.size = 7;
    }

    run() {
        this.show();
    }

    show(){
        fill(0, 100, 0);
        strokeWeight(1);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

}