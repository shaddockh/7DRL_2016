import * as PubSub from "pubsub-js";
import * as ui from "../UI/ui";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";


/**
 * singleton class for game controller
 */
export default class GameController {
    static sceneManager = new SceneManager();
    static init() {
        ui.init();
        PubSub.subscribe(BroadcastEvents.gameSceneSwitch, (message, data) => {
            GameController.sceneManager.switchToScene(SceneManager.scenes[data.scene]);
        });
    }

    static showTitleScene() {
        GameController.sceneManager.switchToScene(SceneManager.scenes.title);
    }
}
