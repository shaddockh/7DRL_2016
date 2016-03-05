"use strict";
var PubSub = require("pubsub-js");
/**
 * wrapper to be used for ui windows.  Will handle loading up the layout and
 * setting some properties.
 */
var CustomUIWindow = (function () {
    function CustomUIWindow(uiView, layoutFilename) {
        var _this = this;
        this.window = null;
        this.channelTopics = {};
        this.layoutFilename = null;
        this.uiView = null;
        this.layoutFilename = layoutFilename;
        this.uiView = uiView;
        var _loop_1 = function(topic) {
            PubSub.subscribe(topic, function (message, data) {
                _this.channelTopics[topic].apply(_this, data);
            });
        };
        for (var topic in this.channelTopics) {
            _loop_1(topic);
        }
    }
    CustomUIWindow.prototype.openWindow = function (options) {
        if (options === void 0) { options = {
            windowSettings: Atomic.UI_WINDOW_SETTINGS_TITLEBAR
        }; }
        var window = this.window = new Atomic.UIWindow();
        window.settings = options.windowSettings;
        window.load(this.layoutFilename);
        window.resizeToFitContent();
        this.uiView.addChild(window);
    };
    CustomUIWindow.prototype.closeWindow = function () {
        if (this.window) {
            this.window.die();
            this.window = null;
        }
        for (var topic in this.channelTopics) {
            PubSub.unsubscribe(topic);
        }
    };
    return CustomUIWindow;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomUIWindow;
