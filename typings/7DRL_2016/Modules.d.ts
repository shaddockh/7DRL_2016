declare module "CustomJSComponent" {
    /**
     * This is a custom version of the JSComponent that adds some helper functions.
     * It could also be handled via extending the JSComponent.prototype, but that seems messy
     */
    export default class CustomJSComponent extends Atomic.JSComponent {
        /**
         * Turn on or off debug for this component
         */
        debug: boolean;

        /**
         * Write a debug message to the console prefixed by the component name
         * @param {string} msg Message to write to the console
         */
        DEBUG(msg: any): void;
    }
}
