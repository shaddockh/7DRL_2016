"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "./BaseSceneController";

class TitleScreenController extends BaseSceneController {

    inspectorFields = {
        debug: false,
    };

    constructor() {
        super("title_scene");
    }

    show() {
        this.DEBUG("About to show scene");
        PubSub.publish("ui.titlescreen.show", {});
    }

    hide() {
        this.DEBUG("About to hide scene");
        PubSub.publish("ui.titlescreen.hide", {});
    }

    doSceneAction(message: string, data: TitleSceneActionMessage) {
        this.DEBUG("Performing action: " + data.action);

        switch (data.action) {
            case "show_attribute_selection":
                this.openScene("attribute_selection_scene");
                break;
        }
    }
}

export = TitleScreenController;
