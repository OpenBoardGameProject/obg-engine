export class Vector2D{
    
    
    constructor(public x : number, public y : number){}

    public add(other : Vector2D) : Vector2D{
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    toString(): string{
        return `(${this.x}, ${this.y})`;
    }
    
    equals(other : Vector2D) : boolean{
        return this.x == other.x && this.y == other.y;
    }

    static from_str(str : string) : Vector2D{
        str = str.replace('(', '').replace(')', '');
        let [x, y] = str.split(',').map(x => parseInt(x));
        return new Vector2D(x, y);
    }
    

}

export function to_index(pos : Vector2D, width : number): number
{
    return pos.y * width + pos.x;
}
export function to_coord(index: number, width : number): Vector2D
{
    return new Vector2D(index % width, Math.floor(index / width));
}
