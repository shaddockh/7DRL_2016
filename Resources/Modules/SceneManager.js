"use strict";
var PubSub = require("pubsub-js");
var Constants_1 = require("Constants");
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.prototype.switchToScene = function (sceneName) {
        var _this = this;
        var firstScene = this.currentScene == null;
        if (!firstScene) {
            PubSub.publishSync(Constants_1.BroadcastEvents.gameSceneUnloaded, {
                scene: this.currentSceneName
            });
        }
        var scene = Atomic.player.loadScene(sceneName);
        if (!firstScene) {
            var viewPort = Atomic.renderer.getViewport(0);
            viewPort.setScene(scene);
            viewPort.setCamera(scene.getMainCamera());
        }
        this.currentScene = scene;
        this.currentSceneName = sceneName;
        // Wait for the scene to load in by deferring to the end of the current frame
        setImmediate(function () {
            console.log("Loaded scene: " + sceneName + ", broadcasting loaded.");
            PubSub.publish(Constants_1.BroadcastEvents.gameSceneLoaded, {
                scene: _this.currentSceneName
            });
        });
    };
    SceneManager.scenes = Constants_1.Scenes;
    return SceneManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SceneManager;
