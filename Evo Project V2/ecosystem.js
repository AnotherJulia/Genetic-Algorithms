// ecosystem.js -- Main file

// Initialize and declare variables
const window_width2 = 800;
let borderoffset = 200;
const window_width = window_width2-borderoffset;
const window_height = 600;
let debugmode = false;

// border offset
let offset = 50;
let offset_var = 100;

// arrays of objects
let dots;
let food;
let aliveDots;

// Genetic variable standard
let gen_maxspeed = [1,3];
let gen_sense = [75,150];
let gen_size = [5,15];
let gen = 0;
let matingpool, newGen;
let mutationrate = 0.05;

let alive = new Array();
let deadDots = new Array();
let prevgen;

// amounts of objects in ecosystem
let init_popsize = 4;
let food_amount = 100;

let startEnergy = 1000;
let givenEnergy = .1 * startEnergy;

// Running the program
function setup() { 
    createCanvas(window_width2, window_height);                              //Multiple canvasses?
    dots = new Array(init_popsize);
    food = new Array(food_amount);
    
    for (let i = 0; i < init_popsize; i++) {
        // Calculate startposition
        let posx = window_width/init_popsize * i;
        let posy = window_height/init_popsize * i;
        
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
    // createFood();
}


// Show UI function 
function showUI() {
    

    fill(50);
    stroke(255);
    strokeWeight(2);
    textSize(19);
    textAlign(LEFT);

    checkAlive();

    // Top
    text("Generation: " + gen, window_width2-180, 30);
    text('Dots Remaining: ' + aliveDots.length, window_width2-180, 60);
    text('Food Remaining: ' + food.length, window_width2-180, 90);
    
    // Bottom
    text("Start Dots: " + dots.length, window_width2-180, window_height-60);
    text('Start Food: ' + food_amount, window_width2-180, window_height-30);

    
    let averages_height = window_height/2 - 40
    text("Averages", window_width2-180, averages_height);

    if (gen != prevgen) {
        AverageSpeed();
        AverageSize();
        AverageSense();
        prevgen = gen;
        console.log('run');
    }

    // Center
    if (gen > -1) {
        textSize(15);
        text("Speed: " + AVG_speed, window_width2-180, averages_height + 30);
        text("Size: " + AVG_size, window_width2-180, averages_height + 60);
        text("Speed: " + AVG_sense, window_width2-180, averages_height + 90);
    } else {
        text("Speed: Calculating...", window_width2-180, averages_height + 30);
        text("Size: Calculating..." , window_width2-180, averages_height + 60);
        text("Speed: Calculating..." , window_width2-180, averages_height + 90);
    }

    
    

    // Draw line to seperate simulation window from statistics
    strokeWeight(.5);
    line(window_width+10, 0, window_width+10, window_height);
}

function checkAlive() {
    aliveDots = new Array();
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].current_energy > 0 ) {
            aliveDots.push(dots[i]);
        }
    }
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
        configureData();
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
        let posx = window_width/dots.length * i;
        let posy = window_height/dots.length * i;
        
        if (posx < offset_var) posx += offset;
        else if (posx > window_width-offset_var) posx -= offset;
        if (posy < offset_var) posy += offset;
        else if (posy > window_height - offset_var)posy -= offset;
        
        //let dotpos = createVector(posx, posy);
        //let dotpos = createVector(window_width/2, window_height/2);

        let dotx = random(window_width/5 * 2, window_width/5 * 3);
        let doty = random(window_height/5 * 2, window_height/5 * 3)

        let dotpos = createVector(dotx, doty);
        dots[i] = new Dot(dotpos , dots[i].DNA);
    }
}

function resetFood() {
    food = new Array();
    for (let i = 0; i < food_amount; i++) {
        food.push(new Food(0, 100, 0));
    }
}
