"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PubSub = require("pubsub-js");
var BaseSceneController_1 = require("./BaseSceneController");
var AttributeSelectionSceneController = (function (_super) {
    __extends(AttributeSelectionSceneController, _super);
    function AttributeSelectionSceneController() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            scenePlay: "intro",
            sceneTitle: "title"
        };
    }
    AttributeSelectionSceneController.prototype.sceneLoaded = function (message, data) {
        _super.prototype.sceneLoaded.call(this, message, data);
        PubSub.publish("ui.attributeselection.show", {});
    };
    AttributeSelectionSceneController.prototype.sceneUnloaded = function (message, data) {
        PubSub.publish("ui.attributeselection.hide", {});
        _super.prototype.sceneUnloaded.call(this, message, data);
    };
    AttributeSelectionSceneController.prototype.doSceneAction = function (message, data) {
        _super.prototype.doSceneAction.call(this, message, data);
        switch (data.action) {
            case "show_playfield":
                this.switchScene(this.scenePlay);
                break;
        }
    };
    return AttributeSelectionSceneController;
}(BaseSceneController_1.default));
module.exports = AttributeSelectionSceneController;
