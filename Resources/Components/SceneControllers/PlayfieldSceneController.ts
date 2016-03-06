"atomic component";
import * as PubSub from "pubsub-js";
import BaseSceneController from "./BaseSceneController";

class PlayfieldSceneController extends BaseSceneController {

    inspectorFields = {
        debug: false,
    };

    constructor() {
        super("playfield_scene");
    }

    show() {
        this.DEBUG("About to show scene");
        PubSub.publish("game.level.generate", null);
    }

    hide() {
        this.DEBUG("About to hide scene");
        //PubSub.publish("ui.titlescreen.hide", {});
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
