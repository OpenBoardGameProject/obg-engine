interface Point {
    x: number;
    y: number;
}
export declare class Vector2D implements Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(other: Vector2D): Vector2D;
    toString(): string;
    equals(other: Vector2D): boolean;
    clone(): Vector2D;
    static from_str(str: string): Vector2D;
}
export declare function to_index(pos: Vector2D, width: number): number;
export declare function to_coord(index: number, width: number): Vector2D;
export {};
