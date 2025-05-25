import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log("Your Pokedex:")
    for (let pokemonName in state.pokedex) {
        console.log(` - ${pokemonName}`)
    }
}