import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";

import {BroadcastEvents} from "Constants";
export default class BaseSceneController extends CustomJSComponent {

    inspectorFields = {
        debug: false
    };

    private subscriptionTokens = [];
    constructor() {
        super();
    }

    start() {
        this.DEBUG("Binding broadcast listeners");
        console.log(this.scene.asyncProgress);
        this.addSubscription(BroadcastEvents.gameSceneLoaded, this.sceneLoaded.bind(this));
        this.addSubscription(BroadcastEvents.gameSceneUnloaded, this.sceneUnloaded.bind(this));
        this.addSubscription(BroadcastEvents.gameSceneAction, this.doSceneAction.bind(this));
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

    switchScene(sceneKey: string) {
        PubSub.publish(BroadcastEvents.gameSceneSwitch, {
            scene: sceneKey
        });
    }
}
