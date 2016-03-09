"use strict";
// This script is the main entry point of the game
require("AtomicEventLoop");
require("../Blueprints/_index"); // Load all the blueprints into the catalog
var GameController_1 = require("../Modules/GameController");
// Comment out before trying to play -- it messes with the timers
//nodeBuilder.generatePrefabs();
GameController_1.default.init();
GameController_1.default.showTitleScene();
