import * as PubSub from "pubsub-js";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";
import LevelData from "Generators/LevelData";
import LevelController from "LevelController";

export default class GameState {
    currentLevelData: LevelData = null;
    currentLevelController: LevelController = null;
    turns: number = 0;
    init() {
        console.log("Initializing Gamestate controller.");
        PubSub.subscribe(BroadcastEvents.gameLevelLoad, (message: string, data: any) => {
            console.log("Loading Level Data into game state");
            for (let x in this) { console.log(x);}
            this.currentLevelController = new LevelController(data.level);
            this.turns = 55;
            console.log("GameState Turns: " + this.turns);
            if (!this.currentLevelController) {
                console.log("Gamestate doesn't have a level controller");
            }
            //this.currentLevelData = data.level;
        });
    }

    incTurn() {
        this.turns++;
        this.updateUi();
    }

    updateUi() {
        //
    }
}
