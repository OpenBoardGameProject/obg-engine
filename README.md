# Open Board Game Project Engine
- [Open Board Game Project Engine](#open-board-game-project-engine)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Install dependencies](#install-dependencies)
- [Usage](#usage)
- [Start customizing the game](#start-customizing-the-game)
- [Documentation](#documentation)
- [Contributing](#contributing)


>This is the base engine of the game, providing the core engine of the game, dealing with board definitions, 
game state management, all game object, the game loop etc...

# Installation

### Prerequisites
- node.js and npm are required to run this project.
- clone the repository to your local machine.
- navigate to the project directory.

### Install dependencies
```bash
npm install
```

# Usage

Without the client application, the engine can still be run in the terminal for testing purposes (or for fun in the terminal).

```bash
npm run build
npm start (optional)dev 
```

> Note: The `dev` flag is optional and will run the engine in development mode, you can spawn objects and other cheats.

You will find a board in the terminal you can play with commands, you can type `help` to see the available commands.

# Start customizing the game

One of the main aspects of this project is to allow you to create your own board games. Indeed you can find default test game objects definitions in the `config` folder. You can also create your own game objects definitions. Moreover, by default the board is following a built-in `dev_rule` (in `src/built-in/dev_rule.ts`), you can create your own rule and add it to the game (or modify the existing one).

# Documentation

The documentation is still a work in progress. For now you can check the codebase for more information.

# Contributing

The core of this open source project is open for contributions, feel free to fork the project and submit a pull request, report issues or suggest new features.

If you want to be more involved in the project, please contact me at, we will discuss about it and I will add you to the project as a contributor.

You can chat, talk about the project, ask questions, suggest features, etc... on the reddit community: [r/openboardgame](https://www.reddit.com/r/openboardgame/)

