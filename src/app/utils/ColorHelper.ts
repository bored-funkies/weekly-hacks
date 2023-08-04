import { getRandomColor } from "./colors";

export default class ColorHelper {

    usedColorCache: { [key: string]: string };

    constructor() {
        this.usedColorCache = {};
    }

    getColor(label: string, useCache: boolean = true) {
        if (useCache && this.usedColorCache[label] !== undefined) {
            return this.usedColorCache[label];
        }
        else {
            let color = getRandomColor();
            this.usedColorCache[label] = color;
            return color;
        }
    }

}