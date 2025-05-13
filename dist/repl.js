import process from 'node:process';
import readline from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
export function cleanInput(input) {
    if (input === "") {
        return [];
    }
    const lower = input.toLowerCase();
    const trimmed = lower.trim();
    const split = trimmed.split(" ");
    const result = split.filter((word) => word !== "");
    return result;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > '
});
export function startREPL() {
    rl.prompt();
    rl.on("line", (input) => {
        if (input === "") {
            rl.prompt();
        }
        let cleanedInput = cleanInput(input);
        switch (cleanedInput[0]) {
            case "exit": commandExit();
            case "help": commandHelp();
        }
        rl.prompt();
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
