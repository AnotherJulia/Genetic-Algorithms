// ecosystem.js -- Main file
var window_width = 600;
var window_height = 600;

let start;
let dots;
var popsize = 10;

function setup() { 
    createCanvas(window_width, window_height);
    dots = new Array(popsize);
    for (let i = 0; i < popsize; i++) {
        //start = createVector(random(0,window_width), random(0, window_height));
        start = createVector(window_width/2, window_height/2);
        dots[i] = new Dot(start);
    }

}

function draw() {
    background(200);
    for (let i = 0; i < popsize; i++) {
        dots[i].run();
    }
}


// ----- DEBUG CODES

function checkBFC() {
    for (let i = 0; i < popsize; i++) {
        console.log(dots[i].BFC);
    }
}
