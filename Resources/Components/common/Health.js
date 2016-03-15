"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomJSComponent_1 = require("CustomJSComponent");
var NodeEvents_1 = require("NodeEvents");
var Constants_1 = require("Constants");
var Health = (function (_super) {
    __extends(Health, _super);
    function Health() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false,
            life: 1
        };
        this.life = 1;
    }
    Health.prototype.start = function () {
        this.debug = true;
        this.setActionMap((_a = {},
            _a[Constants_1.ComponentEvents.onHit] = this.onHit.bind(this),
            _a[Constants_1.ComponentEvents.onAdjustHealth] = this.onAdjustHealth.bind(this),
            _a
        ));
        var _a;
    };
    Health.prototype.onHit = function (data) {
        this.life--;
        // send a notification that health has changed
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onHealthChanged);
        this.DEBUG("Life reduced by " + data.senderComponent.node.name + ".  Current Life: " + this.life + " ");
        if (this.life <= 0) {
            // send an onDie message as if it came from the bumper
            NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onDie, { senderComponent: data.senderComponent });
        }
    };
    Health.prototype.onAdjustHealth = function (health) {
        this.life += health;
        NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onHealthChanged);
    };
    return Health;
}(CustomJSComponent_1.default));
module.exports = Health;
