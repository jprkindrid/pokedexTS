import { commandExit } from './command_exit.js';
import { commandHelp } from  './command_help.js'
import { cleanInput } from './clean_input.js';
import { State, type CLICommand} from './state.js'
import { commandMapBack, commandMapForward } from './command_map.js';
import { commandExplore } from './command_explore.js'
import { commandCatch } from './command_catch.js';

export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {

        let cleanedInput = cleanInput(input)
        if (cleanedInput.length === 0) {
            state.readline.prompt();
        }

        const cmdName = cleanedInput[0]
        const cmdArgs: string[] = cleanedInput.length > 1 ? [...cleanedInput.slice(1)] : [];
        const cmd = state.commands[cmdName]

        if (!cmd) {
            console.log(
                `Unknown command: "${cmdName}". Type "help" to get a list of commands.`
            );
        state.readline.prompt()
        return;
        }
        try {
          await cmd.callback(state, ...cmdArgs);
        } catch (err) {
          console.log((err as Error).message)
        }
        
        state.readline.prompt()
    })

}

export function getCommands(): Record<string, CLICommand> {
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
    explore: {
      name: "explore <location_name>",
      description: "see nearby pokemon at a location",
      callback: commandExplore,
    },

    catch: {
      name: "catch <pokemon_name>",
      description: "attempt to catch a pokemon",
      callback: commandCatch
    }
  };
}