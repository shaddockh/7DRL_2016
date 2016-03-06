import * as PubSub from "pubsub-js";
import * as ui from "../UI/ui";
import SceneManager from "./SceneManager";


/**
 * singleton class for game controller
 */
export default class GameController {
    static sceneManager = new SceneManager();
    static init() {
        ui.init();
        PubSub.subscribe("game.scene.switch", (message, data) => {
            GameController.sceneManager.switchToScene(SceneManager.scenes[data.scene]);
        });
    }

    static showTitleScene() {
        GameController.sceneManager.switchToScene(SceneManager.scenes.title);
    }
}
