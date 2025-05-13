import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { cleanInput } from './clean_input.js';
export function startREPL(state) {
    state.commands = getCommands();
    state.readline.prompt();
    state.readline.on("line", (input) => {
        if (input === "") {
            state.readline.prompt();
        }
        let cleanedInput = cleanInput(input);
        switch (cleanedInput[0]) {
            case "exit": commandExit();
            case "help": commandHelp(state);
            default: console.log("invalid command");
        }
        state.readline.prompt();
    });
}
export function getCommands() {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
    };
}
