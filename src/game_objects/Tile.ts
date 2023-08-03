import { GameObject } from "./GameObject";

class Tile {
    x: number;
    y: number;

    object: GameObject | null;

    constructor(x: number, y: number, object: GameObject | null = null){
        this.x = x;
        this.y = y;
        this.object = object;

    }

    toString(): string{
        if (this.object != null){
            return `[${this.object.toString()}]`;
        }
        return `[ ]`;
    }


    
}



export { Tile };