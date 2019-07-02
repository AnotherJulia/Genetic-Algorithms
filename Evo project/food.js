class Food {
    constructor() {
        this.pos = createVector(random(window_width), random(window_height));
        this.size = 7;
    }

    show(){
        fill(0, 100, 0);
        strokeWeight(1);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size);
    }


}