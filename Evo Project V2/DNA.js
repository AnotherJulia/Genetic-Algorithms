class DNA {

    constructor() {
        let maxspeed, size, sense;
        this.randomValues();
    }

    randomValues() {
        this.maxspeed = Math.floor(random(gen_maxspeed[0], gen_maxspeed[1]));
        this.size = Math.floor(random(gen_size[0], gen_size[1]));
        this.sense = Math.floor(random(gen_sense[0], gen_sense[1]));
    }


    mutate() {
        if (random(1) <= mutationrate) {
            if (random(1) <= .5) {
                this.maxspeed += random(0,.5);
            } else {
                this.maxspeed -= random(0,.5);
            }
        }

        if (random(1) <= mutationrate) {
            if (random(1) <= .5) {
                this.size += random(0,2);
            } else {
                this.size -= random(0,2);
            }
        }
        
        
        if (random(1) <= mutationrate) {
            if (random(1) <= .5) {
                this.sense += random(0,1);
            } else {
                this.sense -= random(0,1);
            }
        }

    }
}