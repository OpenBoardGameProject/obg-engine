import { Config } from "../config/config_types";
import { Logger } from "../utils/Logger";
import { EngineObject, Rule } from "./environments";
import * as fs from 'fs';
import * as pathObj from 'path';
export class ResourceImporter implements EngineObject
{
    log_tag?: string = "IMPORTER";
    __rules : {
        [key : string] : Rule
    } = {}


    __objects_config : {
        [key : string] : Config
    } = {}


    constructor(public path? : string, public config_path? : string){
        if(!path){
            //__filename is the path of the current file we want the ../built-in directory
            this.path = pathObj.join(pathObj.dirname(__filename), '../built-in')
            console.log(this.path)
        }else
            this.path = pathObj.resolve(path)
        if(!config_path){
            //get the root directory of the project
            this.config_path = pathObj.resolve('./config')
        }else
            this.config_path = pathObj.resolve(config_path)
    }

    private import_config(){
        const files = fs.readdirSync(this.config_path)
        files.forEach((file) => {
            const ext = pathObj.extname(file)
            if(ext !== '.json')
                return

            const config : Config = require(`${this.config_path}/${file}`)
            this.__objects_config[config.id] = config
        })
    }

    private import_rule(){
        const files = fs.readdirSync(this.path)

        files.forEach((file) => {
            const ext = pathObj.extname(file)
            if(ext !== '.js')
                return
            const rule = require(`${this.path}/${file}`).RULE as Rule
            this.__rules[rule.name] = rule
        })
    }

    import() : ResourceImporter {
        //Get all files name in the directory 'built-in's
        //For each file, import it and add it to the rules array

        this.import_rule()
        this.import_config()

        Logger.log(this, `-----------Resource Importer-----------`)
        Logger.log(this, `TOTAL : `)
        Logger.log(this, `Rules : ${this.rules.length} rules imported`)
        Logger.log(this, `Config : ${Object.keys(this.__objects_config).length} config imported`)
        Logger.log(this, `---------------------------------------`)
        return this

    }

    getRule(name : string) : Rule {
        return this.__rules[name]
    }
    getConfig(name : string) : Config {
        return this.__objects_config[name]
    }

    get rules() : string[] {
        return Object.keys(this.__rules)
    }

    get config() : string[] {
        return Object.keys(this.__objects_config)
    }

}