import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokemonType.js";
import { stringify } from "querystring";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokedex: Record<string, Pokemon>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(cacheInterval: number) {
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
