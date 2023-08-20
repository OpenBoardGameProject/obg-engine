import { GameManager } from "../managers/GameManager";
import { ConsoleCommand } from "./ConsoleCommands";
import { Color } from "../engine/environments";
import { GameManagerEvents } from "../engine/events";
import { GameInterface } from "../managers/GameInterface";
declare class ConsoleView implements GameManagerEvents {
    game: GameManager;
    private rl;
    __commands: ConsoleCommand[];
    player_1: GameInterface;
    player_2: GameInterface;
    current_player: GameInterface;
    wrong_args_error: {
        message: string;
        is_error: boolean;
    };
    constructor(game: GameManager);
    render(): void;
    onCommandTrigger(command: string, args: string[]): object;
    get commands(): ConsoleCommand[];
    get_command(command: string): ConsoleCommand;
    private processInput;
    onGameEnd(color: Color): void;
}
declare class DevConsoleView extends ConsoleView {
    game: GameManager;
    constructor(game: GameManager);
}
export { DevConsoleView };
