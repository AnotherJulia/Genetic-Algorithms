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

// amounts of objects in ecosystem
let popsize = 10;
let food_amount = 40;

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
        food[i] = new Food();
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
    text("Generation: " + gen, window_width-100, window_height-20);
}

// Genetic algorithm controller
function generationController() {
    let alive = new Array();

    if (food.length == 0) {
        for(let i = 0; i < dots.length; i++) {
            dots[i].dead = true;
        }
    }

    for (let i = 0; i < dots.length; i++) {
        if (dots[i].dead == false) {
            alive.push(dots[i]);
        }
    }

    if (alive.length == 0) {
        gen+=1;
        Selection();
    } 
}

// Selection function with fitness function
function Selection() {
    // Fitness function (rules of life)
    newGen = new Array();
    matingpool = new Array();
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].food_eaten == 1) {
            newGen.push(dots[i]);
        } else if (dots[i].food_eaten >= 2) {
            matingpool.push(dots[i]);
        }
    }

    if (matingpool.length != 0) {
        gimmeBaby(matingpool);
        dots = newGen;
        gen+=1
        resetDots();
        resetFood();
    }
}


// reproduction process
function gimmeBaby(matingpool) {
    for (let i = 0; i < matingpool.length; i++) {
        matingpool[i].getFitness();
    }
    if (matingpool.length >= 2) {
        for (let i = 0; i < Math.floor(matingpool.length); i++) {
            let parentA = random(matingpool);
            matingpool.pop(parentA);
            let parentB = random(matingpool);
            newGen.push(parentA);
            newGen.push(parentB);
            matingpool.pop(parentB);
            let childDNA = crossover(parentA.DNA, parentB.DNA);
            childDNA.mutate();

            // new child must get new spawnposition;
            let temp_spawnPos = createVector(window_width/2, window_height/2);
            let child = new Dot(temp_spawnPos, childDNA);
            newGen.push(child);
        }
    }
}

function crossover(parentA, parentB) {
    //for now just copy the maxspeed and size from A en sense from B
    let newDNA = new DNA();
    newDNA.maxspeed = parentA.maxspeed;
    newDNA.size = parentA.size;
    newDNA.sense = parentB.sense;
    return newDNA;
}

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
        food.push(new Food());
    }
}

// ------------------------------------------- DEBUG CODES ------------------------------------
// Boundary Force Constant (BFC) 
function debugBFC() {
    for (let i = 0; i < dots.length; i++) {
        console.log(dots[i].BFC);
    }
}

// Energy
function debugEnergy() {
    for (let i = 0; i < dots.length; i++ ) {
        console.log(i + "  " + dots[i].current_energy);
    }
}

function debugResetEnergy(resetVal) {
    for (let i = 0; i < dots.length; i++ ) {
        dots[i].current_energy = resetVal;
    }
}

// pause and depause dots
function debugPause() {
    for(let i = 0; i < dots.length; i++) {
        dots[i].pause = true;
    }
}

function debugUnpause() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].pause = false;
        dots[i].opacity = 255;
    }
}

// get fitness function from each dot
function debugFitness() {
    for (let i = 0; i < matingpool.length; i++) {
        console.log(i + "  " + matingpool[i].fitness);
    }
}

// Get population length
function debugPopSize() {
    console.log(dots.length);
}

// Get all genetic variables
function debugDNA() {
    let avgMaxspeed = new Array();
    let avgSize = new Array();
    let avgSense = new Array();

    for (let i = 0; i < dots.length; i++) {
        avgMaxspeed.push(dots[i].DNA.maxspeed);
        avgSize.push(dots[i].DNA.size);
        avgSense.push(dots[i].DNA.sense);
    }

    // Print out arrays
    console.log("MAXSPEED " + avgMaxspeed);
    console.log("SIZE " + avgSize);
    console.log("SENSE " + avgSense);s

    /*
    let avg_maxspeed = sumArray(avgMaxspeed)/avgMaxspeed.length;
    console.log("Average maxspeed is " + avg_maxspeed);
    */
}

function sumArray(list) {
    let sum;
    for (let i = 0; i < list.length; i++) {
        if (isNaN(list[i])) {
            continue;
        } 
        sum += list[i];
    }
    return sum;
}
