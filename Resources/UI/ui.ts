import * as PubSub from "pubsub-js";
import TitleScreen from "./TitleScreen.ui";
import AttributeSelectionScreen from "./AttributeSelection.ui";

const baseUi = new Atomic.UIView();
export function init() {
    TitleScreen.register(baseUi);
    AttributeSelectionScreen.register(baseUi);
}
