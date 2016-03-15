"use strict";
// This script is the main entry point of the game
require("AtomicEventLoop");
require("../Blueprints/_index"); // Load all the blueprints into the catalog
var GameController_1 = require("../Modules/GameController");
var atomic_blueprintLib_1 = require("atomic-blueprintLib");
var Constants_1 = require("Constants");
function main(buildEntities) {
    if (buildEntities) {
        atomic_blueprintLib_1.nodeBuilder.generatePrefabs();
        console.log("----------------------------");
        console.log("Prefabs have been generated.");
        console.log("----------------------------");
        Atomic.ui.requestExit();
    }
    else {
        GameController_1.default.init();
        GameController_1.default.sceneManager.switchToScene(Constants_1.Scenes.title);
    }
}
main(false);
