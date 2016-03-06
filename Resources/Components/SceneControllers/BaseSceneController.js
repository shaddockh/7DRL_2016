"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var PubSub = require("pubsub-js");
var BaseSceneController = (function (_super) {
    __extends(BaseSceneController, _super);
    function BaseSceneController() {
        _super.call(this);
        this.inspectorFields = {
            debug: false,
        };
        this.subscriptionTokens = [];
        this.addSubscription("game.scene.loaded", this.sceneLoaded.bind(this));
        this.addSubscription("game.scene.unloaded", this.sceneUnloaded.bind(this));
        this.addSubscription("game.scene.action", this.doSceneAction.bind(this));
    }
    BaseSceneController.prototype.addSubscription = function (key, handler) {
        this.subscriptionTokens.push(PubSub.subscribe(key, handler));
    };
    BaseSceneController.prototype.sceneLoaded = function (message, data) {
        this.DEBUG("Scene Loaded: " + data.scene);
    };
    BaseSceneController.prototype.sceneUnloaded = function (message, data) {
        this.DEBUG("Scene Unloaded: " + data.scene);
        this.subscriptionTokens.forEach(function (token) { return PubSub.unsubscribe(token); });
        this.subscriptionTokens = [];
    };
    BaseSceneController.prototype.doSceneAction = function (message, data) {
        this.DEBUG("Scene Action: " + data.action);
    };
    BaseSceneController.prototype.openScene = function (sceneKey) {
        PubSub.publish("game." + sceneKey + ".show", null);
    };
    BaseSceneController.prototype.switchScene = function (sceneKey) {
        PubSub.publish("game.scene.switch", {
            scene: sceneKey
        });
    };
    return BaseSceneController;
}(CustomJSComponent_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseSceneController;
