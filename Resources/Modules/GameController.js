"use strict";
var PubSub = require("pubsub-js");
var ui = require("../UI/ui");
var Scenes = {
    title: "Scenes/game.scene"
};
/**
 * singleton class for game controller
 */
var GameController = (function () {
    function GameController() {
    }
    GameController.init = function () {
        ui.init();
        //PubSub.subscribe("game:title_scene.show", () => GameController.switchScene(Scenes.title));
        //PubSub.subscribe("game:attribute_selection_scene.show", () => GameController.switchScene(Scenes.assignAttributes));
        //PubSub.subscribe("game:playfield_scene.show", () => GameController.switchScene(Scenes.playfield));
        Atomic.player.loadScene(Scenes.title);
    };
    GameController.showTitleScene = function () {
        PubSub.publish("game.title_scene.show", null);
    };
    // switching scenes doesn't seem to work correclty
    GameController.switchScene = function (sceneName) {
        var firstScene = Atomic.player.currentScene == null;
        var scene = Atomic.player.loadScene(sceneName);
        if (!firstScene) {
            var viewPort = Atomic.renderer.getViewport(0);
            var cameras = scene.getChildrenWithComponent("Camera", true);
            viewPort.setScene(scene);
            viewPort.setCamera((cameras[0].getComponent("Camera")));
        }
    };
    return GameController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameController;
