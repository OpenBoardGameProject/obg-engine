interface Point {
    x: number;
    y: number;
}

export class Vector2D implements Point{
    public x : number;
    public y : number;

    constructor(x : number,y : number){
        this.x = x;
        this.y = y;
    }

    public add(other : Vector2D) : Vector2D{
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    toString(): string{
        return `(${this.x}, ${this.y})`;
    }
    
    equals(other : Vector2D) : boolean{
        return this.x == other.x && this.y == other.y;
    }

    clone() : Vector2D{
        return new Vector2D(this.x, this.y);
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
