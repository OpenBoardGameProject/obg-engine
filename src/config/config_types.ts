import config_type from "./config_template.json"
import go_type from './gameobject_template.json'
import board_config from "./board_template.json";
import pawn_config from "./pawn_template.json";
import item_config from "./item_template.json"
import building_config from "./building_template.json"

type Config = typeof config_type;
type GameObjectConfig = Config & typeof go_type;
type BoardConfig = Config & typeof board_config;
type PawnConfig = GameObjectConfig & typeof pawn_config;
type ItemConfig = GameObjectConfig & typeof item_config;
type BuildingConfig = GameObjectConfig & typeof building_config;

export {Config, GameObjectConfig,BoardConfig, PawnConfig, ItemConfig, BuildingConfig}