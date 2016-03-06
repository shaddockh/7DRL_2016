"use strict";
var PubSub = require("pubsub-js");
exports.Scenes = {
    title: "Scenes/title.scene",
    attributeSel: "Scenes/attribute_sel.scene",
    intro: "Scenes/intro.scene"
};
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.prototype.switchToScene = function (sceneName) {
        var firstScene = this.currentScene == null;
        if (!firstScene) {
            console.log("unloading " + this.currentSceneName);
            PubSub.publishSync("game.scene.unloaded", {
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
        PubSub.publish("game.scene.loaded", {
            scene: this.currentSceneName
        });
    };
    SceneManager.scenes = exports.Scenes;
    return SceneManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SceneManager;
