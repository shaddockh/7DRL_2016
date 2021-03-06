"use strict";
var LevelData_1 = require("Generators/LevelData");
var ROT = require("rot");
var LevelController = (function () {
    function LevelController(levelData) {
        /** ROT scheduler */
        this.scheduler = null;
        /** ROT engine */
        this.engine = null;
        console.log("Creating new level controller");
        this.levelData = levelData;
        this.scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this.scheduler);
    }
    LevelController.prototype.start = function () {
        this.engine.start();
    };
    LevelController.prototype.registerActor = function (ai) {
        this.scheduler.add(ai, true);
    };
    LevelController.prototype.deregisterActor = function (ai) {
        this.scheduler.remove(ai);
    };
    LevelController.prototype.updateFov = function (position, radius) {
        // if (this.useFov) {
        //     triggerEvent.trigger(this.node, 'onUpdateFov', position, this.fovRadius, this.mapData);
        // }
    };
    LevelController.prototype.getTileAt = function (pos) {
        return this.levelData.getTile(pos[0], pos[1]);
    };
    LevelController.prototype.isValidPos = function (pos) {
        return this.levelData.inBounds(pos[0], pos[1]);
    };
    LevelController.prototype.getEntitiesAt = function (pos) {
        var result = new LevelData_1.EntityList();
        this.levelData.iterateEntitiesAt(pos[0], pos[1], function (entity) {
            result.add(entity);
        });
        return result;
    };
    LevelController.prototype.getEntitiesInRadius = function (pos, radius) {
        var x = pos[0], y = pos[1];
        var boundsX = [x - radius, x + radius];
        var boundsY = [y - radius, y + radius];
        var result = new LevelData_1.EntityList();
        this.levelData.iterateEntities(function (entity) {
            if (entity.x >= boundsX[0] && entity.x <= boundsX[1]
                && entity.y >= boundsY[0] && entity.y <= boundsY[1]) {
                result.add(entity);
            }
        });
        return result;
    };
    LevelController.prototype.iterateEntitiesAt = function (pos, callback) {
        this.levelData.iterateEntitiesAt(pos[0], pos[1], callback);
    };
    return LevelController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LevelController;
