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
    const difficultyFactor = pokemonToCatch.base_experience / 300;
    const randomFactor = 0.5 + (Math.random() * 0.5); // Random multiplier between 0.5-1.0
    const chance = (1 - difficultyFactor) * randomFactor;
    if (chance > 0.4) { // Lower threshold for more catches
        state.pokedex[pokemonToCatch.name.toLowerCase()] = pokemonToCatch;
        console.log(`${pokemonName} was caught!`);
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
