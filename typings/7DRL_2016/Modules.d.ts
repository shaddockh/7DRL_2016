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
}
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
declare module "GameController" {
    import SceneManager from "SceneManager";
    /**
     * singleton class for game controller
     */
    export default class GameController {
        static sceneManager: SceneManager;
        static init(): void;
        static showTitleScene(): void;
    }
}
declare module "Generators/LevelData" {
    /**
     * Stored Level data for a level
     */
    export default class LevelData {
        tiles: Array<Array<TileData>>;
        width: number;
        height: number;
        constructor(width: number, height: number);
        inBounds(x: any, y: any): boolean;
        setTileTerrain(x: number, y: number, terrainType: TileType): void;
        getTile(x: number, y: number): TileData;
        getNeighborTiles(x: number, y: number, radius?: number): Array<TileData>;
        iterate(callback: (tile: TileData) => void): void;
        static createEmptyMap(width: any, height: any, defaultValue?: {
            terrainType: TileType;
        }): any[];
    }
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
