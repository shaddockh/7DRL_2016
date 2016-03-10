"use strict";
var PubSub = require("pubsub-js");
var ui = require("./Ui/ui");
var SceneManager_1 = require("./SceneManager");
var Constants_1 = require("./Constants");
var GameState_1 = require("GameState");
/**
 * singleton class for game controller
 */
var GameController = (function () {
    function GameController() {
    }
    GameController.init = function () {
        Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
        GameController.gameState.init();
        ui.init();
        PubSub.subscribe(Constants_1.BroadcastEvents.gameSceneSwitch, function (message, data) {
            GameController.sceneManager.switchToScene(SceneManager_1.default.scenes[data.scene]);
        });
    };
    GameController.showTitleScene = function () {
        GameController.sceneManager.switchToScene(SceneManager_1.default.scenes.title);
    };
    GameController.sceneManager = new SceneManager_1.default();
    GameController.gameState = new GameState_1.default();
    return GameController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameController;
