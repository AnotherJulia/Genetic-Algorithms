class Brain {
    
    constructor(s) {
        this.size = s;
        this.directions = new Array(this.size);
        this.randomize();
    }

    //---------------------------------------------------------------------

    randomize() {
        for (let i = 0; i < this.size; i++) {
            let randomAngle = Math.random(2*PI);
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }

    getDirections() {
        for (let i = 0; i < this.size; i++) {
            console.log(this.directions[i].toString());
        }
        console.log('working');
        
    }

}