
enum Dir{
    NO_DIR = 0,
    N = 1,
    NE = 2,
    E = 3,
    SE = 4,
    S = 5,
    SW = 6,
    W = 7,
    NW = 8
}

enum Color{
    WHITE = 0,
    RED = 1,
    BLUE = 2,        
    
}

interface EngineObject {
    log_tag?: string;
}

export { Dir , EngineObject, Color};
