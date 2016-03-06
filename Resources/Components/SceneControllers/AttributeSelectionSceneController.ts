"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "./BaseSceneController";

class AttributeSelectionSceneController extends BaseSceneController {

    inspectorFields = {
        debug: false,
        scenePlay: "intro",
        sceneTitle: "title"
    };

    scenePlay:string;
    sceneTitle:string;

    sceneLoaded(message: string, data: SceneActionMessage) {
        super.sceneLoaded(message, data);
        PubSub.publish("ui.attributeselection.show", {});
    }

    sceneUnloaded(message: string, data: SceneActionMessage) {
        PubSub.publish("ui.attributeselection.hide", {});
        super.sceneUnloaded(message, data);
    }


    doSceneAction(message: string, data: TitleSceneActionMessage) {
        super.doSceneAction(message, data);

        switch (data.action) {
            case "show_playfield":
                this.switchScene(this.scenePlay);
                break;
        }
    }

}

export = AttributeSelectionSceneController;
