import { PokeAPI } from "./pokeapi.js";
export async function commandCatch(state, ...args) {
    if (args.length === 0) {
        throw new Error("You must provide a pokemon name");
    }
    const pokemonName = args[0];
    let pokemonToCatch;
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }
        pokemonToCatch = await resp.json();
    }
    catch (err) {
        throw new Error(`Error getting pokemon information: ${err.message}`);
    }
    const chanceBase = 1 / (pokemonToCatch.base_experience * Math.random());
    const multiplier = 20;
    const chance = multiplier * chanceBase;
    if (chance > .5) {
        state.pokedex[pokemonName] = pokemonToCatch;
        console.log(`${pokemonName} was caught!`);
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
