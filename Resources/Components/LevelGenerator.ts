"atomic component";

import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";
import DefaultGenerator from "Generators/DefaultGenerator";
import {BroadcastEvents} from "Constants";

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
    }

    start() {
        PubSub.subscribe(BroadcastEvents.gameLevelGenerate, this.generateLevel.bind(this));
    }


    generateLevel() {
        // generate the level
        this.DEBUG("Getting generator");
        const generator = this.getGenerator();
        this.DEBUG("generating level");
        const levelData = generator.generate();
        this.DEBUG("Sending level data to subscribers");
        PubSub.publish(BroadcastEvents.gameLevelLoad, { level: levelData });
    }

    getGenerator(): DefaultGenerator {
        return new DefaultGenerator(this.width, this.height, this.debug);
    }
}

export = LevelGenerator;
