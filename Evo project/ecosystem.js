// ecosystem.js -- Main file
var window_width = 600;
var window_height = 600;

let dot;

function setup() {
    createCanvas(window_width, window_height);
    var middle = createVector(window_width/2, window_height/2);     // #12
    dot = new Dot(middle);
}

function draw() {
    background(200);
    dot.run();
}