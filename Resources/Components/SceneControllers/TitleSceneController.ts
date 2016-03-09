"atomic component";
import BaseSceneController from "BaseSceneController";
import * as PubSub from "pubsub-js";
import {BroadcastEvents} from "Constants";

class TitleScreenController extends BaseSceneController {

    inspectorFields = {
        debug: false,
        sceneAttrSelection: "attributeSel"
    };

    sceneAttrSelection:string;

    sceneLoaded(message: string, data: SceneActionMessage) {
        super.sceneLoaded(message, data);
        PubSub.publish(BroadcastEvents.uiTitleScreenShow, {});
    }

    sceneUnloaded(message: string, data: SceneActionMessage) {
        PubSub.publish(BroadcastEvents.uiTitleScreenHide, {});
        super.sceneUnloaded(message, data);
    }

    doSceneAction(message: string, data: SceneActionMessage) {
        super.doSceneAction(message, data);

        switch (data.action) {
            case "show_attribute_selection":
                this.switchScene(this.sceneAttrSelection);
                break;
        }
    }
}

export = TitleScreenController;
