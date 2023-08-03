import { GameObject } from "./GameObject";

interface Item extends GameObject{

}

class TestItem implements Item{
    toString(): string {
        return "⚔";
    }
    export(): string {
        return "TI";
    }
}

export { Item, TestItem };