"use strict";
var TitleScreen_ui_1 = require("./TitleScreen.ui");
var AttributeSelection_ui_1 = require("./AttributeSelection.ui");
var baseUi = new Atomic.UIView();
function init() {
    TitleScreen_ui_1.default.register(baseUi);
    AttributeSelection_ui_1.default.register(baseUi);
}
exports.init = init;
