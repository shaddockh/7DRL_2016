"use strict";
// This script is the main entry point of the game
require("AtomicEventLoop");
require("../Blueprints/_index"); // Load all the blueprints into the catalog
var GameController_1 = require("../Modules/GameController");
var atomic_blueprintLib_1 = require("atomic-blueprintLib");
atomic_blueprintLib_1.nodeBuilder.generatePrefabs();
GameController_1.default.init();
GameController_1.default.showTitleScene();
