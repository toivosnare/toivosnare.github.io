var term = new Terminal({
    cursorBlink: "block"
})

var commands = new Map([
    ["help", () => {
        term.writeln("Available commands are:")
        for (const c of commands.keys())
            term.writeln(c)
    }],
    ["info", () => {
        term.writeln("Welcome to toivosnare.github.io!")
        term.writeln("Enter a command")
    }],
    ["name", () => {term.writeln("Toivo Snåre")}],
    ["age", () => {term.writeln("21")}],
    ["clear", () => {term.clear()}]
])

var write_prompt = () => {
    term.write("$ ");
}
term.prompt = write_prompt;
var command = ""

term.on("key", function(key, ev) {
    if (ev.keyCode === 13) {
        term.write("\r\n")
        if (commands.has(command)) {
            commands.get(command)()
        } else {
            term.writeln(`Unknown command: '${command}', try 'help'`)
        }
        command = ""
        write_prompt()
    } else if (ev.keyCode === 8) {
        command = command.slice(0, -1)
        if (term._core.buffer.x > 2) {
            term.write('\b \b');
          }
    } else if (ev.keyCode > 36 && ev.keyCode < 41) {
        // Disable arrow keys?
    } else {
        command += key;
        term.write(key);
    }
});
let container = document.getElementById('terminal-container')
term.open(container)
let cols = (container.offsetWidth - term._core.viewport.scrollBarWidth) / term._core._renderCoordinator.dimensions.actualCellWidth
let rows = container.offsetHeight / term._core._renderCoordinator.dimensions.actualCellHeight
term.resize(Math.floor(cols), Math.floor(rows))
commands.get("info")()
write_prompt()
