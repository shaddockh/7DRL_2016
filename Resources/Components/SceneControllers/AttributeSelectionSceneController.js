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
        _super.call(this, "attribute_selection_scene");
        this.inspectorFields = {
            debug: false,
        };
    }
    AttributeSelectionSceneController.prototype.show = function () {
        this.DEBUG("About to show scene");
        PubSub.publish("ui.attributeselection.show", {});
    };
    AttributeSelectionSceneController.prototype.hide = function () {
        this.DEBUG("About to hide scene");
        PubSub.publish("ui.attributeselection.hide", {});
    };
    AttributeSelectionSceneController.prototype.doSceneAction = function (message, data) {
        this.DEBUG("Performing action: " + data.action);
        switch (data.action) {
            case "show_playfield":
                this.openScene("playfield_scene");
                break;
        }
    };
    return AttributeSelectionSceneController;
}(BaseSceneController_1.default));
module.exports = AttributeSelectionSceneController;
