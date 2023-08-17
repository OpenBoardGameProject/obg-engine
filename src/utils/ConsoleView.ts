import { exit } from "process";
import { Vector2D } from "../engine/math";
import { GameManager } from "../managers/GameManager";
import { PrintBoard, PrintPositions } from "./BoardVisualization";
import * as readline from "readline";
import { Pawn } from "../game_objects/Pawn";

//CONFIG
import pawnTestConfig from '../config/pawn_template.json'
import itemTestConfig from '../config/item_template.json'
import { Item } from "../game_objects/Item";

class ConsoleView{
    private rl ;
    wrong_args_error = {'message' : "Wrong number of arguments", 'is_error' : true}
    constructor(public game : GameManager){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.render()
        this.rl.question(">", (input) => this.processInput(input))
    }

    public render(){
        PrintBoard(this.game.tiles_manager, this.game.board)
    }
    public onCommandTrigger(command : string, args : string[]) : object{
        return {'message' : "Command success", 'is_error' : false}
    }

    public baseCommand(command : string, args : string[]) : object{
        switch(command){
            case 'quit':
                exit(0)
            case 'print':
                if(!this.hasCorrectArgs(args,1) && !this.hasCorrectArgs(args,3)){
                    return this.wrong_args_error
                }
                if (args.length == 1 && args[0].includes(',')){
                    const arg = args[0]
                    const src_2 : Vector2D = Vector2D.from_str(arg)
                    console.log(this.game.tiles_manager.tile(src_2).toString())
                    return {'message' : 'Printed', 'is_error' : false}
                }else{
                    switch(args[0]){
                        case 'attack' :
                            PrintPositions(this.game.board, this.game.tiles_manager.possibleAttacks(Vector2D.from_str(args[1]), Number(args[2]) ))
                            break;
                        case 'move' :
                            PrintPositions(this.game.board, this.game.tiles_manager.possibleMoves(Vector2D.from_str(args[1]), Number(args[2]) ))
                            break;
                        case 'health' :
                            for(let tile of this.game.tiles_manager.tiles_with_objects((object) => object instanceof Pawn)){
                                console.log(tile.pos.toString() + " : " + (tile.object as Pawn).health.toString())
                            }
                            break;
                        default:
                            return this.wrong_args_error
                        }
                    return {'message' : 'Printed', 'is_error' : false}
                }
            default:
                return {'nocommand' : true}
        }
        

    }

    hasCorrectArgs(args : string[], correct : number) : boolean{
        return args.length == correct
    }

    private processInput(input : string){

        //RESET CONSOLE
        console.clear()

        let args = input.split(" ");
        let command = args[0];
        args = args.slice(1);
        let output = this.baseCommand(command, args)
        if (output['nocommand'])
            output = this.onCommandTrigger(command, args)
        
        if(output['is_error'])
        {
            console.log("Wrong command : "+output['message'])
        }
        else{
            console.log(output['message'])
        }
        this.render()
        this.rl.question(">", (input) => this.processInput(input))
        
    }
    

}


class DevConsoleView extends ConsoleView{

    move(src : Vector2D, dst : Vector2D){
        if(!this.game.move(src, dst)){
            return {'message' : "Can't move", 'is_error' : true}
        }
        return {'message' : "Moved", 'is_error' : false}
    }

    attack(src : Vector2D, dst : Vector2D){
        if(!this.game.attack(src, dst)){
            return {'message' : "Can't attack", 'is_error' : true}
        }
        return {'message' : "Attacked", 'is_error' : false}
    }


    public override onCommandTrigger(command : string, args : string[]) : object{
        switch(command){
            case "move":
                if(!this.hasCorrectArgs(args,2)){
                    return this.wrong_args_error
                }
                return this.move(Vector2D.from_str(args[0]), Vector2D.from_str(args[1]))
            case 'attack':
                if(!this.hasCorrectArgs(args,2)){
                    return this.wrong_args_error
                }
                return this.attack(Vector2D.from_str(args[0]), Vector2D.from_str(args[1]))
            case 'spawnP':
                if(!this.hasCorrectArgs(args,2)){
                    return this.wrong_args_error
                }
                this.game.tiles_manager.dev_addpawn(new Pawn(pawnTestConfig, Number(args[1])), Vector2D.from_str(args[0]))
                break;
            case 'spawnI':
                if(!this.hasCorrectArgs(args,2)){
                    return this.wrong_args_error
                }
                this.game.tiles_manager.dev_additem(new Item(itemTestConfig, Number(args[1])), Vector2D.from_str(args[0]))
                break;
            case 'custom':
                for (let x = 0; x < this.game.board.config.properties.width; x++){
                    for (let y = 0; y < this.game.board.config.properties.height; y++){
                        PrintPositions(this.game.board, this.game.board.possible_moves(new Vector2D(x,y)))
                    }
                }
                break;
     
            default:
                return {'message' : "Unknown command", 'is_error' : true}
        }

        return super.onCommandTrigger(command, args)
    }


    
}

export {DevConsoleView}