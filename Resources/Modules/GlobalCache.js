// This module gives access to the global scope.  In order for certain
// object to not get GC'd , they will need to be registered with the global scope
"use strict";
var global = (new Function("return this")());
global.registeredObjects = {};
var GlobalCache;
(function (GlobalCache) {
    GlobalCache.debug = true;
    /**
     * Register an object in the global state cache so it's not GC'd
     * @param  {string} name
     * @param {Object} object
     * @returns {T} cached object
     */
    function cacheObject(name, object) {
        if (GlobalCache.debug) {
            console.log("GlobalCache: caching object " + name);
        }
        global.registeredObjects[name] = object;
        return object;
    }
    GlobalCache.cacheObject = cacheObject;
    /**
     * Remove an object from the global state cache
     * @param  {string} name
     */
    function purgeCachedObject(name) {
        if (GlobalCache.debug) {
            console.log("GlobalCache: deleting cached object " + name);
        }
        var cached = global.registeredObjects[name];
        delete global.registeredObjects[name];
        return cached;
    }
    GlobalCache.purgeCachedObject = purgeCachedObject;
    /**
     * Get's a named cached object
     * @param  {string} name
     * @return {T}
     */
    function getCachedObject(name) {
        if (GlobalCache.debug) {
            console.log("GlobalCache: getting cached object " + name);
        }
        return global.registeredObjects[name];
    }
    GlobalCache.getCachedObject = getCachedObject;
})(GlobalCache || (GlobalCache = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalCache;
