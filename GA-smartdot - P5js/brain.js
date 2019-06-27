class Brain {
    
    constructor(s) {
        this.size = s;
        this.directions = new Array(this.size);
        this.randomize();
        this.step = 0;
    }

    randomize() {
        for (let i = 0; i < this.size; i++) {
            let randomAngle = Math.floor(Math.random() * Math.PI * 2.0);
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }


















    // debug tools
    getDirections() {
        for (let i = 0; i < this.size; i++) {
            console.log(this.directions[i].toString());
        }
        console.log('working');
        
    }

}