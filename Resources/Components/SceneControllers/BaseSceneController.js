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
    function BaseSceneController(sceneKey) {
        _super.call(this);
        this.inspectorFields = {
            debug: false,
        };
        PubSub.subscribe("game." + sceneKey + ".show", this.show.bind(this));
        PubSub.subscribe("game." + sceneKey + ".hide", this.hide.bind(this));
        PubSub.subscribe("game." + sceneKey + ".action", this.doSceneAction.bind(this));
        PubSub.subscribe("game.all_scenes.hide", this.hide.bind(this));
    }
    BaseSceneController.prototype.hide = function () {
        // override
    };
    BaseSceneController.prototype.show = function () {
        // override
    };
    BaseSceneController.prototype.doSceneAction = function (message, data) {
        console.log("Got the action");
        // override
    };
    BaseSceneController.prototype.openScene = function (sceneKey) {
        PubSub.publish("game." + sceneKey + ".show", null);
    };
    return BaseSceneController;
}(CustomJSComponent_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseSceneController;
