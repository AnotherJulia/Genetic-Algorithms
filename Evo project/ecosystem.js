// ecosystem.js -- Main file
var window_width = 600;
var window_height = 600;

let middle;
let dots;
var popsize = 10;

function setup() {
    middle = createVector(window_width/2, window_height/2);     // #12
    createCanvas(window_width, window_height);
    dots = new Array(popsize);
    for (let i = 0; i < popsize; i++) {
        dots[i] = new Dot(middle);
    }

}

function draw() {
    background(200);
    for (let i = 0; i < popsize; i++) {
        dots[i].run();
    }
}