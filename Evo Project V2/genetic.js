function Selection() { 
    newGen = new Array();
    matingpool = new Array();
    // Check for rules of life conditions
    for (let i = 0;i < dots.length; i++) {
        if (dots[i].food_eaten >= 2) {
            let amount_of_children = dots[i].food_eaten / 2;
            if (Number.isInteger(amount_of_children) == true) {
                for (let j = 0; j < amount_of_children; j++) {
                    matingpool.push(dots[i]);
                }
            } else if (Number.isInteger(amount_of_children == false)) {
                amount_of_children-=1;
                for (let j = 0; j < amount_of_children; j++) {
                    matingpool.push(dots[i]);
                }
                dots[i].current_energy += 1000
            }
        } else if (dots[i].food_eaten == 1) {
            newGen.push(dots[i]);
        } else if (dots[i].food_eaten == 0) {
            deadDots.push(dots[i]);
        }
    }

    // Control selection proces
    if (matingpool.length != 0) {
        reproduceSingle();
        dots = newGen;
        gen+=1;
        resetFood();
        resetDots();
    }

    // Control deadDots

}

function reproducePartner() {
    
}

function reproduceSingle() {
    for (let i = 0; i < matingpool.length; i++) {
         let childDNA = matingpool[i].DNA;
         childDNA.mutate();
         let temp_spawnPos = createVector(window_width/2, window_height/2);
         newGen.push(new Dot(temp_spawnPos, childDNA));
    }
}