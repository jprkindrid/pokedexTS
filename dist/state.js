import process from 'node:process';
import { createInterface } from 'node:readline';
import { getCommands } from './repl.js';
export function initState() {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });
    const commands = {};
    return {
        readline: readline,
        commands: getCommands()
    };
}
