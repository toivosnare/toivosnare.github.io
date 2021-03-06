const term = new Terminal({
    cursorBlink: "block"
})

const commands = new Map([
    ["help", () => {
        term.writeln("Available commands are:")
        for (const c of commands.keys())
            term.writeln(c)
    }],
    ["name", () => {term.writeln("Toivo Snåre")}],
    ["age", () => {
        let today = new Date()
        let birthday = new Date("1999-12-10")
        let milli_seconds_in_a_year = 1000 * 60 * 60 * 24 * 365.25
        let age = Math.floor((today - birthday) / milli_seconds_in_a_year)
        term.writeln(age)
    }],
    ["location", () => {
        term.writeln("Tampere, Finland")
        term.writeln("From: Lahti, Finland")
    }],
    ["education", () => {
        term.writeln("Tampere University")
        term.writeln("Bachelor's Programme in Computing and Electrical Engineering")
        term.writeln("2019-____")
        term.writeln("Specialization: Information Technology")
        term.writeln("Major: Intermediate Studies in Software Systems")
        term.writeln("Minor: Electronics and Embedded Systems")
        term.writeln("Master's Programme in Information Technology")
        term.writeln("____-____")
    }],
    ["work-experience", () => {
        term.writeln("Check out my LinkedIn:")
        commands.get("linkedin")()
    }],
    ["languages", () => {
        term.writeln("Finnish: Native")
        term.writeln("English: Proficient")
        term.writeln("Swedish: Intermediate")
    }],
    ["hobbies", () => {term.writeln("jogging, guitar, basketball, programming")}],
    ["email", () => {term.writeln("toivo.snare@gmail.com")}],
    ["linkedin", () => {term.writeln("https://www.linkedin.com/in/toivosnare/")}],
    ["clear", () => {term.clear()}],
    ["info", () => {
        term.writeln("Welcome to toivosnare.github.io!")
        term.writeln("Enter a command")
    }],
])

const write_prompt = () => {
    term.write("$ ");
}
term.prompt = write_prompt;
let command = ""

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
const container = document.getElementById('terminal-container')
term.open(container)
const cols = (container.offsetWidth - term._core.viewport.scrollBarWidth) / term._core._renderCoordinator.dimensions.actualCellWidth
const rows = container.offsetHeight / term._core._renderCoordinator.dimensions.actualCellHeight
term.resize(Math.floor(cols), Math.floor(rows))
commands.get("info")()
write_prompt()
