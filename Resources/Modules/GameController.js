"use strict";
var PubSub = require("pubsub-js");
var ui = require("../UI/ui");
var SceneManager_1 = require("./SceneManager");
/**
 * singleton class for game controller
 */
var GameController = (function () {
    function GameController() {
    }
    GameController.init = function () {
        ui.init();
        PubSub.subscribe("game.scene.switch", function (message, data) {
            GameController.sceneManager.switchToScene(SceneManager_1.default.scenes[data.scene]);
        });
    };
    GameController.showTitleScene = function () {
        GameController.sceneManager.switchToScene(SceneManager_1.default.scenes.title);
    };
    GameController.sceneManager = new SceneManager_1.default();
    return GameController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameController;
