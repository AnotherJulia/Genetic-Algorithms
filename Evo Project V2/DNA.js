class DNA {
    constructor() {
        let maxspeed, size, sense;
        this.randomValues();
        
        // Set debugMode
        if (debugmode == true) {
            this.debugSense();
            this.debugSpeed();
        }
    }

    randomValues() {
        this.maxspeed = Math.floor(random(gen_maxspeed[0], gen_maxspeed[1]));
        this.size = Math.floor(random(gen_size[0], gen_size[1]));
        this.sense = Math.floor(random(gen_sense[0], gen_sense[1]));
    }
    
    mutate() {
        // maxspeed
        if (random(1) <= mutationrate) {
            this.maxspeed = random(gen_maxspeed[0], gen_maxspeed[1]);
        }

        // Size
        if (random(1) <= mutationrate) {
            this.size = random(gen_size[0], gen_size[1]);
        }

        // Sense
        if (random(1) <= mutationrate) {
            this.sense = random(gen_sense[0], gen_sense[1]);
        }
        
    }


    // Debug functions
    debugSense() {
        this.sense = 100000;
    }

    debugSpeed() {
        this.maxspeed = 5;
    }

    debugSize(debugVal) {
        this.size = debugVal;
    }

}
