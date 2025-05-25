export async function commandPokedex(state) {
    console.log("Your Pokedex:");
    for (let pokemonName in state.pokedex) {
        console.log(` - ${pokemonName}`);
    }
}
