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
import { GameManagerEvents } from "../engine/events";
import { Player } from "../engine/player";

import { player_1, player_2 } from "../engine/config";

class ConsoleView implements GameManagerEvents{
    private rl ;
    __commands : ConsoleCommand[] = []

    current_player : Player

    wrong_args_error = {'message' : "Wrong number of arguments", 'is_error' : true}
    constructor(public game : GameManager){
        
        this.__commands = 
        [
            new MoveCommand(this.game),
            new PrintCommand(this.game),
            new AttackCommand(this.game),
            new QuitCommand(this.game)
        ]

        this.current_player = player_1

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.render()
        this.rl.question("Command > ", (input) => this.processInput(input))

        this.game.subscribe(this)
    }

    public render(){
        PrintBoard(this.game.tiles_manager, this.game.board)
        console.log(`Turn : ${Color[this.game.current_turn]} ; Playing with : ${this.current_player.name}`)
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

        //Check if it's CTRL + S
        if (input === 's') { // '\u0013' is the ASCII control character for CTRL+S
            // Handle CTRL+S action here
            console.log("Switching Player");
            
            this.current_player = this.current_player == player_1 ? player_2 : player_1


            // Then resume listening for user input
            this.render()
            this.rl.question(">", (newInput) => this.processInput(newInput))
            return; // Exit the function early since CTRL+S doesn't need command processing
        }

        //EXECUTE COMMAND
        const cmd = this.get_command(command)
        if(cmd){
            cmd.execute(this.current_player, ...args)
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
    
    onGameEnd(color: Color): void {
        console.log(`Game End : ${Color[color]}`)
        exit(0)
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