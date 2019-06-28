class Population {
    constructor(ps, s, t) {
        let popsize = ps;
        let start = s;
        let target = t;

        var dots = new Array();
        for (let i = 0; i < popsize; i++) {
          dots[i] = new dot(s,t);
          //console.log('debug');

          if (typeof dots[i] == 'undefined') {
            console.log(i, " error");
          }
        }

        this.naturalSelection();


    }

    run() {
      for (let i = 0; i < this.popsize; i++) {
          this.dots[i].run();
      }
    }

    naturalSelection() {
        let newdots = new Array(this.popsize);
        //setBestDot
        //calculateFitnessSum();

        //newdots[0] = dots[bestDot].gimmeBaby();
    }

    calculateFitnessSum() {

    }



    //debug functions
    checkPopulation() {
      console.log(popsize);
      let lendots = this.newdots.length;
      console.log(lendots);
    }
}
