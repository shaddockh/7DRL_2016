"use strict";
var MetricsGatherer_1 = require("MetricsGatherer");
var NodeEvents;
(function (NodeEvents) {
    var DEBUG = true;
    /**
     * Calling this will walk the components in the provided node and if the component has the eventName as function
     * on it, will call it.  Ideally, this will be replaced by the native Atomic sendEvent/subscribeToEvent, but this works for now.
     * Additionally, if a component has a function called "onAny", that will be called with the event name
     * @method
     * @param {Node} node the node to trigger the event on
     * @param {string} eventName the name of the event to call
     * @param {Any} args arguments to pass on through to the event handler
     * @return {Array} an array of all the results, if there are any, otherwise an empty array
     */
    function trigger(node, eventName, data) {
        if (DEBUG) {
            MetricsGatherer_1.default.start(eventName);
        }
        var results = [];
        var components = node.getComponents("JSComponent");
        var _loop_1 = function() {
            var component = components[c];
            // Look for the the doAction method and call it if it exists
            if (component && typeof component["doAction"] === "function") {
                setImmediate(function () {
                    component["doAction"].apply(component, [eventName, data]);
                });
            }
        };
        for (var c = 0, cLen = components.length; c < cLen; c++) {
            _loop_1();
        }
    }
    NodeEvents.trigger = trigger;
    /**
     * Calling this will walk the components in the provided node and if the component has the eventName as function
     * on it, will call it.  Ideally, this will be replaced by the native Atomic sendEvent/subscribeToEvent, but this works for now.
     * Additionally, if a component has a function called "onAny", that will be called with the event name
     * @method
     * @param {Node} node the node to trigger the event on
     * @param {string} eventName the name of the event to call
     * @param {Any} args arguments to pass on through to the event handler
     * @return {Array} an array of all the results, if there are any, otherwise an empty array
     */
    function triggerSync(node, eventName, data) {
        if (DEBUG) {
            MetricsGatherer_1.default.start(eventName);
        }
        var results = [];
        var components = node.getComponents("JSComponent");
        for (var c = 0, cLen = components.length; c < cLen; c++) {
            var component = components[c];
            // Look for the the doAction method and call it if it exists
            if (component && typeof component["doAction"] === "function") {
                var r = component["doAction"].apply(component, [eventName, data]);
                // Capture the results
                if (typeof (r) !== "undefined") {
                    results.push(r);
                }
            }
        }
        return results;
    }
    NodeEvents.triggerSync = triggerSync;
})(NodeEvents || (NodeEvents = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeEvents;
