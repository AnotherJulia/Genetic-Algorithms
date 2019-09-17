class Food {
    constructor(c1, c2, c3) {
        this.pos = createVector(5+random(window_width/2 - 10), 5 + random(window_height/2 - 10));
        this.size = 7;
        this.color = [c1,c2,c3]
    }

    run() {
        this.show();
    }

    show() {
        fill(this.color[0], this.color[1], this.color[2]);
        strokeWeight(1);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}