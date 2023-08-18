import { exit } from "process";
import { Vector2D } from "../engine/math";
import { GameManager } from "../managers/GameManager";
import { PrintBoard, PrintPositions } from "./BoardVisualization";
import * as readline from "readline";
import { Pawn } from "../game_objects/base_objects/Pawn";

//CONFIG
import pawnTestConfig from '../config/pawn_template.json'
import itemTestConfig from '../config/item_template.json'
import { Item } from "../game_objects/base_objects/Item";
import { AttackCommand, ConsoleCommand, MoveCommand, NewTurn, PrintCommand, QuitCommand, SpawnCommand } from "./ConsoleCommands";
import { Color } from "../engine/environments";



class ConsoleView{
    private rl ;
    __commands : ConsoleCommand[] = []


    wrong_args_error = {'message' : "Wrong number of arguments", 'is_error' : true}
    constructor(public game : GameManager){
        this.__commands = 
        [
            new MoveCommand(this.game),
            new PrintCommand(this.game),
            new AttackCommand(this.game),
            new QuitCommand(this.game)
        ]

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.render()
        this.rl.question(">", (input) => this.processInput(input))
    }

    public render(){
        PrintBoard(this.game.tiles_manager, this.game.board)
        console.log(`Turn : ${Color[this.game.current_turn]}`)
    }
    public onCommandTrigger(command : string, args : string[]) : object{
        return {'message' : "Command success", 'is_error' : false}
    }

    get commands() : ConsoleCommand[]{
        return this.__commands
    }

    public get_command(command : string) : ConsoleCommand{
        return this.commands.find((cmd) => cmd.name == command)
    }

    private processInput(input : string){

        //RESET CONSOLE
        if(process.env.AUTO_CLEAR)
            console.clear()

        //PARSE INPUT
        const input_split = input.split(" ")
        const command = input_split[0]
        const args = input_split.slice(1)

        //EXECUTE COMMAND
        const cmd = this.get_command(command)
        if(cmd){
            cmd.execute(...args)
            if(cmd.output.is_error)
                console.error(cmd.output.message)
            else
                console.log(cmd.output.message)
        }
        else{
            console.error("Command not found")
        }

    
        this.render()
        this.rl.question(">", (input) => this.processInput(input))
        
    }
    

}


class DevConsoleView extends ConsoleView{

    constructor(public game : GameManager){
        super(game)
        this.__commands.push(new SpawnCommand(this.game))
        this.__commands.push(new NewTurn(this.game))
    }
    
}

export {DevConsoleView}