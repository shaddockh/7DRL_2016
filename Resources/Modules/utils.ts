export function randomNumber(min = 0, max = -1) {

    let newMax = max,
        newMin = min;
    if (max < min) {
        newMax = min;
        newMin = 0;
    }

    return Math.floor(Math.random() * newMax) + newMin;
}

/**
 * Utility class that encompasses a list of values
 */
export class List<T> {
    elements: T[] = [];

    /**
     * Iterates over the list calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {ListCallback<T>} callback
     */
    iterate(callback: ListCallback<T>) {
        const elements = this.elements;
        for (let i = 0, iend = this.elements.length; i < iend; i++) {
            if (callback(this.elements[i])) {
                return;
            }
        }
    }

    add(element: T): number {
        return this.elements.push(element);
    }

    remove(element: T): T {
        let idx = this.elements.indexOf(element);
        if (idx > -1) {
            this.elements.splice(idx, 1);
        }
        return element;
    }
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

    constructor(width: number, height: number, defaultValue: T) {
        this.width = width;
        this.height = height;
        let arr = [];
        for (let x = 0; x < width; x++) {
            // Create the nested array for the y values
            arr.push([]);
            // Add all the tiles
            for (let y = 0; y < height; y++) {

                //Note: we have to create a copy of the default value for each cell otherwise
                //changing one cell will update all the other cells
                let newCell: GridCell = {
                    x: x,
                    y: y
                };

                for (let p in defaultValue) {
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
    iterate(callback: ListCallback<T>) {
        const grid = this.gridArray;
        for (let x = 0, xend = this.width; x < xend; x++) {
            for (let y = 0, yend = this.height; y < yend; y++) {
                if (callback(grid[x][y])) {
                    return;
                }
            }
        }
    }

    /**
     * Returns whether the provided location is in-bounds
     * @param  {number} x
     * @param  {number} y
     * @return {boolean}
     */
    inBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    /**
     * Get the cell at position or null if out of bounds
     * @param  {number} x
     * @param  {number} y
     * @return {TileData}
     */
    getCell(x: number, y: number): T {
        if (this.inBounds(x, y)) {
            return this.gridArray[x][y];
        }
        return null;
    }
}
