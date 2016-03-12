declare module "Ui/CustomUIWindow" {
    /**
     * wrapper to be used for ui windows.  Will handle loading up the layout and
     * setting some properties.
     */
    export default class CustomUIWindow {
        window: Atomic.UIWindow;
        channelTopics: {};
        layoutFilename: string;
        uiView: Atomic.UIView;
        constructor(uiView: any, layoutFilename: any);
        openWindow(options?: {
            windowSettings: number;
        }): void;
        closeWindow(): void;
    }
}
declare module "Ui/TitleScreen.ui" {
    import CustomUIWindow from "Ui/CustomUIWindow";
    export default class TitleScreenUi extends CustomUIWindow {
        channelTopics: {
            "ui.titlescreen.hide": () => void;
        };
        static register(baseUi: Atomic.UIView): void;
        constructor(uiView: any);
        openWindow(parms?: any): void;
    }
}
declare module "Ui/AttributeSelection.ui" {
    import CustomUIWindow from "Ui/CustomUIWindow";
    export default class AttributeSelectionUi extends CustomUIWindow {
        channelTopics: {
            "ui.attributeselection.hide": () => void;
        };
        static register(baseUi: Atomic.UIView): void;
        constructor(uiView: any);
        openWindow(parms?: any): void;
    }
}
declare module "GlobalCache" {
    module GlobalCache {
        let debug: boolean;
        /**
         * Register an object in the global state cache so it's not GC'd
         * @param  {string} name
         * @param {Object} object
         * @returns {T} cached object
         */
        function cacheObject<T>(name: string, object: T): T;
        /**
         * Remove an object from the global state cache
         * @param  {string} name
         */
        function purgeCachedObject<T>(name: string): T;
        /**
         * Get's a named cached object
         * @param  {string} name
         * @return {T}
         */
        function getCachedObject<T>(name: string): T;
    }
    export default GlobalCache;
}
declare module "Ui/UiController" {
    export class UiControllerType {
        private initialized;
        private baseUi;
        init(): void;
    }
    let uiController: UiControllerType;
    export default uiController;
}
declare module "Constants" {
    export module BroadcastEvents {
        const gameSceneUnloaded: string;
        const gameSceneLoaded: string;
        const gameSceneSwitch: string;
        const gameSceneAction: string;
        const gameLevelLoad: string;
        const gameLevelGenerate: string;
        const uiAttributeSelectionHide: string;
        const uiAttributeSelectionShow: string;
        const uiTitleScreenShow: string;
        const uiTitleScreenHide: string;
    }
    export module ComponentEvents {
        const onTryMove: string;
        const onSkipTurn: string;
        const onLogAction: string;
        const onMoveBlocked: string;
        const onMoveStart: string;
        const onMoveComplete: string;
        const onHandleBump: string;
        const onUpdateFov: string;
        const onDestroy: string;
        const onActionBegin: string;
        const onActionComplete: string;
        const onTurnTaken: string;
        const onDie: string;
        const onHit: string;
        const onAttack: string;
        const onHealthChanged: string;
        const onBump: string;
    }
    export module Scenes {
        const title: string;
        const attributeSel: string;
        const intro: string;
    }
}
declare module "SceneManager" {
    import { Scenes } from "Constants";
    export default class SceneManager {
        static scenes: typeof Scenes;
        currentScene: Atomic.Scene;
        currentSceneName: string;
        switchToScene(sceneName: string): void;
    }
}
declare module "utils" {
    export function randomNumber(min?: number, max?: number): number;
    /**
     * Utility class that encompasses a list of values
     */
    export class List<T> {
        elements: T[];
        /**
         * Iterates over the list calling the provided callback.  If the
         * callback returns true, then iteration is cancelled
         * @param  {ListCallback<T>} callback
         */
        iterate(callback: ListCallback<T>): void;
        /**
         * Seeks a single element in the list and returns it if the callback returns true
         * @param  {ListCallback<T>} callback
         * @return {T}
         */
        find(callback: ListCallback<T>): T;
        add(element: T): number;
        remove(element: T): T;
    }
    export interface GridCell {
        x: number;
        y: number;
    }
    /**
     * Utility class that encompasses a grid of values
     */
    export class Grid<T extends GridCell> {
        gridArray: Array<Array<T>>;
        width: number;
        height: number;
        constructor(width: number, height: number, defaultValue: T);
        /**
         * Iterates over the rows and columns of the grid calling the provided
         * callback.  If the callback returns true, then iteration is cancelled
         * @param  {ListCallback<TileData>} callback
         */
        iterate(callback: ListCallback<T>): void;
        /**
         * Returns whether the provided location is in-bounds
         * @param  {number} x
         * @param  {number} y
         * @return {boolean}
         */
        inBounds(x: number, y: number): boolean;
        /**
         * Get the cell at position or null if out of bounds
         * @param  {number} x
         * @param  {number} y
         * @return {TileData}
         */
        getCell(x: number, y: number): T;
    }
}
declare module "Generators/LevelData" {
    import * as utils from "utils";
    export class EntityList extends utils.List<EntityData> {
    }
    export class TileDataGrid extends utils.Grid<TileData> {
    }
    /**
     * Stored Level data for a level
     */
    export default class LevelData {
        tiles: TileDataGrid;
        entities: EntityList;
        width: number;
        height: number;
        constructor(width: number, height: number);
        inBounds(x: number, y: number): boolean;
        setTileTerrain(x: number, y: number, terrainType: TileType): void;
        getTile(x: number, y: number): TileData;
        getNeighborTiles(x: number, y: number, radius?: number): Array<TileData>;
        isEntityAt(x: number, y: number): boolean;
        isEmpty(x: number, y: number): boolean;
        getRandomEmptyPosition(): Position2D;
        /**
         * Iterates over the list of tiles calling the provided callback.  If the
         * callback returns true, then iteration is cancelled
         * @param  {TileData} callback
         * @return {[type]}
         */
        iterateTiles(callback: ListCallback<TileData>): void;
        /**
         * Iterates over the list of entities calling the provided callback.  If the
         * callback returns true, then iteration is cancelled
         * @param  {TileData} callback
         * @return {[type]}
         */
        iterateEntities(callback: ListCallback<EntityData>): void;
        iterateEntitiesAt(x: number, y: number, callback: ListCallback<EntityData>): void;
        addEntityAtPosition(position: Position2D, entity: EntityData): void;
        addEntityBlueprintAtPosition(position: Position2D, blueprint: string): void;
        removeEntity(entity: EntityData): EntityData;
    }
}
declare module "LevelController" {
    import { default as LevelData, EntityList } from "Generators/LevelData";
    import { GLM } from "gl-matrix";
    import * as ROT from "rot";
    export default class LevelController {
        private levelData;
        /** ROT scheduler */
        private scheduler;
        /** ROT engine */
        engine: ROT.Engine;
        constructor(levelData: LevelData);
        start(): void;
        registerActor(ai: ROT.Actionable): void;
        deregisterActor(ai: ROT.Actionable): void;
        updateFov(position: Position2D, radius?: number): void;
        getTileAt(pos: Position2D | GLM.IArray): TileData;
        isValidPos(pos: Position2D | GLM.IArray): boolean;
        getEntitiesAt(pos: Position2D | GLM.IArray): EntityList;
        getEntitiesInRadius(pos: Position2D | GLM.IArray, radius: number): EntityList;
        iterateEntitiesAt(pos: Position2D | GLM.IArray, callback: (element: EntityData) => boolean | void): void;
    }
}
declare module "GameState" {
    import LevelController from "LevelController";
    export default class GameState {
        currentLevelController: LevelController;
        turns: number;
        init(): void;
        incTurn(): void;
        updateUi(): void;
    }
}
declare module "GameController" {
    import SceneManager from "SceneManager";
    import GameState from "GameState";
    /**
     * singleton class for game controller
     */
    export class GameControllerType {
        private initialized;
        sceneManager: SceneManager;
        gameState: GameState;
        init(): void;
        showTitleScene(): void;
        gameOver(): void;
    }
    let controller: GameControllerType;
    export default controller;
}
declare module "CustomJSComponent" {
    import LevelController from "LevelController";
    /**
     * This is a custom version of the JSComponent that adds some helper functions.
     * It could also be handled via extending the JSComponent.prototype, but that seems messy
     */
    export default class CustomJSComponent extends Atomic.JSComponent implements ComponentActionListener {
        inspectorFields: {
            debug: boolean;
        };
        /**
         * Turn on or off debug for this component
         */
        debug: boolean;
        private _componentName;
        actionMap: {};
        /**
         * Write a debug message to the console prefixed by the component name
         * @param {string} msg Message to write to the console
         */
        DEBUG(msg: any): void;
        levelController: LevelController;
        /**
         * Returns a component on this node cast to the appropriate type
         */
        getComponent<T extends Atomic.Component>(componentName: string): T;
        /**
         * Returns a JSComponent on this node cast to the appropriate type
         */
        getJSComponent<T extends Atomic.JSComponent>(componentName: string): T;
        setActionMap(actionMap: any): void;
        doAction(message: string, data: any): void;
    }
}
declare module "BaseSceneController" {
    import CustomJSComponent from "CustomJSComponent";
    export default class BaseSceneController extends CustomJSComponent {
        inspectorFields: {
            debug: boolean;
        };
        private subscriptionTokens;
        constructor();
        start(): void;
        addSubscription(key: string, handler: any): void;
        sceneLoaded(message: string, data: SceneActionMessage): void;
        sceneUnloaded(message: string, data: SceneActionMessage): void;
        doSceneAction(message: string, data: SceneActionMessage): void;
        switchScene(sceneKey: string): void;
    }
}
declare module "MetricsGatherer" {
    module MetricsGatherer {
        function start(name: any): void;
        function stop(name: any): void;
        function dumpMetrics(name: any): void;
    }
    export default MetricsGatherer;
}
declare module "NodeEvents" {
    module NodeEvents {
        /**
         * Calling this will walk the components in the provided node and if the component has the eventName as function
         * on it, will call it.  Ideally, this will be replaced by the native Atomic sendEvent/subscribeToEvent, but this works for now.
         * Additionally, if a component has a function called "onAny", that will be called with the event name
         * @method
         * @param {Node} node the node to trigger the event on
         * @param {string} eventName the name of the event to call
         * @param {Any} args arguments to pass on through to the event handler
         * @return {Array} an array of all the results, if there are any, otherwise an empty array
         */
        function trigger<T extends TriggerAction>(node: Atomic.Node, eventName: string, data?: T): any[];
    }
    export default NodeEvents;
}
declare module "Generators/DefaultGenerator" {
    import LevelData from "Generators/LevelData";
    export default class DefaultGenerator {
        private width;
        private height;
        private debug;
        constructor(width: number, height: number, debug: any);
        generate(): LevelData;
        generateWalls(levelData: LevelData): void;
        generateCreatures(levelData: LevelData): void;
        DEBUG(message: string): void;
    }
}
