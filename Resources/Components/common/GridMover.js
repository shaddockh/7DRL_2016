"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var NodeEvents_1 = require("NodeEvents");
var gl_matrix_1 = require("gl-matrix");
var Constants_1 = require("Constants");
var GridMover = (function (_super) {
    __extends(GridMover, _super);
    function GridMover() {
        _super.call(this);
        this.inspectorFields = {
            debug: false,
            cellPixelSize: 16
        };
        this.speed = 1;
        this.smoothMovement = true;
        this.cellPixelSize = 16;
        this.cellUnitSize = 0;
        this.postMoveActions = [];
        this.moving = false;
        this.blocked = false;
        this.bumping = false;
    }
    GridMover.prototype.queuePostMoveAction = function (action) {
        this.postMoveActions.push(action);
    };
    GridMover.prototype.executePostMoveActions = function () {
        while (this.postMoveActions.length) {
            // pull the actions off the queue and run it
            var action = this.postMoveActions.shift();
            action();
        }
    };
    Object.defineProperty(GridMover.prototype, "entity", {
        get: function () {
            return this.getJSComponent("Entity");
        },
        enumerable: true,
        configurable: true
    });
    GridMover.prototype.start = function () {
        this.setActionMap((_a = {},
            _a[Constants_1.ComponentEvents.onTryMove] = this.onTryMove.bind(this),
            _a
        ));
        this.targetPos = this.node.position2D;
        this.startPos = this.node.position2D;
        this.moving = false;
        this.debug = true;
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
        var _a;
    };
    GridMover.prototype.onTryMove = function (data) {
        var _this = this;
        if (this.moving || this.bumping || this.blocked) {
            return;
        }
        try {
            this.DEBUG("Entering Move");
            this.startPos = this.node.position2D;
            this.targetPos = gl_matrix_1.vec2.add(gl_matrix_1.vec2.create(), this.startPos, gl_matrix_1.vec2.scale(gl_matrix_1.vec2.create(), data.offset, this.cellUnitSize));
            this.t = 0;
            // see if we can move into the next space
            var mapPos_1 = this.entity.getPosition();
            var newMapPos_1 = gl_matrix_1.vec2.add(gl_matrix_1.vec2.create(), mapPos_1, data.offset);
            this.DEBUG("Current position: " + mapPos_1[0] + "," + mapPos_1[1]);
            this.DEBUG("Moving to: " + newMapPos_1[0] + "," + newMapPos_1[1]);
            this.moving = true;
            // check to see if we are blocked
            // First see if we are blocked by terrain
            if (!this.levelController.isValidPos(newMapPos_1) ||
                this.levelController.getTileAt(newMapPos_1).terrainType !== 1 /* floor */) {
                // Queue up an action to notify the player that the move is blocked
                this.queuePostMoveAction(function () {
                    _this.DEBUG("Blocked by terrain");
                    NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onLogAction, { message: "Blocked." });
                    NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onMoveBlocked, { from: mapPos_1, to: newMapPos_1 });
                    NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onMoveComplete);
                });
                this.blocked = true;
                this.moving = false;
            }
            else {
                this.levelController.iterateEntitiesAt(newMapPos_1, function (entity) {
                    // We are going to bump the top level entity if it's bumpable
                    if (entity.entityComponent) {
                        if (entity.entityComponent.blocksPath) {
                            _this.blocked = true;
                            _this.moving = false;
                            _this.queuePostMoveAction(function () {
                                _this.DEBUG("Blocked by Entity");
                                NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onMoveBlocked, { from: mapPos_1, to: newMapPos_1 });
                                NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onMoveComplete);
                            });
                        }
                        if (entity.entityComponent.bumpable) {
                            // Let's exit the loop since we only want to deal with the first entity
                            NodeEvents_1.default.trigger(_this.node, Constants_1.ComponentEvents.onBumpInto, { targetComponent: entity.entityComponent });
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                });
            }
            if (this.moving) {
                this.movementVector = data.offset;
                this.startPos = this.node.position2D;
                this.DEBUG("Moving to " + this.targetPos + " from " + this.startPos + ", vector = " + data.offset);
                NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onMoveStart, { from: mapPos_1, to: newMapPos_1 });
                this.entity.setPosition([newMapPos_1[0], newMapPos_1[1]]);
                this.node.position2D = this.targetPos;
                NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onMoveComplete);
            }
        }
        finally {
            this.moving = false;
            this.blocked = false;
            this.bumping = false;
        }
    };
    return GridMover;
}(CustomJSComponent_1.default));
module.exports = GridMover;
