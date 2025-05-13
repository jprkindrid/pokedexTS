import { commandExit } from './command_exit.js';
import { commandHelp } from  './command_help.js'
import { cleanInput } from './clean_input.js';
import { State, type CLICommand} from './state.js'


export function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", (input) => {

        let cleanedInput = cleanInput(input)
        if (cleanedInput.length === 0) {
            state.readline.prompt();
        }
        const cmdName = cleanedInput[0]
        const cmd = state.commands[cmdName]

        if (!cmd) {
            console.log(
                `Unknown command: "${cmdName}". Type "help" to get a list of commands.`
            );
        state.readline.prompt()
        return;
        }
        cmd.callback(state);
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
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    
  };
}