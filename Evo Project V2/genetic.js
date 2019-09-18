// REWRITE SELECTION PROGRAM
function Selection() {
    newGen = new Array();
    matingpool = new Array();

    // Check for each dot in the list what condition it is
    for (let i = 0; i < dots.length; i++) {

        // If food eaten by dot is greater then 2, then the object wil reproduce.
        if (dots[i].food_eaten >= 2) {
            let children = dots[i].food_eaten/2;

            // If children is div. by 2 then just rep amount
            if (Number.isInteger(children)) {
                for (let j = 0; j < children; j++) {
                    matingpool.push(dots[i]);
                }
            }

            // If children !div by 2, then sub 1 and then rep that amount
            else if (!Number.isInteger(children)) {
                children -= 1;
                for (let j = 0; j < children; j++) {
                    matingpool.push(dots[i]);
                }
            }
        }

        // If only eaten 1 food, then the dot will survive, but not reproduce
        else if (dots[i].food_eaten == 1) {
            matingpool.push(dots[i]);
        }
    }

    if (!matingpool.length == 0) {
        Reproduce();
        dots = newGen;
        gen += 1;

        resetDots();
        resetFood();
    }

}


function Reproduce() {
    for (let i = 0; i < matingpool.length; i++) {
        let childDNA = matingpool[i].DNA;
        childDNA.mutate();
        let temp_spawnPos = createVector(window_width/4, window_height/4);
        newGen.push(new Dot(temp_spawnPos, childDNA));
    }
}