function Selection() {
    newGen = new Array();
    matingpool = new Array();

    // Check for conditions: rule of Life

    for (let i = 0; i < dots.length; i++) {
        if (dots[i].food_eaten >= 2) {
            // If reproducing condition is accepted --> p. each 2 food eaten gets 1 child object
            let amount_of_children = dots[i].food_eaten / 2;
            // If amount of children is an integer it is an even amount, if not it is an uneven amount
            if (Number.isInteger(amount_of_children) == true) { 
                for (let j = 0; j < amount_of_children; j++) matingpool.push(dots[i]);
            } 

            // if amount of children is an uneven amount, then round it down
            else if (Number.isInteger(amount_of_children == false)) {
                Math.floor(amount_of_children);
                for (let j = 0; j < amount_of_children; i++) {
                    matingpool.push(dots[i]);
                }
            }
        }

        // If object has eaten 1 food_object, then it will life but not reproduce
        else if (dots[i].food_eaten == 1) {
            newGen.push(dots[i]);
        }

        // If object has not eaten any food, then it will die
        else if (dots[i].food_eaten == 0) {
             deadDots.push(dots[i]);
        }
        
    }

}