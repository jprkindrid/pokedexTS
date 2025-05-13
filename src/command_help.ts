import { getCommands } from "./repl.js"

export function commandHelp() {
    const commands = getCommands()
    console.log("Welcome to the Pokedex!")
    console.log("")
    for (let [name, cmd] of Object.entries(commands)) {
        console.log(`${name}: ${cmd.description}`)
    }

}