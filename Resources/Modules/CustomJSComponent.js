"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameController_1 = require("GameController");
/**
 * This is a custom version of the JSComponent that adds some helper functions.
 * It could also be handled via extending the JSComponent.prototype, but that seems messy
 */
var CustomJSComponent = (function (_super) {
    __extends(CustomJSComponent, _super);
    function CustomJSComponent() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false
        };
        /**
         * Turn on or off debug for this component
         */
        this.debug = true;
        this._componentName = null;
        this.actionMap = {};
    }
    /**
     * Write a debug message to the console prefixed by the component name
     * @param {string} msg Message to write to the console
     */
    CustomJSComponent.prototype.DEBUG = function (msg) {
        if (this.debug) {
            if (!this._componentName) {
                this._componentName = Atomic.splitPath(this.componentFile.name).fileName;
            }
            console.log(this.node.name + "." + this._componentName + ": " + msg);
        }
    };
    Object.defineProperty(CustomJSComponent.prototype, "levelController", {
        get: function () {
            return GameController_1.default.gameState.currentLevelController;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a component on this node cast to the appropriate type
     */
    CustomJSComponent.prototype.getComponent = function (componentName) {
        return this.node.getComponent(componentName);
    };
    /**
     * Returns a JSComponent on this node cast to the appropriate type
     */
    CustomJSComponent.prototype.getJSComponent = function (componentName) {
        return this.node.getJSComponent(componentName);
    };
    CustomJSComponent.prototype.setActionMap = function (actionMap) {
        for (var event_1 in actionMap) {
            this.actionMap[event_1] = actionMap[event_1];
        }
    };
    CustomJSComponent.prototype.doAction = function (message, data) {
        var handler = this.actionMap[message];
        if (handler) {
            handler(data);
        }
    };
    return CustomJSComponent;
}(Atomic.JSComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomJSComponent;
