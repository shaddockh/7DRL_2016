"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEvents_1 = require("NodeEvents");
var CustomJSComponent_1 = require("CustomJSComponent");
var GameController_1 = require("GameController");
var Constants_1 = require("Constants");
var HeroAi = (function (_super) {
    __extends(HeroAi, _super);
    function HeroAi() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            sightRadius: 10
        };
        this.sightRadius = 10;
        this.resolveTurn = null;
        this.deferredActions = [];
    }
    HeroAi.prototype.start = function () {
        this.setActionMap((_a = {},
            _a[Constants_1.ComponentEvents.onActionComplete] = this.onActionComplete.bind(this),
            _a[Constants_1.ComponentEvents.onTurnTaken] = this.onTurnTaken.bind(this),
            _a[Constants_1.ComponentEvents.onMoveComplete] = this.onMoveComplete.bind(this),
            _a[Constants_1.ComponentEvents.onSkipTurn] = this.onSkipTurn.bind(this),
            _a[Constants_1.ComponentEvents.onDie] = this.onDie.bind(this),
            _a[Constants_1.ComponentEvents.onHit] = this.onHit.bind(this),
            _a[Constants_1.ComponentEvents.onAttack] = this.onAttack.bind(this),
            _a[Constants_1.ComponentEvents.onHandleBump] = this.onHandleBump.bind(this),
            _a[Constants_1.ComponentEvents.onHealthChanged] = this.onHealthChanged.bind(this),
            _a
        ));
        this.DEBUG("Registering self with scheduler");
        var level = GameController_1.default.gameState.currentLevelController;
        this.DEBUG("Level Turns: " + GameController_1.default.gameState.turns);
        for (var x in level) {
            console.log(x);
        }
        for (var x in GameController_1.default.gameState) {
            console.log(x);
        }
        level.registerActor(this);
        // TODO: we need to unlock the engine here for some reason.  It would be better if there were a less invasive way
        level.engine.unlock();
        level.updateFov(this.getPosition(), this.sightRadius);
        var _a;
    };
    /** Pointer to be called when the action is complete.  The complete promise will overwrite this */
    //onActionComplete = null;
    HeroAi.prototype.act = function () {
        var _this = this;
        this.DEBUG("contemplating action.");
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onActionBegin, {
            senderComponent: this
        });
        // we are returning a 'thenable' which tells the scheduler to not move on to the next actor
        // until this actor has completed.  This is overriding the onTurnTaken event on this class with
        // the callback passed to the then method, which means that when this class gets an onTurnTaken
        // event, it will resolve the then.
        // See: http://ondras.github.io/rot.js/manual/#timing/engine for some more information.
        return {
            then: function (resolve) {
                _this.DEBUG("starting action.");
                _this.setTurnResolver(resolve);
            }
        };
    };
    HeroAi.prototype.onActionComplete = function () {
        // call the callback, notifying the scheduler that we are done
        if (this.resolveTurn) {
            this.DEBUG("resolving action");
            this.resolveTurn();
        }
    };
    HeroAi.prototype.setTurnResolver = function (resolver) {
        this.DEBUG("Setting turn resolver");
        this.resolveTurn = resolver;
    };
    HeroAi.prototype.onTurnTaken = function () {
        var _this = this;
        this.deferAction(function () {
            GameController_1.default.gameState.incTurn();
            _this.levelController.updateFov(_this.getPosition());
        });
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onActionComplete, { senderComponent: this });
    };
    HeroAi.prototype.getPosition = function () {
        return this.getJSComponent("Entity").getPosition();
    };
    HeroAi.prototype.deferAction = function (action) {
        this.deferredActions.push(action);
    };
    HeroAi.prototype.update = function () {
        while (this.deferredActions.length) {
            var action = this.deferredActions.pop();
            action();
        }
    };
    // Action Handlers
    HeroAi.prototype.onMoveComplete = function () {
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTurnTaken, { senderComponent: this });
        //gameState.getCurrentLevel().setCameraTarget(this.node);
    };
    HeroAi.prototype.onSkipTurn = function () {
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onLogAction, { message: "Waiting..." });
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onLogAction, { senderComponent: this });
    };
    HeroAi.prototype.onDie = function (data) {
        this.DEBUG("Killed!");
        this.levelController.deregisterActor(this);
        GameController_1.default.gameOver();
    };
    HeroAi.prototype.onHit = function (data) {
        var entityComponent = data.senderComponent.node.getJSComponent("Entity");
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onLogAction, { message: "You are attacked by " + entityComponent.screenName });
    };
    HeroAi.prototype.onAttack = function (data) {
        var entityComponent = data.targetComponent.node.getJSComponent("Entity");
        this.DEBUG("Attacked " + data.targetComponent.node.name);
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onLogAction, { message: "You attack " + entityComponent.screenName });
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onLogAction, { senderComponent: this });
        // move will handle the turn taken
        // TODO: need to clean up the whole turn taking logic somehow, it could get really messy really quickly.
        // triggerEvent.trigger(this.node, 'onTurnTaken', this, this.node);
    };
    HeroAi.prototype.onHandleBump = function (data) {
        var entityComponent = data.targetComponent.node.getJSComponent("Entity");
        if (entityComponent.attackable) {
            NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onAttack, { targetComponent: this });
        }
        else if (entityComponent.bumpable) {
            NodeEvents_1.default.trigger(data.targetComponent.node, Constants_1.ComponentEvents.onBump, { senderComponent: this });
            NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onActionComplete, { senderComponent: this });
        }
    };
    HeroAi.prototype.onHealthChanged = function () {
        GameController_1.default.gameState.updateUi();
    };
    return HeroAi;
}(CustomJSComponent_1.default));
module.exports = HeroAi;
