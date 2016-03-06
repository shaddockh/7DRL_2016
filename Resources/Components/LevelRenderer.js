"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var PubSub = require("pubsub-js");
var LevelRenderer = (function (_super) {
    __extends(LevelRenderer, _super);
    function LevelRenderer() {
        var _this = this;
        _super.call(this);
        this.inspectorFields = {
            debug: false,
        };
        this.cellPixelSize = 16;
        this.levelData = null;
        this.children = [];
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
        PubSub.subscribe("game.level.load", function (message, data) {
            _this.loadLevel(data.level);
        });
    }
    LevelRenderer.prototype.loadLevel = function (level) {
        this.levelData = level;
        this.render();
    };
    LevelRenderer.prototype.render = function () {
        var _this = this;
        var start = new Date().getTime();
        try {
            var scale_1 = this.cellPixelSize * Atomic.PIXEL_SIZE, offsetX = this.levelData.width / 2 * scale_1 * -1, offsetY = this.levelData.height / 2 * scale_1 * -1;
            this.levelData.tiles.forEach(function (cols) {
                cols.forEach(function (tile) {
                    if (tile.terrainType !== 0 /* none */) {
                        _this.DEBUG("Construction cell [" + tile.x + "," + tile.y + "] - " + tile.blueprint);
                        var tileNode = _this.node.createChildPrefab(tile.x + "-" + tile.y, "Prefabs/Tiles/FloorTile.prefab");
                        tileNode.position2D = [tile.x * scale_1, tile.y * scale_1];
                        //let tileNode = nodeBuilder.createChildAtPosition(this.node, tile.blueprint, [tile.x * scale, tile.y * scale]);
                        // let tileComponent = tileNode.getJSComponent<Tile>("Tile");
                        // if (tileComponent) {
                        //     tileComponent.setMapReference(tile);
                        // }
                        _this.children.push(tileNode);
                    }
                });
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
