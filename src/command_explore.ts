import { StatementSync } from "node:sqlite"
import { State } from "./state.js"
import { PokeAPI } from "./pokeapi.js"

export async function commandExplore(state: State, args: string) {
    if (args.length === 0) {
        throw new Error("You must provide a location")
    }
    const name = args[0]
    const location = await state.pokeAPI.fetchLocation(name)
    console.log("Nearby Pokemon:")
    for (let encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`)
    }
    
}