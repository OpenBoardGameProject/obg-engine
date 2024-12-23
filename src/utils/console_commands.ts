import { Vector2D } from "../engine/math"
import { Pawn } from "../game_objects/base_objects/pawn"
import { GameManager } from "../managers/game_manager"
import { PrintPositions } from "./board_visualization"


//CONFIG
import test_pawn from '../config/pawn_template.json'
import test_item from '../config/item_template.json'
import test_building from '../config/building_template.json'
import { Color } from "../engine/environments"
import { Item } from "../game_objects/base_objects/item"
import { Building } from "../game_objects/base_objects/building"
import { GameInterface } from "../managers/game_interface"

const WRONG_ARGS_ERROR = {'message' : "Wrong number of arguments", 'is_error' : true}
const COMMAND_OK = {'message' : "Command success", 'is_error' : false}


type CommandCallback = {
    message : string,
    is_error : boolean
}
class ConsoleCommand {

    private __output : CommandCallback = COMMAND_OK
    constructor(public name : string, public minArgs : number, public description : string){
    }

    get output() : CommandCallback{
        return this.__output
    }
    set output(value : CommandCallback){
        this.__output = value
    }


    execute(player : GameInterface,...args : string[]) : ConsoleCommand{
        this.output = COMMAND_OK
        if(args.length < this.minArgs){
            this.output = WRONG_ARGS_ERROR
            return this
        }
        return this;
    }
}


class MoveCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("move", 2, "move src dst  ->  Move object from src to dst")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand{
        if(super.execute(player, ...args).output.is_error)
        return this
    
        const src = Vector2D.from_str(args[0])
        const dst = Vector2D.from_str(args[1])

        if(!player.move(src, dst)){
            this.output = {'message' : "Can't move", 'is_error' : true}
        }
        return this
    }
}

class AttackCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("attack", 2, "attack src dst  ->  Attack from src to dst")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand{
        if(super.execute(player, ...args).output.is_error)
        return this
    
        const src = Vector2D.from_str(args[0])
        const dst = Vector2D.from_str(args[1])

        if(!player.attack(src, dst)){
            this.output = {'message' : "Can't attack", 'is_error' : true}
        }
        return this
    }
}

class PrintCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("print", 1, "print pos ->  Print object at pos \nor print possible moves/attacks (print move/attack pos [range])")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand{
        if(super.execute(player, ...args).output.is_error)
        return this

        const args_length = args.length

        switch(args_length){
            case 2:
                if(args[0] == "move"){
                    PrintPositions(player.board, player.possibleMoves(Vector2D.from_str(args[1]), 1))
                }else if(args[0] == "attack"){
                    PrintPositions(player.board, player.possibleAttacks(Vector2D.from_str(args[1]), 1))
                }
                break;
            case 3:
                if(args[0] == "move"){
                    PrintPositions(player.board, player.possibleMoves(Vector2D.from_str(args[1]), Number(args[2])))
                }else if(args[0] == "attack"){
                    PrintPositions(player.board, player.possibleAttacks(Vector2D.from_str(args[1]), Number(args[2])))
                }
                break;
            case 1:
                if(args[0].includes(',')){
                    const arg = args[0]
                    const src_2 : Vector2D = Vector2D.from_str(arg)
                    console.log(player.tile(src_2).toString())
                }else{
                    switch(args[0]){
                        case 'health' :
                            for(let tile of player.tiles.filter((tile) => tile.object? tile.object instanceof Pawn : false)){
                                console.log(tile.pos.toString() + " : " + (tile.object as Pawn).health.toString())
                            }
                            break;
                        default:
                            this.output = WRONG_ARGS_ERROR
                    }
                }
                break;
        }
        return this
    }
}

class SpawnCommand extends ConsoleCommand{
    constructor(public context : GameManager){
        super("spawn", 2, "spawn pawn pos  ->  Spawn a pawn at pos")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand{
        if(super.execute(player, ...args).output.is_error)
            return this

        const type = args[0]
        const pos = Vector2D.from_str(args[1])
        const color = args.length == 3 ? Color[args[2]] : Color.BLUE
        

        switch(type){
            case 'pawn':
            case 'p':
                this.context.tiles_manager.dev_addpawn(new Pawn(test_pawn, color, this.context), pos)
                break;
            case 'item':
            case 'i':
                this.context.tiles_manager.dev_additem(new Item(test_item, color, this.context), pos)
                break;
            case 'building':
            case 'b':
                this.context.tiles_manager.dev_addbuilding(new Building(test_building, color, this.context), pos)
                break;
            default:
                this.output = {'message' : "Unknown type", 'is_error' : true}
        }
        return this
    }
}

class QuitCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("quit", 0, "quit  ->  Quit the game")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand {
        process.exit(0)
        return this
    }
}

class NewTurn extends ConsoleCommand{
    constructor(context : GameManager){
        super("newturn", 0, "newturn  ->  Start a new turn")
    }

    execute(player : GameInterface, ...args : string[]) : ConsoleCommand {
        player.newTurn()
        return this
    }
}

class HelpCommand extends ConsoleCommand{
    constructor(context : GameManager, public commands : ConsoleCommand[]){
        super("help", 0, "help  ->  Display all commands")
    }

    execute(player: GameInterface, ...args: string[]): ConsoleCommand {
        console.log("------------------")
        console.log("Commands :  ")
        for(let command of this.commands){
            console.log("\x1b[36m" + command.name + "\x1b[0m : " + command.description + "\n")
        }
        console.log("Enter 's' to switch player")
        console.log("------------------")
        return this
    }
}

export {ConsoleCommand, MoveCommand, AttackCommand, PrintCommand, SpawnCommand, QuitCommand, NewTurn, HelpCommand}