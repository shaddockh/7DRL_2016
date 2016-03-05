"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PubSub = require("pubsub-js");
var BaseSceneController_1 = require("./BaseSceneController");
var TitleScreenController = (function (_super) {
    __extends(TitleScreenController, _super);
    function TitleScreenController() {
        _super.call(this, "title_scene");
        this.inspectorFields = {
            debug: false,
        };
    }
    TitleScreenController.prototype.show = function () {
        this.DEBUG("About to show scene");
        PubSub.publish("ui.titlescreen.show", {});
    };
    TitleScreenController.prototype.hide = function () {
        this.DEBUG("About to hide scene");
        PubSub.publish("ui.titlescreen.hide", {});
    };
    TitleScreenController.prototype.doSceneAction = function (message, data) {
        this.DEBUG("Performing action: " + data.action);
        switch (data.action) {
            case "show_attribute_selection":
                this.openScene("attribute_selection_scene");
                break;
        }
    };
    return TitleScreenController;
}(BaseSceneController_1.default));
module.exports = TitleScreenController;
