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


    constructor(public path? : string ){
        if(!path){
            //__filename is the path of the current file we want the ../built-in directory
            this.path = pathObj.join(pathObj.dirname(__filename), '../built-in')
            console.log(this.path)
        }

    }

    import() : ResourceImporter {
        //Get all files name in the directory 'built-in'
        //For each file, import it and add it to the rules array

        const files = fs.readdirSync(this.path)

        files.forEach((file) => {
            const ext = pathObj.extname(file)
            if(ext !== '.js')
                return
            const rule = require(`${this.path}/${file}`).RULE as Rule
            this.__rules[rule.name] = rule
            Logger.log(this, 'Imported rule ' + rule.name)
        })

        return this

    }

    getRule(name : string) : Rule {
        return this.__rules[name]
    }
}