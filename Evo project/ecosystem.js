// ecosystem.js -- Main file

// Initialize and declare variables
const window_width = 600;
const window_height = 600;
let debugmode = false;

// border offset
let offset = 50;
let offset_var = 100;

// arrays of objects
let dots;
let food;

// Genetic variable standard
let gen_maxspeed = [1,3];
let gen_sense = [75,150];
let gen_size = [5,15];
let gen = 0;
let matingpool, newGen;
let mutationrate = 0.05;

let alive = new Array();
let deadDots = new Array();

// amounts of objects in ecosystem
let popsize = 4;
let food_amount = 200;

// Running the program
function setup() { 
    createCanvas(window_width, window_height);
    dots = new Array(popsize);
    food = new Array(food_amount);
    
    for (let i = 0; i < popsize; i++) {
        // Calculate startposition
        let posx = window_width/popsize * i;
        let posy = window_height/popsize * i;
        
        if (posx < offset_var) posx += offset;
        else if (posx > window_width-offset_var) posx -= offset;
        if (posy < offset_var) posy += offset;
        else if (posy > window_height - offset_var)posy -= offset;
        
        let dotpos = createVector(posx, posy);
        dots[i] = new Dot(dotpos);
    }

    for (let i = 0; i < food.length; i++) {
        food[i] = new Food(0, 100, 0);
    }
}

function draw() {
    background(200);
    
    for (let i = 0; i < dots.length; i++) dots[i].run();
    for (let i = 0; i < food.length; i++) food[i].run();
    
    // Controllers
    generationController();
    showUI();
}


// Show UI function 
function showUI() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(15);
    textAlign(RIGHT);
    text("Generation: " + gen, window_width-10, window_height-20);
    textAlign(LEFT);
    text("Population size: " + dots.length, 10, window_height-20);
    text('Food Amount: ' + food.length, 10, window_height-40);
}

// Genetic algorithm controller
function generationController() {
    // Check conditions for next generations
    let nextGen = false;
    
    // Food
    if (food.length == 0) {
        nextGen = true;
    }

    // Energy
    let energyStatus = true;
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].outOfEnergy == false) {
            energyStatus = false;
        }
    }

    if (energyStatus == true) {
        nextGen = true;
    }

    // Next Generation
    if (nextGen == true) {
        // Get dots that are alive (out of energy)
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].dead == false) {
                alive.push(dots[i]);
            }
        }
        Selection();
    }

}

// reproduction process


function resetDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].food_eaten = 0;
    }

    for (let i = 0; i < dots.length; i++) {
        // Calculate startposition
        let posx = window_width/popsize * i;
        let posy = window_height/popsize * i;
        
        if (posx < offset_var) posx += offset;
        else if (posx > window_width-offset_var) posx -= offset;
        if (posy < offset_var) posy += offset;
        else if (posy > window_height - offset_var)posy -= offset;
        
        let dotpos = createVector(posx, posy);
        dots[i] = new Dot(dotpos , new DNA());
    }
}

function resetFood() {
    food = new Array();
    for (let i = 0; i < food_amount; i++) {
        food.push(new Food(0, 100, 0));
    }
}