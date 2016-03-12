// This module gives access to the global scope.  In order for certain
// object to not get GC'd , they will need to be registered with the global scope

const global = (new Function("return this")());

global.registeredObjects = {};

module GlobalCache {

    export let debug = true;

    /**
     * Register an object in the global state cache so it's not GC'd
     * @param  {string} name
     * @param {Object} object
     * @returns {T} cached object
     */
    export function cacheObject<T>(name: string, object: T): T {
        if (debug) {
            console.log(`GlobalCache: caching object ${name}`);
        }
        global.registeredObjects[name] = object;
        return object;
    }

    /**
     * Remove an object from the global state cache
     * @param  {string} name
     */
    export function purgeCachedObject<T>(name: string): T {
        if (debug) {
            console.log(`GlobalCache: deleting cached object ${name}`);
        }
        let cached = global.registeredObjects[name];
        delete global.registeredObjects[name];
        return cached;
    }

    /**
     * Get's a named cached object
     * @param  {string} name
     * @return {T}
     */
    export function getCachedObject<T>(name: string): T {
        if (debug) {
            console.log(`GlobalCache: getting cached object ${name}`);
        }
        return global.registeredObjects[name];
    }
}
export default GlobalCache;
