import { EngineObject } from "../engine/environments";
export declare class Logger {
    static colors: {
        red: string;
        green: string;
        yellow: string;
        blue: string;
        reset: string;
    };
    static log(obj: EngineObject, message: string): void;
    static warn(obj: EngineObject, message: string): void;
    static error(obj: EngineObject, message: string): void;
}
