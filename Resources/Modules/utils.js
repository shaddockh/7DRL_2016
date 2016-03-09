"use strict";
function randomNumber(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = -1; }
    var newMax = max, newMin = min;
    if (max < min) {
        newMax = min;
        newMin = 0;
    }
    return Math.floor(Math.random() * newMax) + newMin;
}
exports.randomNumber = randomNumber;
