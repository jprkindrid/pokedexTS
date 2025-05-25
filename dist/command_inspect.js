export async function commandInspect(state, ...args) {
    if (args.length === 0) {
        throw new Error("You must provide a location");
    }
    const name = args[0];
    const pokemon = state.pokedex[name];
    if (!pokemon) {
        throw new Error(`You have not caught ${name}`);
    }
    console.log("Name:", pokemon.name);
    console.log("Height:", pokemon.height);
    console.log("Weight:", pokemon.weight);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const types of pokemon.types) {
        console.log("  -", types.type.name);
    }
}
