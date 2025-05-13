import process from 'node:process';
import { createInterface } from 'node:readline';
export function initState() {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });
    const commands = {};
    return { readline, commands };
}
