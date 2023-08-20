import { GameManager } from "../managers/GameManager";
import { GameInterface } from "../managers/GameInterface";
type CommandCallback = {
    message: string;
    is_error: boolean;
};
declare class ConsoleCommand {
    name: string;
    minArgs: number;
    description: string;
    private __output;
    constructor(name: string, minArgs: number, description: string);
    get output(): CommandCallback;
    set output(value: CommandCallback);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class MoveCommand extends ConsoleCommand {
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class AttackCommand extends ConsoleCommand {
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class PrintCommand extends ConsoleCommand {
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class SpawnCommand extends ConsoleCommand {
    context: GameManager;
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class QuitCommand extends ConsoleCommand {
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
declare class NewTurn extends ConsoleCommand {
    constructor(context: GameManager);
    execute(player: GameInterface, ...args: string[]): ConsoleCommand;
}
export { ConsoleCommand, MoveCommand, AttackCommand, PrintCommand, SpawnCommand, QuitCommand, NewTurn };
