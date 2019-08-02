class DNA {
    constructor() {
        let maxspeed, size, sense;
        this.randomValues();
    }

    randomValues() {
        this.maxspeed = random(gen_maxspeed[0], gen_maxspeed[1]);
        this.size = random(gen_size[0], gen_size[1]);
        this.sense = random(gen_sense[0], gen_sense[1]);
    }



}