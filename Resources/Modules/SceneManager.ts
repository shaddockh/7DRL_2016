import * as PubSub from "pubsub-js";
import {BroadcastEvents, Scenes} from "Constants";
import BaseSceneController from "BaseSceneController";

export default class SceneManager {

    static scenes = Scenes;

    currentScene: Atomic.Scene;
    currentSceneName: string;

    switchToScene(sceneName: string) {
        const firstScene = this.currentScene == null;
        if (!firstScene) {
            PubSub.publishSync(BroadcastEvents.gameSceneUnloaded, {
                scene: this.currentSceneName
            });
        }
        const scene = Atomic.player.loadScene(sceneName);
        if (!firstScene) {
            const viewPort = Atomic.renderer.getViewport(0);
            viewPort.setScene(scene);
            viewPort.setCamera(scene.getMainCamera());
        }
        this.currentScene = scene;
        this.currentSceneName = sceneName;
        // Wait for the scene to load in by deferring to the end of the current frame
        setImmediate(() => {
            console.log("Loaded scene: " + sceneName + ", broadcasting loaded.");
            PubSub.publish(BroadcastEvents.gameSceneLoaded, {
                scene: this.currentSceneName
            });
        });
    }
}
