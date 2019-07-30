// ecosystem.js -- Main file
const window_width = 600;
const window_height = 600;

// arrays of objects
let dots;
let food;

//startposition of objects
let dotpos;

// amounts of objects in ecosystem
let popsize = 5;
let food_amount = 50;

function setup() { 
    createCanvas(window_width, window_height);
    dots = new Array(popsize);
    food = new Array(food_amount);
    
    for (let i = 0; i < popsize; i++) {
        dotpos = createVector(window_width/2, window_height/2);
        dots[i] = new Dot(dotpos);
    }

    for (let i = 0; i < food_amount; i++) {
        food[i] = new Food();
    }

}

function draw() {
    background(200);
    
    for (let i = 0; i < popsize; i++) dots[i].run();
    for (let i = 0; i < food_amount; i++) food[i].show();

}


// ----- DEBUG CODES

function checkBFC() {
    for (let i = 0; i < popsize; i++) {
        console.log(dots[i].BFC);
    }
}
