// Ecosystem.js --- Main File (setup and update all objects)

// Initialize / Declare variables
let debugmode = true;

// Windows
const window_width = 1200;
const window_height = 1200;

// Border Offset
let offset = 50;
let offset_var = 100;

// Object Arrays
let dots, food;

// Genetic Variable Standard values
let gen_maxspeed = [1,3];
let gen_sense = [75,150];
let gen_size = [5,15];

// Genetic Variables
let gen = 0;
let matingpool, newGen;
let mutationrate = 0.05;
// Genetic Arrays
let alive = new Array();
let deadDots = new Array();

// amounts of objects in ecosystem (on initialization)
let init_popsize = 4;
let food_amount = 200;

// Buffers
let leftBuffer, rightBuffer;
let dot;


// ----------------------------------------------------------------------------------------------------

function setup() {

    // Window
    createCanvas(window_width, window_height);
    leftBuffer = createGraphics(window_width/2, window_height/2);
    rightBuffer = createGraphics(window_width/2, window_height/2);

    // Declare arrays
    dots = new Array(init_popsize);
    food = new Array(food_amount);

    // Create dots in dot array (calculationStartPosition
    dedde)
    for (let i = 0; i < dots.length; i++) {
        dots[i].newDot(CalculateStartposition());
    }

    for (let i = 0; i < food.length; i++) {
        food[i] = new Food(0, 100, 0);
    }
}

function draw() {
    drawLeftBuffer();
    drawRightBuffer();

    image(leftBuffer, 0, 0);
    image(rightBuffer, window_width/2+20, 0);

    // Updating dots and food array
    for (let i = 0; i < dots.length; i++) dots[i].run();
    for (let i = 0; i < dots.length; i++) food[i].run();

    // Controllers
    generationController();
    showUI();

}

function drawLeftBuffer() {
    leftBuffer.background(200);
    leftBuffer.fill(255, 255, 255);
    leftBuffer.textSize(32);
}

function drawRightBuffer() {
    rightBuffer.background(200);
    rightBuffer.fill(0, 0, 0);
    rightBuffer.textSize(32);
}

// Show UI with generation, popsize and amount of food remaining
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


// Calculate start position within the frame 
function CalculateStartposition () {
    let posx = window_width/init_popsize * i;
    let posy = window_height/init_popsize * i;
        
    if (posx < offset_var) posx += offset;
    else if (posx > window_width-offset_var) posx -= offset;
    if (posy < offset_var) posy += offset;
    else if (posy > window_height - offset_var)posy -= offset;
        
    let dotpos = createVector(posx, posy);
    return dotpos;
}


function generationController() {
    let nextGen = false;

    let energyStatus = true;
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].outOfEnerfy == false) {
            energyStatus = false;
        }
    }

    if (food.length == 0) {
        nextGen = true;
    } else if (energyStatus == true) {
        nextGen = true;
    }


    if (nextGen == true) {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].dead = false) {
                alive.push(dots[i]);
            }
        }
        Selection();
    }
}


// Reset Data
function resetDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].food_eaten = 0;
        dots[i] = new Dot(CalculateStartposition(), new DNA());
    }
}

function resetFood() {
    food = new Array();
    for (let i = 0; i < food_amount; i++) {
        food.push(new Food(0, 100, 0);
    }
}