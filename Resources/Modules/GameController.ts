import * as PubSub from "pubsub-js";
import * as ui from "./Ui/ui";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";
import GameState from "GameState";


/**
 * singleton class for game controller
 */
export default class GameController {
    static sceneManager: SceneManager = new SceneManager();
    static gameState: GameState = new GameState();
    static init() {
        GameController.gameState.init();

        ui.init();
        PubSub.subscribe(BroadcastEvents.gameSceneSwitch, (message, data) => {
            GameController.sceneManager.switchToScene(SceneManager.scenes[data.scene]);
        });

    }

    static showTitleScene() {
        GameController.sceneManager.switchToScene(SceneManager.scenes.title);
    }
}
