class Food {
    constructor() {
        this.pos = createVector(random(window_width), random(window_height));
      
        this.size = 5;
    }

    show(){
        fill(255);
        strokeWeight(2);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.size);
    }


}