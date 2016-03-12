"use strict";
var PubSub = require("pubsub-js");
var UiController_1 = require("./Ui/UiController");
var SceneManager_1 = require("./SceneManager");
var Constants_1 = require("./Constants");
var GameState_1 = require("GameState");
var GlobalCache_1 = require("GlobalCache");
/**
 * singleton class for game controller
 */
var GameControllerType = (function () {
    function GameControllerType() {
        this.initialized = false;
        this.sceneManager = null;
        this.gameState = null;
    }
    GameControllerType.prototype.init = function () {
        var _this = this;
        if (!this.initialized) {
            this.initialized = true;
            console.log("Initializing GameController.");
            this.sceneManager = new SceneManager_1.default();
            this.gameState = new GameState_1.default();
            this.gameState.init();
            // attach ui to the game controller so it doesn't get GC'd
            UiController_1.default.init();
            PubSub.subscribe(Constants_1.BroadcastEvents.gameSceneSwitch, function (message, data) {
                _this.sceneManager.switchToScene(SceneManager_1.default.scenes[data.scene]);
            });
            Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
        }
        else {
            console.log("Trying to initialize GameController multiple times.");
        }
    };
    GameControllerType.prototype.showTitleScene = function () {
        this.sceneManager.switchToScene(SceneManager_1.default.scenes.title);
    };
    GameControllerType.prototype.gameOver = function () {
        //TODO:
    };
    return GameControllerType;
}());
exports.GameControllerType = GameControllerType;
var controller = GlobalCache_1.default.getCachedObject("GameController") || GlobalCache_1.default.cacheObject("GameController", new GameControllerType());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = controller;
