"atomic component";

import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";
import DefaultGenerator from "Generators/DefaultGenerator";

class LevelGenerator extends CustomJSComponent {

    inspectorFields = {
        width: 80,
        height: 25,
        debug: false
    };

    width = 80;
    height = 25;
    debug = false;

    constructor() {
        super();
        PubSub.subscribe("game.level.generate", this.generateLevel.bind(this));
    }


    generateLevel() {
        // generate the level
        this.DEBUG("Getting generator");
        const generator = this.getGenerator();
        this.DEBUG("generating level");
        generator.debug = this.debug;
        const levelData = generator.generate();
    }

    getGenerator(): DefaultGenerator {
        return new DefaultGenerator(this.width, this.height);
    }
}

export = LevelGenerator;
