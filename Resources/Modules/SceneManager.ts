import * as PubSub from "pubsub-js";
import {BroadcastEvents} from "Constants";
import BaseSceneController from "BaseSceneController";

export const Scenes = {
    title: "Scenes/title.scene",
    attributeSel: "Scenes/attribute_sel.scene",
    intro: "Scenes/intro.scene"
};

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
        PubSub.publish(BroadcastEvents.gameSceneLoaded, {
            scene: this.currentSceneName
        });
    }
}
