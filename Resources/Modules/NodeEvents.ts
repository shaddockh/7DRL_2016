import metrics from "MetricsGatherer";

module NodeEvents {
    let DEBUG = true;


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
    export function trigger<T extends TriggerAction>(node: Atomic.Node, eventName: string, data?: T): any[] {
        if (DEBUG) {
            metrics.start(eventName);
        }

        let results = [];
        let components = node.getComponents("JSComponent");
        for (var c = 0, cLen = components.length; c < cLen; c++) {
            let component = components[c];

            // Look for the the doAction method and call it if it exists
            if (component && typeof component["doAction"] === "function") {
                let r = component["doAction"](eventName, data);

                // Capture the results
                if (typeof (r) !== "undefined") {
                    results.push(r);
                }
            }
        }

        return results;
    }
}

export default NodeEvents;
