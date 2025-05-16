import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { cleanInput } from './clean_input.js';
import { commandMapBack, commandMapForward } from './command_map.js';
export async function startREPL(state) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        let cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.readline.prompt();
        }
        const cmdName = cleanedInput[0];
        const cmd = state.commands[cmdName];
        if (!cmd) {
            console.log(`Unknown command: "${cmdName}". Type "help" to get a list of commands.`);
            state.readline.prompt();
            return;
        }
        try {
            await cmd.callback(state);
        }
        catch (err) {
            console.log(err.message);
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
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of locations",
            callback: commandMapBack,
        },
    };
}
