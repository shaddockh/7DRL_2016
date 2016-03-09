"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var Constants_1 = require("Constants");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false
        };
        this.mapEntity = null;
        this.currentVisibility = null;
    }
    Tile.prototype.doAction = function (message, data) {
        switch (message) {
            case Constants_1.ComponentEvents.onUpdateFov:
                this.onUpdateFov(data);
                break;
            case Constants_1.ComponentEvents.onDestroy:
                this.onDestroy();
        }
    };
    /**
     * Updates whether this tile is in the field of view of the player
     * @param {float} visibility the amount the tile is visible. from 0 - 1.  Full visibility is 1.0
     */
    Tile.prototype.onUpdateFov = function (data) {
        this.DEBUG("Setting visibility of tile at " + this.mapEntity.x + "," + this.mapEntity.y + " to " + data.visibility);
        if (data.visibility === 1) {
            this.mapEntity.seen = true;
        }
        if (this.mapEntity.seen) {
            data.visibility = 1;
        }
        // Cache the current visibility so that we don't mess with alpha every update
        if (this.currentVisibility === null || this.currentVisibility !== data.visibility) {
            this.node.getComponent("StaticSprite2D").setAlpha(this.mapEntity.seen ? 1.0 : data.visibility);
            this.currentVisibility = data.visibility;
        }
    };
    Tile.prototype.setMapReference = function (tileData) {
        tileData.node = this.node;
        tileData.tileComponent = this;
        this.mapEntity = tileData;
    };
    Tile.prototype.onDestroy = function () {
        this.mapEntity.node = null;
        this.mapEntity.tileComponent = null;
    };
    return Tile;
}(CustomJSComponent_1.default));
module.exports = Tile;
