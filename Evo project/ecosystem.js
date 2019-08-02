// ecosystem.js -- Main file
const window_width = 600;
const window_height = 600;
let offset = 50;
let offset_var = 100;

// arrays of objects
let dots;
let food;

// amounts of objects in ecosystem
let popsize = 5;
let food_amount = 40;

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
    
    for (let i = 0; i < popsize; i++) dots[i].run();
    for (let i = 0; i < food.length; i++) food[i].run();

}


// ----- DEBUG CODES

function checkBFC() {
    for (let i = 0; i < popsize; i++) {
        console.log(dots[i].BFC);
    }
}
