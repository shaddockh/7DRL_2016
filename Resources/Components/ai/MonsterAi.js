"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEvents_1 = require("NodeEvents");
var CustomJSComponent_1 = require("CustomJSComponent");
var ROT = require("rot");
var gl_matrix_1 = require("gl-matrix");
var Constants_1 = require("Constants");
var MonsterAi = (function (_super) {
    __extends(MonsterAi, _super);
    function MonsterAi() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            chaseEnemy: true,
            deathEffect: "death_effect",
            sightRadius: 4,
            trackingRadius: 8,
            isHunting: false
        };
    }
    MonsterAi.prototype.resolveTurn = function () {
        // nothing to do
    };
    ;
    MonsterAi.prototype.start = function () {
        this.debug = true;
        this.setActionMap((_a = {},
            _a[Constants_1.ComponentEvents.onActionComplete] = this.onActionComplete.bind(this),
            _a[Constants_1.ComponentEvents.onDie] = this.onDie.bind(this),
            _a[Constants_1.ComponentEvents.onAttack] = this.onAttack.bind(this),
            _a[Constants_1.ComponentEvents.onBumpInto] = this.onBumpInto.bind(this),
            _a[Constants_1.ComponentEvents.onMoveComplete] = this.onMoveComplete.bind(this),
            _a
        ));
        if (this.levelController) {
            this.DEBUG("Registering self with scheduler");
            this.levelController.registerActor(this);
        }
        var _a;
    };
    MonsterAi.prototype.canWalk = function (point) {
        var pos = this.getJSComponent("Entity").getPosition();
        // See if we are trying to get to ourselves
        if (gl_matrix_1.vec2.dist(point, pos) === 0) {
            return true;
        }
        var level = this.levelController;
        if (!level.isValidPos(point) || level.getTileAt(point).terrainType !== 1 /* floor */) {
            return false;
        }
        var canWalk = true;
        level.iterateEntitiesAt(point, function (entity) {
            if (entity.entityComponent) {
                if (entity.entityComponent.blocksPath) {
                    canWalk = false;
                    return false;
                }
            }
        });
        return canWalk;
    };
    MonsterAi.prototype.setTurnResolver = function (resolver) {
        this.resolveTurn = resolver;
    };
    MonsterAi.prototype.onActionComplete = function () {
        // call the callback, notifying the scheduler that we are done
        if (this.resolveTurn) {
            this.DEBUG("End of turn.");
            this.resolveTurn();
        }
    };
    MonsterAi.prototype.act = function () {
        var _this = this;
        if (!this.chaseEnemy) {
            return;
        }
        this.DEBUG("contemplating action.");
        var entityComponent = this.getJSComponent("Entity");
        var position = entityComponent.getPosition();
        var nearbyEntities = this.levelController.getEntitiesInRadius(position, this.trackingRadius);
        var hero = nearbyEntities.find(function (entity) { return entity.blueprint == "hero"; });
        // no hero in radius..go back to sleep
        if (!hero) {
            return;
        }
        var playerPos = hero.entityComponent.getPosition();
        var astar = new ROT.Path.AStar(playerPos[0], playerPos[1], function (x, y) { return _this.canWalk([x, y]); }, {
            topology: 4
        });
        var path = [];
        astar.compute(position[0], position[1], function (x, y) {
            path.push([x, y]);
        });
        path.shift(); // remove current position
        // TODO ideally we would want to scan the sight radius, but for now we are just going to see if
        // we are in range of the hero
        // get a direction vector
        if (!this.isHunting && path.length < this.sightRadius && path.length > 0) {
            this.isHunting = true;
            this.DEBUG("enemy seen.  switching to hunting.");
        }
        if (this.isHunting && path.length < this.trackingRadius && path.length > 0) {
            this.DEBUG("hunting enemy located " + path.length + " steps away.");
            var target = path.shift();
            var dir = gl_matrix_1.vec2.sub(gl_matrix_1.vec2.create(), target, position);
            gl_matrix_1.vec2.normalize(dir, dir);
            NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTryMove, { offset: [dir[0], dir[1]] });
            // we are returning a 'thenable' which tells the scheduler to not move on to the next actor
            // until this actor has completed.  This is overriding the onTurnTaken event on this class with
            // the callback passed to the then method, which means that when this class gets an onTurnTaken
            // event, it will resolve the then.
            // See: http://ondras.github.io/rot.js/manual/#timing/engine for some more information.
            return {
                then: function (resolve) {
                    _this.setTurnResolver(resolve);
                }
            };
        }
    };
    MonsterAi.prototype.onDie = function (data) {
        this.DEBUG("Killed!");
        this.levelController.deregisterActor(this);
        // if (this.deathEffect) {
        //     gameState.getCurrentLevelRenderer().addVisualEffect(this.deathEffect, this.node.position2D);
        // }
        var entityComponent = this.node.getJSComponent("Entity");
        NodeEvents_1.default.trigger(data.senderComponent.node, Constants_1.ComponentEvents.onLogAction, { message: entityComponent.screenName + " dies." });
        // this.levelController.killEnemy();
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onDestroy);
        Atomic.destroy(this.node);
    };
    MonsterAi.prototype.onAttack = function (data) {
        this.DEBUG("Attacked " + data.targetComponent.node.name);
        NodeEvents_1.default.trigger(data.targetComponent.node, Constants_1.ComponentEvents.onHit, { senderComponent: this });
        // handled in onMoveComplete -- note that this won't work for actors that attack without moving.
        // call onActionComplete since we are done
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onActionComplete, { senderComponent: this });
    };
    MonsterAi.prototype.onBumpInto = function (data) {
        var entityComponent = data.targetComponent.node.getJSComponent("Entity");
        this.DEBUG("Bumped into " + data.targetComponent.node.name);
        // just attack, don't allow for picking up items or other bump actions
        if (entityComponent.attackable) {
            NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onAttack, { targetComponent: data.targetComponent });
        }
    };
    MonsterAi.prototype.onMoveComplete = function () {
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onActionComplete, { senderComponent: this });
    };
    return MonsterAi;
}(CustomJSComponent_1.default));
module.exports = MonsterAi;
