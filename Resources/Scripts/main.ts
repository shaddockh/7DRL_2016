// This script is the main entry point of the game
import "AtomicEventLoop";
import "../Blueprints/_index"; // Load all the blueprints into the catalog
import GameController from "../Modules/GameController";
import * as PubSub from "pubsub-js";

import {nodeBuilder} from "atomic-blueprintLib";

nodeBuilder.generatePrefabs();

GameController.init();
GameController.showTitleScene();
