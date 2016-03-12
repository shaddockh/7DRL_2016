"use strict";
var TitleScreen_ui_1 = require("./TitleScreen.ui");
var AttributeSelection_ui_1 = require("./AttributeSelection.ui");
var GlobalCache_1 = require("GlobalCache");
var UiControllerType = (function () {
    function UiControllerType() {
        this.initialized = false;
        this.baseUi = null;
    }
    UiControllerType.prototype.init = function () {
        if (!this.initialized) {
            this.baseUi = new Atomic.UIView();
            console.log("initialize UiController");
            TitleScreen_ui_1.default.register(this.baseUi);
            AttributeSelection_ui_1.default.register(this.baseUi);
        }
    };
    return UiControllerType;
}());
exports.UiControllerType = UiControllerType;
var uiController = GlobalCache_1.default.getCachedObject("UiController") || GlobalCache_1.default.cacheObject("UiController", new UiControllerType());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uiController;
