import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
export function initState(cacheInterval) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        pokedex: {},
        nextLocationsURL: "",
        prevLocationsURL: "",
    };
}
