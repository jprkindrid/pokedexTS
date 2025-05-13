import process from 'node:process'
import { createInterface, type Interface } from 'node:readline';


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > '
});

    const commands: Record<string, CLICommand> = {};
    
return {readline, commands};

}