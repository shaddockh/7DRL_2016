declare module "CustomJSComponent" {
    /**
     * This is a custom version of the JSComponent that adds some helper functions.
     * It could also be handled via extending the JSComponent.prototype, but that seems messy
     */
    export default class CustomJSComponent extends Atomic.JSComponent {
        inspectorFields: {
            debug: boolean;
        };
        /**
         * Turn on or off debug for this component
         */
        debug: boolean;
        private _componentName;
        /**
         * Write a debug message to the console prefixed by the component name
         * @param {string} msg Message to write to the console
         */
        DEBUG(msg: any): void;
        /**
         * Returns a component on this node cast to the appropriate type
         */
        getComponent<T extends Atomic.Component>(componentName: string): T;
        /**
         * Returns a JSComponent on this node cast to the appropriate type
         */
        getJSComponent<T extends Atomic.JSComponent>(componentName: string): T;
    }
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
        addSubscription(key: string, handler: any): void;
        sceneLoaded(message: string, data: SceneActionMessage): void;
        sceneUnloaded(message: string, data: SceneActionMessage): void;
        doSceneAction(message: string, data: SceneActionMessage): void;
        switchScene(sceneKey: string): void;
    }
}
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
declare module "Ui/ui" {
    export function init(): void;
}
declare module "SceneManager" {
    export const Scenes: {
        title: string;
        attributeSel: string;
        intro: string;
    };
    export default class SceneManager {
        static scenes: {
            title: string;
            attributeSel: string;
            intro: string;
        };
        currentScene: Atomic.Scene;
        currentSceneName: string;
        switchToScene(sceneName: string): void;
    }
}
declare module "utils" {
    export function randomNumber(min?: number, max?: number): number;
}
declare module "Generators/LevelData" {
    import { GLM } from "gl-matrix";
    /**
     * Stored Level data for a level
     */
    export default class LevelData {
        tiles: Array<Array<TileData>>;
        entities: Array<EntityData>;
        width: number;
        height: number;
        constructor(width: number, height: number);
        inBounds(x: number, y: number): boolean;
        inBoundsPos(pos: Position2D | GLM.IArray): boolean;
        setTileTerrain(x: number, y: number, terrainType: TileType): void;
        getTile(x: number, y: number): TileData;
        getTilePos(pos: Position2D | GLM.IArray): TileData;
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
        iterateEntitiesAtPos(pos: Position2D | GLM.IArray, callback: ListCallback<EntityData>): void;
        addEntityAtPosition(x: number, y: number, entity: EntityData): void;
        removeEntity(entity: EntityData): void;
        static createEmptyMap(width: any, height: any, defaultValue?: {
            terrainType: TileType;
        }): any[];
    }
}
declare module "GameState" {
    import LevelData from "Generators/LevelData";
    export default class GameState {
        currentLevelData: LevelData;
        init(): void;
    }
}
declare module "GameController" {
    import SceneManager from "SceneManager";
    import GameState from "GameState";
    /**
     * singleton class for game controller
     */
    export default class GameController {
        static sceneManager: SceneManager;
        static gameState: GameState;
        static init(): void;
        static showTitleScene(): void;
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
        debug: boolean;
        constructor(width: number, height: number);
        generate(): LevelData;
        generateWalls(levelData: LevelData): void;
        DEBUG(message: string): void;
    }
}
