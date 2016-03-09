"use strict";

/**
 * This is a custom version of the JSComponent that adds some helper functions.
 * It could also be handled via extending the JSComponent.prototype, but that seems messy
 */
export default class CustomJSComponent extends Atomic.JSComponent {
    inspectorFields = {
        debug: false
    };

    /**
     * Turn on or off debug for this component
     */
    debug = false;

    private _componentName:string = null;

    /**
     * Write a debug message to the console prefixed by the component name
     * @param {string} msg Message to write to the console
     */
    DEBUG(msg) {
        if (this.debug) {
            if (!this._componentName) {
                this._componentName = Atomic.splitPath(this.componentFile.name).fileName;
            }
            console.log(`${this.node.name}.${this._componentName}: ${msg}`);
        }
    }


    /**
     * Returns a component on this node cast to the appropriate type
     */
    getComponent<T extends Atomic.Component>(componentName:string):T {
        return <T>this.node.getComponent(componentName);
    }

    /**
     * Returns a JSComponent on this node cast to the appropriate type
     */
    getJSComponent<T extends Atomic.JSComponent>(componentName:string):T {
        return <T>this.node.getJSComponent(componentName);
    }

}
