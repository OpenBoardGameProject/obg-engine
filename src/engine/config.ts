import * as dotenv from "dotenv";
import { Color } from "./environments";
import { Player } from "./player";
import { ResourceImporter } from "./resource_importer";


export const player_1 = new Player(Color.BLUE, 'Blue Player')
export const player_2 = new Player(Color.RED, 'Red Player')

dotenv.config({path : '.env.dev'});



export const RESOURCE : ResourceImporter = new ResourceImporter(process.env.RULE_DIR, process.env.CONFIG_DIR).import()

