class Population {

    constructor(ps, s, t) {
        let popsize = ps;
        let start = s;
        let target = t;
        
        let dots = new Array(popsize);
        for (let i = 0; i < popsize; i++) {
            dots[i] = new dot(s, t);
        }
    }


    naturalSelection() {
        newdots = new Array(this.dots.length);
        //setBestDot
        //calculateFitnessSum();

        //newdots[0] = dots[bestDot].gimmeBaby();
    }

    calculateFitnessSum() {

    }
}