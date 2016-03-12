import * as PubSub from "pubsub-js";
import TitleScreen from "./TitleScreen.ui";
import AttributeSelectionScreen from "./AttributeSelection.ui";
import GlobalCache from "GlobalCache";


export class UiControllerType {
    private initialized = false;
    private baseUi : Atomic.UIView = null;
    init() {
        if (!this.initialized) {
            this.baseUi = new Atomic.UIView();
            console.log("initialize UiController");
            TitleScreen.register(this.baseUi);
            AttributeSelectionScreen.register(this.baseUi);
        }
    }
}

let uiController = GlobalCache.getCachedObject<UiControllerType>("UiController") || GlobalCache.cacheObject("UiController", new UiControllerType());
export default uiController;
