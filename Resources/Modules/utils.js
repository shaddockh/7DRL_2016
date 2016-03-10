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
/**
 * Utility class that encompasses a list of values
 */
var List = (function () {
    function List() {
        this.elements = [];
    }
    /**
     * Iterates over the list calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {ListCallback<T>} callback
     */
    List.prototype.iterate = function (callback) {
        var elements = this.elements;
        for (var i = 0, iend = this.elements.length; i < iend; i++) {
            if (callback(this.elements[i])) {
                return;
            }
        }
    };
    List.prototype.add = function (element) {
        return this.elements.push(element);
    };
    List.prototype.remove = function (element) {
        var idx = this.elements.indexOf(element);
        if (idx > -1) {
            this.elements.splice(idx, 1);
        }
        return element;
    };
    return List;
}());
exports.List = List;
/**
 * Utility class that encompasses a grid of values
 */
var Grid = (function () {
    function Grid(width, height, defaultValue) {
        this.width = width;
        this.height = height;
        var arr = [];
        for (var x = 0; x < width; x++) {
            // Create the nested array for the y values
            arr.push([]);
            // Add all the tiles
            for (var y = 0; y < height; y++) {
                //Note: we have to create a copy of the default value for each cell otherwise
                //changing one cell will update all the other cells
                var newCell = {
                    x: x,
                    y: y
                };
                for (var p in defaultValue) {
                    newCell[p] = defaultValue[p];
                }
                newCell.x = x;
                newCell.y = y;
                arr[x].push(newCell);
            }
        }
        this.gridArray = arr;
    }
    /**
     * Iterates over the rows and columns of the grid calling the provided
     * callback.  If the callback returns true, then iteration is cancelled
     * @param  {ListCallback<TileData>} callback
     */
    Grid.prototype.iterate = function (callback) {
        var grid = this.gridArray;
        for (var x = 0, xend = this.width; x < xend; x++) {
            for (var y = 0, yend = this.height; y < yend; y++) {
                if (callback(grid[x][y])) {
                    return;
                }
            }
        }
    };
    /**
     * Returns whether the provided location is in-bounds
     * @param  {number} x
     * @param  {number} y
     * @return {boolean}
     */
    Grid.prototype.inBounds = function (x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    };
    /**
     * Get the cell at position or null if out of bounds
     * @param  {number} x
     * @param  {number} y
     * @return {TileData}
     */
    Grid.prototype.getCell = function (x, y) {
        if (this.inBounds(x, y)) {
            return this.gridArray[x][y];
        }
        return null;
    };
    return Grid;
}());
exports.Grid = Grid;
