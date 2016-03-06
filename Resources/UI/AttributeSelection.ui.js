"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomUIWindow_1 = require("./CustomUIWindow");
var PubSub = require("pubsub-js");
var AttributeSelectionUi = (function (_super) {
    __extends(AttributeSelectionUi, _super);
    function AttributeSelectionUi(uiView) {
        _super.call(this, uiView, "Ui/AttributeSelection.ui.tb");
        this.channelTopics = {
            "ui.attributeselection.hide": this.closeWindow
        };
    }
    AttributeSelectionUi.register = function (baseUi) {
        PubSub.subscribe("ui.attributeselection.show", function (msg, data) {
            console.log("in");
            var wnd = new AttributeSelectionUi(baseUi);
            wnd.openWindow(data);
        });
    };
    AttributeSelectionUi.prototype.openWindow = function (parms) {
        var _this = this;
        _super.prototype.openWindow.call(this, { windowSettings: Atomic.UI_WINDOW_SETTINGS_NONE });
        var wnd = this.window;
        //wnd.setRect([0, 0, 400, 300]);
        //wnd.text = "Play Game";
        var btn = wnd.getWidget("btnPlay");
        btn.onClick = function () {
            _this.closeWindow();
            var action = {
                action: "show_playfield"
            };
            PubSub.publish("game.scene.action", action);
        };
        wnd.center();
    };
    return AttributeSelectionUi;
}(CustomUIWindow_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AttributeSelectionUi;
