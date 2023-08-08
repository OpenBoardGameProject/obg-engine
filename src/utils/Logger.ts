import { EngineObject } from "../engine/environments";

export class Logger {
    static colors = {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        reset: "\x1b[0m"
    }

    public static log(obj : EngineObject, message: string){
        const tag = obj.log_tag ? `[${obj.log_tag}]` : "";
        process.stdout.write(`${Logger.colors.green}${tag} ${message} ${Logger.colors.reset}\n`);
    }
    public static warn(obj : EngineObject, message: string){
        const tag = obj.log_tag ? `[${obj.log_tag}]` : "";
        process.stdout.write(`${Logger.colors.yellow}${tag} ${message}${Logger.colors.reset}\n`);
    }
    public static error(obj : EngineObject, message: string){
        const tag = obj.log_tag ? `[${obj.log_tag}]` : "";
        process.stdout.write(`${Logger.colors.red}${tag} ${message}${Logger.colors.reset}\n`);
    }
    
}