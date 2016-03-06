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
        PubSub.subscribe(BroadcastEvents.gameLevelGenerate, this.generateLevel.bind(this));
    }


    generateLevel() {
        // generate the level
        this.DEBUG("Getting generator");
        const generator = this.getGenerator();
        this.DEBUG("generating level");
        generator.debug = this.debug;
        const levelData = generator.generate();
        PubSub.publish(BroadcastEvents.gameLevelLoad, { level: levelData });
    }

    getGenerator(): DefaultGenerator {
        return new DefaultGenerator(this.width, this.height);
    }
}

export = LevelGenerator;
