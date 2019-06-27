let d;
const window_width = 600;
const window_height = 600;

function setup() {
    let start = createVector(window_width/2, window_height-15);
    let target = createVector(window_width/2, 15);
    createCanvas(window_width,window_height);
    d = new dot(start, target);
}

function draw() {
    background(100);
    
    // draw target
    fill(200, 0, 0);
    stroke(0);
    ellipse(this.target.x, this.target.y, 20, 20);

    d.run();
}

