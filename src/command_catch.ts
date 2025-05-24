import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokemonType.js";

export async function commandCatch(state: State, ...args: string[]) {
    
        if (args.length === 0) {
        throw new Error("You must provide a pokemon name")
    }
    const pokemonName: string = args[0]
    let pokemonToCatch: Pokemon;
    console.log(`Throwing a Pokeball at ${pokemonName}...`)
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
    try {
        const resp =  await fetch(url)
        if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
    }

    pokemonToCatch = await resp.json()
    
    } catch (err) {
        throw new Error(`Error getting pokemon information: ${(err as Error).message}`)
    }

    const baseRate = 0.3; 
    const difficultyFactor = Math.min(pokemonToCatch.base_experience / 300, 1);
    const chance = baseRate * (1 - difficultyFactor) * (1 + Math.random());
    if (chance > .5) {
        state.pokedex[pokemonToCatch.name.toLowerCase()] = pokemonToCatch
        console.log(`${pokemonName} was caught!`)
    } else {
        console.log(`${pokemonName} escaped!`)
    }


}

