// This script is the main entry point of the game
import "AtomicEventLoop";
import GameController from "../Modules/GameController";
import * as PubSub from "pubsub-js";

GameController.init();
GameController.showTitleScene();
