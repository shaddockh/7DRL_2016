"use strict";
var PubSub = require("pubsub-js");
var Constants_1 = require("./Constants");
var GameState = (function () {
    function GameState() {
        this.currentLevelData = null;
    }
    GameState.prototype.init = function () {
        var _this = this;
        PubSub.subscribe(Constants_1.BroadcastEvents.gameLevelLoad, function (message, data) {
            console.log("Loading Level Data into game state");
            _this.currentLevelData = data.level;
        });
    };
    return GameState;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameState;
