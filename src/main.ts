import { BoardConfig } from "./config/config_types";
import { RESOURCE } from "./engine/config";
import { GameManager } from "./managers/GameManager";
import { DevConsoleView } from "./utils/ConsoleView";


const gameManager = new GameManager(RESOURCE.getRule('dev_rule'), RESOURCE.getConfig('template_board') as BoardConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const consoleView = new DevConsoleView(gameManager);

