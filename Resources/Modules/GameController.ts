import * as PubSub from "pubsub-js";
import UiController from "./Ui/UiController";
import SceneManager from "./SceneManager";
import {BroadcastEvents} from "./Constants";
import GameState from "GameState";
import GlobalCache from "GlobalCache";


/**
 * singleton class for game controller
 */
export class GameControllerType {

    private initialized = false;
    sceneManager: SceneManager = null;
    gameState: GameState = null;

    init() {
        if (!this.initialized) {
            this.initialized = true;
            console.log("Initializing GameController.");

            this.sceneManager = new SceneManager();
            this.gameState = new GameState();
            this.gameState.init();
            // attach ui to the game controller so it doesn't get GC'd
            UiController.init();
            PubSub.subscribe(BroadcastEvents.gameSceneSwitch, (message, data) => {
                this.sceneManager.switchToScene(SceneManager.scenes[data.scene]);
            });

            Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
        } else {
            console.log("Trying to initialize GameController multiple times.");
        }

    }

    showTitleScene() {
        this.sceneManager.switchToScene(SceneManager.scenes.title);
    }

    gameOver() {
        //TODO:
    }
}

let controller = GlobalCache.getCachedObject<GameControllerType>("GameController") || GlobalCache.cacheObject("GameController", new GameControllerType());

export default controller;
