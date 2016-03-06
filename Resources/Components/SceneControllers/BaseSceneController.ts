import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";

export default class BaseSceneController extends CustomJSComponent {

    inspectorFields = {
        debug: false,
    };

    private subscriptionTokens = [];
    constructor() {
        super();
        this.addSubscription("game.scene.loaded", this.sceneLoaded.bind(this));
        this.addSubscription("game.scene.unloaded", this.sceneUnloaded.bind(this));
        this.addSubscription("game.scene.action", this.doSceneAction.bind(this));
    }

    addSubscription(key:string, handler: any) {
        this.subscriptionTokens.push(PubSub.subscribe(key, handler));
    }

    sceneLoaded(message: string, data: SceneActionMessage) {
        this.DEBUG(`Scene Loaded: ${data.scene}`);
    }

    sceneUnloaded(message: string, data: SceneActionMessage) {
        this.DEBUG(`Scene Unloaded: ${data.scene}`);
        this.subscriptionTokens.forEach((token) => PubSub.unsubscribe(token));
        this.subscriptionTokens = [];
    }

    doSceneAction(message: string, data: SceneActionMessage) {
        this.DEBUG(`Scene Action: ${data.action}`);
    }

    openScene(sceneKey: string) {
        PubSub.publish(`game.${sceneKey}.show`, null);
    }

    switchScene(sceneKey: string) {
        PubSub.publish("game.scene.switch", {
            scene: sceneKey
        });
    }
}
