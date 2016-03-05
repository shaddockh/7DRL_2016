"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "./BaseSceneController";

class AttributeSelectionSceneController extends BaseSceneController {

    inspectorFields = {
        debug: false,
    };

    constructor() {
        super("attribute_selection_scene");
    }

    show() {
        this.DEBUG("About to show scene");
        PubSub.publish("ui.attributeselection.show", {});
    }

    hide() {
        this.DEBUG("About to hide scene");
        PubSub.publish("ui.attributeselection.hide", {});
    }

    doSceneAction(message: string, data: TitleSceneActionMessage) {
        this.DEBUG("Performing action: " + data.action);

        switch (data.action) {
            case "show_playfield":
                this.openScene("playfield_scene");
                break;
        }
    }

}

export = AttributeSelectionSceneController;
