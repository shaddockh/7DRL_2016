"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "./BaseSceneController";

class PlayfieldSceneController extends BaseSceneController {

    inspectorFields = {
        debug: false,
    };

    sceneLoaded(message: string, data: SceneActionMessage) {
        super.sceneLoaded(message, data);
        PubSub.publish("game.level.generate", null);
    }

    sceneUnloaded(message: string, data: SceneActionMessage) {
        PubSub.publish("ui.attributeselection.hide", {});
        super.sceneUnloaded(message, data);
    }

    doSceneAction(message: string, data: TitleSceneActionMessage) {
        this.DEBUG("Performing action: " + data.action);

        // switch (data.action) {
        //     case "attribute_selection":
        //         this.openScene("attribute_selection_scene");
        //         break;
        // }
    }
}

export = PlayfieldSceneController;
