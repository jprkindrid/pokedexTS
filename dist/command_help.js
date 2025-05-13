export function commandHelp(state) {
    const commands = state.commands;
    console.log("Welcome to the Pokedex!");
    console.log("");
    for (let [name, cmd] of Object.entries(commands)) {
        console.log(`${name}: ${cmd.description}`);
    }
}
