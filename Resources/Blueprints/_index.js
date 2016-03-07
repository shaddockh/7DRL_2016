"use strict";
var atomic_blueprintLib_1 = require("atomic-blueprintLib");
var tiles = require("./Tiles");
function loader(blueprint) {
    console.log("Loading blueprint: " + blueprint);
}
atomic_blueprintLib_1.blueprintCatalog.loadBlueprints(tiles, loader);
// blueprintCatalog.loadBlueprints(entities, loader);
atomic_blueprintLib_1.blueprintCatalog.hydrateAllBlueprints();
