export async function commandExplore(state, input) {
    const location = await state.pokeAPI.fetchLocation(input);
    console.log("Nearby Pokemon:");
    for (let encounter of location.pokemon_encounters) {
        console.log(encounter.pokemon.name);
    }
}
