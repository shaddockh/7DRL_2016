// This script is the main entry point of the game
import "AtomicEventLoop";
import "../Blueprints/_index"; // Load all the blueprints into the catalog
import GameController from "../Modules/GameController";
import * as PubSub from "pubsub-js";

import {nodeBuilder} from "atomic-blueprintLib";

// Comment out before trying to play -- it messes with the timers
//nodeBuilder.generatePrefabs();

GameController.init();
GameController.showTitleScene();
