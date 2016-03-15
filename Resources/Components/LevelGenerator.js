"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var PubSub = require("pubsub-js");
var DefaultGenerator_1 = require("Generators/DefaultGenerator");
var Constants_1 = require("Constants");
var LevelGenerator = (function (_super) {
    __extends(LevelGenerator, _super);
    function LevelGenerator() {
        _super.call(this);
        this.inspectorFields = {
            width: 80,
            height: 25,
            debug: false,
            creatureCount: 10
        };
        this.width = 80;
        this.height = 25;
        this.debug = false;
        this.creatureCount = 10;
    }
    LevelGenerator.prototype.start = function () {
        PubSub.subscribe(Constants_1.BroadcastEvents.gameLevelGenerate, this.generateLevel.bind(this));
    };
    LevelGenerator.prototype.generateLevel = function () {
        // generate the level
        this.DEBUG("Getting generator");
        var generator = this.getGenerator();
        this.DEBUG("generating level");
        var levelData = generator.generate();
        this.DEBUG("Sending level data to subscribers");
        PubSub.publish(Constants_1.BroadcastEvents.gameLevelLoad, { level: levelData });
    };
    LevelGenerator.prototype.getGenerator = function () {
        return new DefaultGenerator_1.default(this.width, this.height, this.debug, this.creatureCount);
    };
    return LevelGenerator;
}(CustomJSComponent_1.default));
module.exports = LevelGenerator;
