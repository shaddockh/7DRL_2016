"use strict";
var PubSub = require("pubsub-js");
var Constants_1 = require("./Constants");
var LevelController_1 = require("LevelController");
var GameState = (function () {
    function GameState() {
        this.currentLevelController = null;
        this.turns = 0;
    }
    GameState.prototype.init = function () {
        var _this = this;
        console.log("Initializing Gamestate controller.");
        PubSub.subscribe(Constants_1.BroadcastEvents.gameLevelLoad, function (message, data) {
            _this.currentLevelController = new LevelController_1.default(data.level);
        });
    };
    GameState.prototype.incTurn = function () {
        this.turns++;
        this.updateUi();
    };
    GameState.prototype.updateUi = function () {
        //
    };
    return GameState;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameState;
