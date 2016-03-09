import * as PubSub from "pubsub-js";
import * as ui from "./Ui/ui";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";
import LevelData from "Generators/LevelData";

export default class GameState {
    currentLevelData: LevelData = null;
    init() {
        PubSub.subscribe(BroadcastEvents.gameLevelLoad, (message: string, data: any) => {
            console.log("Loading Level Data into game state");
            this.currentLevelData = data.level;
        });
    }
}
