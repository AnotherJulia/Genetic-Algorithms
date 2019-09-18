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
// Only pauses until energy runs out
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
    console.log("SENSE " + avgSense);

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