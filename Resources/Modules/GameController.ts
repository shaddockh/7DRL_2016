import * as PubSub from "pubsub-js";
import * as ui from "../UI/ui";


const Scenes = {
    title: "Scenes/game.scene"
    //assignAttributes: "Scenes/attribute_sel.scene",
    //playfield: "Scenes/game.scene"
};

/**
 * singleton class for game controller
 */
export default class GameController {
    static init() {
        ui.init();

        //PubSub.subscribe("game:title_scene.show", () => GameController.switchScene(Scenes.title));
        //PubSub.subscribe("game:attribute_selection_scene.show", () => GameController.switchScene(Scenes.assignAttributes));
        //PubSub.subscribe("game:playfield_scene.show", () => GameController.switchScene(Scenes.playfield));
        Atomic.player.loadScene(Scenes.title);
    }

    static showTitleScene() {
        PubSub.publish("game.title_scene.show", null);
    }


    // switching scenes doesn't seem to work correclty
    // private static switchScene(sceneName: string) {
    //     const firstScene = Atomic.player.currentScene == null;
    //
    //     const scene = Atomic.player.loadScene(sceneName);
    //     if (!firstScene) {
    //          const viewPort = Atomic.renderer.getViewport(0);
    //          const cameras = scene.getChildrenWithComponent("Camera", true);
    //          viewPort.setScene(scene);
    //          viewPort.setCamera(<Atomic.Camera>(cameras[0].getComponent("Camera")));
    //         console.log("d");
    //         scene.updateEnabled = true;
    //     }
    // }

}
