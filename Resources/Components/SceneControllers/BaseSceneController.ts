import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";

export default class BaseSceneController extends CustomJSComponent {

    inspectorFields = {
        debug: false,
    };

    constructor(sceneKey:string) {
        super();
        PubSub.subscribe(`game.${sceneKey}.show`, this.show.bind(this));
        PubSub.subscribe(`game.${sceneKey}.hide`, this.hide.bind(this));
        PubSub.subscribe(`game.${sceneKey}.action`, this.doSceneAction.bind(this));
        PubSub.subscribe("game.all_scenes.hide", this.hide.bind(this));
    }

    hide() {
        // override
    }

    show() {
        // override
    }

    doSceneAction(message:string, data:SceneActionMessage) {
        console.log("Got the action");
        // override
    }

    openScene(sceneKey : string) {
        PubSub.publish(`game.${sceneKey}.show`, null);
    }
}
