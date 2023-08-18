import { Vector2D } from "../engine/math"
import { Pawn } from "../game_objects/base_objects/Pawn"
import { GameManager } from "../managers/GameManager"
import { PrintPositions } from "./BoardVisualization"


//CONFIG
import test_pawn from '../config/pawn_template.json'
import test_item from '../config/item_template.json'
import { Color } from "../engine/environments"
import { Item } from "../game_objects/base_objects/Item"
import { Building } from "../game_objects/base_objects/Building"


const WRONG_ARGS_ERROR = {'message' : "Wrong number of arguments", 'is_error' : true}
const COMMAND_OK = {'message' : "Command success", 'is_error' : false}
type CommandCallback = {
    message : string,
    is_error : boolean
}
class ConsoleCommand {

    private __output : CommandCallback = COMMAND_OK
    constructor(public name : string, public minArgs : number, public description : string, public context : GameManager){
    }

    get output() : CommandCallback{
        return this.__output
    }
    set output(value : CommandCallback){
        this.__output = value
    }


    execute(...args : string[]) : ConsoleCommand{
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
        super("move", 2, "move src dst", context)
    }

    execute(...args : string[]) : ConsoleCommand{
        if(super.execute(...args).output.is_error)
        return this
    
        const src = Vector2D.from_str(args[0])
        const dst = Vector2D.from_str(args[1])

        if(!this.context.move(src, dst)){
            this.output = {'message' : "Can't move", 'is_error' : true}
        }
        return this
    }
}

class AttackCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("attack", 2, "attack src dst", context)
    }

    execute(...args : string[]) : ConsoleCommand{
        if(super.execute(...args).output.is_error)
        return this
    
        const src = Vector2D.from_str(args[0])
        const dst = Vector2D.from_str(args[1])

        if(!this.context.attack(src, dst)){
            this.output = {'message' : "Can't attack", 'is_error' : true}
        }
        return this
    }
}

class PrintCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("print", 1, "print", context)
    }

    execute(...args : string[]) : ConsoleCommand{
        if(super.execute(...args).output.is_error)
        return this

        const args_length = args.length

        switch(args_length){
            case 2:
                if(args[0] == "move"){
                    PrintPositions(this.context.board, this.context.tiles_manager.possibleMoves(Vector2D.from_str(args[1]), 1))
                }else if(args[0] == "attack"){
                    PrintPositions(this.context.board, this.context.tiles_manager.possibleAttacks(Vector2D.from_str(args[1]), 1))
                }
                break;
            case 3:
                if(args[0] == "move"){
                    PrintPositions(this.context.board, this.context.tiles_manager.possibleMoves(Vector2D.from_str(args[1]), Number(args[2])))
                }else if(args[0] == "attack"){
                    PrintPositions(this.context.board, this.context.tiles_manager.possibleAttacks(Vector2D.from_str(args[1]), Number(args[2])))
                }
                break;
            case 1:
                if(args[0].includes(',')){
                    const arg = args[0]
                    const src_2 : Vector2D = Vector2D.from_str(arg)
                    console.log(this.context.tiles_manager.tile(src_2).toString())
                }else{
                    switch(args[0]){
                        case 'health' :
                            for(let tile of this.context.tiles_manager.tiles_with_objects((object) => object instanceof Pawn)){
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
    constructor(context : GameManager){
        super("spawn", 2, "spawn pawn pos", context)
    }

    execute(...args : string[]) : ConsoleCommand{
        if(super.execute(...args).output.is_error)
            return this

        const type = args[0]
        const pos = Vector2D.from_str(args[1])
        const color = args.length == 3 ? Color[args[2]] : Color.BLUE
        

        switch(type){
            case 'pawn':
            case 'p':
                this.context.tiles_manager.dev_addpawn(new Pawn(test_pawn, color), pos)
                break;
            case 'item':
            case 'i':
                this.context.tiles_manager.dev_additem(new Item(test_item, color), pos)
                break;
            case 'building':
            case 'b':
                this.context.tiles_manager.dev_addbuilding(new Building({
                    "properties": {
                    },
                    'apparence': {
                        'str' : '🝚 '
                    }
                }, color), pos)
                break;
            default:
                this.output = {'message' : "Unknown type", 'is_error' : true}
        }
        return this
    }
}

class QuitCommand extends ConsoleCommand{
    constructor(context : GameManager){
        super("quit", 0, "quit", context)
    }

    execute(...args : string[]) : ConsoleCommand {
        process.exit(0)
        return this
    }
}

class NewTurn extends ConsoleCommand{
    constructor(context : GameManager){
        super("newturn", 0, "newturn", context)
    }

    execute(...args : string[]) : ConsoleCommand {
        this.context.nextTurn()
        return this
    }
}


export {ConsoleCommand, MoveCommand, AttackCommand, PrintCommand, SpawnCommand, QuitCommand, NewTurn}