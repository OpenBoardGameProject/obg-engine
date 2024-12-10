import { BoardConfig } from "../config/config_types";
import { Board } from "../engine/board";
import { Vector2D, to_coord } from "../engine/math";
import { TilesManager } from "../managers/tiles_managers";
import { Tile } from "../engine/tile";

function PrintPositions(board : Board,pos : Vector2D[], render : (pos : Vector2D, is_pos : boolean) => string = (pos, is_pos) => is_pos ? "[X]" : "[O]"){
    //put some color in the console
    const colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m"];
    const reset = "\x1b[0m";
    const size = board.config.properties.width * board.config.properties.height;
    const width = board.config.properties.width;
    const height = board.config.properties.height;

    //print a board with the positions
    
    let filler : number[] = [];
    filler.length = size;
    filler.fill(0,0,size);

    filler.map((_,i) => {
        pos.forEach((p) => {
            if (board.to_index(p) == i)
                filler[i] = 1;
        });
    });

    //print
    filler.map((_,i) => {
        if (i % width == 0)
            process.stdout.write("\n")
        let color = colors[filler[i]];
        process.stdout.write(color + `${render(board.to_coord(i), filler[i] == 1)}` + reset);
    });
    process.stdout.write("\n")   
}

function PrintBoard(tiles : Tile[], board : Board){
    const size = board.config.properties.width * board.config.properties.height;
    const width = board.config.properties.width;
    const height = board.config.properties.height;

    //print a board with the positions
    const reset_code = "\x1b[0m";
    const color_code : string[] = [
        //white 
        "\x1b[37m",
        //red
        "\x1b[31m",
        //blue
        "\x1b[34m",
    ]
    
    let filler : number[] = [];
    filler.length = size;
    filler.fill(0,0,size);
    filler = filler.map((_,i) => {
        const tile = tiles[i]
        return (tile.has_object ? 1 : 0)
    });


    //print
    filler.map((x,i) => {
        if (i % width == 0)
            process.stdout.write("\n")
        if (x === 1){
            let tile : Tile = tiles[i]
            process.stdout.write(`${color_code[tile.object.color]}[${tile.object.toRepr().padEnd(2," ")}]${reset_code}`);
        }else{
            process.stdout.write("[  ]");
        }
    });
    process.stdout.write("\n")  


}




export { PrintPositions , PrintBoard};