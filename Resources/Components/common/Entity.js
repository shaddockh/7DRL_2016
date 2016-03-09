"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var Constants_1 = require("Constants");
//import gameState from '../../Modules/gameState';
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            blocksPath: false,
            blocksLight: false,
            bumpable: false,
            attackable: false,
            fovRemember: false,
            screenName: "entity"
        };
        this.blocksPath = false;
        this.blocksLight = false;
        this.bumpable = false;
        this.attackable = false;
        /** The displayable name of this entity */
        this.screenName = "entity";
        /** once seen, don't hide when leaving field of view */
        this.fovRemember = false;
        this.mapEntity = null;
        /** has this entity been seen by the player yet? */
        this.seen = false;
    }
    Entity.prototype.getPosition = function () {
        return [this.mapEntity.x, this.mapEntity.y];
    };
    Entity.prototype.setPosition = function (pos) {
        this.mapEntity.x = pos[0];
        this.mapEntity.y = pos[1];
    };
    Entity.prototype.setMapReference = function (mapEntity) {
        mapEntity.node = this.node;
        mapEntity.entityComponent = this;
        this.mapEntity = mapEntity;
    };
    Entity.prototype.doAction = function (message, data) {
        switch (message) {
            case Constants_1.ComponentEvents.onUpdateFov:
                this.onUpdateFov(data);
                break;
            case Constants_1.ComponentEvents.onDestroy:
                this.onDestroy();
        }
    };
    /**
     * Updates whether this entity is in the field of view of the player
     */
    Entity.prototype.onUpdateFov = function (data) {
        this.DEBUG("Setting visibility of entity at " + this.mapEntity.x + "," + this.mapEntity.y + " to " + data.visibility);
        if (data.visibility === 1 || (this.fovRemember && this.seen)) {
            this.getComponent("StaticSprite2D").setAlpha(1);
            this.seen = true;
        }
        else {
            this.getComponent("StaticSprite2D").setAlpha(data.visibility);
        }
    };
    Entity.prototype.onDestroy = function () {
        this.mapEntity.entityComponent = null;
        this.mapEntity.node = null;
        //gameState.getCurrentLevel().mapData.removeEntity(this.mapEntity);
    };
    return Entity;
}(CustomJSComponent_1.default));
module.exports = Entity;
