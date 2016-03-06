import * as PubSub from "pubsub-js";

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
            console.log("unloading " + this.currentSceneName);
            PubSub.publishSync("game.scene.unloaded", {
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
        PubSub.publish("game.scene.loaded", {
            scene: this.currentSceneName
        });
    }
}
