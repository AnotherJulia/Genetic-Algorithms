let p;
const window_width = 600;
const window_height = 600;
let start, target;
let popsize = 100;

function setup() {
    createCanvas(window_width,window_height);
    start = createVector(window_width/2, window_height-25);
    target = createVector(window_width/2, 15);
    p = new Population(popsize, start, target);
}

function draw() {
    background(100);

    // draw target
    fill(200, 0, 0);
    stroke(0);
    ellipse(target.x, target.y, 20, 20);

    // population
    p.run();

}
