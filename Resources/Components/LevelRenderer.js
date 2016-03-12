"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var PubSub = require("pubsub-js");
var Constants_1 = require("Constants");
var atomic_blueprintLib_1 = require("atomic-blueprintLib");
var GameController_1 = require("GameController");
var LevelRenderer = (function (_super) {
    __extends(LevelRenderer, _super);
    function LevelRenderer() {
        _super.call(this);
        this.inspectorFields = {
            debug: false,
        };
        this.cellPixelSize = 16;
        this.levelData = null;
        this.children = [];
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
    }
    LevelRenderer.prototype.start = function () {
        var _this = this;
        PubSub.subscribe(Constants_1.BroadcastEvents.gameLevelLoad, function (message, data) {
            _this.DEBUG("Got a load level message");
            _this.loadLevel(data.level);
        });
    };
    LevelRenderer.prototype.loadLevel = function (level) {
        for (var x in GameController_1.default) {
            console.log(x);
        }
        GameController_1.default.gameState.currentLevelData = level;
        this.levelData = level;
        this.render();
    };
    LevelRenderer.prototype.render = function () {
        var _this = this;
        var start = new Date().getTime();
        try {
            var scale_1 = this.cellPixelSize * Atomic.PIXEL_SIZE, offsetX = this.levelData.width / 2 * scale_1 * -1, offsetY = this.levelData.height / 2 * scale_1 * -1;
            this.levelData.iterateTiles(function (tile) {
                if (tile.terrainType !== 0 /* none */) {
                    //this.DEBUG(`Construction cell [${tile.x},${tile.y}] - ${tile.blueprint}`);
                    var tileNode = atomic_blueprintLib_1.nodeBuilder.createChildAtPosition(_this.node, tile.blueprint, [tile.x * scale_1, tile.y * scale_1]);
                    var tileComponent = _this.getJSComponent("Tile");
                    if (tileComponent) {
                        tileComponent.setMapReference(tile);
                    }
                    _this.children.push(tileNode);
                }
            });
            this.levelData.iterateEntities(function (entity) {
                if (entity.blueprint) {
                    var blueprint = entity.blueprint;
                    _this.DEBUG("Constructing entity [" + entity.x + "," + entity.y + "] - " + blueprint);
                    var entityNode = atomic_blueprintLib_1.nodeBuilder.createChildAtPosition(_this.node, blueprint, [entity.x * scale_1, entity.y * scale_1]);
                    var entityComponent = entityNode.getJSComponent("Entity");
                    if (entityComponent) {
                        entityComponent.setMapReference(entity);
                    }
                    _this.children.push(entityNode);
                }
            });
            this.node.position2D = [offsetX, offsetY];
        }
        finally {
            this.DEBUG("Rendering complete after " + (new Date().getTime() - start) + " ms");
        }
    };
    return LevelRenderer;
}(CustomJSComponent_1.default));
module.exports = LevelRenderer;
