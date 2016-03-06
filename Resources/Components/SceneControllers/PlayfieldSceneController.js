"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PubSub = require("pubsub-js");
var BaseSceneController_1 = require("./BaseSceneController");
var PlayfieldSceneController = (function (_super) {
    __extends(PlayfieldSceneController, _super);
    function PlayfieldSceneController() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
        };
    }
    PlayfieldSceneController.prototype.sceneLoaded = function (message, data) {
        _super.prototype.sceneLoaded.call(this, message, data);
        PubSub.publish("game.level.generate", null);
    };
    PlayfieldSceneController.prototype.sceneUnloaded = function (message, data) {
        PubSub.publish("ui.attributeselection.hide", {});
        _super.prototype.sceneUnloaded.call(this, message, data);
    };
    PlayfieldSceneController.prototype.doSceneAction = function (message, data) {
        this.DEBUG("Performing action: " + data.action);
        // switch (data.action) {
        //     case "attribute_selection":
        //         this.openScene("attribute_selection_scene");
        //         break;
        // }
    };
    return PlayfieldSceneController;
}(BaseSceneController_1.default));
module.exports = PlayfieldSceneController;
