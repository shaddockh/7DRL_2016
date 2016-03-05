"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomUIWindow_1 = require("./CustomUIWindow");
var PubSub = require("pubsub-js");
var TitleScreenUi = (function (_super) {
    __extends(TitleScreenUi, _super);
    function TitleScreenUi(uiView) {
        _super.call(this, uiView, "Ui/TitleScreen.ui.tb");
        this.channelTopics = {
            "ui.titlescreen.hide": this.closeWindow
        };
    }
    TitleScreenUi.register = function (baseUi) {
        PubSub.subscribe("ui.titlescreen.show", function (msg, data) {
            var wnd = new TitleScreenUi(baseUi);
            wnd.openWindow(data);
        });
    };
    TitleScreenUi.prototype.openWindow = function (parms) {
        var _this = this;
        _super.prototype.openWindow.call(this, { windowSettings: Atomic.UI_WINDOW_SETTINGS_NONE });
        var wnd = this.window;
        //wnd.setRect([0, 0, 400, 300]);
        //wnd.text = "Play Game";
        var btn = wnd.getWidget("btnPlay");
        btn.onClick = function () {
            _this.closeWindow();
            var action = {
                action: "show_attribute_selection"
            };
            PubSub.publish("game.title_scene.action", action);
        };
        wnd.center();
    };
    return TitleScreenUi;
}(CustomUIWindow_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TitleScreenUi;
