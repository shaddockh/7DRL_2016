"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseSceneController_1 = require("./BaseSceneController");
var PlayfieldSceneController = (function (_super) {
    __extends(PlayfieldSceneController, _super);
    function PlayfieldSceneController() {
        _super.call(this, "playfield_scene");
        this.inspectorFields = {
            debug: false,
        };
    }
    PlayfieldSceneController.prototype.show = function () {
        this.DEBUG("About to show scene");
        //PubSub.publish("ui.titlescreen.show", {});
    };
    PlayfieldSceneController.prototype.hide = function () {
        this.DEBUG("About to hide scene");
        //PubSub.publish("ui.titlescreen.hide", {});
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
