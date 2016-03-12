"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseSceneController_1 = require("BaseSceneController");
var PubSub = require("pubsub-js");
var Constants_1 = require("Constants");
var TitleScreenController = (function (_super) {
    __extends(TitleScreenController, _super);
    function TitleScreenController() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            sceneAttrSelection: "attributeSel"
        };
    }
    TitleScreenController.prototype.sceneLoaded = function (message, data) {
        _super.prototype.sceneLoaded.call(this, message, data);
        PubSub.publish(Constants_1.BroadcastEvents.uiTitleScreenShow, {});
        this.DEBUG("after title screen loaded");
    };
    TitleScreenController.prototype.sceneUnloaded = function (message, data) {
        PubSub.publish(Constants_1.BroadcastEvents.uiTitleScreenHide, {});
        _super.prototype.sceneUnloaded.call(this, message, data);
    };
    TitleScreenController.prototype.doSceneAction = function (message, data) {
        _super.prototype.doSceneAction.call(this, message, data);
        switch (data.action) {
            case "show_attribute_selection":
                this.switchScene(this.sceneAttrSelection);
                break;
        }
    };
    return TitleScreenController;
}(BaseSceneController_1.default));
module.exports = TitleScreenController;
