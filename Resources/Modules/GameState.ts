import * as PubSub from "pubsub-js";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";
import LevelData from "Generators/LevelData";
import LevelController from "LevelController";

export default class GameState {
    currentLevelController: LevelController = null;
    turns: number = 0;
    init() {
        console.log("Initializing Gamestate controller.");
        PubSub.subscribe(BroadcastEvents.gameLevelLoad, (message: string, data: any) => {
            this.currentLevelController = new LevelController(data.level);
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
