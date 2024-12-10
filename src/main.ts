import { BoardConfig } from "./config/config_types";
import { RESOURCE } from "./engine/config";
import { GameManager } from "./managers/GameManager";
import { DevConsoleView, ConsoleView } from "./utils/ConsoleView";


var console_type = process.argv.length < 2 ?  'regular' : process.argv[2]
const gameManager = new GameManager(RESOURCE.getRule('dev_rule'), RESOURCE.getConfig('template_board') as BoardConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
if (console_type == 'dev'){
    const consoleView = new DevConsoleView(gameManager);
}else{
    const consoleView = new ConsoleView(gameManager);
}

