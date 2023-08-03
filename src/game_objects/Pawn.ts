import { GameObject } from "./GameObject";
import { TestItem, Item } from "./Item";

interface Pawn extends GameObject{
    move_matrix(): number[][];
    item: Item | null;

}

class TestPawn implements Pawn{

    item: Item | null = new TestItem();

    move_matrix(): number[][] {
        return [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    }

    toString(): string {
        const p = "♟";
        if (this.item != null){
            return p+this.item.toString();
        }
        return p;
    }
}


export { Pawn, TestPawn };