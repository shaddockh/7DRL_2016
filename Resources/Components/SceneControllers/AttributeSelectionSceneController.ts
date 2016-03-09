"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "BaseSceneController";
import {BroadcastEvents} from "Constants";

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
        PubSub.publish(BroadcastEvents.uiAttributeSelectionShow, {});
    }

    sceneUnloaded(message: string, data: SceneActionMessage) {
        PubSub.publish(BroadcastEvents.uiAttributeSelectionHide, {});
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
